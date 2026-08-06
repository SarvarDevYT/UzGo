// JWT token tekshiruvchi middleware
const jwt = require('jsonwebtoken');
const { users } = require('../data/mockData');

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token kerak' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret123');
    const user = users.find(u => u.id === decoded.userId);
    if (!user) return res.status(401).json({ message: 'Foydalanuvchi topilmadi' });
    req.user = user;
    next();
  } catch (e) {
    res.status(401).json({ message: 'Token noto\'g\'ri' });
  }
};

module.exports = authMiddleware;
