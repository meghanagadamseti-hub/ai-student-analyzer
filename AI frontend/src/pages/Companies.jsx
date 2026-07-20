import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import companies from "../data/companiesData";

import {
  FaSearch,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaExternalLinkAlt,
} from "react-icons/fa";

function Companies() {
  const [search, setSearch] = useState("");
  const [expandedCompany, setExpandedCompany] = useState(null);

  const filteredCompanies = companies.filter(
    (company) =>
      company.name.toLowerCase().includes(search.toLowerCase()) ||
      company.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

       <main className="ml-72 flex-1 p-8">
        <Navbar />

        {/* Header */}
        <div className="mt-6">
          <h1 className="text-4xl font-bold text-slate-800">
            Explore Companies
          </h1>

          <p className="text-gray-500 mt-2">
            Discover top companies and prepare for your dream job.
          </p>
        </div>

        {/* Search */}
        <div className="bg-white mt-8 rounded-2xl shadow-md p-4 flex items-center">
          <FaSearch className="text-gray-400 mr-4 text-xl" />

          <input
            type="text"
            placeholder="Search company or role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full outline-none text-lg"
          />
        </div>

        {/* Companies */}
        <div className="mt-8 space-y-6">
          {filteredCompanies.map((company) => (
            <div
              key={company.id}
              className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition"
            >
              {/* Top */}
              <div className="flex justify-between items-start">
                <div className="flex gap-4">
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="w-16 h-16 object-contain"
                  />

                  <div>
                    <h2 className="text-2xl font-bold">
                      {company.name}
                    </h2>

                    <p className="text-gray-600">
                      {company.role}
                    </p>
                  </div>
                </div>

                <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full font-semibold">
                  🟣 Product Based
                </span>
              </div>

              {/* Location */}
              <div className="flex items-center mt-5 text-gray-600">
                <FaMapMarkerAlt className="mr-2 text-red-500" />
                {company.location}
              </div>

              {/* Package */}
              <div className="flex items-center mt-2 text-green-600 font-semibold">
                <FaMoneyBillWave className="mr-2" />
                {company.package}
              </div>

              {/* Buttons */}
              <div className="flex justify-between mt-6">
                <button
                  onClick={() =>
                    setExpandedCompany(
                      expandedCompany === company.id ? null : company.id
                    )
                  }
                  className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition"
                >
                  {expandedCompany === company.id
                    ? "Hide Details"
                    : "View Details"}
                </button>

                <a
                  href={company.website}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
                >
                  Visit Careers
                  <FaExternalLinkAlt />
                </a>
              </div>

              {/* Expanded */}
              {expandedCompany === company.id && (
                <div className="mt-6 border-t pt-5">
                  <p className="text-gray-600">
                    {company.description}
                  </p>

                  <h3 className="font-semibold mt-5 mb-3">
                    Required Skills
                  </h3>

                  <div className="flex flex-wrap gap-2">
                    {company.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Companies;