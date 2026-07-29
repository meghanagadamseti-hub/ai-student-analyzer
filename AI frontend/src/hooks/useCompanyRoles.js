/**
 * useCompanyRoles.js
 *
 * Fetches the company list from /companies on mount (roles are embedded).
 * When company changes, reads roles from the embedded list — no extra
 * network request needed in the normal flow.
 *
 * Falls back to /companies/<name>/roles only when the company is not in
 * the cached list (e.g. user typed a name directly or offline fallback).
 *
 * Rules:
 *  - Roles are deduplicated and sorted alphabetically.
 *  - No hardcoded role names anywhere.
 *  - Empty roles → empty array (UI shows "No roles available").
 */

import { useState, useEffect, useRef } from "react";

const API = "http://127.0.0.1:5000";

/** Deduplicate and sort a roles array. */
function normaliseRoles(roles) {
  if (!Array.isArray(roles) || roles.length === 0) return [];
  return [...new Set(roles)].sort((a, b) => a.localeCompare(b));
}

export default function useCompanyRoles() {
  const [companyList,      setCompanyList]      = useState([]);
  const [roleList,         setRoleList]         = useState([]);
  const [company,          setCompanyRaw]       = useState("");
  const [role,             setRole]             = useState("");
  const [loadingCompanies, setLoadingCompanies] = useState(true);
  const [loadingRoles,     setLoadingRoles]     = useState(false);

  // Cache the company list in a ref so the roles effect can read it
  // without needing it as a dependency (avoids infinite loops)
  const companyListRef = useRef([]);

  // ── 1. Fetch all companies once on mount ──────────────────────────────
  useEffect(() => {
    setLoadingCompanies(true);

    fetch(`${API}/companies`)
      .then(r => {
        if (!r.ok) throw new Error(`/companies ${r.status}`);
        return r.json();
      })
      .then(data => {
        const list = Array.isArray(data) ? data : [];
        companyListRef.current = list;
        setCompanyList(list);

        if (list.length > 0) {
          // Set company — this will trigger effect #2 to load roles
          setCompanyRaw(list[0].name);
        }
      })
      .catch(err => {
        console.warn("[useCompanyRoles] /companies failed:", err.message);
        // Offline fallback — name-only list so dropdown still shows companies
        const fallback = [
          "Google","Microsoft","Amazon","Meta","Apple","Adobe","Netflix",
          "Oracle","Salesforce","NVIDIA","Intel","SAP","PayPal","Uber",
          "Atlassian","LinkedIn","Zoom","TCS","Infosys","Wipro","Accenture",
          "Cognizant","Capgemini","HCLTech","Tech Mahindra","IBM","Deloitte",
          "Persistent Systems","Mphasis","Hexaware","Razorpay","CRED",
          "Freshworks","Zerodha","Groww","PhonePe","Swiggy","Zomato",
          "BrowserStack","Postman","InMobi","Chargebee","Upstox","Rapido",
          "Darwinbox","ShareChat","Juspay","Ather Energy","Mindtickle",
          "Ninjacart","Porter","Coforge",
        ].map(n => ({ name: n, roles: [] }));
        companyListRef.current = fallback;
        setCompanyList(fallback);
        setCompanyRaw(fallback[0].name);
      })
      .finally(() => setLoadingCompanies(false));
  }, []); // runs once

  // ── 2. Resolve roles whenever company changes ─────────────────────────
  useEffect(() => {
    if (!company) return;

    // First try the embedded roles from the cached company list
    const cached = companyListRef.current.find(
      c => c.name === company
    );

    if (cached && Array.isArray(cached.roles) && cached.roles.length > 0) {
      const sorted = normaliseRoles(cached.roles);
      setRoleList(sorted);
      setRole(sorted[0] || "");
      return;
    }

    // Fallback: fetch from the per-company endpoint
    setLoadingRoles(true);
    setRoleList([]);
    setRole("");

    fetch(`${API}/companies/${encodeURIComponent(company)}/roles`)
      .then(r => {
        if (!r.ok) throw new Error(`/companies/${company}/roles ${r.status}`);
        return r.json();
      })
      .then(data => {
        const sorted = normaliseRoles(data.roles);
        setRoleList(sorted);
        setRole(sorted[0] || "");
        // Update the cached entry so future company changes are instant
        companyListRef.current = companyListRef.current.map(c =>
          c.name === company ? { ...c, roles: sorted } : c
        );
      })
      .catch(err => {
        console.warn(`[useCompanyRoles] roles for ${company} failed:`, err.message);
        setRoleList([]);
        setRole("");
      })
      .finally(() => setLoadingRoles(false));
  }, [company]); // eslint-disable-line react-hooks/exhaustive-deps

  /** Public setter — clears stale roles immediately on company change */
  const setCompany = (name) => {
    setRole("");
    setRoleList([]);
    setCompanyRaw(name);
  };

  return {
    companyList,
    roleList,
    company,
    setCompany,
    role,
    setRole,
    loadingCompanies,
    loadingRoles,
  };
}
