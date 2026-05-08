import nodemailer from 'nodemailer';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

export const config = { runtime: 'nodejs' };

function normalizeHtmlAndAttachments(html) {
  const attachmentsMeta = [];
  const normalized = html.replace(/src=(['"])\/orangehrm-logo\.png\1/gi, (m, q) => {
    attachmentsMeta.push({ filename: 'orangehrm-logo.png', pathCandidates: [
      path.join(process.cwd(), 'public', 'orangehrm-logo.png'),
      path.join(process.cwd(), 'orangehrm-logo.png'),
    ] });
    return `src=${q}cid:company-logo${q}`;
  });
  return { normalized, attachmentsMeta };
}

async function attachInlineFiles(attachmentsMeta) {
  const attachments = [];
  for (const meta of attachmentsMeta) {
    let buf = null;
    for (const p of meta.pathCandidates) {
      try {
        buf = await readFile(p);
        break;
      } catch {}
    }
    if (buf) {
      attachments.push({ filename: meta.filename, content: buf, cid: 'company-logo' });
    }
  }
  return attachments;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  if (req.headers['x-api-key'] !== process.env.MY_SECRET_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { to, subject, htmlBody } = req.body || {};
  if (!to || !subject || !htmlBody) return res.status(400).json({ error: 'Missing required fields: to, subject, htmlBody' });

  try {
    let transporter;

    if (process.env.SMTP_HOST) {
      const port = Number(process.env.SMTP_PORT || 587);
      transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port,
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
    } else {
      // Dev/test fallback: Ethereal
      const testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: testAccount.smtp.host,
        port: testAccount.smtp.port,
        secure: testAccount.smtp.secure,
        auth: { user: testAccount.user, pass: testAccount.pass },
      });
      console.log('Ethereal test account created:', testAccount.user);
    }

    const { normalized, attachmentsMeta } = normalizeHtmlAndAttachments(htmlBody);
    const inlineAttachments = await attachInlineFiles(attachmentsMeta);

    const from = process.env.SMTP_FROM || process.env.GMAIL_USER || process.env.SMTP_USER || 'no-reply@example.com';

    const info = await transporter.sendMail({
      from,
      to,
      subject,
      html: normalized,
      attachments: inlineAttachments,
    });

    const previewUrl = nodemailer.getTestMessageUrl(info) || null;

    return res.status(200).json({ success: true, previewUrl });
  } catch (err) {
    console.error('Email send failed:', err);
    return res.status(500).json({ error: err instanceof Error ? err.message : 'Unknown error' });
  }
}
