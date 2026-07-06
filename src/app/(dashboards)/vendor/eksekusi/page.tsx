export default function EksekusiPage() {
  return (
    <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm mt-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Papan Eksekusi Lapangan (Kanban)</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
          <h3 className="font-bold text-gray-700 mb-4 flex justify-between">To-Do <span className="bg-gray-200 px-2 rounded">2</span></h3>
          <div className="bg-white p-3 rounded shadow-sm border border-gray-100 mb-3 cursor-grab">Pemasangan Rangka Atap Baja Ringan</div>
          <div className="bg-white p-3 rounded shadow-sm border border-gray-100 cursor-grab">Plester Dinding Area Luar</div>
        </div>
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
          <h3 className="font-bold text-blue-800 mb-4 flex justify-between">In Progress <span className="bg-blue-200 px-2 rounded">1</span></h3>
          <div className="bg-white p-3 rounded shadow-sm border border-blue-200 cursor-grab">Pemasangan Plafon Gypsum (Lantai 1)</div>
        </div>
        <div className="bg-green-50 rounded-xl p-4 border border-green-100">
          <h3 className="font-bold text-green-800 mb-4 flex justify-between">Selesai (Done) <span className="bg-green-200 px-2 rounded">3</span></h3>
          <div className="bg-white p-3 rounded shadow-sm border border-green-200 mb-3 cursor-grab line-through text-gray-500">Pondasi Cakar Ayam</div>
          <div className="bg-white p-3 rounded shadow-sm border border-green-200 mb-3 cursor-grab line-through text-gray-500">Dinding Bata Lantai 1</div>
          <div className="bg-white p-3 rounded shadow-sm border border-green-200 cursor-grab line-through text-gray-500">Pengecoran Lantai 2</div>
        </div>
      </div>
    </div>
  );
}