const express = require('express');
const router = express.Router();
const { stores, menus, deliveryOrders, uuidv4 } = require('../data/mockData');
const authMiddleware = require('../middleware/auth');

// GET /stores
router.get('/stores', (req, res) => {
  res.json(stores);
});

// GET /stores/:id
router.get('/stores/:id', (req, res) => {
  const store = stores.find(s => s.id === req.params.id);
  if (!store) return res.status(404).json({ message: 'Do\'kon topilmadi' });
  res.json(store);
});

// GET /stores/:id/menu
router.get('/stores/:id/menu', (req, res) => {
  const storeMenu = menus[req.params.id] || [];
  res.json(storeMenu);
});

// POST /orders (auth kerak)
router.post('/orders', authMiddleware, (req, res) => {
  const newOrder = {
    id: 'do' + uuidv4(),
    user_id: req.user.id,
    store_id: req.body.store_id,
    items: req.body.items || [],
    total: req.body.total || 0,
    status: 'pending',
    address: req.body.address || '',
    created_at: new Date()
  };
  deliveryOrders.push(newOrder);
  res.status(201).json(newOrder);
});

// GET /orders (auth - foydalanuvchi buyurtmalari)
router.get('/orders', authMiddleware, (req, res) => {
  const userOrders = deliveryOrders.filter(o => o.user_id === req.user.id);
  res.json(userOrders);
});

// GET /orders/:id (holat)
router.get('/orders/:id', authMiddleware, (req, res) => {
  const order = deliveryOrders.find(o => o.id === req.params.id);
  if (!order) return res.status(404).json({ message: 'Buyurtma topilmadi' });
  res.json(order);
});

// PUT /orders/:id/status (mock status yangilash)
router.put('/orders/:id/status', authMiddleware, (req, res) => {
  const order = deliveryOrders.find(o => o.id === req.params.id);
  if (!order) return res.status(404).json({ message: 'Buyurtma topilmadi' });
  order.status = req.body.status;
  res.json(order);
});

module.exports = router;
