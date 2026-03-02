# 🌍 QuakeGuard: IoT Earthquake & Structural Integrity Monitor

**QuakeGuard** adalah prototipe sistem cerdas berbasis Internet of Things (IoT) yang dirancang untuk mendeteksi getaran seismik (gempa) serta memantau integritas struktur bangunan secara *real-time*. Proyek ini dikembangkan oleh **Kelompok 1** untuk **Cyber Recruitment 2026 - Project 2 (IoT)**.

## 📖 Ringkasan Proyek
Sistem ini menggunakan ESP32-S3 yang terhubung dengan berbagai sensor untuk membaca kondisi lingkungan secara presisi. Data perangkat keras dikirimkan secara paralel ke **Firebase Realtime Database** dan **Blynk**, yang kemudian disajikan melalui *dashboard* interaktif berbasis web (Next.js) untuk pemantauan jarak jauh tanpa *delay*.

**Manfaat Utama:**
1. **Deteksi Dini Gempa:** Menggunakan *Shock Sensor* untuk memberikan peringatan visual instan (Hijau/Merah) di lokasi kejadian dan di *dashboard*.
2. **Pemantauan Integritas Struktur:** Menggunakan sensor ultrasonik (HC-SR04) untuk mengukur jarak statis ke dinding. Jika terjadi perubahan drastis pasca-getaran, sistem mengindikasikan adanya pergeseran atau kerusakan struktur.
3. **Multi-Platform Monitoring:** Dapat dipantau secara lokal (LCD I2C & LED RGB), via *mobile* (Blynk App), dan terpusat via *Website* (Vercel).

## 🛠️ Komponen & Pin Mapping (Skematik)
Sistem ini dibangun menggunakan **ESP32-S3** dengan pemetaan pin perangkat keras sebagai berikut:

* **Sensor Getaran (Shock Sensor):** Pin `21`
* **Sensor Jarak (HC-SR04):** TRIG -> Pin `41` | ECHO -> Pin `38`
* **Aktuator Visual (LED RGB SMD):** R -> Pin `17` | G -> Pin `16` | B -> Pin `15`
* **Aktuator Informasi (LCD 16x2 I2C):** SDA -> Pin `8` | SCL -> Pin `9`

## 💻 Petunjuk Penggunaan (Web Dashboard Front-End)
Dashboard web ini dibangun menggunakan **Next.js** dan disinkronisasi langsung dengan Firebase. Berikut cara menjalankannya di lingkungan lokal:

### Instalasi
1. **Clone repositori ini:**
   ```bash
   git clone [https://github.com/Jojoanna07/iot-quakeguard-dashboard.git](https://github.com/Jojoanna07/iot-quakeguard-dashboard.git)
   cd iot-quakeguard-dashboard
