// src/app/admin/tools/page.js

"use client";

import { useState } from 'react';
// Yeni ikonları ekliyoruz: FaWaveSquare
import { FaRoad, FaCubes, FaRulerCombined, FaWater, FaCalculator, FaTasks, FaDollarSign, FaWaveSquare } from 'react-icons/fa';

// --- BİLEŞENLER ---

// 1. Yağmur Suyu Hesaplayıcı
function RainwaterCalculator() { /* ... bir önceki adımdaki kodun aynısı ... */ }

// 2. Beton Hesaplayıcı
function ConcreteCalculator() { /* ... bir önceki adımdaki kodun aynısı ... */ }

// 3. Asfalt Hesaplayıcı
function AsphaltCalculator() { /* ... bir önceki adımdaki kodun aynısı ... */ }

// 4. Kazı ve Dolgu Hacmi Hesaplayıcısı
function ExcavationCalculator() { /* ... bir önceki adımdaki kodun aynısı ... */ }

// 5. Basit Metraj Hesaplayıcısı
function BoQCalculator() { /* ... bir önceki adımdaki kodun aynısı ... */ }

// 6. Basit İş Programı Oluşturucu
function ScheduleGenerator() { /* ... bir önceki adımdaki kodun aynısı ... */ }

// 7. YENİ: Boru Sürtünme Kaybı Hesaplayıcısı
function FrictionLossCalculator() {
    const [inputs, setInputs] = useState({
        diameter: '', // mm
        roughness: '0.0015', // mm (PVC için varsayılan)
        flowRate: '', // m³/h
        length: '', // m
        density: '998.2', // kg/m³ (Su 20°C)
        viscosity: '0.001002', // Pa.s (Su 20°C)
    });
    const [result, setResult] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputs(prev => ({ ...prev, [name]: value }));
    };
    
    // Colebrook-White denklemini iteratif olarak çözen fonksiyon
    const solveColebrook = (Re, relRoughness) => {
        if (Re < 2300) { // Laminer akış
            return 64 / Re;
        }
        // Türbülanslı akış için iteratif çözüm
        let f = 0.02; // İlk tahmin
        for (let i = 0; i < 10; i++) { // 10 iterasyon genellikle yeterlidir
            f = 1 / Math.pow(-2 * Math.log10((relRoughness / 3.7) + (2.51 / (Re * Math.sqrt(f)))), 2);
        }
        return f;
    };

    const calculate = () => {
        const D = parseFloat(inputs.diameter) / 1000; // m
        const epsilon = parseFloat(inputs.roughness) / 1000; // m
        const Q = parseFloat(inputs.flowRate) / 3600; // m³/s
        const L = parseFloat(inputs.length); // m
        const rho = parseFloat(inputs.density); // kg/m³
        const mu = parseFloat(inputs.viscosity); // Pa.s

        if ([D, epsilon, Q, L, rho, mu].some(isNaN) || D <= 0 || Q <= 0 || L <= 0) {
            alert("Lütfen tüm alanları geçerli ve pozitif sayılarla doldurun.");
            return;
        }

        const A = Math.PI * Math.pow(D / 2, 2); // Alan (m²)
        const V = Q / A; // Akış Hızı (m/s)
        const Re = (rho * V * D) / mu; // Reynolds Sayısı
        const relRoughness = epsilon / D; // Bağıl Pürüzlülük
        
        const f = solveColebrook(Re, relRoughness); // Sürtünme Faktörü
        
        const g = 9.81; // Yerçekimi ivmesi
        const hf = f * (L / D) * (Math.pow(V, 2) / (2 * g)); // Sürtünme Kaybı (m)
        const dP_pascal = hf * rho * g; // Basınç Kaybı (Pascal)
        const dP_bar = dP_pascal / 100000; // Basınç Kaybı (bar)

        setResult({
            velocity: V.toFixed(3),
            reynolds: Re.toExponential(2),
            frictionFactor: f.toFixed(4),
            headLoss: hf.toFixed(3),
            pressureLoss: dP_bar.toFixed(4),
        });
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Boru Sürtünme Kaybı Hesabı (Darcy-Weisbach)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700">Boru İç Çapı (D) [mm]</label><input type="number" name="diameter" value={inputs.diameter} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" /></div>
                <div><label className="block text-sm font-medium text-gray-700">Boru Pürüzlülüğü (ε) [mm]</label><input type="number" name="roughness" value={inputs.roughness} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" /></div>
                <div><label className="block text-sm font-medium text-gray-700">Debi (Q) [m³/saat]</label><input type="number" name="flowRate" value={inputs.flowRate} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" /></div>
                <div><label className="block text-sm font-medium text-gray-700">Boru Boyu (L) [m]</label><input type="number" name="length" value={inputs.length} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" /></div>
                <div><label className="block text-sm font-medium text-gray-700">Akışkan Yoğunluğu (ρ) [kg/m³]</label><input type="number" name="density" value={inputs.density} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" /></div>
                <div><label className="block text-sm font-medium text-gray-700">Akışkan Viskozitesi (μ) [Pa.s]</label><input type="number" name="viscosity" value={inputs.viscosity} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" /></div>
            </div>
            <button onClick={calculate} className="mt-4 w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700">Hesapla</button>
            {result && (
                <div className="mt-6 p-4 border-t">
                    <h3 className="text-lg font-semibold">Hesaplama Sonuçları:</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 text-sm">
                        <p><strong>Akış Hızı (V):</strong> {result.velocity} m/s</p>
                        <p><strong>Reynolds Sayısı (Re):</strong> {result.reynolds}</p>
                        <p><strong>Sürtünme Faktörü (f):</strong> {result.frictionFactor}</p>
                        <p className="font-bold text-blue-600"><strong>Sürtünme Kaybı (hf):</strong> {result.headLoss} mSS</p>
                        <p className="font-bold text-red-600 sm:col-span-2"><strong>Basınç Kaybı (ΔP):</strong> {result.pressureLoss} bar</p>
                    </div>
                </div>
            )}
        </div>
    );
}

