import express from 'express';
import nodemailer from 'nodemailer';

const app = express();
app.use(express.json());

// In-memory store for verification codes
const codes = new Map();

function generateCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

async function verifyRecaptcha(token) {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) {
    console.error('Missing RECAPTCHA_SECRET_KEY');
    return false;
  }
  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${secret}&response=${token}`,
    });
    const data = await response.json();
    return data.success;
  } catch (err) {
    console.error('reCAPTCHA validation failed', err);
    return false;
  }
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === 'true',
  auth: process.env.SMTP_USER
    ? {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      }
    : undefined,
});

app.post('/api/send-code', async (req, res) => {
  const { email, recaptchaToken } = req.body || {};
  if (!email || !recaptchaToken) {
    return res.status(400).json({ error: 'Missing email or reCAPTCHA token' });
  }
  const valid = await verifyRecaptcha(recaptchaToken);
  if (!valid) {
    return res.status(400).json({ error: 'Invalid reCAPTCHA token' });
  }
  const code = generateCode();
  codes.set(email, { code, expires: Date.now() + 10 * 60 * 1000 });
  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: email,
      subject: 'Código de verificación',
      text: `Tu código de verificación es ${code}`,
    });
    res.json({ message: 'Verification code sent' });
  } catch (err) {
    console.error('Error sending email', err);
    res.status(500).json({ error: 'Failed to send verification email' });
  }
});

app.post('/api/verify-code', async (req, res) => {
  const { email, code, recaptchaToken } = req.body || {};
  if (!email || !code || !recaptchaToken) {
    return res.status(400).json({ error: 'Missing fields' });
  }
  const valid = await verifyRecaptcha(recaptchaToken);
  if (!valid) {
    return res.status(400).json({ error: 'Invalid reCAPTCHA token' });
  }
  const record = codes.get(email);
  if (!record || record.code !== code || Date.now() > record.expires) {
    return res.status(400).json({ error: 'Invalid or expired code' });
  }
  codes.delete(email);
  res.json({ fullName: 'Usuario', email });
});

const PORT = process.env.API_PORT || 5001;
app.listen(PORT, () => {
  console.log(`API server listening on port ${PORT}`);
});

