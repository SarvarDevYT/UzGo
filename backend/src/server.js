const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
require('dotenv').config();

const errorHandler = require('./middleware/errorHandler');

const authRoutes = require('./routes/auth.routes');
const taxiRoutes = require('./routes/taxi.routes');
const marketRoutes = require('./routes/market.routes');
const deliveryRoutes = require('./routes/delivery.routes');
const adminRoutes = require('./routes/admin.routes');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  }
});

app.use(cors());
app.use(express.json());

// Marshrutlar
app.use('/api/auth', authRoutes);
app.use('/api/taxi', taxiRoutes);
app.use('/api/market', marketRoutes);
app.use('/api/delivery', deliveryRoutes);
app.use('/api/admin', adminRoutes);

// Global xato ushlagich
app.use(errorHandler);

// Real-time (Socket.io) qismi
io.on('connection', (socket) => {
  console.log('Mijoz ulandi:', socket.id);

  // Haydovchi joylashuvi simulyatsiyasi
  let driverSimInterval = setInterval(() => {
    socket.emit('driver_location', {
      lat: 41.2995 + (Math.random() * 0.01),
      lng: 69.2401 + (Math.random() * 0.01),
    });
  }, 3000);

  // Yetkazib berish holati simulyatsiyasi
  socket.on('subscribe_delivery', (orderId) => {
    console.log(`Buyurtma obunasi: ${orderId}`);
    setTimeout(() => {
      socket.emit(`delivery_status_${orderId}`, { status: 'on_the_way' });
    }, 5000);
    setTimeout(() => {
      socket.emit(`delivery_status_${orderId}`, { status: 'delivered' });
    }, 10000);
  });

  socket.on('disconnect', () => {
    console.log('Mijoz uzildi:', socket.id);
    clearInterval(driverSimInterval);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server ${PORT}-portda ishga tushdi`);
});
