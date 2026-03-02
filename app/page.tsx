"use client";
import { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../lib/firebase"; 

export default function DashboardGempa() {
  const [statusGempa, setStatusGempa] = useState("AMAN");
  const [jarakStruktur, setJarakStruktur] = useState(0.0);
  const [warnaLed, setWarnaLed] = useState("bg-green-500");
  const [teksLcd, setTeksLcd] = useState("KONDISI AMAN");

  // --- KONEKSI FIREBASE REAL-TIME KE DATA RIPKI ---
  // Tombol simulasi sudah DIHAPUS TOTAL dari kode ini!
  useEffect(() => {
    const sensorRef = ref(db, '/devices/esp32s3_01'); 

    const unsubscribe = onValue(sensorRef, (snapshot) => {
      const data = snapshot.val();
      
      if (data) {
        if (data.distance_cm !== undefined) {
          setJarakStruktur(Number(data.distance_cm).toFixed(1)); 
        }

        if (data.shock !== undefined) {
          if (data.shock === 1) {
            setStatusGempa("BAHAYA");
            setTeksLcd("BAHAYA GEMPA!!");
            setWarnaLed("bg-red-500 animate-pulse");
          } else {
            setStatusGempa("AMAN");
            setTeksLcd("KONDISI AMAN");
            setWarnaLed("bg-green-500");
          }
        }
      }
    });

    return () => unsubscribe();
  }, []);

  // --- ANTARMUKA (UI) ---
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 font-sans">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-blue-400">QuakeGuard Dashboard</h1>
        <p className="text-gray-400 mt-2">Sistem Deteksi Gempa & Integritas Struktur Bangunan</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <div className={`p-6 rounded-2xl shadow-lg flex flex-col items-center justify-center transition-all duration-500 ${statusGempa === "BAHAYA" ? "bg-red-600 shadow-red-500/50" : "bg-gray-800 border border-gray-700"}`}>
          <h2 className="text-xl font-semibold mb-2">STATUS LINGKUNGAN</h2>
          <div className="text-5xl font-black tracking-widest mt-4">
            {statusGempa}
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700 flex flex-col justify-center transition-all">
          <h2 className="text-gray-400 font-semibold mb-1">Sensor HC-SR04</h2>
          <p className="text-lg font-bold mb-4">Jarak ke Objek / Dinding</p>
          <div className="flex items-end gap-2">
            <span className={`text-6xl font-black ${statusGempa === "AMAN" ? "text-blue-400" : "text-red-400"}`}>
              {jarakStruktur}
            </span>
            <span className="text-2xl text-gray-400 mb-1">cm</span>
          </div>
           {statusGempa === "BAHAYA" && (
            <p className="text-red-400 text-sm mt-2 font-bold animate-pulse">
              ⚠️ Perhatikan perubahan jarak! Jika angka berubah drastis, struktur bangunan mungkin bergeser.
            </p>
          )}
        </div>

        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700 md:col-span-2 flex justify-around items-center">
          <div className="text-center">
            <h2 className="text-gray-400 font-semibold mb-3">Status LED SMD RGB</h2>
            <div className={`w-16 h-16 rounded-full mx-auto shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-colors duration-300 ${warnaLed}`}></div>
          </div>
          <div className="text-center w-1/2">
            <h2 className="text-gray-400 font-semibold mb-3">Tampilan LCD 16x2</h2>
            <div className={`font-mono text-xl p-4 rounded-lg border-4 inline-block w-full shadow-inner transition-colors duration-300 ${statusGempa === "BAHAYA" ? "bg-red-300 text-red-900 border-red-600" : "bg-green-300 text-green-900 border-green-600"}`}>
              {teksLcd}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}