import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import CompanyDetailsModal from "../components/CompanyDetailsModal";
import companies from "../data/companiesData";
import {
  FaSearch, FaMapMarkerAlt, FaMoneyBillWave,
  FaExternalLinkAlt, FaLaptopCode, FaUsers,
  FaStar, FaTimes, FaBuilding, FaFilter,
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";

/* ── Filter configuration ── */
const TYPE_FILTERS    = ["All", "Product", "Service", "Startup"];
const WORKMODE_FILTERS= ["All", "Remote", "Hybrid", "On-site"];
const LOCATION_FILTERS= ["All", "Bangalore", "Hyderabad", "Pune", "Chennai", "Mumbai", "Noida", "Remote"];
const SALARY_FILTERS  = [
  { label: "All Ranges",    min: 0    },
  { label: "₹3 – ₹8 LPA",  min: 3,  max: 8  },
  { label: "₹8 – ₹15 LPA", min: 8,  max: 15 },
  { label: "₹15 – ₹25 LPA",min: 15, max: 25 },
  { label: "₹25 LPA+",     min: 25           },
];

/* ── Type badge colours ── */
const TYPE_STYLE = {
  Product: { bg: "rgba(99,102,241,0.12)", border: "rgba(99,102,241,0.28)", color: "var(--color-indigo-text)" },
  Service: { bg: "rgba(6,182,212,0.12)",  border: "rgba(6,182,212,0.28)",  color: "var(--color-cyan-text)"   },
  Startup: { bg: "rgba(245,158,11,0.12)", border: "rgba(245,158,11,0.28)", color: "var(--color-yellow-text)" },
};

/* ── Work mode badge colours ── */
const WORKMODE_STYLE = {
  "Remote":  { bg: "rgba(16,185,129,0.10)",  color: "var(--color-green-text)"  },
  "Hybrid":  { bg: "rgba(99,102,241,0.10)",  color: "var(--color-indigo-text)" },
  "On-site": { bg: "rgba(245,158,11,0.10)",  color: "var(--color-yellow-text)" },
};

/* Parse min salary from string like "₹15 – ₹28 LPA" */
function parseSalaryMin(str = "") {
  const m = str.match(/₹(\d+(?:\.\d+)?)/);
  return m ? parseFloat(m[1]) : 0;
}

/* ── FilterChip ── */
function FilterChip({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className="px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 whitespace-nowrap"
      style={active
        ? { background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "#fff", boxShadow: "0 3px 10px rgba(99,102,241,0.28)" }
        : { background: "var(--bg-card)", border: "1px solid var(--border-default)", color: "var(--text-faint)" }
      }
    >
      {label}
    </button>
  );
}

/* ── Star rating (compact) ── */
function Stars({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map((s) => (
        <FaStar key={s} style={{ fontSize: "9px", color: s <= Math.round(rating) ? "#fbbf24" : "var(--border-default)" }} />
      ))}
      <span className="text-xs font-bold ml-1" style={{ color: "#fbbf24" }}>{rating}</span>
    </div>
  );
}

const ITEMS_PER_PAGE = 12;

