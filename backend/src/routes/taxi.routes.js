const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { v4: uuidv4 } = require('uuid');
const { rides } = require('../data/mockData');

// GET /estimate?from=&to=
router.get('/estimate', (req, res) => {
  res.json({
    success: true,
    estimates: {
      ekonom: Math.floor(Math.random() * 5000) + 10000, // 10k-15k
      komfort: Math.floor(Math.random() * 10000) + 15000, // 15k-25k
      premium: Math.floor(Math.random() * 15000) + 25000, // 25k-40k
    }
  });
});

// POST /rides
router.post('/rides', authMiddleware, (req, res) => {
  const { from, to, type, price } = req.body;
  const newRide = {
    id: uuidv4(),
    userId: req.user.id,
    from,
    to,
    type,
    price,
    status: 'searching',
    createdAt: new Date().toISOString()
  };
  rides.push(newRide);
  res.status(201).json({ success: true, ride: newRide });
});

// GET /rides/:id
router.get('/rides/:id', authMiddleware, (req, res) => {
  const ride = rides.find(r => r.id === req.params.id);
  if (!ride) return res.status(404).json({ message: 'Sayohat topilmadi' });
  res.json({ success: true, ride });
});

// GET /history
router.get('/history', authMiddleware, (req, res) => {
  const userRides = rides.filter(r => r.userId === req.user.id);
  res.json({ success: true, history: userRides });
});

module.exports = router;
