# services/company_service.py
# ─────────────────────────────────────────────────────────────────────────────
# Two-tier data layer:
#   Tier 1 — MySQL DB (via SQLAlchemy).  Used when DB is seeded.
#   Tier 2 — Static data/companies.py.  Automatic fallback when DB is
#             empty, unreachable, or not yet migrated.
#
# All public function signatures are identical to the old data/companies.py
# helpers, so every caller (routes, analysis, interview, …) is unaffected.
# ─────────────────────────────────────────────────────────────────────────────

import sys

# ── Static data (always importable — no DB needed) ──────────────────────────
from data.companies import (
    COMPANIES as _STATIC,
    _match_company        as _static_match_company,
    _match_role           as _static_match_role,
    get_company_meta      as _static_company_meta,
    get_all_companies_meta as _static_all_meta,
    get_roles_for_company  as _static_roles,
    get_role_data          as _static_role_data,
    get_required_skills    as _static_required_skills,
)


def _normalise_roles(roles) -> list:
    """Return a unique, alphabetically sorted role list."""
    if not isinstance(roles, list):
        roles = [] if roles is None else [roles]
    cleaned = []
    for role in roles:
        if role is None:
            continue
        text = str(role).strip()
        if text:
            cleaned.append(text)
    return sorted(set(cleaned), key=lambda value: value.casefold())


# ── DB availability check ────────────────────────────────────────────────────

def _db_available() -> bool:
    """Return True only when the DB is reachable AND has company rows."""
    try:
        from database import db
        from models.company import Company
        # Quick check — if the table exists and has at least one row, use DB
        return Company.query.limit(1).count() > 0
    except Exception:
        return False


# ── DB helpers (only called when _db_available() is True) ───────────────────

def _db_find_company(name: str):
    from database import db
    from models.company import Company
    return (
        Company.query
        .filter(db.func.lower(Company.name) == name.strip().lower())
        .first()
    )


def _db_find_role(company_obj, role_name: str):
    from database import db
    from models.company import CompanyRole
    return (
        CompanyRole.query
        .filter(
            CompanyRole.company_id == company_obj.id,
            db.func.lower(CompanyRole.role_name) == role_name.strip().lower(),
        )
        .first()
    )


# ── Public API ───────────────────────────────────────────────────────────────

def get_all_companies_meta() -> list:
    """
    Return sorted metadata list for every company including role names.
    Shape: [{ name, description, logo, locations, package,
              difficulty, hiring_category, roles: [str] }]
    """
    if _db_available():
        try:
            from models.company import Company
            companies = Company.query.order_by(Company.name).all()
            payload = []
            for company in companies:
                meta = company.to_dict()
                meta["roles"] = _normalise_roles(meta.get("roles", []))
                meta["company"] = meta.get("company") or meta.get("name")
                payload.append(meta)
            return payload
        except Exception as exc:
            print(f"[company_service] DB read failed, using static data: {exc}")

    # Static fallback
    payload = _static_all_meta()
    for meta in payload:
        meta["roles"] = _normalise_roles(meta.get("roles", []))
        meta["company"] = meta.get("company") or meta.get("name")
    return payload


def get_company_meta(company_name: str) -> dict:
    """Return metadata for a single company including its role list."""
    if _db_available():
        try:
            company = _db_find_company(company_name)
            if company:
                meta = company.to_dict()
                meta["roles"] = _normalise_roles(meta.get("roles", []))
                meta["company"] = meta.get("company") or meta.get("name")
                return meta
        except Exception as exc:
            print(f"[company_service] DB read failed, using static data: {exc}")

    meta = _static_company_meta(company_name)
    meta["roles"] = _normalise_roles(meta.get("roles", []))
    meta["company"] = meta.get("company") or meta.get("name")
    return meta


def get_roles_for_company(company_name: str) -> list:
    """Return sorted list of role name strings for a company."""
    if _db_available():
        try:
            company = _db_find_company(company_name)
            if company:
                return _normalise_roles(company.get_role_names())
        except Exception as exc:
            print(f"[company_service] DB read failed, using static data: {exc}")

    return _normalise_roles(_static_roles(company_name))


def get_role_data(company_name: str, role_name: str) -> dict:
    """
    Return full role metadata dict.
    Includes '_error' + '_available_roles' key when company exists
    but role does not (preserved for /analyze error handling).
    """
    if _db_available():
        try:
            company = _db_find_company(company_name)
            if not company:
                # Company not in DB at all — fall through to static
                pass
            else:
                role = _db_find_role(company, role_name)
                if not role:
                    available = company.get_role_names()
                    print(f"[company_service] Role '{role_name}' not found for '{company.name}'.")
                    print(f"[company_service] Available roles: {available}")
                    return {
                        "_error":           "role_not_found",
                        "_company":         company.name,
                        "_role_requested":  role_name,
                        "_available_roles": available,
                    }
                return role.to_dict()
        except Exception as exc:
            print(f"[company_service] DB read failed, using static data: {exc}")

    return _static_role_data(company_name, role_name)


def get_required_skills(company_name: str, role_name: str) -> list:
    """Return list of required skill name strings. Returns [] if not found."""
    if _db_available():
        try:
            company = _db_find_company(company_name)
            if company:
                role = _db_find_role(company, role_name)
                if role:
                    return role.get_required_skill_names()
                # Company found but role missing — return []
                if _db_find_company(company_name):
                    return []
        except Exception as exc:
            print(f"[company_service] DB read failed, using static data: {exc}")

    return _static_required_skills(company_name, role_name)


def get_company_and_role_ids(company_name: str, role_name: str):
    """
    Return (company_id, role_id) for FK storage.
    Returns (None, None) when DB unavailable or records not found.
    """
    if _db_available():
        try:
            company = _db_find_company(company_name)
            if not company:
                return None, None
            role = _db_find_role(company, role_name)
            return company.id, (role.id if role else None)
        except Exception:
            pass

    return None, None
