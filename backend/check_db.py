# check_db.py — Run this to verify your MySQL connection before seeding
# Usage:  python check_db.py
import sys, os
sys.path.insert(0, os.path.dirname(__file__))

from dotenv import load_dotenv
load_dotenv()

host     = os.getenv("DATABASE_HOST", "localhost")
port     = int(os.getenv("DATABASE_PORT", "3306"))
name     = os.getenv("DATABASE_NAME", "ai_career_platform")
user     = os.getenv("DATABASE_USER", "root")
password = os.getenv("DATABASE_PASSWORD", "")

print(f"Testing connection to MySQL...")
print(f"  Host    : {host}:{port}")
print(f"  Database: {name}")
print(f"  User    : {user}")
print(f"  Password: {'(set)' if password and password != 'your_mysql_password_here' else '(NOT SET — update .env!)'}")
print()

if not password or password == "your_mysql_password_here":
    print("❌  PASSWORD NOT SET.")
    print("   Open backend/.env and set DATABASE_PASSWORD to your MySQL root password.")
    sys.exit(1)

try:
    import pymysql
    conn = pymysql.connect(host=host, port=port, user=user,
                           password=password, charset="utf8mb4")
    conn.close()
    print(f"✅  Connection successful!")
    print(f"\nYou can now run the seeder:")
    print(f"   python seed.py")
except Exception as exc:
    print(f"❌  Connection FAILED: {exc}")
    print()
    print("Common fixes:")
    print("  1. Make sure MySQL service is running")
    print("  2. Check DATABASE_PASSWORD in backend/.env")
    print("  3. Make sure root user can connect from localhost")
    sys.exit(1)
