"use client";
import { useState } from "react";

export default function DashboardGempa() {
  const [statusGempa, setStatusGempa] = useState("AMAN");
  const [amplitudoGoyangan, setAmplitudoGoyangan] = useState(0.0); 
  const [warnaLed, setWarnaLed] = useState("bg-green-500");
  const [teksLcd, setTeksLcd] = useState("KONDISI AMAN");

  // --- FUNGSI SIMULASI ---
  const picuWaspada = () => {
    setStatusGempa("WASPADA");
    setAmplitudoGoyangan(3.4); // Getaran kecil, meja bergeser sedikit
    setWarnaLed("bg-yellow-500"); // LED Kuning menyala
    setTeksLcd("AWAS! GETARAN");
  };

  const picuBahaya = () => {
    setStatusGempa("BAHAYA");
    setAmplitudoGoyangan(14.8); // Getaran hebat, meja bergeser jauh
    setWarnaLed("bg-red-500 animate-pulse"); // LED Merah berkedip
    setTeksLcd("BAHAYA GEMPA!!");
  };

  const resetKondisi = () => {
    setStatusGempa("AMAN");
    setAmplitudoGoyangan(0.0);
    setWarnaLed("bg-green-500");
    setTeksLcd("KONDISI AMAN");
  };

  // --- ANTARMUKA (UI) ---
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 font-sans">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-blue-400">QuakeGuard Dashboard</h1>
        <p className="text-gray-400 mt-2">Sistem Deteksi Getaran & Pergeseran Posisi</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        
        {/* Kartu 1: Status Utama */}
        <div className={`p-6 rounded-2xl shadow-lg flex flex-col items-center justify-center transition-all duration-500 
          ${statusGempa === "BAHAYA" ? "bg-red-600 shadow-red-500/50" : 
            statusGempa === "WASPADA" ? "bg-yellow-500 shadow-yellow-500/50 text-gray-900" : 
            "bg-gray-800 border border-gray-700"}`}>
          <h2 className="text-xl font-semibold mb-2">STATUS LINGKUNGAN</h2>
          <div className="text-5xl font-black tracking-widest mt-4">
            {statusGempa}
          </div>
        </div>

        {/* Kartu 2: Pembacaan Sensor HC-SR04 (Konsep Baru) */}
        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700 flex flex-col justify-center transition-all">
          <h2 className="text-gray-400 font-semibold mb-1">Sensor HC-SR04</h2>
          <p className="text-lg font-bold mb-4">Amplitudo Pergeseran Alat</p>
          <div className="flex items-end gap-2">
            <span className={`text-6xl font-black ${statusGempa === "AMAN" ? "text-blue-400" : statusGempa === "WASPADA" ? "text-yellow-400" : "text-red-400"}`}>
              {amplitudoGoyangan}
            </span>
            <span className="text-2xl text-gray-400 mb-1">cm</span>
          </div>
          {statusGempa === "BAHAYA" && (
            <p className="text-red-400 text-sm mt-2 font-bold animate-pulse">
              ⚠️ Peringatan: Goncangan meja sangat kuat!
            </p>
          )}
          {statusGempa === "WASPADA" && (
            <p className="text-yellow-400 text-sm mt-2 font-bold">
              ⚠️ Terdeteksi getaran ringan.
            </p>
          )}
        </div>

        {/* Kartu 3: Status Aktuator (LED & LCD) */}
        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700 md:col-span-2 flex justify-around items-center">
          <div className="text-center">
            <h2 className="text-gray-400 font-semibold mb-3">Status LED SMD RGB</h2>
            <div className={`w-16 h-16 rounded-full mx-auto shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-colors duration-300 ${warnaLed}`}></div>
          </div>
          <div className="text-center w-1/2">
            <h2 className="text-gray-400 font-semibold mb-3">Tampilan LCD 16x2</h2>
            <div className={`font-mono text-xl p-4 rounded-lg border-4 inline-block w-full shadow-inner transition-colors duration-300
              ${statusGempa === "BAHAYA" ? "bg-red-300 text-red-900 border-red-600" :
                statusGempa === "WASPADA" ? "bg-yellow-200 text-yellow-900 border-yellow-500" :
                "bg-green-300 text-green-900 border-green-600"
              }`}>
              {teksLcd}
            </div>
          </div>
        </div>
      </div>

      {/* --- PANEL SIMULASI --- */}
      <div className="max-w-4xl mx-auto mt-12 p-6 border-2 border-dashed border-gray-600 rounded-xl bg-gray-800/50 flex flex-col items-center">
        <h3 className="text-yellow-400 font-bold mb-4">🛠️ Panel Simulasi Goncangan Meja</h3>
        <div className="flex flex-wrap justify-center gap-4">
          <button 
            onClick={resetKondisi}
            className="bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-6 rounded-lg transition-colors border-2 border-green-700"
          >
            🟢 Diam (Aman)
          </button>
          <button 
            onClick={picuWaspada}
            className="bg-yellow-600 hover:bg-yellow-500 text-white font-bold py-3 px-6 rounded-lg transition-colors border-2 border-yellow-700"
          >
            🟡 Goyang Sedikit (Waspada)
          </button>
          <button 
            onClick={picuBahaya}
            className="bg-red-600 hover:bg-red-500 text-white font-bold py-3 px-6 rounded-lg transition-colors border-2 border-red-700"
          >
            🔴 Goyang Hebat! (Bahaya)
          </button>
        </div>
      </div>
    </div>
  );
}