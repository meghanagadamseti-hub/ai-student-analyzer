function CompanySelection() {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">

      <h2 className="text-xl font-bold text-gray-800 mb-5">
        🏢 Company Assessment
      </h2>

      <div className="space-y-5">

        <div>
          <label className="block text-gray-600 mb-2">
            Company
          </label>

          <select className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500">

            <option>Google</option>
            <option>Microsoft</option>
            <option>Amazon</option>
            <option>Meta</option>
            <option>Netflix</option>
            <option>Adobe</option>
            <option>TCS</option>
            <option>Infosys</option>

          </select>
        </div>

        <div>
          <label className="block text-gray-600 mb-2">
            Job Role
          </label>

          <input
            type="text"
            placeholder="Software Engineer"
            className="w-full border rounded-xl px-4 py-3"
          />
        </div>

        <div>
          <label className="block text-gray-600 mb-2">
            Experience
          </label>

          <select className="w-full border rounded-xl px-4 py-3">

            <option>Fresher</option>
            <option>0-1 Years</option>
            <option>1-3 Years</option>
            <option>3-5 Years</option>

          </select>
        </div>

        <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl hover:opacity-90 transition">
          Analyze Resume
        </button>

      </div>

    </div>
  );
}

export default CompanySelection;