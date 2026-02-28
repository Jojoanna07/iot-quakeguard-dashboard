# 🌍 QuakeGuard: IoT Earthquake & Structural Integrity Monitor

**QuakeGuard** adalah prototipe sistem cerdas berbasis Internet of Things (IoT) yang dirancang untuk mendeteksi getaran seismik (gempa) serta memantau integritas struktur bangunan secara *real-time*. [cite_start]Proyek ini dikembangkan untuk **Cyber Recruitment 2026 - Project 1 (IoT)**[cite: 2, 3].

## 📖 Ringkasan Proyek
[cite_start]Sistem ini menggunakan mikrokontroler ESP32 yang terhubung dengan berbagai sensor untuk membaca kondisi lingkungan[cite: 4]. [cite_start]Data yang ditangkap oleh perangkat keras akan dikirimkan secara langsung (*real-time*) ke Firebase, yang kemudian ditampilkan pada *dashboard* interaktif berbasis web[cite: 11]. 

**Manfaat Utama:**
1. **Deteksi Dini Gempa:** Menggunakan sensor *shock* untuk memberikan peringatan visual secara instan (Hijau/Kuning/Merah) saat terdeteksi goncangan atau anomali getaran.
2. **Pemantauan Integritas Struktur:** Menggunakan sensor ultrasonik HC-SR04 untuk mengukur jarak statis antara alat dan struktur (misalnya dinding). Jika terjadi perubahan jarak yang drastis pasca-getaran, sistem akan memberikan indikasi adanya pergeseran atau kerusakan struktur.
3. [cite_start]**Indikator Fisik & Digital:** Dilengkapi dengan aktuator berupa LCD dan LED RGB di lokasi fisik, serta sinkronisasi status pada antarmuka web[cite: 4].

## 🛠️ Komponen & Skematik Hardware
Sistem ini dibangun menggunakan komponen berikut:
* **Mikrokontroler:** ESP-WROOM-32 (ESP32)
* **Sensor Getaran:** Shock Sensor (untuk deteksi goncangan)
* **Sensor Jarak:** Ultrasonic HC-SR04 (untuk mengukur pergeseran dinding/struktur)
* **Aktuator:** LCD 16x2 (I2C) & Modul LED SMD RGB
* [cite_start]**Papan Rangkaian:** Breadboard / Perfboard [cite: 19]

### Wiring Diagram / Pin Mapping
*(Catatan: Sesuaikan pin di bawah ini dengan rakitan fisik ESP32)*
* **Shock Sensor:** Pin Data -> `[Pin D...]` ESP32
* **HC-SR04:** Trig -> `[Pin D...]`, Echo -> `[Pin D...]`
* **LED RGB:** R -> `[Pin D...]`, G -> `[Pin D...]`, B -> `[Pin D...]`
* [cite_start]**LCD 16x2 (I2C):** SDA -> `[Pin D21]`, SCL -> `[Pin D22]` [cite: 8]

## 💻 Petunjuk Penggunaan (Front-End Dashboard)
Dashboard web ini dibangun menggunakan **Next.js** dan **Tailwind CSS**. Berikut adalah langkah-langkah untuk menjalankannya di lingkungan lokal:

1. **Clone repositori ini:**
   ```bash
   git clone [https://github.com/](https://github.com/)[username-github-kamu]/iot-quakeguard-dashboard.git
   cd iot-quakeguard-dashboard