import express from 'express';
import mongoose from 'mongoose';
import { createRequire } from 'module';
const { Client, LocalAuth } = createRequire(import.meta.url)('whatsapp-web.js');
const qrcode = createRequire(import.meta.url)('qrcode-terminal');
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { Review } from './src/models/Review.js';

dotenv.config();

let whatsappGroupId: string | null = null;
let whatsappReady = false;
let whatsappClient: Client | null = null;
let lastWaStatus = 'initializing';

async function findWhatsAppGroup(tryCount = 0): Promise<boolean> {
  if (!whatsappClient) return false;
  try {
    const chats = await whatsappClient.getChats();
    const groups = chats.filter(c => c.isGroup);

    if (groups.length === 0 && tryCount < 5) {
      console.log(`  ⚠ No groups loaded yet, retrying (${tryCount + 1}/5)...`);
      await new Promise(r => setTimeout(r, 3000));
      return findWhatsAppGroup(tryCount + 1);
    }

    if (groups.length === 0) {
      console.log('  ⚠ No WhatsApp groups found - add your number to a group first');
      return false;
    }

    // List all available groups
    console.log(`  ℹ Available WhatsApp groups (${groups.length}):`);
    groups.forEach(g => console.log(`     ${g.id._serialized === whatsappGroupId ? '✓' : ' '} "${g.name}"`));

    // Try to find the configured group
    const groupName = (process.env.WHATSAPP_GROUP_NAME || '').trim();
    if (groupName) {
      const group = groups.find(c => c.name === groupName);
      if (group) {
        whatsappGroupId = group.id._serialized;
        console.log(`  ✓ Using configured group: "${groupName}"`);
        return true;
      }
      console.log(`  ⚠ Configured group "${groupName}" not found`);
    }

    // Fallback: use the first group
    console.log(`  ℹ Using first available group: "${groups[0].name}"`);
    whatsappGroupId = groups[0].id._serialized;
    return true;
  } catch (err: any) {
    console.log(`  ⚠ Could not fetch chats: ${err.message}`);
    if (tryCount < 5) {
      await new Promise(r => setTimeout(r, 3000));
      return findWhatsAppGroup(tryCount + 1);
    }
    return false;
  }
}

function clearWASession() {
  const dir = path.join(process.cwd(), '.wwebjs_auth');
  if (!fs.existsSync(dir)) return;
  for (let i = 0; i < 5; i++) {
    try {
      fs.rmSync(dir, { recursive: true, force: true });
      console.log('  🗑 Cleared old WhatsApp session');
      return;
    } catch (err: any) {
      if (err.code === 'EBUSY' || err.code === 'EPERM') {
        console.log(`  ⚠ Session file locked, retrying (${i + 1}/5)...`);
        // Try to kill any Chrome processes holding the lock
        try { execSync('taskkill /f /im chrome.exe 2>nul', { stdio: 'ignore' }); } catch {}
      }
    }
  }
  console.log('  ⚠ Could not clear session folder entirely');
}

let restarting = false;

async function restartWhatsApp() {
  if (restarting) return;
  restarting = true;
  if (whatsappClient) {
    try { await whatsappClient.destroy(); } catch {}
    whatsappClient = null;
  }
  await new Promise(r => setTimeout(r, 1000));
  clearWASession();
  restarting = false;
  initWhatsApp();
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

  client.on('auth_failure', async (msg) => {
    lastWaStatus = 'auth_failed';
    console.error('  ✗ WhatsApp authentication failed:', msg);
    console.log('  ℹ Auto-restarting with fresh QR...');
    restartWhatsApp();
  });

  client.on('ready', async () => {
    whatsappReady = true;
    lastWaStatus = 'ready';
    console.log('  ✓ WhatsApp connected successfully!');
    console.log('  ℹ Waiting for chats to load...');
    await new Promise(r => setTimeout(r, 3000));
    await findWhatsAppGroup();
    if (!whatsappGroupId) {
      console.log('  ℹ Will keep looking for the group every 15 seconds...');
      const interval = setInterval(async () => {
        if (whatsappGroupId || !whatsappReady) { clearInterval(interval); return; }
        await findWhatsAppGroup();
      }, 15000);
    }
  });

  client.on('disconnected', (reason) => {
    whatsappReady = false;
    lastWaStatus = 'disconnected';
    console.log('  ⚠ WhatsApp disconnected:', reason);
    if (reason === 'LOGOUT') {
      console.log('  ℹ Session logged out from phone. Restarting with fresh QR...');
      restartWhatsApp();
    } else {
      console.log('  ℹ Reconnecting in 10 seconds...');
      setTimeout(() => {
        if (!restarting) {
          try { client.initialize(); } catch (e: any) { console.error('  ✗ Reconnect failed:', e.message); }
        }
      }, 10000);
    }
  });

  try {
    await client.initialize();
  } catch (err: any) {
    console.error('  ✗ WhatsApp initialization failed:', err.message);
    if (err.message?.includes('Chrome')) {
      console.log('  ℹ Make sure Chrome is installed or check the executablePath');
    }
    console.log('  ℹ Auto-retrying with fresh session...');
    restartWhatsApp();
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
    endpoints: {
      'POST /api/review': 'Submit a review',
      'GET /api/wa-groups': 'List available WhatsApp groups',
      'GET /api/wa-refresh': 'Re-scan for WhatsApp group',
    },
  });
});

app.get('/api/wa-groups', async (_req, res) => {
  if (!whatsappClient || !whatsappReady) {
    return res.json({ success: false, message: 'WhatsApp not ready', status: lastWaStatus });
  }
  try {
    const chats = await whatsappClient.getChats();
    const groups = chats.filter(c => c.isGroup).map(c => ({ name: c.name, id: c.id._serialized }));
    res.json({ success: true, groups });
  } catch (err: any) {
    res.json({ success: false, message: err.message });
  }
});

app.get('/api/wa-refresh', async (_req, res) => {
  whatsappGroupId = null;
  const found = await findWhatsAppGroup();
  res.json({ success: found, groupFound: !!whatsappGroupId, groupName: process.env.WHATSAPP_GROUP_NAME });
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

    async function trySendWA() {
      if (!whatsappClient) { console.log('  ⚠ WA: client not initialized'); return; }
      if (!whatsappReady) { console.log(`  ⚠ WA: not ready (${lastWaStatus})`); return; }
      if (!whatsappGroupId) {
        console.log('  ℹ WA: finding group...');
        await findWhatsAppGroup();
      }
      if (whatsappGroupId) {
        try {
          await whatsappClient.sendMessage(whatsappGroupId, waMsg);
          console.log('  ✓ WhatsApp notification sent!');
        } catch (err: any) {
          console.error('  ✗ WhatsApp send error:', err.message);
        }
      } else {
        console.log('  ⚠ WA: no group available to send notification');
      }
    }
    trySendWA();
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
