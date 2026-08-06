# UzGo — Android Studio Mobile App

Ushbu papka UzGo Super-App ilovasining **Native Android Studio (APK)** loyihasidir.

## 📱 Android Studio da Ishga Tushirish:

1. **Android Studio** dasturini oching.
2. `Open an existing project` bosib, ushbu `uzgo/mobile` papkasini tanlang.
3. Gradle avtomatik ravishda sinxronizatsiya qiladi.
4. Emulyatorda yoki real Android telefonda **Run (Shift+F10)** bosing.
5. Tayyor APK yaratish uchun: `Build -> Build Bundle(s) / APK(s) -> Build APK(s)`.

## 🌐 Server Ulanishi:

`MainActivity.kt` faylida:
- Emulyator uchun: `http://10.0.2.2:3000` (Next.js web porti)
- Real telefon uchun: kompyuteringiz IP adresi (masalan: `http://192.168.1.X:3000`)
