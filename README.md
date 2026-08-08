# UzGo — Surxondaryo (Termiz) Super-App Platformasi 🚕🛍️🛵📦

**UzGo** — Surxondaryo viloyati, Termiz shahri uchun maxsus yaratilgan brend Super-App ilovasi (Yandex Go alternativi): **Taksi, Mototaksi, Market, Delivery (Taom yetkazish), UzGo Pochta hamda Admin Panel**.

---

## 🛠️ Loyiha Texnologik Steki (Tech Stack)

- **Frontend**: Next.js 14 (App Router), React 18, Redux Toolkit, Tailwind CSS, Lucide Icons.
- **Database**: Supabase PostgreSQL (Cloud Real-time DB).
- **Geolocation**: HTML5 Geolocation API + OpenStreetMap Reverse Geocoding.
- **Mobile**: Android Studio Native WebView Shell (`mobile/`).
- **Deployment**: Vercel.

---

## 🎨 Dizayn Tizimi (Signature Visual Identity)

- **Brend Rangi (Turkuaz)**: `#16C2B2`
- **Taksi & Mototaksi (Korall-Qizil)**: `#FF5B4C`
- **Market (Oltin Amber)**: `#F2A93B`
- **Delivery & Pochta (Zümrad Yashil)**: `#22C55E`
- **Fon**: Obsidian Dark `#0F1015`, Card `#181A20`, Border `#2C303E`

---

## 📱 Termiz Shahri Uchun Maxsus Funksiyalar

1. **🚕 Taksi va Mototaksi**:
   - Tariflar: 🛵 **Mototaksi** (8,000 so'm), 🚗 **Ekonom** (12,000 so'm), 🚙 **Komfort** (18,000 so'm), 🏎️ **Komfort+** (25,000 so'm), 👑 **Business** (40,000 so'm).
   - Termiz MFY va manzillari (*Termiz Markaz, Indorama MFY, Surxon sohil, TerDU, Aeroport*).
   - Surxondaryo davlat raqami kodi: **`75`** (masalan: `75 A 777 AA`).
   - Sayohatni real-vaqtda ulashish (Share Live Ride) va Ichki Chat modali.
2. **📦 UzGo Pochta**: Hujjat va posilka yetkazish xizmati.
3. **💳 Click & Payme To'lovlari**: Naqd pul, Click va Payme orqali xaridlarni rasmiylashtirish.
4. **🌐 Ko'p Tillilik (i18n)**: O'zbek tili 🇺🇿 va Rus tili 🇷🇺 o'rtasida tezkor almashtirish.
5. **👑 Admin Panel**: Termiz Talab Issiq Xaritasi (Demand Heatmap), Promo-kodlar CRUD va Haydovchilar hisob-kitobi.

---

## 🚀 O'rnatish va Ishga Tushirish

```bash
# Frontend
cd frontend
npm install
npm run dev

# Android APK Yig'ish
Android Studio-da mobile/ papkasini ochib, Build -> Build APK(s) ni bosing.
```
