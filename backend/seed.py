# seed.py
# ─────────────────────────────────────────────────────────────────────────────
# One-time database seeder.
#
# Reads every company, role, and skill from data/companies.py (the static
# Python dict) and inserts them into MySQL via SQLAlchemy.
#
# Safe to re-run: uses INSERT-or-skip logic (no duplicates).
# Also clears stale roles/skills when re-run so the DB always matches the file.
#
# Usage:
#   cd backend
#   python seed.py
# ─────────────────────────────────────────────────────────────────────────────

import sys, os, json

sys.path.insert(0, os.path.dirname(__file__))

# ── Step 0: Auto-create the database if it doesn't exist ─────────────────────
def ensure_database_exists():
    """Create the MySQL database if it isn't there yet."""
    from dotenv import load_dotenv
    load_dotenv()

    host     = os.getenv("DATABASE_HOST",     "localhost")
    port     = int(os.getenv("DATABASE_PORT", "3306"))
    name     = os.getenv("DATABASE_NAME",     "ai_career_platform")
    user     = os.getenv("DATABASE_USER",     "root")
    password = os.getenv("DATABASE_PASSWORD", "")

    try:
        import pymysql
        conn = pymysql.connect(host=host, port=port, user=user,
                               password=password, charset="utf8mb4")
        cursor = conn.cursor()
        cursor.execute(
            f"CREATE DATABASE IF NOT EXISTS `{name}` "
            f"CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
        )
        conn.commit()
        cursor.close()
        conn.close()
        print(f"  ✅  Database '{name}' ready.")
    except Exception as exc:
        print(f"  ❌  Could not create/verify database: {exc}")
        print("      → Make sure MySQL is running and credentials in .env are correct.")
        sys.exit(1)


# ── Step 1: Run migrations ────────────────────────────────────────────────────
def run_migrations(app):
    """Run flask db upgrade to create / update tables."""
    from flask_migrate import upgrade
    with app.app_context():
        try:
            upgrade()
            print("  ✅  Migrations applied.")
        except Exception as exc:
            print(f"  ⚠️   Migration warning (tables may already exist): {exc}")


# ── Step 2: Seed data ─────────────────────────────────────────────────────────
WEBSITES = {
    "Google": "https://about.google", "Microsoft": "https://microsoft.com",
    "Amazon": "https://amazon.com", "Meta": "https://about.meta.com",
    "Apple": "https://apple.com", "Adobe": "https://adobe.com",
    "Netflix": "https://netflix.com", "Oracle": "https://oracle.com",
    "Salesforce": "https://salesforce.com", "NVIDIA": "https://nvidia.com",
    "Intel": "https://intel.com", "SAP": "https://sap.com",
    "PayPal": "https://paypal.com", "Uber": "https://uber.com",
    "Atlassian": "https://atlassian.com", "LinkedIn": "https://linkedin.com",
    "Zoom": "https://zoom.us", "TCS": "https://tcs.com",
    "Infosys": "https://infosys.com", "Wipro": "https://wipro.com",
    "Accenture": "https://accenture.com", "Cognizant": "https://cognizant.com",
    "Capgemini": "https://capgemini.com", "HCLTech": "https://hcltech.com",
    "Tech Mahindra": "https://techmahindra.com", "IBM": "https://ibm.com",
    "Deloitte": "https://deloitte.com", "Persistent Systems": "https://persistent.com",
    "Mphasis": "https://mphasis.com", "Hexaware": "https://hexaware.com",
    "Razorpay": "https://razorpay.com", "CRED": "https://cred.club",
    "Freshworks": "https://freshworks.com", "Zerodha": "https://zerodha.com",
    "Groww": "https://groww.in", "PhonePe": "https://phonepe.com",
    "Swiggy": "https://swiggy.com", "Zomato": "https://zomato.com",
    "BrowserStack": "https://browserstack.com", "Postman": "https://postman.com",
    "InMobi": "https://inmobi.com", "Chargebee": "https://chargebee.com",
    "Upstox": "https://upstox.com", "Rapido": "https://rapido.bike",
    "Darwinbox": "https://darwinbox.com", "ShareChat": "https://sharechat.com",
    "Juspay": "https://juspay.in", "Ather Energy": "https://atherenergy.com",
    "Mindtickle": "https://mindtickle.com", "Ninjacart": "https://ninjacart.com",
    "Porter": "https://porter.in", "Coforge": "https://coforge.com",
}


