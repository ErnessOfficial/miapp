import http from 'node:http';
import { URL } from 'node:url';
import crypto from 'node:crypto';

const codes = new Map();

function sendJson(res, status, data) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(data));
}

async function readBody(req) {
  let body = '';
  for await (const chunk of req) body += chunk;
  return body ? JSON.parse(body) : {};
}

async function verifyRecaptcha(token) {
  const secret = process.env.RECAPTCHA_SECRET;
  if (!secret) return false;
  const resp = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `secret=${encodeURIComponent(secret)}&response=${encodeURIComponent(token)}`
  });
  const data = await resp.json();
  return data.success;
}

async function sendEmail(email, code) {
  if (process.env.EMAIL_API_URL && process.env.EMAIL_API_KEY) {
    await fetch(process.env.EMAIL_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.EMAIL_API_KEY}`
      },
      body: JSON.stringify({ to: email, subject: 'Verification Code', text: `Your code is ${code}` })
    });
  } else {
    console.log(`Verification code for ${email}: ${code}`);
  }
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url || '', `http://${req.headers.host}`);

  if (req.method === 'POST' && url.pathname === '/api/send-code') {
    const { email, recaptchaToken } = await readBody(req);
    if (!email || !recaptchaToken) {
      return sendJson(res, 400, { error: 'Email and token required' });
    }
    const valid = await verifyRecaptcha(recaptchaToken);
    if (!valid) {
      return sendJson(res, 400, { error: 'Invalid reCAPTCHA' });
    }
    const code = crypto.randomInt(100000, 999999).toString();
    codes.set(email, { code, expires: Date.now() + 10 * 60 * 1000 });
    try {
      await sendEmail(email, code);
      sendJson(res, 200, { success: true });
    } catch (err) {
      console.error('Email send failed', err);
      sendJson(res, 500, { error: 'Failed to send code' });
    }
  } else if (req.method === 'POST' && url.pathname === '/api/verify-code') {
    const { email, code, recaptchaToken } = await readBody(req);
    if (!email || !code || !recaptchaToken) {
      return sendJson(res, 400, { error: 'Email, code and token required' });
    }
    const valid = await verifyRecaptcha(recaptchaToken);
    if (!valid) {
      return sendJson(res, 400, { error: 'Invalid reCAPTCHA' });
    }
    const entry = codes.get(email);
    if (!entry || entry.code !== code || entry.expires < Date.now()) {
      return sendJson(res, 400, { error: 'Invalid or expired code' });
    }
    codes.delete(email);
    sendJson(res, 200, { fullName: 'Nuevo Usuario', email });
  } else {
    sendJson(res, 404, { error: 'Not found' });
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default server;
