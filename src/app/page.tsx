export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-900 p-8">
      {/* Logo / Brand name */}
      <h1 className="text-5xl font-extrabold mb-4">TrendWear</h1>
      
      {/* Tagline */}
      <p className="text-lg text-gray-600 mb-6">
        Your style. Your identity. Shop the latest collections now.
      </p>

      {/* Shop Now button */}
      <button className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition">
        Shop Now
      </button>
    </main>
  );
}
