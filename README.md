# UzGo — Ko'p Xizmatli Platforma (Super-App)

<div align="center">
  <h3>🚗 Taksi | 🛍️ Market | 🛵 Yetkazib Berish</h3>
  <p>O'zbekiston uchun bitta platformada uchta xizmat</p>
</div>

---

## 📋 Loyiha haqida

**UzGo** — O'zbekiston uchun mo'ljallangan super-app bo'lib, bitta platformada uchta asosiy xizmatni birlashtiradi:

- **🚗 Taksi** — Yandex Go uslubida, real-time haydovchi kuzatuvi
- **🛍️ Market** — Minglab mahsulotlar, savat va checkout
- **🛵 Yetkazib berish** — Restoran va do'konlardan buyurtma, real-time tracking

## 🛠️ Texnologik Stack

| Frontend | Backend |
|----------|---------|
| React 18 + Vite | Node.js + Express.js |
| Tailwind CSS | Socket.io (real-time) |
| Redux Toolkit | JWT autentifikatsiya |
| React Router v6 | REST API |
| Axios | Mock Data (PostgreSQL ready) |
| Leaflet Maps | bcryptjs, dotenv |

## 📁 Papka Tuzilishi

```
uzgo/
├── frontend/                 # React + Vite
│   ├── src/
│   │   ├── components/       # Navbar, BottomNav, Modal, Toast
│   │   ├── modules/
│   │   │   ├── taxi/         # Taksi moduli
│   │   │   ├── market/       # Market moduli
│   │   │   └── delivery/     # Yetkazib berish moduli
│   │   ├── pages/            # HomePage, LoginPage, ProfilePage
│   │   ├── store/            # Redux (auth, cart, ride)
│   │   ├── services/         # Axios API instance
│   │   └── App.jsx
│   └── package.json
├── backend/                  # Node.js + Express
│   ├── src/
│   │   ├── routes/           # Auth, Taxi, Market, Delivery routes
│   │   ├── middleware/       # JWT auth, Error handler
│   │   └── data/             # Mock ma'lumotlar bazasi
│   ├── .env
│   └── package.json
└── README.md
```

## 🚀 Loyihani Ishga Tushirish

### Talablar

- Node.js 18+
- npm 9+

### 1. Loyihani yuklab oling

```bash
git clone <repo-url>
cd uzgo
```

### 2. Backend sozlash

```bash
cd backend
npm install
cp .env.example .env
# .env faylini kerakli qiymatlar bilan to'ldiring
npm run dev
```

Backend `http://localhost:5000` da ishga tushadi.

### 3. Frontend sozlash

```bash
cd frontend
npm install
npm run dev
```

Frontend `http://localhost:5173` da ishga tushadi.

### 4. Test login

Demo uchun:
- **Telefon**: istalgan telefon raqam (masalan: +998901234567)
- **OTP kodi**: `123456` (mock rejimida)

## 🔧 Muhit O'zgaruvchilari

Backend `.env` fayli:

```env
PORT=5000
JWT_SECRET=uzgo_super_secret_jwt_key_2024
JWT_EXPIRES_IN=7d
OTP_MOCK=true
FRONTEND_URL=http://localhost:5173
```

## 📡 API Endpointlar

### Auth
| Method | Endpoint | Tavsif |
|--------|----------|--------|
| POST | `/api/auth/send-otp` | OTP yuborish |
| POST | `/api/auth/verify-otp` | OTP tasdiqlash + JWT |
| GET | `/api/auth/profile` | Profil ma'lumotlari |
| PUT | `/api/auth/profile` | Profilni yangilash |

### Taksi
| Method | Endpoint | Tavsif |
|--------|----------|--------|
| GET | `/api/taxi/estimate` | Narx hisoblash |
| POST | `/api/taxi/rides` | Yangi sayohat |
| GET | `/api/taxi/rides/:id` | Sayohat holati |
| GET | `/api/taxi/history` | Sayohatlar tarixi |

### Market
| Method | Endpoint | Tavsif |
|--------|----------|--------|
| GET | `/api/market/categories` | Kategoriyalar |
| GET | `/api/market/products` | Mahsulotlar (filter, search) |
| GET | `/api/market/products/:id` | Mahsulot detallari |
| POST | `/api/market/orders` | Buyurtma berish |
| GET | `/api/market/orders` | Buyurtmalar tarixi |

### Yetkazib Berish
| Method | Endpoint | Tavsif |
|--------|----------|--------|
| GET | `/api/delivery/stores` | Do'konlar ro'yxati |
| GET | `/api/delivery/stores/:id` | Do'kon ma'lumotlari |
| GET | `/api/delivery/stores/:id/menu` | Do'kon menyusi |
| POST | `/api/delivery/orders` | Buyurtma berish |
| GET | `/api/delivery/orders/:id` | Buyurtma holati |

## 🎨 Dizayn Tizimi

| Element | Rang |
|---------|------|
| Asosiy rang | `#1a237e` (Primary) |
| Urg'u rangi | `#ffc107` (Accent) |
| Fon | `#0f0f1a` (Dark) |
| Karta | `#1a1a2e` (Dark Card) |
| Chegara | `#2a2a4a` (Dark Border) |

## 🔌 Socket.io Events

| Event | Tavsif |
|-------|--------|
| `driver:location` | Haydovchi joylashuvini yangilash |
| `ride:status` | Sayohat holat o'zgarishi |
| `delivery:status` | Yetkazib berish holati |
| `courier:location` | Kuryer joylashuvi |

## 📱 Sahifalar

- `/` — Bosh sahifa (Hub)
- `/login` — Login (telefon + OTP)
- `/taxi` — Taksi buyurtma
- `/market` — Mahsulotlar katalogi
- `/market/cart` — Savat
- `/market/checkout` — Checkout
- `/delivery` — Restoran/do'konlar
- `/delivery/:id` — Do'kon menyusi
- `/profile` — Foydalanuvchi profili

## 👥 Rollar

- **customer** — Taksi, market, yetkazib berish
- **driver** — Taksi haydovchi paneli
- **courier** — Kuryer paneli
- **seller** — Do'kon paneli

## 📄 Litsenziya

MIT © 2024 UzGo Team
