import { useState } from "react";

const TABS = ["Categories", "Brands", "Banners"];

export default function CategoriesPage() {
  const [activeTab, setActiveTab] = useState("Categories");
  const [page, setPage] = useState(2);

  const items = Array.from({ length: 12 });

  return (
    <div className="min-h-screen text-white p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded text-sm ${
                activeTab === tab
                  ? "bg-white text-black"
                  : "text-zinc-400"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <button className="bg-blue-600 px-4 py-2 rounded flex items-center gap-2">
          <span className="text-lg">＋</span> Add new
        </button>
      </div>

      <div className="mb-6">
        <div className="relative w-72">
          <input
            placeholder="Search..."
            className="w-full bg-white text-black rounded px-4 py-2 pr-10"
          />
          <span className="absolute right-3 top-2.5 text-zinc-500">🔍</span>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        <div className="col-span-3 grid grid-cols-4 gap-6">
          {items.map((_, i) => (
            <div
              key={i}
              className="relative h-28 border border-zinc-800 rounded flex items-center justify-center"
            >
              
              <button className="absolute top-2 right-2 text-blue-500">
                ✎
              </button>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="bg-white text-black rounded p-6 flex flex-col items-center gap-3"
            >
              <div className="text-4xl">📷</div>
              <span>Camera</span>
              <button className="absolute mt-1 ml-32 text-blue-600">
                ✎
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center mt-10 text-sm text-zinc-400">
        <div className="flex items-center gap-2">
          <button className="w-8 h-8 bg-white text-black rounded">
            ←
          </button>
          {[1, 2, 3, 4, 5, 6].map(n => (
            <button
              key={n}
              onClick={() => setPage(n)}
              className={`w-8 h-8 rounded ${
                page === n
                  ? "bg-white text-black"
                  : "text-zinc-400"
              }`}
            >
              {n}
            </button>
          ))}
          <span>…</span>
          <span>24</span>
          <button className="w-8 h-8 bg-white text-black rounded">
            →
          </button>
        </div>

        <div>274 Results</div>
      </div>
    </div>
  );
}
