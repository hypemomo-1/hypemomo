import express from 'express';
import mongoose from 'mongoose';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { resolve4 } from 'dns/promises';
import { Review } from './src/models/Review.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || '';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.error('MongoDB connection error:', err));

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/api/health', (_req, res) => {
  res.json({ status: 'Hype Momo Review Server is running', endpoints: { 'POST /api/review': 'Submit a review' } });
});

import dns from 'dns';
dns.setDefaultResultOrder('ipv4first');

const smtpHost = await resolve4('smtp.gmail.com').then(addrs => addrs[0]).catch(() => 'smtp.gmail.com');
console.log('SMTP IPv4:', smtpHost);

const transporter = nodemailer.createTransport({
  host: smtpHost,
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: { rejectUnauthorized: false },
  connectionTimeout: 15000,
});

app.post('/api/review', async (req, res) => {
  const { name, phone, email, rating, feedback } = req.body;

  if (!name || !phone || !email || !rating || !feedback) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }

  const ratingStars = '★'.repeat(rating) + '☆'.repeat(5 - rating);

  const notifyMail = {
    from: `"Hype Momo Reviews" <${process.env.SMTP_USER}>`,
    to: process.env.NOTIFY_EMAIL,
    subject: `New Review from ${name} — ${rating}/5`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; background: #1a1a1a; color: #fff; padding: 32px; border-radius: 12px;">
        <h2 style="color: #FFBA75; margin: 0 0 8px;">New Review Received</h2>
        <p style="color: #e8bcb7; margin: 0 0 24px;">Someone has shared their Hype Momo experience.</p>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; color: #FFBA75; font-weight: bold;">Name</td><td style="padding: 8px 0; color: #fff;">${name}</td></tr>
          <tr><td style="padding: 8px 0; color: #FFBA75; font-weight: bold;">Phone</td><td style="padding: 8px 0; color: #fff;">${phone}</td></tr>
          <tr><td style="padding: 8px 0; color: #FFBA75; font-weight: bold;">Email</td><td style="padding: 8px 0; color: #fff;">${email}</td></tr>
          <tr><td style="padding: 8px 0; color: #FFBA75; font-weight: bold;">Rating</td><td style="padding: 8px 0; color: #FFBA75;">${ratingStars} ${rating}/5</td></tr>
          <tr><td style="padding: 8px 0; color: #FFBA75; font-weight: bold; vertical-align: top;">Feedback</td><td style="padding: 8px 0; color: #fff;">${feedback}</td></tr>
        </table>
        <hr style="border: none; border-top: 1px solid #FFBA75/30; margin: 24px 0;" />
        <p style="color: #e8bcb7; font-size: 12px;">Sent from Hype Momo Review System</p>
      </div>
    `,
  };

  const thankYouMail = {
    from: `"Hype Momo" <${process.env.SMTP_USER}>`,
    to: email,
    subject: 'Thank You for Your Review!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; background: #1a1a1a; color: #fff; padding: 32px; border-radius: 12px;">
        <h2 style="color: #ED1C24; margin: 0 0 8px;">Thank You, ${name}! 🎉</h2>
        <p style="color: #e8bcb7; margin: 0 0 24px;">We truly appreciate you taking the time to share your experience.</p>
        <div style="background: #000; border-radius: 12px; padding: 24px; margin: 24px 0;">
          <p style="color: #FFBA75; margin: 0 0 8px; font-size: 18px;">Your Review</p>
          <p style="color: #FFBA75; font-size: 24px; margin: 0 0 12px;">${ratingStars}</p>
          <p style="color: #e8bcb7; font-style: italic; margin: 0;">"${feedback}"</p>
        </div>
        <p style="color: #e8bcb7;">Your feedback helps us keep delivering the best street food in South Delhi. See you soon for another hype-worthy meal!</p>
        <hr style="border: none; border-top: 1px solid #FFBA75/30; margin: 24px 0;" />
        <p style="color: #e8bcb7; font-size: 12px;">Good Food, Good Mood — Hype Momo</p>
      </div>
    `,
  };

  try {
    const review = new Review({ name, phone, email, rating, feedback });
    await review.save();

    res.json({ success: true, message: 'Review submitted!' });

    transporter.sendMail(notifyMail).then(() => {
      console.log('Notification email sent');
    }).catch((err: any) => {
      console.error('Notify email error:', err.message);
    });

    transporter.sendMail(thankYouMail).then(() => {
      console.log('Thank you email sent');
    }).catch((err: any) => {
      console.error('Thank you email error:', err.message);
    });
  } catch (err: any) {
    console.error('Server error:', err.message);
    res.status(500).json({ success: false, message: 'Something went wrong.' });
  }
});

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Review server running on http://localhost:${PORT}`);
});
