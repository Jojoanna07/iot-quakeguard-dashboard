"use client";
import { useState } from "react";

export default function DashboardGempa() {
  // --- 1. STATE UNTUK DUMMY DATA ---
  // Ini bertindak sebagai pengganti database Firebase sementara
  const [statusGempa, setStatusGempa] = useState("AMAN");
  const [jarakStruktur, setJarakStruktur] = useState(15.0); // Anggap jarak awal sensor HC-SR04 adalah 15 cm
  const [warnaLed, setWarnaLed] = useState("bg-green-500");
  const [teksLcd, setTeksLcd] = useState("KONDISI AMAN");

  // --- 2. FUNGSI SIMULASI ---
  // Fungsi ini dipanggil saat tombol simulasi ditekan
  const picuGempa = () => {
    setStatusGempa("BAHAYA");
    setJarakStruktur(12.3); // Jarak berubah karena struktur bangunan bergeser
    setWarnaLed("bg-red-500 animate-pulse"); // LED Merah menyala dan berkedip
    setTeksLcd("AWAS GEMPA!!");
  };

  const resetKondisi = () => {
    setStatusGempa("AMAN");
    setJarakStruktur(15.0);
    setWarnaLed("bg-green-500");
    setTeksLcd("KONDISI AMAN");
  };

  // --- 3. ANTARMUKA (UI) ---
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 font-sans">
      {/* Header / Branding Alat */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-blue-400">QuakeGuard Dashboard</h1>
        <p className="text-gray-400 mt-2">Sistem Deteksi Getaran & Pergeseran Struktur Bangunan</p>
      </div>

      {/* Grid Layout untuk Kartu Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        
        {/* Kartu 1: Status Utama (Sensor Getar / Shock) */}
        <div className={`p-6 rounded-2xl shadow-lg flex flex-col items-center justify-center transition-all duration-500 ${statusGempa === "BAHAYA" ? "bg-red-600 shadow-red-500/50" : "bg-gray-800 border border-gray-700"}`}>
          <h2 className="text-xl font-semibold mb-2">STATUS LINGKUNGAN</h2>
          <div className="text-5xl font-black tracking-widest mt-4">
            {statusGempa}
          </div>
        </div>

        {/* Kartu 2: Pembacaan Sensor Jarak (HC-SR04) */}
        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700 flex flex-col justify-center">
          <h2 className="text-gray-400 font-semibold mb-1">Sensor HC-SR04</h2>
          <p className="text-lg font-bold mb-4">Integritas Struktur Bangunan</p>
          <div className="flex items-end gap-2">
            <span className="text-6xl font-black text-blue-400">{jarakStruktur}</span>
            <span className="text-2xl text-gray-400 mb-1">cm</span>
          </div>
          {statusGempa === "BAHAYA" && (
            <p className="text-red-400 text-sm mt-2 font-bold animate-pulse">
              ⚠️ Peringatan: Terdeteksi pergeseran struktur!
            </p>
          )}
        </div>

        {/* Kartu 3: Status Aktuator (LED & LCD) */}
        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700 md:col-span-2 flex justify-around items-center">
          <div className="text-center">
            <h2 className="text-gray-400 font-semibold mb-3">Status LED SMD RGB</h2>
            <div className={`w-16 h-16 rounded-full mx-auto shadow-[0_0_20px_rgba(0,0,0,0.5)] ${warnaLed}`}></div>
          </div>
          <div className="text-center w-1/2">
            <h2 className="text-gray-400 font-semibold mb-3">Tampilan LCD 16x2</h2>
            <div className="bg-green-300 text-green-900 font-mono text-xl p-4 rounded-lg border-4 border-gray-600 inline-block w-full shadow-inner">
              {teksLcd}
            </div>
          </div>
        </div>
      </div>

      {/* --- PANEL SIMULASI (Khusus Front-End Dev) --- */}
      <div className="max-w-4xl mx-auto mt-12 p-6 border-2 border-dashed border-gray-600 rounded-xl bg-gray-800/50">
        <h3 className="text-yellow-400 font-bold mb-4">🛠️ Panel Simulasi (Pengganti ESP32 Sementara)</h3>
        <div className="flex gap-4">
          <button 
            onClick={picuGempa}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            🚨 Simulasikan Gempa!
          </button>
          <button 
            onClick={resetKondisi}
            className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            🔄 Kembalikan ke Aman
          </button>
        </div>
        <p className="text-sm text-gray-400 mt-4">
          Gunakan tombol di atas untuk mengetes perubahan UI. Nanti, tombol ini akan dihapus dan diganti dengan data *real-time* dari Firebase.
        </p>
      </div>
    </div>
  );
}