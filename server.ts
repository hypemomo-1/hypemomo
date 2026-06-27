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

async function findWhatsAppGroup(): Promise<boolean> {
  if (!whatsappClient) return false;

  // Method 1: Direct group ID from .env (most reliable)
  const directId = (process.env.WHATSAPP_GROUP_ID || '').trim();
  if (directId) {
    whatsappGroupId = directId;
    console.log(`  ✓ Using direct group ID from .env`);
    return true;
  }

  // Method 2: getChats() API
  try {
    const chats = await whatsappClient.getChats();
    const groups = chats.filter(c => (c.id?._serialized || '').endsWith('@g.us'));

    if (groups.length > 0) {
      console.log(`  ℹ Groups via API (${groups.length}):`);
      groups.forEach((g, i) => console.log(`     ${i + 1}. "${g.name}"`));

      const targetName = (process.env.WHATSAPP_GROUP_NAME || '').trim().toLowerCase();
      if (targetName) {
        const match = groups.find(g => g.name.toLowerCase() === targetName);
        if (match) {
          whatsappGroupId = match.id._serialized;
          console.log(`  ✓ Matched group: "${match.name}"`);
          return true;
        }
        console.log(`  ⚠ "${process.env.WHATSAPP_GROUP_NAME}" not found, using first group`);
      }
      whatsappGroupId = groups[0].id._serialized;
      console.log(`  ✓ Using: "${groups[0].name}"`);
      return true;
    }
  } catch (err: any) {
    console.log(`  ⚠ API getChats() failed: ${err.message}`);
  }

  // Method 3: Direct pupPage access to WhatsApp Web Store
  try {
    const pageGroups = await whatsappClient.pupPage.evaluate(() => {
      try {
        return window.Store.Chat.map(c => ({
          name: c.name || c.formattedTitle || '',
          id: c.id._serialized || '',
        }));
      } catch { return []; }
    });
    const groups = pageGroups.filter(g => g.id.endsWith('@g.us'));
    if (groups.length > 0) {
      console.log(`  ℹ Groups via Store (${groups.length}):`);
      groups.forEach((g, i) => console.log(`     ${i + 1}. "${g.name}"`));

      const targetName = (process.env.WHATSAPP_GROUP_NAME || '').trim().toLowerCase();
      if (targetName) {
        const match = groups.find(g => g.name.toLowerCase() === targetName);
        if (match) {
          whatsappGroupId = match.id;
          console.log(`  ✓ Matched group: "${match.name}"`);
          return true;
        }
      }
      whatsappGroupId = groups[0].id;
      console.log(`  ✓ Using: "${groups[0].name}"`);
      return true;
    }
    console.log('  ⚠ No groups found via Store either');
  } catch (err: any) {
    console.log(`  ⚠ Store access failed: ${err.message}`);
  }

  return false;
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
    console.log('  ℹ Scanning for WhatsApp groups...');
    for (let i = 0; i < 20; i++) {
      const found = await findWhatsAppGroup();
      if (found) break;
      if (i < 19) {
        console.log(`  ℹ Retry ${i + 1}/20 in 5s...`);
        await new Promise(r => setTimeout(r, 5000));
      }
    }
    if (whatsappGroupId) {
      console.log(`  ✅ Ready to send notifications to group!`);
    } else {
      console.log('  ⚠ Could not find any group after 20 retries');
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
    const apiGroups: any[] = [];
    const storeGroups: any[] = [];
    try {
      const chats = await whatsappClient.getChats();
      chats.filter(c => (c.id?._serialized || '').endsWith('@g.us')).forEach(g => apiGroups.push({ name: g.name, id: g.id._serialized }));
    } catch {}
    try {
      const store = await whatsappClient.pupPage.evaluate(() => {
        try { return (window.Store?.Chat || []).map(c => ({ name: c.name || c.formattedTitle || '', id: c.id._serialized })); } catch { return []; }
      });
      store.filter(g => g.id.endsWith('@g.us')).forEach(g => storeGroups.push(g));
    } catch {}
    res.json({ success: true, whatsappGroupId, apiGroups, storeGroups, groupName: process.env.WHATSAPP_GROUP_NAME });
  } catch (err: any) {
    res.json({ success: false, message: err.message });
  }
});

app.get('/api/wa-refresh', async (_req, res) => {
  whatsappGroupId = null;
  const found = await findWhatsAppGroup();
  res.json({ success: found, groupFound: !!whatsappGroupId, groupName: process.env.WHATSAPP_GROUP_NAME });
});

app.get('/api/wa-chats', async (_req, res) => {
  if (!whatsappClient || !whatsappReady) {
    return res.json({ success: false, message: 'WhatsApp not ready', status: lastWaStatus });
  }
  try {
    let storeData = null;
    try {
      storeData = await whatsappClient.pupPage.evaluate(() => {
        try { return (window.Store?.Chat || []).slice(0, 20).map(c => ({ name: c.name || c.formattedTitle || '', id: c.id._serialized })); } catch { return null; }
      });
    } catch {}
    res.json({ success: true, whatsappGroupId, storeData, groupName: process.env.WHATSAPP_GROUP_NAME });
  } catch (err: any) {
    res.json({ success: false, message: err.message });
  }
});

app.get('/api/wa-test', async (_req, res) => {
  if (!whatsappClient || !whatsappReady || !whatsappGroupId) {
    return res.json({ success: false, ready: whatsappReady, groupId: !!whatsappGroupId, status: lastWaStatus });
  }
  try {
    await whatsappClient.sendMessage(whatsappGroupId, '🔔 Test message from Hype Momo server - if you see this, WhatsApp is working!');
    res.json({ success: true, message: 'Test message sent to group!' });
  } catch (err: any) {
    res.json({ success: false, error: err.message });
  }
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

    if (whatsappClient && whatsappReady) {
      if (!whatsappGroupId) await findWhatsAppGroup();
      if (whatsappGroupId) {
        try {
          await whatsappClient.sendMessage(whatsappGroupId, waMsg);
          console.log('  ✓ WhatsApp notification sent!');
        } catch (err: any) {
          console.error('  ✗ WhatsApp send fail:', err.message);
        }
      } else {
        console.log('  ⚠ WA skipped: no group available');
      }
    } else {
      console.log(`  ⚠ WA skipped: ready=${whatsappReady} client=${!!whatsappClient}`);
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
