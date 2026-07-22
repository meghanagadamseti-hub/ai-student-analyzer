function Welcome() {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 flex items-center justify-between mb-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-800">
          👋 Welcome Back, Meghana!
        </h2>

        <p className="text-gray-500 mt-2">
          Continue your interview preparation and track your progress.
        </p>
      </div>

      <div className="hidden md:block">
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition">
          Start Assessment
        </button>
      </div>
    </div>
  );
}

export default Welcome;