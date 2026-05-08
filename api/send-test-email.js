import nodemailer from 'nodemailer';

export const config = {
  runtime: 'nodejs',
};

function getEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

let transporter = null;

function getTransporter() {
  if (!transporter) {
    const smtpHost = getEnv('SMTP_HOST');
    const smtpPort = Number.parseInt(getEnv('SMTP_PORT'), 10);
    const smtpSecure = getEnv('SMTP_SECURE').toLowerCase() === 'true';
    const smtpUser = getEnv('SMTP_USER');
    const smtpPass = getEnv('SMTP_PASS');

    transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });
  }
  return transporter;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { subject, htmlBody, to } = req.body || {};

  if (!subject || !htmlBody) {
    return res.status(400).json({ error: 'Missing required fields: subject, htmlBody' });
  }

  try {
    const from = getEnv('SMTP_FROM');
    const transporter = getTransporter();

    // If no 'to' provided, send to the SMTP_FROM address (self-test)
    const recipient = typeof to === 'string' && to.trim() ? to.trim() : from;

    const info = await transporter.sendMail({
      from,
      to: recipient,
      subject,
      html: htmlBody,
    });

    console.log('Self-test email sent:', info.messageId);
    return res.status(200).json({ success: true, to: recipient, messageId: info.messageId });
  } catch (error) {
    console.error('Self-test email send failed:', error);
    return res.status(500).json({
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}