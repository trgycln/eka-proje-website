// src/app/admin/tools/page.js

"use client";

import { useState, useEffect } from 'react';
import { FaRoad, FaCubes, FaRulerCombined, FaWater, FaCalculator, FaTasks, FaDollarSign, FaWaveSquare } from 'react-icons/fa';

// --- MEVCUT BİLEŞENLER (DEĞİŞİKLİK YOK) ---
function RainwaterCalculator() { /* ... bir önceki kodun aynısı ... */ }
function ConcreteCalculator() { /* ... bir önceki kodun aynısı ... */ }
function AsphaltCalculator() { /* ... bir önceki kodun aynısı ... */ }
function ExcavationCalculator() { /* ... bir önceki kodun aynısı ... */ }
function BoQCalculator() { /* ... bir önceki kodun aynısı ... */ }
function ScheduleGenerator() { /* ... bir önceki kodun aynısı ... */ }

// --- YENİLENEN BİLEŞEN: Boru Sürtünme Kaybı Hesaplayıcısı (Daha Kompakt ve Kullanışlı Versiyon) ---
function FrictionLossCalculator() {
    const pipeMaterials = {
        'PVC': 0.0015, 'Polietilen (PE)': 0.0015, 'Çelik (Yeni)': 0.045, 'Dökme Demir (Yeni)': 0.26,
        'Beton (Pürüzsüz)': 0.3, 'Beton (Normal)': 1.2
    };
    const fluids = {
        'Su (20°C)': { density: 998.2, viscosity: 0.001002 },
        'Su (10°C)': { density: 999.7, viscosity: 0.001307 },
        'Motor Yağı (40°C)': { density: 875, viscosity: 0.21 }
    };

    const [inputs, setInputs] = useState({
        diameter: '', flowRate: '', length: '',
        pipeType: 'PVC', roughness: '0.0015',
        fluidType: 'Su (20°C)', density: '998.2', viscosity: '0.001002'
    });
    const [result, setResult] = useState(null);

    useEffect(() => { setInputs(prev => ({ ...prev, roughness: pipeMaterials[prev.pipeType].toString() })); }, [inputs.pipeType]);
    useEffect(() => {
        const fluidData = fluids[inputs.fluidType];
        setInputs(prev => ({ ...prev, density: fluidData.density.toString(), viscosity: fluidData.viscosity.toString() }));
    }, [inputs.fluidType]);
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputs(prev => ({ ...prev, [name]: value }));
    };
    
    const solveColebrook = (Re, relRoughness) => {
        if (Re < 2300) return 64 / Re;
        let f = 0.02;
        for (let i = 0; i < 10; i++) { f = 1 / Math.pow(-2 * Math.log10((relRoughness / 3.7) + (2.51 / (Re * Math.sqrt(f)))), 2); }
        return f;
    };

    const calculate = () => {
        const D = parseFloat(inputs.diameter) / 1000; const epsilon = parseFloat(inputs.roughness) / 1000;
        const Q = parseFloat(inputs.flowRate) / 3600; const L = parseFloat(inputs.length);
        const rho = parseFloat(inputs.density); const mu = parseFloat(inputs.viscosity);
        if ([D, epsilon, Q, L, rho, mu].some(isNaN) || D <= 0 || Q <= 0 || L <= 0) {
            alert("Lütfen tüm sayısal alanları geçerli ve pozitif değerlerle doldurun."); return;
        }
        const A = Math.PI * Math.pow(D / 2, 2); const V = Q / A; const Re = (rho * V * D) / mu;
        const relRoughness = epsilon / D; const f = solveColebrook(Re, relRoughness); const g = 9.81;
        const hf = f * (L / D) * (Math.pow(V, 2) / (2 * g)); const dP_pascal = hf * rho * g;
        const dP_bar = dP_pascal / 100000;
        setResult({
            velocity: V.toFixed(3), reynolds: Re.toExponential(2), frictionFactor: f.toFixed(4),
            headLoss: hf.toFixed(3), pressureLoss: dP_bar.toFixed(4),
        });
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4 text-center text-slate-700">Boru Sürtünme Kaybı Hesabı</h2>
            <p className="text-center text-sm text-slate-500 mb-6">Darcy-Weisbach denklemini kullanarak borulardaki basınç kaybını hesaplayın.</p>
            
            {/* GİRDİLER BÖLÜMÜ */}
            <fieldset className="border p-4 rounded-lg space-y-4">
                <legend className="text-lg font-semibold px-2 text-slate-600">Girdi Değerleri</legend>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Boru Bilgileri */}
                    <div><label className="block text-sm font-medium text-gray-700">Boru İç Çapı (D) [mm]</label><input type="number" name="diameter" value={inputs.diameter} onChange={handleInputChange} className="mt-1 block w-full border-gray-300 rounded-md p-2" /></div>
                    <div><label className="block text-sm font-medium text-gray-700">Boru Cinsi</label><select name="pipeType" value={inputs.pipeType} onChange={handleInputChange} className="mt-1 block w-full border-gray-300 rounded-md p-2 bg-white">{Object.keys(pipeMaterials).map(p => <option key={p} value={p}>{p}</option>)}</select></div>
                    <div><label className="block text-sm font-medium text-gray-500">Pürüzlülük (ε) [mm]</label><input type="number" name="roughness" value={inputs.roughness} onChange={handleInputChange} className="mt-1 block w-full border-gray-300 rounded-md p-2 bg-gray-100" readOnly /></div>
                    
                    {/* Akışkan Bilgileri */}
                    <div><label className="block text-sm font-medium text-gray-700">Debi (Q) [m³/saat]</label><input type="number" name="flowRate" value={inputs.flowRate} onChange={handleInputChange} className="mt-1 block w-full border-gray-300 rounded-md p-2" /></div>
                    <div><label className="block text-sm font-medium text-gray-700">Boru Boyu (L) [m]</label><input type="number" name="length" value={inputs.length} onChange={handleInputChange} className="mt-1 block w-full border-gray-300 rounded-md p-2" /></div>
                    <div><label className="block text-sm font-medium text-gray-700">Akışkan Cinsi</label><select name="fluidType" value={inputs.fluidType} onChange={handleInputChange} className="mt-1 block w-full border-gray-300 rounded-md p-2 bg-white">{Object.keys(fluids).map(f => <option key={f} value={f}>{f}</option>)}</select></div>
                    <div><label className="block text-sm font-medium text-gray-500">Yoğunluk (ρ) [kg/m³]</label><input type="number" name="density" value={inputs.density} onChange={handleInputChange} className="mt-1 block w-full border-gray-300 rounded-md p-2 bg-gray-100" readOnly /></div>
                    <div><label className="block text-sm font-medium text-gray-500">Viskozite (μ) [Pa.s]</label><input type="number" name="viscosity" value={inputs.viscosity} onChange={handleInputChange} className="mt-1 block w-full border-gray-300 rounded-md p-2 bg-gray-100" readOnly /></div>
                </div>
            </fieldset>
            
            <button onClick={calculate} className="mt-4 w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 font-bold">HESAPLA</button>
            
            {/* SONUÇLAR BÖLÜMÜ */}
            {result && (
                <div className="mt-6">
                    <h3 className="text-xl font-semibold text-center mb-4 text-slate-700">Hesaplama Sonuçları</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                        <div className="bg-white p-3 rounded-lg border">
                            <p className="text-sm text-slate-500">Akış Hızı (V)</p>
                            <p className="text-2xl font-bold text-slate-800">{result.velocity} <span className="text-base font-normal">m/s</span></p>
                        </div>
                        <div className="bg-white p-3 rounded-lg border">
                            <p className="text-sm text-slate-500">Sürtünme Kaybı (hf)</p>
                            <p className="text-2xl font-bold text-blue-600">{result.headLoss} <span className="text-base font-normal">mSS</span></p>
                        </div>
                         <div className="bg-white p-3 rounded-lg border">
                            <p className="text-sm text-slate-500">Basınç Kaybı (ΔP)</p>
                            <p className="text-2xl font-bold text-red-600">{result.pressureLoss} <span className="text-base font-normal">bar</span></p>
                        </div>
                    </div>
                    <div className="text-center mt-4 text-xs text-gray-500">
                        <span>Reynolds Sayısı: {result.reynolds}</span> | <span>Sürtünme Faktörü: {result.frictionFactor}</span>
                    </div>
                </div>
            )}
        </div>
    );
}

// --- ANA SAYFA (MODAL GÜNCELLENDİ) ---
export default function ToolsPage() {
  const [selectedTool, setSelectedTool] = useState(null);
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
      <div className="bg-slate-100 rounded-lg shadow-2xl w-full max-w-4xl relative animate-fade-in-up flex flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="flex-shrink-0 p-4 border-b bg-white rounded-t-lg">
          <button onClick={closeModal} className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 text-3xl font-bold">&times;</button>
        </div>
        {/* KAYDIRILABİLİR ALAN */}
        <div className="flex-grow p-6 overflow-y-auto">
            {children}
        </div>
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