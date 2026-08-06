const express = require('express');
const router = express.Router();
const { users, drivers, rides, marketOrders, deliveryOrders, categories, products, stores, uuidv4 } = require('../data/mockData');
const authMiddleware = require('../middleware/auth');

// Admin middleware
const adminCheck = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Ruxsat yoq' });
  }
  next();
};

router.use(authMiddleware, adminCheck);

// GET /stats
router.get('/stats', (req, res) => {
  const allOrders = [...marketOrders, ...deliveryOrders];
  const activeDrivers = drivers.filter(d => d.status === 'online').length;
  const totalRevenue = rides.reduce((sum, r) => sum + r.price, 0) + allOrders.reduce((sum, o) => sum + o.total, 0);

  const usersByRole = {
    customer: users.filter(u => u.role === 'customer').length,
    driver: users.filter(u => u.role === 'driver').length,
    courier: users.filter(u => u.role === 'courier').length,
    admin: users.filter(u => u.role === 'admin').length,
  };

  res.json({
    totalUsers: users.length,
    totalRides: rides.length,
    totalOrders: allOrders.length,
    totalRevenue,
    totalDrivers: drivers.length,
    activeDrivers,
    recentOrders: allOrders.slice(-5).reverse(),
    recentRides: rides.slice(-5).reverse(),
    usersByRole
  });
});

// GET /users
router.get('/users', (req, res) => {
  const { role, search } = req.query;
  let result = users;
  if (role) result = result.filter(u => u.role === role);
  if (search) result = result.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.phone.includes(search));
  res.json(result);
});

// GET /users/:id
router.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === req.params.id);
  if (!user) return res.status(404).json({ message: 'Foydalanuvchi topilmadi' });
  res.json(user);
});

// PUT /users/:id
router.put('/users/:id', (req, res) => {
  const index = users.findIndex(u => u.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Foydalanuvchi topilmadi' });
  
  users[index] = { ...users[index], ...req.body };
  res.json(users[index]);
});

// DELETE /users/:id
router.delete('/users/:id', (req, res) => {
  const index = users.findIndex(u => u.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Foydalanuvchi topilmadi' });
  
  users.splice(index, 1);
  res.json({ message: 'Ochirildi' });
});

// GET /drivers
router.get('/drivers', (req, res) => {
  res.json(drivers);
});

// PUT /drivers/:id/status
router.put('/drivers/:id/status', (req, res) => {
  const driver = drivers.find(d => d.id === req.params.id);
  if (!driver) return res.status(404).json({ message: 'Haydovchi topilmadi' });
  driver.status = req.body.status;
  res.json(driver);
});

// GET /products
router.get('/products', (req, res) => {
  res.json(products);
});

// POST /products
router.post('/products', (req, res) => {
  const newProduct = { id: uuidv4(), ...req.body, created_at: new Date() };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// PUT /products/:id
router.put('/products/:id', (req, res) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Topilmadi' });
  products[index] = { ...products[index], ...req.body };
  res.json(products[index]);
});

// DELETE /products/:id
router.delete('/products/:id', (req, res) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Topilmadi' });
  products.splice(index, 1);
  res.json({ message: 'Ochirildi' });
});

// GET /categories
router.get('/categories', (req, res) => {
  res.json(categories);
});

// POST /categories
router.post('/categories', (req, res) => {
  const newCat = { id: uuidv4(), ...req.body };
  categories.push(newCat);
  res.status(201).json(newCat);
});

// DELETE /categories/:id
router.delete('/categories/:id', (req, res) => {
  const index = categories.findIndex(c => c.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Topilmadi' });
  categories.splice(index, 1);
  res.json({ message: 'Ochirildi' });
});

// GET /orders
router.get('/orders', (req, res) => {
  res.json({ marketOrders, deliveryOrders });
});

// PUT /orders/:id/status
router.put('/orders/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  let order = marketOrders.find(o => o.id === id) || deliveryOrders.find(o => o.id === id);
  if (!order) return res.status(404).json({ message: 'Buyurtma topilmadi' });
  order.status = status;
  res.json(order);
});

// GET /rides
router.get('/rides', (req, res) => {
  res.json(rides);
});

// GET /stores
router.get('/stores', (req, res) => {
  res.json(stores);
});

// PUT /stores/:id/status
router.put('/stores/:id/status', (req, res) => {
  const store = stores.find(s => s.id === req.params.id);
  if (!store) return res.status(404).json({ message: 'Dokon topilmadi' });
  store.is_open = req.body.is_open;
  res.json(store);
});

module.exports = router;
