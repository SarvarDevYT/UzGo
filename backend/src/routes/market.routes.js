const express = require('express');
const router = express.Router();
const { categories, products, marketOrders, uuidv4 } = require('../data/mockData');
const authMiddleware = require('../middleware/auth');

// GET /categories
router.get('/categories', (req, res) => {
  res.json(categories);
});

// GET /products
router.get('/products', (req, res) => {
  const { category_id, search, page = 1, limit = 10 } = req.query;
  let result = products;

  if (category_id) {
    result = result.filter(p => p.category_id === category_id);
  }
  if (search) {
    result = result.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
  }

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginated = result.slice(startIndex, endIndex);

  res.json({
    total: result.length,
    page: Number(page),
    limit: Number(limit),
    data: paginated
  });
});

// GET /products/:id
router.get('/products/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) return res.status(404).json({ message: 'Mahsulot topilmadi' });
  res.json(product);
});

// POST /products (admin, auth kerak)
router.post('/products', authMiddleware, (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Ruxsat yoq' });
  const newProduct = { id: uuidv4(), ...req.body, created_at: new Date() };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// PUT /products/:id (admin)
router.put('/products/:id', authMiddleware, (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Ruxsat yoq' });
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Mahsulot topilmadi' });
  
  products[index] = { ...products[index], ...req.body };
  res.json(products[index]);
});

// DELETE /products/:id (admin)
router.delete('/products/:id', authMiddleware, (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Ruxsat yoq' });
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Mahsulot topilmadi' });
  
  products.splice(index, 1);
  res.json({ message: 'Ochirildi' });
});

// POST /orders (auth)
router.post('/orders', authMiddleware, (req, res) => {
  const newOrder = {
    id: 'mo' + uuidv4(),
    user_id: req.user.id,
    items: req.body.items || [],
    total: req.body.total || 0,
    status: 'pending',
    address: req.body.address || '',
    created_at: new Date()
  };
  marketOrders.push(newOrder);
  res.status(201).json(newOrder);
});

// GET /orders (auth - foydalanuvchi tarixi)
router.get('/orders', authMiddleware, (req, res) => {
  const userOrders = marketOrders.filter(o => o.user_id === req.user.id);
  res.json(userOrders);
});

// GET /all-orders (admin - hamma buyurtmalar)
router.get('/all-orders', authMiddleware, (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Ruxsat yoq' });
  res.json(marketOrders);
});

module.exports = router;
