const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const authMiddleware = require('../middleware/auth');
const { users, otpStore } = require('../data/mockData');

// POST /send-otp
router.post('/send-otp', (req, res) => {
  const { phone } = req.body;
  if (!phone) return res.status(400).json({ message: 'Telefon raqam kerak' });
  
  const otp = '123456';
  otpStore[phone] = otp;
  
  console.log(`[Mock OTP] Phone: ${phone}, OTP: ${otp}`);
  res.json({ success: true, message: 'OTP yuborildi' });
});

// POST /verify-otp
router.post('/verify-otp', (req, res) => {
  const { phone, otp } = req.body;
  
  if (otpStore[phone] !== otp) {
    return res.status(400).json({ message: 'Noto\'g\'ri OTP' });
  }
  
  delete otpStore[phone];
  
  let user = users.find(u => u.phone === phone);
  if (!user) {
    user = { id: uuidv4(), phone, name: 'Yangi Foydalanuvchi' };
    users.push(user);
  }
  
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'secret123', { expiresIn: '7d' });
  
  res.json({ success: true, token, user });
});

// GET /profile
router.get('/profile', authMiddleware, (req, res) => {
  res.json({ success: true, user: req.user });
});

// PUT /profile
router.put('/profile', authMiddleware, (req, res) => {
  const { name } = req.body;
  if (name) req.user.name = name;
  res.json({ success: true, user: req.user });
});

module.exports = router;