// --- ANA SAYFA ---
export default function ToolsPage() {
  const [selectedTool, setSelectedTool] = useState(null);

  // Tüm araçları bir liste olarak tanımlıyoruz
  const toolsList = [
    { id: 'rainwater', title: 'Yağmur Suyu Boru Çapı', description: 'Drenaj alanı ve eğime göre boru çapını hesaplar.', icon: <FaWater className="text-2xl text-blue-500" />, component: <RainwaterCalculator /> },
    { id: 'frictionloss', title: 'Boru Sürtünme Kaybı', description: 'Darcy-Weisbach formülü ile basınç kaybını hesaplar.', icon: <FaWaveSquare className="text-2xl text-teal-500" />, component: <FrictionLossCalculator /> },
    { id: 'concrete', title: 'Beton Hacim ve Malzeme', description: 'Verilen ölçülere göre beton hacmini ve malzeme miktarını bulur.', icon: <FaCubes className="text-2xl text-orange-500" />, component: <ConcreteCalculator /> },
    { id: 'asphalt', title: 'Asfalt Miktarı', description: 'Alan ve kalınlığa göre gereken asfalt miktarını (ton) hesaplar.', icon: <FaRoad className="text-2xl text-gray-700" />, component: <AsphaltCalculator /> },
    { id: 'excavation', title: 'Kazı ve Dolgu Hacmi', description: 'Basit geometriler için hafriyat hacmini hesaplar.', icon: <FaRulerCombined className="text-2xl text-yellow-600" />, component: <ExcavationCalculator /> },
    { id: 'boq', title: 'Basit Metraj', description: 'İş kalemleri ve birim fiyatlarla proje maliyet özeti oluşturur.', icon: <FaDollarSign className="text-2xl text-green-600" />, component: <BoQCalculator /> },
    { id: 'schedule', title: 'Basit İş Programı', description: 'İş kalemleri ve sürelerle basit bir Gantt şeması oluşturur.', icon: <FaTasks className="text-2xl text-purple-600" />, component: <ScheduleGenerator /> },
  ];

  const openModal = (tool) => setSelectedTool(tool);
  const closeModal = () => setSelectedTool(null);

  const Modal = ({ children }) => (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4" onClick={closeModal}>
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-3xl relative animate-fade-in-up" onClick={(e) => e.stopPropagation()}>
        <button onClick={closeModal} className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 text-3xl font-bold">&times;</button>
        {children}
      </div>
    </div>
  );
  
  const currentToolComponent = toolsList.find(t => t.id === selectedTool)?.component;

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold text-slate-800 mb-2">Mühendislik Araçları</h1>
        <p className="mb-10 text-slate-500">İhtiyacınız olan hesaplama aracını seçerek işlerinizi hızlandırın.</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {toolsList.map((tool) => (
            <button key={tool.id} onClick={() => openModal(tool.id)} className="group bg-white p-6 rounded-lg border border-slate-200 hover:border-blue-500 hover:shadow-lg transition-all duration-300 text-left">
              <div className="flex items-center justify-center w-12 h-12 bg-slate-100 rounded-lg mb-4 group-hover:bg-blue-100 transition-colors">{tool.icon}</div>
              <h3 className="font-semibold text-lg text-slate-800 group-hover:text-blue-700 transition-colors">{tool.title}</h3>
              <p className="text-sm text-slate-500 mt-1">{tool.description}</p>
            </button>
          ))}
        </div>

        {selectedTool && <Modal>{currentToolComponent}</Modal>}
      </div>
    </div>
  );
}