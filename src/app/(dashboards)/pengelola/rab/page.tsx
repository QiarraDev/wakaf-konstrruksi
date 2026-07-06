"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RabPage() {
  const router = useRouter();

  const [items, setItems] = useState([
    { cat: 'Material', name: 'Semen Portland (50kg)', qty: '100 Sak', price: 65000, total: 6500000 },
    { cat: 'Material', name: 'Besi Beton (12mm)', qty: '50 Batang', price: 120000, total: 6000000 },
    { cat: 'Jasa', name: 'Tukang Batu (Harian)', qty: '30 Hari', price: 150000, total: 4500000 },
  ]);

  const [newItem, setNewItem] = useState({ cat: 'Material', name: '', qty: '', price: 0, total: 0 });

  const handleAddItem = () => {
    if (!newItem.name) {
      alert("Nama item tidak boleh kosong!");
      return;
    }
    setItems([...items, newItem]);
    setNewItem({ cat: 'Material', name: '', qty: '', price: 0, total: 0 }); // reset form
  };

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const subtotalMaterial = items.filter(i => i.cat === 'Material').reduce((acc, curr) => acc + curr.total, 0);
  const subtotalJasa = items.filter(i => i.cat === 'Jasa').reduce((acc, curr) => acc + curr.total, 0);
  const totalRAB = subtotalMaterial + subtotalJasa;

  const formatRp = (num: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);

  return (
    <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm mt-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Penyusunan RAB</h1>
          <p className="text-gray-500 mt-2">Detail Rencana Anggaran Biaya konstruksi.</p>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="p-4 font-semibold text-gray-600">Kategori</th>
              <th className="p-4 font-semibold text-gray-600">Nama Item</th>
              <th className="p-4 font-semibold text-gray-600">Kuantitas</th>
              <th className="p-4 font-semibold text-gray-600">Harga Satuan</th>
              <th className="p-4 font-semibold text-gray-600">Total Harga</th>
              <th className="p-4 font-semibold text-gray-600 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {/* Input Form Row */}
            <tr className="bg-emerald-50/30">
              <td className="p-4">
                <select 
                  className="w-full p-2 border border-gray-300 rounded outline-none focus:ring-1 focus:ring-primary text-sm"
                  value={newItem.cat}
                  onChange={(e) => setNewItem({...newItem, cat: e.target.value})}
                >
                  <option>Material</option>
                  <option>Jasa</option>
                </select>
              </td>
              <td className="p-4">
                <input 
                  type="text" 
                  placeholder="Cth: Paku Payung" 
                  className="w-full p-2 border border-gray-300 rounded outline-none focus:ring-1 focus:ring-primary text-sm"
                  value={newItem.name}
                  onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                />
              </td>
              <td className="p-4">
                <input 
                  type="text" 
                  placeholder="Cth: 2 Kg" 
                  className="w-full p-2 border border-gray-300 rounded outline-none focus:ring-1 focus:ring-primary text-sm"
                  value={newItem.qty}
                  onChange={(e) => setNewItem({...newItem, qty: e.target.value})}
                />
              </td>
              <td className="p-4">
                <input 
                  type="number" 
                  placeholder="Harga Satuan" 
                  className="w-full p-2 border border-gray-300 rounded outline-none focus:ring-1 focus:ring-primary text-sm"
                  value={newItem.price || ''}
                  onChange={(e) => setNewItem({...newItem, price: Number(e.target.value)})}
                />
              </td>
              <td className="p-4">
                <input 
                  type="number" 
                  placeholder="Total Harga" 
                  className="w-full p-2 border border-gray-300 rounded outline-none focus:ring-1 focus:ring-primary text-sm"
                  value={newItem.total || ''}
                  onChange={(e) => setNewItem({...newItem, total: Number(e.target.value)})}
                />
              </td>
              <td className="p-4 text-center">
                <button onClick={handleAddItem} className="bg-emerald-600 text-white px-3 py-1.5 rounded-lg text-sm font-bold hover:bg-emerald-700 transition-colors">
                  + Simpan
                </button>
              </td>
            </tr>
            
            {/* Display Items */}
            {items.map((row, i) => (
              <tr key={i} className="hover:bg-gray-50/50">
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold \${row.cat === 'Material' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>
                    {row.cat}
                  </span>
                </td>
                <td className="p-4 font-medium">{row.name}</td>
                <td className="p-4 text-gray-600">{row.qty}</td>
                <td className="p-4 text-gray-600">{formatRp(row.price)}</td>
                <td className="p-4 font-bold text-gray-900">{formatRp(row.total)}</td>
                <td className="p-4 text-center">
                  <button onClick={() => handleRemoveItem(i)} className="text-gray-400 hover:text-red-500 transition-colors">🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {items.length === 0 && (
          <div className="p-8 text-center text-gray-500">Belum ada item biaya. Klik tombol "Tambah Item Biaya" di atas.</div>
        )}
      </div>

      <div className="mt-8 flex justify-end">
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 w-full md:w-1/3">
          <div className="flex justify-between mb-2 text-gray-600">
            <span>Subtotal Material</span>
            <span>{formatRp(subtotalMaterial)}</span>
          </div>
          <div className="flex justify-between mb-4 text-gray-600">
            <span>Subtotal Jasa</span>
            <span>{formatRp(subtotalJasa)}</span>
          </div>
          <div className="flex justify-between pt-4 border-t border-gray-200 font-bold text-lg text-gray-900">
            <span>Total Estimasi RAB</span>
            <span className="text-primary">{formatRp(totalRAB)}</span>
          </div>
          
          <button onClick={() => { alert("RAB berhasil diajukan untuk divalidasi!"); router.push("/pengelola"); }} className="w-full mt-6 bg-primary text-white py-3 rounded-lg font-bold shadow-md hover:bg-primary-dark transition-colors" disabled={items.length === 0}>
            Ajukan Validasi RAB
          </button>
        </div>
      </div>
    </div>
  );
}
