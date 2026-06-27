import express from 'express';
import mongoose from 'mongoose';
import { createRequire } from 'module';
const { Client, LocalAuth } = createRequire(import.meta.url)('whatsapp-web.js');
const qrcode = createRequire(import.meta.url)('qrcode-terminal');
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { Review } from './src/models/Review.js';

dotenv.config();

const whatsappClient = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  },
});

let whatsappGroupId: string | null = null;

async function findWhatsAppGroup() {
  const groupName = process.env.WHATSAPP_GROUP_NAME;
  if (!groupName) return;
  try {
    const chats = await whatsappClient.getChats();
    const group = chats.find(c => c.name === groupName && c.isGroup);
    if (group) {
      whatsappGroupId = group.id._serialized;
      console.log(`WhatsApp group "${groupName}" found`);
    } else {
      console.log(`WhatsApp group "${groupName}" not found`);
    }
  } catch {
    console.log('Could not fetch WhatsApp chats yet');
  }
}

whatsappClient.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
  console.log('Scan the QR code with WhatsApp to enable notifications');
});

whatsappClient.on('ready', () => {
  console.log('WhatsApp client ready!');
  findWhatsAppGroup();
});

whatsappClient.on('disconnected', (reason) => {
  console.log('WhatsApp disconnected:', reason);
  setTimeout(() => whatsappClient.initialize(), 10000);
});

whatsappClient.initialize();

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

app.post('/api/review', async (req, res) => {
  const { name, phone, email, rating, feedback } = req.body;

  if (!name || !phone || !email || !rating || !feedback) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }

  const ratingStars = '★'.repeat(rating) + '☆'.repeat(5 - rating);

  try {
    const review = new Review({ name, phone, email, rating, feedback });
    await review.save();

    res.json({ success: true, message: 'Review submitted!' });

    const waMsg = `🔥 *New Review from ${name}*\n\n⭐ ${ratingStars} (${rating}/5)\n📞 ${phone}\n📧 ${email}\n💬 "${feedback}"`;

    if (whatsappGroupId) {
      whatsappClient.sendMessage(whatsappGroupId, waMsg)
        .then(() => console.log('WhatsApp notification sent'))
        .catch((err: any) => console.error('WhatsApp send error:', err.message));
    } else {
      findWhatsAppGroup().then(() => {
        if (whatsappGroupId) {
          whatsappClient.sendMessage(whatsappGroupId, waMsg)
            .then(() => console.log('WhatsApp notification sent'))
            .catch((err: any) => console.error('WhatsApp send error:', err.message));
        }
      });
    }
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
