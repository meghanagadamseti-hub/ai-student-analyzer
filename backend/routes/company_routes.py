# routes/company_routes.py
# ─────────────────────────────────────────────────────────────────────────────
# GET /companies               — all 52 companies with embedded role lists
# GET /companies/<name>/roles  — roles for one company (case-insensitive)
# ─────────────────────────────────────────────────────────────────────────────

from flask import Blueprint, jsonify
from data.companies import COMPANIES, _match_company

company_bp = Blueprint("company", __name__)


def _build_company_payload(canonical_name: str) -> dict:
    """
    Build the full company metadata dict from static data.
    Roles are deduplicated and sorted alphabetically.
    """
    data  = COMPANIES[canonical_name]
    roles = sorted(set(data.get("roles", {}).keys()))

    return {
        "name":            canonical_name,
        "description":     data.get("description", ""),
        "logo":            data.get("logo", "/logos/image.png"),
        "locations":       data.get("locations", []),
        "package":         data.get("package", ""),
        "difficulty":      data.get("difficulty", "Medium"),
        "hiring_category": data.get("hiring_category", ""),
        "roles":           roles,
    }


@company_bp.route("/companies", methods=["GET"])
def list_companies():
    """
    Return all companies sorted alphabetically, each with their role list.
    Roles are deduplicated and sorted.
    """
    try:
        result = [
            _build_company_payload(name)
            for name in sorted(COMPANIES.keys())
        ]
        print(f"[GET /companies] Returning {len(result)} companies")
        return jsonify(result)
    except Exception as exc:
        print(f"[GET /companies] ERROR: {exc}")
        return jsonify({"error": f"Failed to fetch companies: {exc}"}), 500


@company_bp.route("/companies/<path:company_name>/roles", methods=["GET"])
def company_roles(company_name):
    """
    Return the role list for a single company.
    Lookup is case-insensitive and whitespace-trimmed.

    200: { name, roles: [str], ... }
    404: { error: "..." }
    """
    received = company_name.strip()
    print(f"\n[GET /companies/.../roles] Received company: '{received}'")

    canonical = _match_company(received)
    print(f"[GET /companies/.../roles] Matched company:  '{canonical}'")

    if not canonical:
        available = sorted(COMPANIES.keys())
        print(f"[GET /companies/.../roles] Not found. Available: {available}")
        return jsonify({
            "error": f"Company '{received}' not found.",
            "available_companies": available,
        }), 404

    try:
        payload = _build_company_payload(canonical)
        roles   = payload["roles"]
        print(f"[GET /companies/.../roles] Roles found ({len(roles)}): {roles}")

        if not roles:
            data = COMPANIES[canonical]
            raw  = data.get("roles", {})
            print(f"[GET /companies/.../roles] WARNING: '{canonical}' has roles dict "
                  f"but it is empty. Raw keys: {list(raw.keys())}")

        return jsonify(payload)
    except Exception as exc:
        print(f"[GET /companies/.../roles] ERROR: {exc}")
        return jsonify({"error": f"Failed to fetch roles: {exc}"}), 500
