import sendEmailHandler from './send-email.js';

export const config = { runtime: 'nodejs' };

export default async function handler(req, res) {
  const body = req.body || {};
  const fallbackRecipient = process.env.SMTP_FROM || process.env.SMTP_USER || process.env.GMAIL_USER || 'no-reply@example.com';

  return sendEmailHandler(
    {
      ...req,
      headers: { ...req.headers, 'x-api-key': process.env.MY_SECRET_KEY },
      body: {
        to: typeof body.to === 'string' && body.to.trim() ? body.to.trim() : fallbackRecipient,
        subject: typeof body.subject === 'string' && body.subject.trim() ? body.subject.trim() : 'Self-test email',
        htmlBody: typeof body.htmlBody === 'string' && body.htmlBody.trim() ? body.htmlBody.trim() : '<p>This is a self-test email.</p>',
      },
    },
    res,
  );
}