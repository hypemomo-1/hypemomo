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

let whatsappGroupId: string | null = null;
let whatsappReady = false;
let whatsappClient: Client | null = null;
let lastWaStatus = 'initializing';

async function findWhatsAppGroup() {
  const groupName = process.env.WHATSAPP_GROUP_NAME;
  if (!groupName || !whatsappClient) return;
  try {
    const chats = await whatsappClient.getChats();
    const group = chats.find(c => c.name === groupName && c.isGroup);
    if (group) {
      whatsappGroupId = group.id._serialized;
      console.log(`  ✓ WhatsApp group "${groupName}" found`);
    } else {
      console.log(`  ⚠ WhatsApp group "${groupName}" not found - make sure the bot is added to the group`);
    }
  } catch {
    console.log('  ⚠ Could not fetch WhatsApp chats yet');
  }
}

async function initWhatsApp() {
  const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
      headless: true,
      executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    },
  });
  whatsappClient = client;

  client.on('qr', (qr) => {
    lastWaStatus = 'awaiting_scan';
    console.log('\n══════════════════════════════════════════');
    console.log('  📱 SCAN THIS QR CODE WITH WHATSAPP');
    console.log('  Open WhatsApp → Linked Devices → Link a Device');
    console.log('══════════════════════════════════════════\n');
    qrcode.generate(qr, { small: true });
    console.log('');
  });

  client.on('authenticated', () => {
    lastWaStatus = 'authenticated';
    console.log('  ✓ WhatsApp authenticated');
  });

  client.on('auth_failure', (msg) => {
    lastWaStatus = 'auth_failed';
    console.error('  ✗ WhatsApp authentication failed:', msg);
    console.log('  ℹ Restart server or delete .wwebjs_auth folder to retry');
  });

  client.on('ready', () => {
    whatsappReady = true;
    lastWaStatus = 'ready';
    console.log('  ✓ WhatsApp connected successfully!');
    findWhatsAppGroup();
  });

  client.on('disconnected', (reason) => {
    whatsappReady = false;
    lastWaStatus = 'disconnected';
    console.log('  ⚠ WhatsApp disconnected:', reason);
    console.log('  ℹ Reconnecting in 10 seconds...');
    setTimeout(() => {
      try { client.initialize(); } catch {}
    }, 10000);
  });

  try {
    await client.initialize();
  } catch (err: any) {
    console.error('  ✗ WhatsApp initialization failed:', err.message);
    if (err.message?.includes('Chrome')) {
      console.log('  ℹ Make sure Chrome is installed or check the executablePath');
    }
    console.log('  ℹ Server will continue without WhatsApp notifications');
  }
}

initWhatsApp();

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
  res.json({
    status: 'Hype Momo Review Server is running',
    whatsapp: { ready: whatsappReady, status: lastWaStatus, groupFound: !!whatsappGroupId },
    endpoints: { 'POST /api/review': 'Submit a review' },
  });
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

    if (!whatsappClient) {
      console.log('  ⚠ WA notification skipped: client not initialized');
    } else if (!whatsappReady) {
      console.log(`  ⚠ WA notification skipped: not ready (status: ${lastWaStatus})`);
    } else if (whatsappGroupId) {
      whatsappClient.sendMessage(whatsappGroupId, waMsg)
        .then(() => console.log('  ✓ WhatsApp notification sent to group'))
        .catch((err: any) => console.error('  ✗ WhatsApp send error:', err.message));
    } else {
      console.log('  ℹ WA group ID not cached, trying to find group...');
      findWhatsAppGroup().then(() => {
        if (whatsappGroupId && whatsappClient) {
          whatsappClient.sendMessage(whatsappGroupId, waMsg)
            .then(() => console.log('  ✓ WhatsApp notification sent to group'))
            .catch((err: any) => console.error('  ✗ WhatsApp send error:', err.message));
        } else {
          console.log('  ⚠ WA notification skipped: group not found');
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

const server = app.listen(PORT, () => {
  console.log(`\n  🚀 Review server running on http://localhost:${PORT}\n`);
});

server.on('error', (err: any) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`  ✗ Port ${PORT} is already in use. Close the other server or use a different port.`);
  } else {
    console.error('  ✗ Server error:', err.message);
  }
});
