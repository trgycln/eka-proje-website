// src/app/admin/tools/page.js

"use client";

import { useState } from 'react';
// İkonları react-icons kütüphanesinden import ediyoruz
import { FaRoad, FaCubes, FaRulerCombined, FaWater, FaCalculator, FaChartBar, FaHardHat, FaDollarSign, FaTasks } from 'react-icons/fa';

// --- BİLEŞENLER ---

// 1. Yağmur Suyu Hesaplayıcı
function RainwaterCalculator() {
  const [area, setArea] = useState(''); const [intensity, setIntensity] = useState(''); const [slope, setSlope] = useState(''); const [result, setResult] = useState(null);
  const calculate = () => {
    const numArea = parseFloat(area); const numIntensity = parseFloat(intensity); const numSlope = parseFloat(slope) / 100;
    if (isNaN(numArea) || isNaN(numIntensity) || isNaN(numSlope) || numArea <= 0 || numIntensity <= 0 || numSlope <= 0) { alert("Lütfen tüm alanları geçerli ve pozitif sayılarla doldurun."); return; }
    const areaInHectares = numArea / 10000; const flowRateLPS = numIntensity * areaInHectares; const flowRateM3PS = flowRateLPS / 1000; const n = 0.01;
    const diameterMeters = Math.pow((flowRateM3PS * n) / (0.311 * Math.sqrt(numSlope)), 3 / 8); const diameterMM = diameterMeters * 1000;
    const standardPipes = [100, 150, 200, 250, 300, 400, 500, 600, 800, 1000]; const suggestedPipe = standardPipes.find(pipe => pipe >= diameterMM) || "1000mm'den büyük";
    setResult({ flowRate: flowRateLPS.toFixed(2), requiredDiameter: diameterMM.toFixed(2), suggestedPipe: suggestedPipe });
  };
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Yağmur Suyu Boru Çapı Hesaplayıcısı</h2>
      <div className="space-y-4">
        <div><label className="block text-sm font-medium text-gray-700">Drenaj Alanı (m²)</label><input type="number" value={area} onChange={e => setArea(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" placeholder="Örn: 1500" /></div>
        <div><label className="block text-sm font-medium text-gray-700">Yağış Şiddeti (lt/s*ha)</label><input type="number" value={intensity} onChange={e => setIntensity(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" placeholder="Örn: 250" /></div>
        <div><label className="block text-sm font-medium text-gray-700">Boru Eğimi (%)</label><input type="number" value={slope} onChange={e => setSlope(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" placeholder="Örn: 1.5" /></div>
        <button onClick={calculate} className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700">Hesapla</button>
      </div>
      {result && (<div className="mt-6 p-4 border-t"><h3 className="text-lg font-semibold">Sonuçlar:</h3><p><strong>Hesaplanan Debi:</strong> {result.flowRate} lt/s</p><p><strong>Gereken Minimum İç Çap:</strong> {result.requiredDiameter} mm</p><p className="font-bold text-blue-600"><strong>Önerilen Standart Boru Çapı:</strong> Ø{result.suggestedPipe} mm</p></div>)}
    </div>
  );
}

// 2. Beton Hesaplayıcı
function ConcreteCalculator() {
  const [length, setLength] = useState(''); const [width, setWidth] = useState(''); const [height, setHeight] = useState(''); const [result, setResult] = useState(null);
  const CEMENT_KG_PER_M3 = 350; const SAND_KG_PER_M3 = 700; const GRAVEL_KG_PER_M3 = 1200;
  const calculate = () => {
    const numL = parseFloat(length); const numW = parseFloat(width); const numH = parseFloat(height);
    if (isNaN(numL) || isNaN(numW) || isNaN(numH) || numL <= 0 || numW <= 0 || numH <= 0) { alert("Lütfen tüm ölçüleri geçerli ve pozitif sayılarla doldurun."); return; }
    const volume = numL * numW * numH;
    setResult({ volume: volume.toFixed(3), cement: (volume * CEMENT_KG_PER_M3).toFixed(2), sand: (volume * SAND_KG_PER_M3).toFixed(2), gravel: (volume * GRAVEL_KG_PER_M3).toFixed(2), cementBags: Math.ceil((volume * CEMENT_KG_PER_M3) / 50) });
  };
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Beton Hacim ve Malzeme Miktarı</h2>
      <div className="space-y-4">
        <div><label className="block text-sm font-medium text-gray-700">Uzunluk (m)</label><input type="number" value={length} onChange={e => setLength(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" /></div>
        <div><label className="block text-sm font-medium text-gray-700">Genişlik (m)</label><input type="number" value={width} onChange={e => setWidth(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" /></div>
        <div><label className="block text-sm font-medium text-gray-700">Yükseklik / Kalınlık (m)</label><input type="number" value={height} onChange={e => setHeight(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" /></div>
        <button onClick={calculate} className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700">Hesapla</button>
      </div>
      {result && (<div className="mt-6 p-4 border-t"><h3 className="text-lg font-semibold">Sonuçlar:</h3><p className="font-bold text-blue-600"><strong>Toplam Beton Hacmi: {result.volume} m³</strong></p><p className="mt-2 text-sm text-gray-600">Yaklaşık Malzeme Miktarları (C25 Sınıfı için):</p><ul className="list-disc list-inside text-sm text-gray-800"><li><strong>Çimento:</strong> {result.cement} kg (~{result.cementBags} çuval)</li><li><strong>Kum:</strong> {result.sand} kg</li><li><strong>Çakıl (Agrega):</strong> {result.gravel} kg</li></ul></div>)}
    </div>
  );
}

// 3. Asfalt Hesaplayıcı
function AsphaltCalculator() {
  const [area, setArea] = useState(''); const [thickness, setThickness] = useState(''); const [density, setDensity] = useState('2.4'); const [result, setResult] = useState(null);
  const calculate = () => {
    const numArea = parseFloat(area); const numThickness = parseFloat(thickness) / 100; const numDensity = parseFloat(density);
    if (isNaN(numArea) || isNaN(numThickness) || numArea <= 0 || numThickness <= 0) { alert("Lütfen alan ve kalınlık değerlerini girin."); return; }
    const volume = numArea * numThickness; const weight = volume * numDensity;
    setResult({ volume: volume.toFixed(3), weight: weight.toFixed(2) });
  };
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Asfalt Miktarı Hesaplayıcısı</h2>
      <div className="space-y-4">
        <div><label className="block text-sm font-medium text-gray-700">Kaplama Alanı (m²)</label><input type="number" value={area} onChange={e => setArea(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" /></div>
        <div><label className="block text-sm font-medium text-gray-700">Asfalt Kalınlığı (cm)</label><input type="number" value={thickness} onChange={e => setThickness(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" /></div>
        <div><label className="block text-sm font-medium text-gray-700">Asfalt Yoğunluğu (ton/m³)</label><input type="number" value={density} onChange={e => setDensity(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" /></div>
        <button onClick={calculate} className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700">Hesapla</button>
      </div>
      {result && (<div className="mt-6 p-4 border-t"><h3 className="text-lg font-semibold">Sonuçlar:</h3><p><strong>Gereken Hacim:</strong> {result.volume} m³</p><p className="font-bold text-blue-600"><strong>Gereken Asfalt Miktarı:</strong> {result.weight} ton</p></div>)}
    </div>
  );
}

// 4. Kazı ve Dolgu Hacmi Hesaplayıcısı
function ExcavationCalculator() {
  const [length, setLength] = useState(''); const [width, setWidth] = useState(''); const [depth, setDepth] = useState(''); const [result, setResult] = useState(null);
  const calculate = () => {
    const numL = parseFloat(length); const numW = parseFloat(width); const numD = parseFloat(depth);
    if (isNaN(numL) || isNaN(numW) || isNaN(numD) || numL <= 0 || numW <= 0 || numD <= 0) { alert("Lütfen tüm ölçüleri girin."); return; }
    const volume = numL * numW * numD;
    setResult({ volume: volume.toFixed(3) });
  };
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Kazı / Dolgu Hacmi Hesaplayıcısı</h2>
      <div className="space-y-4">
        <div><label className="block text-sm font-medium text-gray-700">Uzunluk (m)</label><input type="number" value={length} onChange={e => setLength(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" /></div>
        <div><label className="block text-sm font-medium text-gray-700">Genişlik (m)</label><input type="number" value={width} onChange={e => setWidth(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" /></div>
        <div><label className="block text-sm font-medium text-gray-700">Derinlik / Yükseklik (m)</label><input type="number" value={depth} onChange={e => setDepth(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" /></div>
        <button onClick={calculate} className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700">Hesapla</button>
      </div>
      {result && (<div className="mt-6 p-4 border-t"><h3 className="text-lg font-semibold">Sonuç:</h3><p className="font-bold text-blue-600"><strong>Toplam Hacim: {result.volume} m³</strong></p></div>)}
    </div>
  );
}

// 5. Basit Metraj Hesaplayıcısı
function BoQCalculator() {
  const [items, setItems] = useState([{ description: '', quantity: '', unit: '', unitPrice: '' }]);
  const [total, setTotal] = useState(0);
  const handleItemChange = (index, event) => {
    const values = [...items];
    values[index][event.target.name] = event.target.value;
    setItems(values);
  };
  const handleAddItem = () => setItems([...items, { description: '', quantity: '', unit: '', unitPrice: '' }]);
  const handleRemoveItem = index => {
    const values = [...items]; values.splice(index, 1); setItems(values);
  };
  const calculateTotal = () => {
    let grandTotal = 0;
    items.forEach(item => {
      const quantity = parseFloat(item.quantity); const unitPrice = parseFloat(item.unitPrice);
      if (!isNaN(quantity) && !isNaN(unitPrice)) { grandTotal += quantity * unitPrice; }
    });
    setTotal(grandTotal);
  };
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Basit Metraj / Maliyet Hesaplayıcısı</h2>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex items-center space-x-2 p-2 border rounded">
            <input type="text" name="description" placeholder="Açıklama" value={item.description} onChange={e => handleItemChange(index, e)} className="w-2/5 border-gray-300 rounded p-1" />
            <input type="number" name="quantity" placeholder="Miktar" value={item.quantity} onChange={e => handleItemChange(index, e)} className="w-1/5 border-gray-300 rounded p-1" />
            <input type="text" name="unit" placeholder="Birim" value={item.unit} onChange={e => handleItemChange(index, e)} className="w-1/5 border-gray-300 rounded p-1" />
            <input type="number" name="unitPrice" placeholder="Birim Fiyat" value={item.unitPrice} onChange={e => handleItemChange(index, e)} className="w-1/5 border-gray-300 rounded p-1" />
            <button onClick={() => handleRemoveItem(index)} className="text-red-500 font-bold">X</button>
          </div>
        ))}
      </div>
      <button onClick={handleAddItem} className="mt-2 text-sm text-blue-600">+ Yeni Satır Ekle</button>
      <button onClick={calculateTotal} className="mt-4 w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700">Toplam Maliyeti Hesapla</button>
      {total > 0 && (<div className="mt-6 p-4 border-t"><h3 className="text-lg font-semibold">Sonuç:</h3><p className="font-bold text-blue-600"><strong>Proje Toplam Maliyeti: {total.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}</strong></p></div>)}
    </div>
  );
}

// 6. Basit İş Programı Oluşturucu
function ScheduleGenerator() {
  const [tasks, setTasks] = useState([{ name: 'Proje Başlangıcı', duration: 1 }]);
  const [schedule, setSchedule] = useState([]);
  const handleTaskChange = (index, event) => {
    const values = [...tasks]; values[index][event.target.name] = event.target.value; setTasks(values);
  };
  const handleAddTask = () => setTasks([...tasks, { name: '', duration: 1 }]);
  const handleRemoveTask = index => {
    const values = [...tasks]; values.splice(index, 1); setTasks(values);
  };
  const generateSchedule = () => {
    let currentDay = 0; const generated = [];
    tasks.forEach(task => {
      const duration = parseInt(task.duration, 10);
      if (task.name && !isNaN(duration) && duration > 0) {
        generated.push({ name: task.name, start: currentDay, end: currentDay + duration });
        currentDay += duration;
      }
    });
    setSchedule(generated);
  };
  const totalDuration = schedule.reduce((acc, task) => Math.max(acc, task.end), 0);
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Basit İş Programı (Gantt)</h2>
      <div className="space-y-2">
        {tasks.map((task, index) => (
          <div key={index} className="flex items-center space-x-2 p-2 border rounded">
            <input type="text" name="name" placeholder="İş Kalemi Adı" value={task.name} onChange={e => handleTaskChange(index, e)} className="w-3/4 border-gray-300 rounded p-1" />
            <input type="number" name="duration" placeholder="Süre (Gün)" value={task.duration} onChange={e => handleTaskChange(index, e)} className="w-1/4 border-gray-300 rounded p-1" />
            <button onClick={() => handleRemoveTask(index)} className="text-red-500 font-bold">X</button>
          </div>
        ))}
      </div>
      <button onClick={handleAddTask} className="mt-2 text-sm text-blue-600">+ Yeni İş Kalemi Ekle</button>
      <button onClick={generateSchedule} className="mt-4 w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700">İş Programını Oluştur</button>
      {schedule.length > 0 && (
        <div className="mt-6 p-4 border-t overflow-x-auto">
          <h3 className="text-lg font-semibold mb-2">Proje Zaman Çizelgesi (Toplam: {totalDuration} gün)</h3>
          <div className="space-y-2 relative">
            {schedule.map((task, index) => (
              <div key={index} className="flex items-center text-sm">
                <div className="w-1/3 pr-2 truncate font-medium">{task.name}</div>
                <div className="w-2/3 bg-gray-200 rounded h-6">
                  <div className="bg-blue-500 h-6 rounded text-white text-xs flex items-center justify-center" style={{ marginLeft: `${(task.start / totalDuration) * 100}%`, width: `${((task.end - task.start) / totalDuration) * 100}%` }}>
                    {task.end - task.start} gün
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}


// --- ANA SAYFA ---
export default function ToolsPage() {
  const [selectedTool, setSelectedTool] = useState(null);

  const toolsList = [
    { id: 'rainwater', title: 'Yağmur Suyu Boru Çapı', description: 'Drenaj alanı ve eğime göre boru çapını hesaplar.', icon: <FaWater className="text-2xl text-blue-500" />, component: <RainwaterCalculator /> },
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
              <div className="flex items-center justify-center w-12 h-12 bg-slate-100 rounded-lg mb-4 group-hover:bg-blue-100 transition-colors">
                {tool.icon}
              </div>
              <h3 className="font-semibold text-lg text-slate-800 group-hover:text-blue-700 transition-colors">{tool.title}</h3>
              <p className="text-sm text-slate-500 mt-1">{tool.description}</p>
            </button>
          ))}
        </div>

        {selectedTool && (
          <Modal>
            {currentToolComponent}
          </Modal>
        )}
      </div>
    </div>
  );
}