function Companies() {
  const [search,       setSearch]       = useState("");
  const [typeFilter,   setTypeFilter]   = useState("All");
  const [workFilter,   setWorkFilter]   = useState("All");
  const [locFilter,    setLocFilter]    = useState("All");
  const [salaryFilter, setSalaryFilter] = useState(SALARY_FILTERS[0]);
  const [skillFilter,  setSkillFilter]  = useState("");
  const [page,         setPage]         = useState(1);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [showFilters,  setShowFilters]  = useState(false);

  /* ── Filter logic ── */
  const filtered = useMemo(() => {
    return companies.filter((c) => {
      const q = search.toLowerCase();
      if (q && !c.name.toLowerCase().includes(q) &&
               !c.industry.toLowerCase().includes(q) &&
               !c.roles.join(" ").toLowerCase().includes(q)) return false;
      if (typeFilter !== "All" && c.type !== typeFilter)      return false;
      if (workFilter !== "All" && c.workMode !== workFilter)  return false;
      if (locFilter  !== "All" && !c.location.includes(locFilter)) return false;
      if (salaryFilter.min > 0) {
        const minSal = parseSalaryMin(c.salary);
        if (minSal < salaryFilter.min) return false;
        if (salaryFilter.max && minSal > salaryFilter.max) return false;
      }
      if (skillFilter.trim()) {
        const sk = skillFilter.toLowerCase();
        if (!c.techSkills.some((s) => s.toLowerCase().includes(sk))) return false;
      }
      return true;
    });
  }, [search, typeFilter, workFilter, locFilter, salaryFilter, skillFilter]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated  = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const resetFilters = () => {
    setSearch(""); setTypeFilter("All"); setWorkFilter("All");
    setLocFilter("All"); setSalaryFilter(SALARY_FILTERS[0]);
    setSkillFilter(""); setPage(1);
  };
  const hasActiveFilters = search || typeFilter !== "All" || workFilter !== "All" ||
    locFilter !== "All" || salaryFilter.min > 0 || skillFilter;

  return (
    <div className="flex min-h-screen" style={{ background: "var(--bg-base)" }}>
      <Sidebar />

      <main className="ml-64 flex-1 p-6 min-w-0">
        <Navbar />

        {/* ── Page header ── */}
        <motion.div initial={{ opacity:0, y:-10 }} animate={{ opacity:1, y:0 }} className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <HiSparkles style={{ color:"var(--color-indigo-text)", fontSize:"16px" }} />
            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color:"var(--color-indigo-text)" }}>
              {companies.length}+ Companies
            </span>
          </div>
          <h1 className="text-3xl font-bold" style={{ color:"var(--text-primary)" }}>Explore Companies</h1>
          <p className="text-sm mt-1" style={{ color:"var(--text-faint)" }}>
            Discover top product, service, and startup companies and prepare for your dream job.
          </p>
        </motion.div>

        {/* ── Search bar ── */}
        <div className="mb-4 flex gap-3">
          <div className="flex-1 flex items-center gap-3 px-4 py-2.5 rounded-2xl"
            style={{ background:"var(--bg-card)", border:"1px solid var(--border-default)" }}>
            <FaSearch style={{ color:"var(--text-faint)", fontSize:"13px", flexShrink:0 }} />
            <input
              type="text"
              placeholder="Search by company name, industry, or role..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="flex-1 bg-transparent outline-none text-sm"
              style={{ color:"var(--text-primary)" }}
            />
            {search && (
              <button onClick={() => { setSearch(""); setPage(1); }}
                style={{ color:"var(--text-faint)" }}>
                <FaTimes style={{ fontSize:"11px" }} />
              </button>
            )}
          </div>

          {/* Skill search */}
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl"
            style={{ background:"var(--bg-card)", border:"1px solid var(--border-default)", minWidth:"180px" }}>
            <FaLaptopCode style={{ color:"var(--text-faint)", fontSize:"12px", flexShrink:0 }} />
            <input
              type="text"
              placeholder="Filter by skill..."
              value={skillFilter}
              onChange={(e) => { setSkillFilter(e.target.value); setPage(1); }}
              className="flex-1 bg-transparent outline-none text-sm"
              style={{ color:"var(--text-primary)" }}
            />
          </div>

          {/* Filter toggle */}
          <button
            onClick={() => setShowFilters((v) => !v)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-semibold transition-all"
            style={showFilters
              ? { background:"rgba(99,102,241,0.15)", border:"1px solid rgba(99,102,241,0.35)", color:"var(--color-indigo-text)" }
              : { background:"var(--bg-card)", border:"1px solid var(--border-default)", color:"var(--text-faint)" }
            }
          >
            <FaFilter style={{ fontSize:"11px" }} />
            Filters
          </button>
        </div>

        {/* ── Filter panels ── */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height:0, opacity:0 }}
              animate={{ height:"auto", opacity:1 }}
              exit={{ height:0, opacity:0 }}
              transition={{ duration:0.25 }}
              className="overflow-hidden mb-4"
            >
              <div className="rounded-2xl p-4 space-y-4"
                style={{ background:"var(--bg-card)", border:"1px solid var(--border-default)" }}>
                {/* Type */}
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color:"var(--text-faint)" }}>Company Type</p>
                  <div className="flex flex-wrap gap-2">
                    {TYPE_FILTERS.map((f) => (
                      <FilterChip key={f} label={f} active={typeFilter===f}
                        onClick={() => { setTypeFilter(f); setPage(1); }} />
                    ))}
                  </div>
                </div>
                {/* Work Mode */}
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color:"var(--text-faint)" }}>Work Mode</p>
                  <div className="flex flex-wrap gap-2">
                    {WORKMODE_FILTERS.map((f) => (
                      <FilterChip key={f} label={f} active={workFilter===f}
                        onClick={() => { setWorkFilter(f); setPage(1); }} />
                    ))}
                  </div>
                </div>
                {/* Location */}
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color:"var(--text-faint)" }}>Location</p>
                  <div className="flex flex-wrap gap-2">
                    {LOCATION_FILTERS.map((f) => (
                      <FilterChip key={f} label={f} active={locFilter===f}
                        onClick={() => { setLocFilter(f); setPage(1); }} />
                    ))}
                  </div>
                </div>
                {/* Salary */}
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color:"var(--text-faint)" }}>Salary Range</p>
                  <div className="flex flex-wrap gap-2">
                    {SALARY_FILTERS.map((f) => (
                      <FilterChip key={f.label} label={f.label} active={salaryFilter.label===f.label}
                        onClick={() => { setSalaryFilter(f); setPage(1); }} />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Results row ── */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm" style={{ color:"var(--text-faint)" }}>
            Showing <strong style={{ color:"var(--text-primary)" }}>{filtered.length}</strong> of {companies.length} companies
            {hasActiveFilters && (
              <button onClick={resetFilters}
                className="ml-3 text-xs px-2.5 py-1 rounded-lg hover:opacity-80 transition-opacity"
                style={{ background:"rgba(239,68,68,0.10)", color:"var(--color-red-text)", border:"1px solid rgba(239,68,68,0.20)" }}>
                Clear all filters
              </button>
            )}
          </p>
          {/* Active type filter quick-pills */}
          {typeFilter !== "All" && (
            <span className="text-xs px-3 py-1 rounded-xl"
              style={TYPE_STYLE[typeFilter]
                ? { background:TYPE_STYLE[typeFilter].bg, border:`1px solid ${TYPE_STYLE[typeFilter].border}`, color:TYPE_STYLE[typeFilter].color }
                : {}}>
              {typeFilter}
            </span>
          )}
        </div>

        {/* ── Company cards grid ── */}
        {paginated.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24">
            <FaBuilding style={{ fontSize:"48px", color:"var(--text-faint)", marginBottom:"16px" }} />
            <p className="text-lg font-semibold" style={{ color:"var(--text-muted)" }}>No companies found</p>
            <p className="text-sm mt-2" style={{ color:"var(--text-faint)" }}>Try adjusting your search or filters</p>
            <button onClick={resetFilters}
              className="mt-4 px-5 py-2.5 rounded-xl text-sm font-semibold text-white"
              style={{ background:"linear-gradient(135deg,#6366f1,#8b5cf6)" }}>
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {paginated.map((company, i) => {
              const ts = TYPE_STYLE[company.type] || TYPE_STYLE.Product;
              const ws = WORKMODE_STYLE[company.workMode] || WORKMODE_STYLE["Hybrid"];
              return (
                <motion.div
                  key={company.id}
                  initial={{ opacity:0, y:16 }}
                  animate={{ opacity:1, y:0 }}
                  transition={{ delay: Math.min(i * 0.04, 0.4) }}
                  whileHover={{ y:-3, transition:{ duration:0.18 } }}
                  className="theme-card rounded-2xl overflow-hidden flex flex-col cursor-default"
                >
                  {/* Card body */}
                  <div className="p-5 flex-1">
                    {/* Top row */}
                    <div className="flex items-start gap-3 mb-4">
                      {/* Logo */}
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden p-1"
                        style={{ background:"var(--bg-surface)", border:"1px solid var(--border-subtle)" }}>
                        <img src={company.logo} alt={company.name}
                          className="w-full h-full object-contain"
                          onError={(e) => { e.target.style.display="none"; }} />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h2 className="text-base font-bold truncate" style={{ color:"var(--text-primary)" }}>
                          {company.name}
                        </h2>
                        <p className="text-xs mt-0.5 truncate" style={{ color:"var(--text-faint)" }}>
                          {company.industry}
                        </p>
                        <div className="flex flex-wrap gap-1.5 mt-1.5">
                          {/* Type badge */}
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-lg"
                            style={{ background:ts.bg, border:`1px solid ${ts.border}`, color:ts.color }}>
                            {company.type}
                          </span>
                          {/* Work mode badge */}
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-lg"
                            style={{ background:ws.bg, color:ws.color }}>
                            {company.workMode}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Key info row */}
                    <div className="space-y-1.5 mb-4">
                      <div className="flex items-center gap-1.5 text-xs" style={{ color:"var(--text-muted)" }}>
                        <FaMapMarkerAlt style={{ fontSize:"9px", color:"var(--color-red-text)", flexShrink:0 }} />
                        <span className="truncate">{company.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-semibold" style={{ color:"var(--color-green-text)" }}>
                        <FaMoneyBillWave style={{ fontSize:"9px", flexShrink:0 }} />
                        {company.salary}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs" style={{ color:"var(--text-muted)" }}>
                        <FaUsers style={{ fontSize:"9px", color:"var(--color-cyan-text)", flexShrink:0 }} />
                        {company.employees}
                      </div>
                    </div>

                    {/* Rating */}
                    <Stars rating={company.rating} />

                    {/* Skills preview */}
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {company.techSkills.slice(0,4).map((s) => (
                        <span key={s} className="tag-cyan" style={{ fontSize:"10px", padding:"2px 10px" }}>{s}</span>
                      ))}
                      {company.techSkills.length > 4 && (
                        <span className="tag-cyan" style={{ fontSize:"10px", padding:"2px 10px" }}>
                          +{company.techSkills.length - 4}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card actions */}
                  <div className="px-5 pb-5 flex gap-2">
                    <button
                      onClick={() => setSelectedCompany(company)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold hover:opacity-85 transition-opacity"
                      style={{ background:"rgba(99,102,241,0.12)", border:"1px solid var(--border-input)", color:"var(--color-indigo-text)" }}>
                      <HiSparkles style={{ fontSize:"11px" }} />
                      View Details
                    </button>
                    <a
                      href={company.careers}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold hover:opacity-85 transition-opacity"
                      style={{ background:"rgba(16,185,129,0.10)", border:"1px solid rgba(16,185,129,0.22)", color:"var(--color-green-text)" }}>
                      <FaExternalLinkAlt style={{ fontSize:"9px" }} />
                      Visit Careers
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* ── Pagination ── */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 rounded-xl text-sm font-semibold transition-all disabled:opacity-40"
              style={{ background:"var(--bg-card)", border:"1px solid var(--border-default)", color:"var(--text-muted)" }}>
              ← Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
              .reduce((acc, p, idx, arr) => {
                if (idx > 0 && p - arr[idx-1] > 1) acc.push("...");
                acc.push(p);
                return acc;
              }, [])
              .map((p, i) =>
                p === "..." ? (
                  <span key={i} className="px-2 text-sm" style={{ color:"var(--text-faint)" }}>…</span>
                ) : (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className="w-9 h-9 rounded-xl text-sm font-semibold transition-all"
                    style={p === page
                      ? { background:"linear-gradient(135deg,#6366f1,#8b5cf6)", color:"#fff" }
                      : { background:"var(--bg-card)", border:"1px solid var(--border-default)", color:"var(--text-muted)" }}>
                    {p}
                  </button>
                )
              )}

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-4 py-2 rounded-xl text-sm font-semibold transition-all disabled:opacity-40"
              style={{ background:"var(--bg-card)", border:"1px solid var(--border-default)", color:"var(--text-muted)" }}>
              Next →
            </button>
          </div>
        )}
      </main>

      {/* ── Company Details Modal ── */}
      {selectedCompany && (
        <CompanyDetailsModal
          company={selectedCompany}
          onClose={() => setSelectedCompany(null)}
        />
      )}
    </div>
  );
}

export default Companies;