def seed(app):
    from database import db
    from models.company import Company, CompanyRole, RequiredSkill
    from data.companies import COMPANIES

    with app.app_context():
        print("=" * 62)
        print("  AI Career Platform — Database Seeder")
        print("=" * 62)

        companies_added = companies_updated = 0
        roles_added = roles_deleted = 0
        skills_added = skills_deleted = 0

        for company_name, company_data in COMPANIES.items():

            # ── Upsert Company ───────────────────────────────────────────
            company_row = (
                Company.query
                .filter(db.func.lower(Company.name) == company_name.lower())
                .first()
            )

            raw_locations = company_data.get("locations", [])
            if isinstance(raw_locations, str):
                raw_locations = [raw_locations]

            if not company_row:
                company_row = Company(
                    name            = company_name,
                    description     = company_data.get("description", ""),
                    logo            = company_data.get("logo", "/logos/image.png"),
                    website         = WEBSITES.get(company_name, ""),
                    package         = company_data.get("package", ""),
                    difficulty      = company_data.get("difficulty", "Medium"),
                    hiring_category = company_data.get("hiring_category", ""),
                    locations_json  = json.dumps(raw_locations),
                )
                db.session.add(company_row)
                db.session.flush()
                companies_added += 1
                print(f"  [ADD]    Company: {company_name}")
            else:
                # Update metadata in case it changed
                company_row.description     = company_data.get("description", "")
                company_row.logo            = company_data.get("logo", "/logos/image.png")
                company_row.website         = WEBSITES.get(company_name, company_row.website or "")
                company_row.package         = company_data.get("package", "")
                company_row.difficulty      = company_data.get("difficulty", "Medium")
                company_row.hiring_category = company_data.get("hiring_category", "")
                company_row.locations_json  = json.dumps(raw_locations)
                companies_updated += 1

            roles_dict = company_data.get("roles", {})

            # ── Remove roles no longer in the source file ─────────────
            existing_role_rows = {
                r.role_name.lower(): r
                for r in CompanyRole.query.filter_by(company_id=company_row.id).all()
            }
            source_role_keys = {name.lower() for name in roles_dict}

            for old_key, old_row in existing_role_rows.items():
                if old_key not in source_role_keys:
                    db.session.delete(old_row)
                    roles_deleted += 1
                    print(f"    [DEL]  Role removed: {old_row.role_name}")

            # ── Upsert each role ─────────────────────────────────────
            for role_name, role_data in roles_dict.items():
                if not isinstance(role_data, dict):
                    continue

                preferred = role_data.get("preferred_skills", [])
                sg        = role_data.get("skill_groups", {})

                role_row = existing_role_rows.get(role_name.lower())

                if not role_row:
                    # Check one more time by query (handles flush timing)
                    role_row = (
                        CompanyRole.query
                        .filter_by(company_id=company_row.id)
                        .filter(db.func.lower(CompanyRole.role_name) == role_name.lower())
                        .first()
                    )

                if not role_row:
                    role_row = CompanyRole(
                        company_id            = company_row.id,
                        role_name             = role_name,
                        package               = role_data.get("package", ""),
                        location              = role_data.get("location", ""),
                        difficulty            = role_data.get("difficulty", "Medium"),
                        hiring_category       = role_data.get("hiring_category", ""),
                        role_description      = role_data.get("role_description", ""),
                        preferred_skills_json = json.dumps(preferred),
                        skill_groups_json     = json.dumps(sg),
                    )
                    db.session.add(role_row)
                    db.session.flush()
                    roles_added += 1
                else:
                    # Update role metadata
                    role_row.package               = role_data.get("package", "")
                    role_row.location              = role_data.get("location", "")
                    role_row.difficulty            = role_data.get("difficulty", "Medium")
                    role_row.hiring_category       = role_data.get("hiring_category", "")
                    role_row.role_description      = role_data.get("role_description", "")
                    role_row.preferred_skills_json = json.dumps(preferred)
                    role_row.skill_groups_json     = json.dumps(sg)
                    db.session.flush()

                # ── Sync required skills ─────────────────────────────
                source_skills = set(role_data.get("skills", []))
                existing_skills = {
                    s.skill_name: s
                    for s in RequiredSkill.query.filter_by(role_id=role_row.id).all()
                }

                # Delete skills no longer in source
                for sk_name, sk_row in existing_skills.items():
                    if not any(sk_name.lower() == s.lower() for s in source_skills):
                        db.session.delete(sk_row)
                        skills_deleted += 1

                # Add new skills
                existing_lower = {s.lower() for s in existing_skills}
                for skill_name in source_skills:
                    if skill_name.lower() not in existing_lower:
                        db.session.add(RequiredSkill(
                            role_id    = role_row.id,
                            skill_name = skill_name,
                        ))
                        skills_added += 1

        # ── Commit ───────────────────────────────────────────────────────
        try:
            db.session.commit()
            print()
            print("=" * 62)
            print(f"  ✅  Seed complete!")
            print(f"      Companies added   : {companies_added}")
            print(f"      Companies updated : {companies_updated}")
            print(f"      Roles added       : {roles_added}")
            print(f"      Roles removed     : {roles_deleted}")
            print(f"      Skills added      : {skills_added}")
            print(f"      Skills removed    : {skills_deleted}")
            print("=" * 62)
        except Exception as exc:
            db.session.rollback()
            print(f"\n  ❌  Seed FAILED: {exc}")
            sys.exit(1)


# ── Main ──────────────────────────────────────────────────────────────────────
if __name__ == "__main__":
    print("\n[1/3] Ensuring database exists...")
    ensure_database_exists()

    print("[2/3] Running migrations...")
    from app import create_app
    app = create_app()
    run_migrations(app)

    print("[3/3] Seeding data...")
    seed(app)
