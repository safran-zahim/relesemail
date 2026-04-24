import { google } from 'googleapis';

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

function base64UrlEncode(value) {
  return Buffer.from(value)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { subject, htmlBody } = req.body || {};

  if (!subject || !htmlBody) {
    return res.status(400).json({ error: 'Missing required fields: subject, htmlBody' });
  }

  try {
    const clientId = getEnv('GMAIL_CLIENT_ID');
    const clientSecret = getEnv('GMAIL_CLIENT_SECRET');
    const refreshToken = getEnv('GMAIL_REFRESH_TOKEN');
    const gmailUser = getEnv('GMAIL_USER');
    const redirectUri = process.env.GMAIL_REDIRECT_URI || 'https://developers.google.com/oauthplayground';

    const oauth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUri);
    oauth2Client.setCredentials({ refresh_token: refreshToken });

    const accessTokenResponse = await oauth2Client.getAccessToken();
    const accessToken =
      typeof accessTokenResponse === 'string'
        ? accessTokenResponse
        : accessTokenResponse?.token;

    if (!accessToken) {
      throw new Error('Could not obtain Gmail access token');
    }

    const rawMessage = [
      `From: ${gmailUser}`,
      `To: ${gmailUser}`,
      `Subject: ${subject}`,
      'MIME-Version: 1.0',
      'Content-Type: text/html; charset="UTF-8"',
      '',
      htmlBody,
    ].join('\r\n');

    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

    await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: base64UrlEncode(rawMessage),
      },
    });

    return res.status(200).json({ success: true, to: gmailUser });
  } catch (error) {
    console.error('Self-test email send failed:', error);
    return res.status(500).json({
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}