# data/companies.py
# ─────────────────────────────────────────────────────────────────────────────
# 25 companies × multiple roles.
# Each role entry is a dict (NOT a plain list) so we can carry full metadata.
#
# Schema per role:
#   skills           – list[str]  required technical skills (used for ATS)
#   preferred_skills – list[str]  nice-to-have / bonus skills
#   skill_groups     – dict       skills grouped by category for the UI
#   package          – str        e.g. "18–35 LPA"
#   location         – str
#   difficulty       – "Easy" | "Medium" | "Hard"
#   hiring_category  – "Product" | "Service" | "Startup"
#   description      – str        one-line company description
#   role_description – str        one-line role description
#
# BACKWARD COMPAT: COMPANIES[company][role] is still dict-like, so old code
# that did `COMPANIES.get(company, {}).get(role)` will get the dict back.
# The /analyze route now calls get_required_skills() instead.
# ─────────────────────────────────────────────────────────────────────────────

def _role(skills, preferred_skills, package, location, difficulty,
          hiring_category, description, role_description, skill_groups):
    return {
        "skills":           skills,
        "preferred_skills": preferred_skills,
        "skill_groups":     skill_groups,
        "package":          package,
        "location":         location,
        "difficulty":       difficulty,
        "hiring_category":  hiring_category,
        "description":      description,
        "role_description": role_description,
    }


COMPANIES = {

# ═══════════════════════════════════════════════════════
#  PRODUCT COMPANIES
# ═══════════════════════════════════════════════════════

"Google": {
    "description": "Global technology leader in search, cloud, AI, and advertising.",
    "roles": {
        "Software Engineer": _role(
            skills=["Python","Java","C++","DSA","System Design","SQL","Git","OOP","DBMS","Computer Networks","Operating System","Docker"],
            preferred_skills=["Kubernetes","GCP","Go","React","Kafka"],
            package="18–35 LPA", location="Bangalore / Hyderabad", difficulty="Hard",
            hiring_category="Product",
            description="Global technology leader in search, cloud, AI, and advertising.",
            role_description="Design and build large-scale distributed systems, APIs, and infrastructure.",
            skill_groups={
                "Programming Languages": ["Python","Java","C++"],
                "CS Fundamentals": ["DSA","OOP","DBMS","Operating System","Computer Networks"],
                "Databases": ["SQL"],
                "DevOps & Cloud": ["Docker","Git"],
                "Preferred": ["Kubernetes","GCP","Go","Kafka"],
            }
        ),
        "Backend Engineer": _role(
            skills=["Python","Go","Java","DSA","System Design","SQL","PostgreSQL","Docker","Kubernetes","Git"],
            preferred_skills=["GCP","Kafka","Redis","gRPC"],
            package="20–40 LPA", location="Bangalore", difficulty="Hard",
            hiring_category="Product",
            description="Global technology leader in search, cloud, AI, and advertising.",
            role_description="Build reliable, scalable microservices and data pipelines.",
            skill_groups={
                "Programming Languages": ["Python","Go","Java"],
                "Databases": ["SQL","PostgreSQL"],
                "DevOps & Cloud": ["Docker","Kubernetes","Git"],
                "CS Fundamentals": ["DSA","System Design"],
                "Preferred": ["GCP","Kafka","Redis","gRPC"],
            }
        ),
        "Frontend Engineer": _role(
            skills=["JavaScript","TypeScript","React","HTML","CSS","Git","DSA","REST API"],
            preferred_skills=["GraphQL","Redux","Next.js","Webpack"],
            package="16–30 LPA", location="Bangalore / Hyderabad", difficulty="Hard",
            hiring_category="Product",
            description="Global technology leader in search, cloud, AI, and advertising.",
            role_description="Build performant, accessible user interfaces at global scale.",
            skill_groups={
                "Programming Languages": ["JavaScript","TypeScript"],
                "Frameworks": ["React"],
                "Web": ["HTML","CSS"],
                "APIs": ["REST API"],
                "Tools": ["Git"],
                "Preferred": ["GraphQL","Redux","Next.js"],
            }
        ),
        "Machine Learning Engineer": _role(
            skills=["Python","Machine Learning","Deep Learning","TensorFlow","PyTorch","SQL","NumPy","Pandas","DSA","Git"],
            preferred_skills=["GCP","Kubernetes","Scikit-learn","Spark","MLflow"],
            package="22–45 LPA", location="Bangalore / Hyderabad", difficulty="Hard",
            hiring_category="Product",
            description="Global technology leader in search, cloud, AI, and advertising.",
            role_description="Design, train, and deploy production ML models at scale.",
            skill_groups={
                "Programming Languages": ["Python"],
                "ML / AI": ["Machine Learning","Deep Learning","TensorFlow","PyTorch","Scikit-learn"],
                "Data": ["NumPy","Pandas","SQL"],
                "Tools": ["Git"],
                "Preferred": ["GCP","Kubernetes","Spark","MLflow"],
            }
        ),
    }
},

"Microsoft": {
    "description": "Creator of Windows, Azure Cloud, Microsoft 365, and GitHub.",
    "roles": {
        "Software Engineer": _role(
            skills=["C#","Java","Python","DSA","Azure","SQL","Git","OOP","System Design","DBMS"],
            preferred_skills=["TypeScript","React","Docker","Kubernetes","PowerShell"],
            package="16–30 LPA", location="Hyderabad / Bangalore", difficulty="Hard",
            hiring_category="Product",
            description="Creator of Windows, Azure Cloud, Microsoft 365, and GitHub.",
            role_description="Build and maintain Microsoft's core products and cloud services.",
            skill_groups={
                "Programming Languages": ["C#","Java","Python"],
                "Cloud": ["Azure"],
                "Databases": ["SQL"],
                "CS Fundamentals": ["DSA","OOP","System Design","DBMS"],
                "Tools": ["Git"],
                "Preferred": ["TypeScript","React","Docker","Kubernetes"],
            }
        ),
        "Cloud Engineer": _role(
            skills=["Azure","Python","Docker","Kubernetes","Linux","Terraform","Git","SQL","Networking"],
            preferred_skills=["AWS","GCP","Ansible","Jenkins","Prometheus"],
            package="18–35 LPA", location="Hyderabad", difficulty="Hard",
            hiring_category="Product",
            description="Creator of Windows, Azure Cloud, Microsoft 365, and GitHub.",
            role_description="Design, deploy, and operate cloud infrastructure on Azure.",
            skill_groups={
                "Cloud": ["Azure"],
                "DevOps": ["Docker","Kubernetes","Terraform","Ansible"],
                "Programming Languages": ["Python"],
                "OS & Networking": ["Linux","Networking"],
                "Databases": ["SQL"],
                "Tools": ["Git"],
                "Preferred": ["AWS","GCP","Jenkins","Prometheus"],
            }
        ),
        "AI Engineer": _role(
            skills=["Python","Machine Learning","Deep Learning","Azure","SQL","Git","NumPy","Pandas","REST API"],
            preferred_skills=["TensorFlow","PyTorch","MLflow","Spark","C#"],
            package="20–40 LPA", location="Hyderabad / Bangalore", difficulty="Hard",
            hiring_category="Product",
            description="Creator of Windows, Azure Cloud, Microsoft 365, and GitHub.",
            role_description="Develop AI/ML solutions integrated into Azure and Microsoft products.",
            skill_groups={
                "ML / AI": ["Machine Learning","Deep Learning"],
                "Cloud": ["Azure"],
                "Data": ["NumPy","Pandas","SQL"],
                "APIs": ["REST API"],
                "Tools": ["Git"],
                "Preferred": ["TensorFlow","PyTorch","MLflow","Spark"],
            }
        ),
        "Backend Engineer": _role(
            skills=["C#","Java","Python","SQL","REST API","Git","Docker","DSA","OOP","Microservices"],
            preferred_skills=["Kafka","Redis","gRPC","TypeScript","Azure"],
            package="16–32 LPA", location="Hyderabad", difficulty="Hard",
            hiring_category="Product",
            description="Creator of Windows, Azure Cloud, Microsoft 365, and GitHub.",
            role_description="Architect and build high-performance backend services.",
            skill_groups={
                "Programming Languages": ["C#","Java","Python"],
                "Databases": ["SQL"],
                "APIs": ["REST API","Microservices"],
                "DevOps": ["Docker"],
                "CS Fundamentals": ["DSA","OOP"],
                "Tools": ["Git"],
                "Preferred": ["Kafka","Redis","Azure"],
            }
        ),
    }
},

"Amazon": {
    "description": "E-commerce, cloud computing (AWS), and AI services at global scale.",
    "roles": {
        "SDE I": _role(
            skills=["Java","Python","DSA","OOP","SQL","Git","System Design","OS","Computer Networks","DBMS"],
            preferred_skills=["AWS","Docker","Spring Boot","Linux"],
            package="18–32 LPA", location="Hyderabad / Bangalore", difficulty="Hard",
            hiring_category="Product",
            description="E-commerce, cloud computing (AWS), and AI services at global scale.",
            role_description="Entry-level software development role focused on scalable system design.",
            skill_groups={
                "Programming Languages": ["Java","Python"],
                "CS Fundamentals": ["DSA","OOP","OS","Computer Networks","DBMS"],
                "Databases": ["SQL"],
                "Design": ["System Design"],
                "Tools": ["Git"],
                "Preferred": ["AWS","Docker","Spring Boot","Linux"],
            }
        ),
        "Backend Engineer": _role(
            skills=["Java","Python","AWS","SQL","Docker","Git","Linux","DSA","System Design","Microservices"],
            preferred_skills=["Kafka","DynamoDB","Spring Boot","Kubernetes","Redis"],
            package="20–40 LPA", location="Hyderabad / Bangalore", difficulty="Hard",
            hiring_category="Product",
            description="E-commerce, cloud computing (AWS), and AI services at global scale.",
            role_description="Build distributed backend services powering Amazon's platform.",
            skill_groups={
                "Programming Languages": ["Java","Python"],
                "Cloud": ["AWS"],
                "Databases": ["SQL"],
                "DevOps": ["Docker","Kubernetes","Linux"],
                "Architecture": ["System Design","Microservices"],
                "Tools": ["Git"],
                "Preferred": ["Kafka","DynamoDB","Spring Boot","Redis"],
            }
        ),
        "DevOps Engineer": _role(
            skills=["AWS","Docker","Kubernetes","Linux","Python","Terraform","CI/CD","Git","Bash","Networking"],
            preferred_skills=["Jenkins","Ansible","Prometheus","ELK Stack","Go"],
            package="18–35 LPA", location="Hyderabad / Bangalore", difficulty="Hard",
            hiring_category="Product",
            description="E-commerce, cloud computing (AWS), and AI services at global scale.",
            role_description="Automate deployment pipelines and maintain cloud infrastructure.",
            skill_groups={
                "Cloud": ["AWS"],
                "DevOps": ["Docker","Kubernetes","Terraform","CI/CD","Ansible"],
                "OS & Scripting": ["Linux","Bash","Python"],
                "Networking": ["Networking"],
                "Tools": ["Git"],
                "Preferred": ["Jenkins","Prometheus","ELK Stack","Go"],
            }
        ),
        "Frontend Engineer": _role(
            skills=["JavaScript","TypeScript","React","HTML","CSS","Git","REST API","DSA"],
            preferred_skills=["Next.js","Redux","GraphQL","A11y","Webpack"],
            package="16–28 LPA", location="Hyderabad", difficulty="Hard",
            hiring_category="Product",
            description="E-commerce, cloud computing (AWS), and AI services at global scale.",
            role_description="Build customer-facing UI for Amazon's retail and AWS console.",
            skill_groups={
                "Programming Languages": ["JavaScript","TypeScript"],
                "Frameworks": ["React"],
                "Web": ["HTML","CSS"],
                "APIs": ["REST API"],
                "CS Fundamentals": ["DSA"],
                "Tools": ["Git"],
                "Preferred": ["Next.js","Redux","GraphQL"],
            }
        ),
    }
},

"Meta": {
    "description": "Social media giant behind Facebook, Instagram, WhatsApp, and Threads.",
    "logo": "/logos/meta.png",
    "locations": ["Hyderabad", "Bangalore"],
    "package": "25–55 LPA",
    "difficulty": "Hard",
    "hiring_category": "Product",
    "roles": {
        "Software Engineer": _role(
            skills=["Python","C++","Java","JavaScript","React","DSA","System Design","SQL","Git","OOP"],
            preferred_skills=["Hack","GraphQL","PyTorch","Spark","Kubernetes"],
            package="25–50 LPA", location="Hyderabad / Bangalore", difficulty="Hard",
            hiring_category="Product",
            description="Social media giant behind Facebook, Instagram, WhatsApp, and Threads.",
            role_description="Build features and infrastructure for Meta's 3B+ user platforms.",
            skill_groups={
                "Programming Languages": ["Python","C++","Java","JavaScript"],
                "Frameworks": ["React"],
                "CS Fundamentals": ["DSA","OOP","System Design"],
                "Databases": ["SQL"],
                "Tools": ["Git"],
                "Preferred": ["Hack","GraphQL","PyTorch","Spark"],
            }
        ),
        "Machine Learning Engineer": _role(
            skills=["Python","Machine Learning","Deep Learning","PyTorch","SQL","NumPy","Pandas","DSA","Git","Distributed Systems"],
            preferred_skills=["Spark","Kubernetes","Triton","ONNX","MLflow"],
            package="30–55 LPA", location="Hyderabad", difficulty="Hard",
            hiring_category="Product",
            description="Social media giant behind Facebook, Instagram, WhatsApp, and Threads.",
            role_description="Train and ship large-scale ranking and recommendation ML models.",
            skill_groups={
                "ML / AI": ["Machine Learning","Deep Learning","PyTorch"],
                "Data": ["NumPy","Pandas","SQL"],
                "Systems": ["Distributed Systems"],
                "CS Fundamentals": ["DSA"],
                "Tools": ["Git"],
                "Preferred": ["Spark","Kubernetes","Triton","MLflow"],
            }
        ),
        "Backend Engineer": _role(
            skills=["Python","C++","Java","SQL","REST API","Git","DSA","System Design","Microservices","Linux"],
            preferred_skills=["Hack","Kafka","Cassandra","GraphQL","gRPC"],
            package="25–48 LPA", location="Hyderabad", difficulty="Hard",
            hiring_category="Product",
            description="Social media giant behind Facebook, Instagram, WhatsApp, and Threads.",
            role_description="Design distributed backend systems serving billions of requests.",
            skill_groups={
                "Programming Languages": ["Python","C++","Java"],
                "APIs": ["REST API","Microservices"],
                "Databases": ["SQL"],
                "CS Fundamentals": ["DSA","System Design"],
                "OS": ["Linux"],
                "Tools": ["Git"],
                "Preferred": ["Hack","Kafka","Cassandra","GraphQL"],
            }
        ),
        "Data Engineer": _role(
            skills=["Python","SQL","Spark","Hadoop","Kafka","Airflow","Git","Linux","DBMS"],
            preferred_skills=["Scala","Hive","Presto","Flink","dbt"],
            package="22–42 LPA", location="Hyderabad", difficulty="Hard",
            hiring_category="Product",
            description="Social media giant behind Facebook, Instagram, WhatsApp, and Threads.",
            role_description="Build and maintain petabyte-scale data pipelines for analytics and ML.",
            skill_groups={
                "Programming Languages": ["Python","Scala"],
                "Data Engineering": ["Spark","Hadoop","Kafka","Airflow","Hive"],
                "Databases": ["SQL","DBMS"],
                "OS": ["Linux"],
                "Tools": ["Git"],
                "Preferred": ["Presto","Flink","dbt"],
            }
        ),
    }
},

"Apple": {
    "description": "Creator of iPhone, Mac, iOS, and Apple Silicon.",
    "logo": "/logos/apple.png",
    "locations": ["Hyderabad", "Bangalore"],
    "package": "25–50 LPA",
    "difficulty": "Hard",
    "hiring_category": "Product",
    "roles": {
        "iOS Developer": _role(
            skills=["Swift","Objective-C","Xcode","Git","DSA","OOP","Core Data","REST API"],
            preferred_skills=["SwiftUI","Combine","ARKit","CoreML","C++"],
            package="22–45 LPA", location="Hyderabad", difficulty="Hard",
            hiring_category="Product",
            description="Creator of iPhone, Mac, iOS, and Apple Silicon.",
            role_description="Build delightful iOS applications and frameworks shipped to billions of users.",
            skill_groups={
                "Programming Languages": ["Swift","Objective-C"],
                "Frameworks": ["Core Data","SwiftUI"],
                "APIs": ["REST API"],
                "CS Fundamentals": ["DSA","OOP"],
                "Tools": ["Xcode","Git"],
                "Preferred": ["Combine","ARKit","CoreML","C++"],
            }
        ),
        "Software Engineer": _role(
            skills=["C++","Python","Swift","DSA","OOP","Git","System Design","Operating System","Computer Networks"],
            preferred_skills=["Metal","LLVM","CoreML","CUDA","Rust"],
            package="25–50 LPA", location="Hyderabad / Bangalore", difficulty="Hard",
            hiring_category="Product",
            description="Creator of iPhone, Mac, iOS, and Apple Silicon.",
            role_description="Develop core OS and systems software for Apple platforms.",
            skill_groups={
                "Programming Languages": ["C++","Python","Swift"],
                "CS Fundamentals": ["DSA","OOP","Operating System","Computer Networks"],
                "Design": ["System Design"],
                "Tools": ["Git"],
                "Preferred": ["Metal","LLVM","CoreML","CUDA","Rust"],
            }
        ),
        "Machine Learning Engineer": _role(
            skills=["Python","Machine Learning","Deep Learning","CoreML","NumPy","Pandas","Git","DSA"],
            preferred_skills=["TensorFlow","PyTorch","Swift","Metal","Triton"],
            package="28–55 LPA", location="Hyderabad", difficulty="Hard",
            hiring_category="Product",
            description="Creator of iPhone, Mac, iOS, and Apple Silicon.",
            role_description="Build on-device ML models powering Siri, FaceID, and Photos.",
            skill_groups={
                "ML / AI": ["Machine Learning","Deep Learning","CoreML"],
                "Data": ["NumPy","Pandas"],
                "CS Fundamentals": ["DSA"],
                "Tools": ["Git"],
                "Preferred": ["TensorFlow","PyTorch","Swift","Metal"],
            }
        ),
    }
},

"Adobe": {
    "description": "Creative software leader: Photoshop, Illustrator, Acrobat, and Experience Cloud.",
    "logo": "/logos/adobe.png",
    "locations": ["Bangalore", "Noida"],
    "package": "14–28 LPA",
    "difficulty": "Medium",
    "hiring_category": "Product",
    "roles": {
        "Software Engineer": _role(
            skills=["Java","Python","JavaScript","React","SQL","Git","REST API","DSA","OOP"],
            preferred_skills=["TypeScript","Docker","AWS","Node.js","GraphQL"],
            package="14–28 LPA", location="Bangalore / Noida", difficulty="Medium",
            hiring_category="Product",
            description="Creative software leader: Photoshop, Illustrator, Acrobat, and Experience Cloud.",
            role_description="Build Adobe's cloud products and creative platform APIs.",
            skill_groups={
                "Programming Languages": ["Java","Python","JavaScript"],
                "Frameworks": ["React"],
                "Databases": ["SQL"],
                "APIs": ["REST API"],
                "CS Fundamentals": ["DSA","OOP"],
                "Tools": ["Git"],
                "Preferred": ["TypeScript","Docker","AWS","Node.js"],
            }
        ),
        "Frontend Engineer": _role(
            skills=["JavaScript","TypeScript","React","HTML","CSS","Git","REST API","DSA"],
            preferred_skills=["Redux","Angular","WebAssembly","Canvas API","Jest"],
            package="12–24 LPA", location="Bangalore", difficulty="Medium",
            hiring_category="Product",
            description="Creative software leader: Photoshop, Illustrator, Acrobat, and Experience Cloud.",
            role_description="Develop rich interactive UI for Creative Cloud and Document Cloud.",
            skill_groups={
                "Programming Languages": ["JavaScript","TypeScript"],
                "Frameworks": ["React"],
                "Web": ["HTML","CSS"],
                "APIs": ["REST API"],
                "CS Fundamentals": ["DSA"],
                "Tools": ["Git"],
                "Preferred": ["Redux","Angular","WebAssembly","Canvas API"],
            }
        ),
        "Data Engineer": _role(
            skills=["Python","SQL","Spark","Airflow","Kafka","Git","DBMS","Linux"],
            preferred_skills=["Scala","Snowflake","dbt","GCP","Tableau"],
            package="14–26 LPA", location="Bangalore", difficulty="Medium",
            hiring_category="Product",
            description="Creative software leader: Photoshop, Illustrator, Acrobat, and Experience Cloud.",
            role_description="Design data pipelines powering Adobe Analytics and Experience Platform.",
            skill_groups={
                "Data Engineering": ["Spark","Airflow","Kafka"],
                "Databases": ["SQL","DBMS"],
                "Programming Languages": ["Python"],
                "OS": ["Linux"],
                "Tools": ["Git"],
                "Preferred": ["Scala","Snowflake","dbt","GCP"],
            }
        ),
    }
},

"Netflix": {
    "description": "World's leading entertainment streaming service with 270M+ subscribers.",
    "logo": "/logos/netflix.png",
    "locations": ["Bangalore"],
    "package": "40–80 LPA",
    "difficulty": "Hard",
    "hiring_category": "Product",
    "roles": {
        "Software Engineer": _role(
            skills=["Java","Python","Go","DSA","System Design","SQL","Git","Microservices","Linux","Networking"],
            preferred_skills=["Kafka","Cassandra","Spinnaker","AWS","Kotlin"],
            package="40–80 LPA", location="Bangalore", difficulty="Hard",
            hiring_category="Product",
            description="World's leading entertainment streaming service with 270M+ subscribers.",
            role_description="Build and operate the systems that stream content to 270M+ users globally.",
            skill_groups={
                "Programming Languages": ["Java","Python","Go"],
                "Architecture": ["System Design","Microservices"],
                "CS Fundamentals": ["DSA"],
                "Databases": ["SQL"],
                "OS & Networking": ["Linux","Networking"],
                "Tools": ["Git"],
                "Preferred": ["Kafka","Cassandra","Spinnaker","AWS"],
            }
        ),
        "Backend Engineer": _role(
            skills=["Java","Python","Spring Boot","SQL","REST API","Git","DSA","System Design","Docker"],
            preferred_skills=["Kafka","Redis","Kubernetes","Go","Cassandra"],
            package="38–75 LPA", location="Bangalore", difficulty="Hard",
            hiring_category="Product",
            description="World's leading entertainment streaming service with 270M+ subscribers.",
            role_description="Design resilient microservices for Netflix's recommendation and streaming platform.",
            skill_groups={
                "Programming Languages": ["Java","Python"],
                "Frameworks": ["Spring Boot"],
                "Databases": ["SQL"],
                "APIs": ["REST API"],
                "DevOps": ["Docker"],
                "CS Fundamentals": ["DSA","System Design"],
                "Tools": ["Git"],
                "Preferred": ["Kafka","Redis","Kubernetes","Go"],
            }
        ),
        "Site Reliability Engineer": _role(
            skills=["Python","Go","Linux","Kubernetes","Docker","AWS","Terraform","Git","Networking","Bash"],
            preferred_skills=["Prometheus","Grafana","Spinnaker","Ansible","Java"],
            package="35–70 LPA", location="Bangalore", difficulty="Hard",
            hiring_category="Product",
            description="World's leading entertainment streaming service with 270M+ subscribers.",
            role_description="Ensure 99.99% uptime for the world's largest streaming platform.",
            skill_groups={
                "Cloud": ["AWS"],
                "DevOps": ["Kubernetes","Docker","Terraform","Ansible"],
                "Programming Languages": ["Python","Go"],
                "OS & Scripting": ["Linux","Bash"],
                "Networking": ["Networking"],
                "Tools": ["Git"],
                "Preferred": ["Prometheus","Grafana","Spinnaker"],
            }
        ),
    }
},

"Oracle": {
    "description": "Enterprise database, cloud infrastructure, and business software leader.",
    "logo": "/logos/oracle.png",
    "locations": ["Bangalore", "Hyderabad"],
    "package": "12–24 LPA",
    "difficulty": "Medium",
    "hiring_category": "Product",
    "roles": {
        "Software Engineer": _role(
            skills=["Java","C++","SQL","Oracle DB","PL/SQL","Git","OOP","DSA","Linux"],
            preferred_skills=["Python","Spring Boot","Docker","Kubernetes","OCI"],
            package="12–24 LPA", location="Bangalore / Hyderabad", difficulty="Medium",
            hiring_category="Product",
            description="Enterprise database, cloud infrastructure, and business software leader.",
            role_description="Develop Oracle's database engine, cloud services, and enterprise applications.",
            skill_groups={
                "Programming Languages": ["Java","C++"],
                "Databases": ["SQL","Oracle DB","PL/SQL"],
                "CS Fundamentals": ["DSA","OOP"],
                "OS": ["Linux"],
                "Tools": ["Git"],
                "Preferred": ["Python","Spring Boot","Docker","Kubernetes","OCI"],
            }
        ),
        "Cloud Infrastructure Engineer": _role(
            skills=["Python","OCI","Docker","Kubernetes","Linux","Terraform","Git","Networking","SQL"],
            preferred_skills=["AWS","Azure","Ansible","Go","Prometheus"],
            package="14–28 LPA", location="Bangalore", difficulty="Medium",
            hiring_category="Product",
            description="Enterprise database, cloud infrastructure, and business software leader.",
            role_description="Build and scale Oracle Cloud Infrastructure (OCI) services.",
            skill_groups={
                "Cloud": ["OCI"],
                "DevOps": ["Docker","Kubernetes","Terraform","Ansible"],
                "Programming Languages": ["Python","Go"],
                "OS & Networking": ["Linux","Networking"],
                "Databases": ["SQL"],
                "Tools": ["Git"],
                "Preferred": ["AWS","Azure","Prometheus"],
            }
        ),
        "Database Administrator": _role(
            skills=["Oracle DB","SQL","PL/SQL","Linux","Backup & Recovery","Performance Tuning","Git"],
            preferred_skills=["Python","RAC","Data Guard","Exadata","PostgreSQL"],
            package="10–20 LPA", location="Hyderabad", difficulty="Medium",
            hiring_category="Product",
            description="Enterprise database, cloud infrastructure, and business software leader.",
            role_description="Administer, tune, and secure Oracle database systems for enterprise clients.",
            skill_groups={
                "Databases": ["Oracle DB","SQL","PL/SQL"],
                "OS": ["Linux"],
                "DBA": ["Backup & Recovery","Performance Tuning"],
                "Tools": ["Git"],
                "Preferred": ["Python","RAC","Data Guard","Exadata"],
            }
        ),
    }
},

"Salesforce": {
    "description": "World's #1 CRM platform — Sales Cloud, Service Cloud, and Einstein AI.",
    "logo": "/logos/salesforce.png",
    "locations": ["Hyderabad", "Bangalore"],
    "package": "16–32 LPA",
    "difficulty": "Medium",
    "hiring_category": "Product",
    "roles": {
        "Software Engineer": _role(
            skills=["Java","Python","JavaScript","Apex","SQL","Git","OOP","REST API","DSA"],
            preferred_skills=["Lightning Web Components","SOQL","Salesforce DX","Docker","React"],
            package="16–32 LPA", location="Hyderabad", difficulty="Medium",
            hiring_category="Product",
            description="World's #1 CRM platform — Sales Cloud, Service Cloud, and Einstein AI.",
            role_description="Build features on Salesforce's multi-tenant SaaS platform.",
            skill_groups={
                "Programming Languages": ["Java","Python","JavaScript","Apex"],
                "Databases": ["SQL","SOQL"],
                "APIs": ["REST API"],
                "CS Fundamentals": ["DSA","OOP"],
                "Tools": ["Git"],
                "Preferred": ["Lightning Web Components","Salesforce DX","Docker","React"],
            }
        ),
        "Salesforce Developer": _role(
            skills=["Apex","SOQL","Lightning Web Components","JavaScript","Git","REST API","OOP"],
            preferred_skills=["Flow Builder","Salesforce DX","Python","Heroku","CI/CD"],
            package="12–24 LPA", location="Hyderabad / Bangalore", difficulty="Medium",
            hiring_category="Product",
            description="World's #1 CRM platform — Sales Cloud, Service Cloud, and Einstein AI.",
            role_description="Develop custom solutions on the Salesforce Platform using Apex and LWC.",
            skill_groups={
                "Salesforce": ["Apex","SOQL","Lightning Web Components","Flow Builder"],
                "Programming Languages": ["JavaScript"],
                "APIs": ["REST API"],
                "CS Fundamentals": ["OOP"],
                "Tools": ["Git"],
                "Preferred": ["Salesforce DX","Python","Heroku","CI/CD"],
            }
        ),
        "Data Engineer": _role(
            skills=["Python","SQL","Spark","Kafka","Airflow","Git","REST API","DBMS"],
            preferred_skills=["Snowflake","dbt","Tableau","Heroku","Scala"],
            package="14–28 LPA", location="Hyderabad", difficulty="Medium",
            hiring_category="Product",
            description="World's #1 CRM platform — Sales Cloud, Service Cloud, and Einstein AI.",
            role_description="Build data pipelines powering Einstein Analytics and Tableau CRM.",
            skill_groups={
                "Data Engineering": ["Spark","Kafka","Airflow"],
                "Databases": ["SQL","DBMS"],
                "Programming Languages": ["Python"],
                "APIs": ["REST API"],
                "Tools": ["Git"],
                "Preferred": ["Snowflake","dbt","Tableau","Scala"],
            }
        ),
    }
},

"NVIDIA": {
    "description": "Leader in GPU computing, AI accelerators, and autonomous driving technology.",
    "logo": "/logos/nvidia.png",
    "locations": ["Pune", "Hyderabad", "Bangalore"],
    "package": "20–50 LPA",
    "difficulty": "Hard",
    "hiring_category": "Product",
    "roles": {
        "CUDA Developer": _role(
            skills=["C++","Python","CUDA","GPU Programming","Linear Algebra","DSA","Git","Linux","OOP"],
            preferred_skills=["TensorRT","Triton","OpenCL","MPI","CMake"],
            package="25–50 LPA", location="Pune / Hyderabad", difficulty="Hard",
            hiring_category="Product",
            description="Leader in GPU computing, AI accelerators, and autonomous driving technology.",
            role_description="Optimize compute kernels and libraries for NVIDIA GPU architectures.",
            skill_groups={
                "Programming Languages": ["C++","Python"],
                "GPU": ["CUDA","GPU Programming"],
                "Math": ["Linear Algebra"],
                "CS Fundamentals": ["DSA","OOP"],
                "OS": ["Linux"],
                "Tools": ["Git"],
                "Preferred": ["TensorRT","Triton","OpenCL","MPI"],
            }
        ),
        "Machine Learning Engineer": _role(
            skills=["Python","Deep Learning","PyTorch","TensorFlow","CUDA","NumPy","Git","Linux","DSA"],
            preferred_skills=["TensorRT","Triton","Kubernetes","MLflow","Spark"],
            package="22–45 LPA", location="Pune / Bangalore", difficulty="Hard",
            hiring_category="Product",
            description="Leader in GPU computing, AI accelerators, and autonomous driving technology.",
            role_description="Train and optimize large-scale AI models on NVIDIA hardware.",
            skill_groups={
                "ML / AI": ["Deep Learning","PyTorch","TensorFlow"],
                "GPU": ["CUDA"],
                "Data": ["NumPy"],
                "OS": ["Linux"],
                "CS Fundamentals": ["DSA"],
                "Tools": ["Git"],
                "Preferred": ["TensorRT","Triton","Kubernetes","MLflow"],
            }
        ),
        "Software Engineer": _role(
            skills=["C++","Python","Linux","Git","DSA","OOP","System Design","CMake","Debugging"],
            preferred_skills=["CUDA","Go","Rust","Docker","gRPC"],
            package="20–40 LPA", location="Hyderabad / Bangalore", difficulty="Hard",
            hiring_category="Product",
            description="Leader in GPU computing, AI accelerators, and autonomous driving technology.",
            role_description="Develop drivers, compilers, and system software for NVIDIA platforms.",
            skill_groups={
                "Programming Languages": ["C++","Python"],
                "Build & Debug": ["CMake","Debugging"],
                "CS Fundamentals": ["DSA","OOP","System Design"],
                "OS": ["Linux"],
                "Tools": ["Git"],
                "Preferred": ["CUDA","Go","Rust","Docker"],
            }
        ),
    }
},

"Intel": {
    "description": "Semiconductor giant powering CPUs, AI accelerators, and edge computing.",
    "logo": "/logos/intel.png",
    "locations": ["Bangalore", "Hyderabad", "Pune"],
    "package": "12–28 LPA",
    "difficulty": "Medium",
    "hiring_category": "Product",
    "roles": {
        "Software Engineer": _role(
            skills=["C","C++","Python","Linux","Git","DSA","OOP","Computer Architecture","Debugging"],
            preferred_skills=["CUDA","OpenCL","CMake","Rust","Assembly"],
            package="12–28 LPA", location="Bangalore / Hyderabad", difficulty="Medium",
            hiring_category="Product",
            description="Semiconductor giant powering CPUs, AI accelerators, and edge computing.",
            role_description="Develop firmware, drivers, and software stacks for Intel silicon.",
            skill_groups={
                "Programming Languages": ["C","C++","Python"],
                "Low-Level": ["Computer Architecture","Assembly","CMake"],
                "CS Fundamentals": ["DSA","OOP"],
                "OS": ["Linux","Debugging"],
                "Tools": ["Git"],
                "Preferred": ["CUDA","OpenCL","Rust"],
            }
        ),
        "AI Software Engineer": _role(
            skills=["Python","Machine Learning","Deep Learning","OpenVINO","NumPy","Git","Linux","DSA"],
            preferred_skills=["PyTorch","TensorFlow","ONNX","C++","CUDA"],
            package="16–30 LPA", location="Bangalore", difficulty="Medium",
            hiring_category="Product",
            description="Semiconductor giant powering CPUs, AI accelerators, and edge computing.",
            role_description="Build AI inference optimizations for Intel Xeon and Gaudi platforms.",
            skill_groups={
                "ML / AI": ["Machine Learning","Deep Learning","OpenVINO"],
                "Data": ["NumPy"],
                "OS": ["Linux"],
                "CS Fundamentals": ["DSA"],
                "Tools": ["Git"],
                "Preferred": ["PyTorch","TensorFlow","ONNX","C++"],
            }
        ),
        "VLSI Engineer": _role(
            skills=["Verilog","VHDL","SystemVerilog","C","Linux","Git","Digital Design","DSA"],
            preferred_skills=["UVM","TCL","Python","Synopsys Tools","FPGA"],
            package="10–22 LPA", location="Bangalore / Hyderabad / Pune", difficulty="Medium",
            hiring_category="Product",
            description="Semiconductor giant powering CPUs, AI accelerators, and edge computing.",
            role_description="Design and verify digital logic for Intel processor architectures.",
            skill_groups={
                "Hardware": ["Verilog","VHDL","SystemVerilog","Digital Design","FPGA"],
                "Programming Languages": ["C"],
                "OS": ["Linux"],
                "Scripting": ["TCL","Python"],
                "CS Fundamentals": ["DSA"],
                "Tools": ["Git"],
                "Preferred": ["UVM","Synopsys Tools"],
            }
        ),
    }
},

# ═══════════════════════════════════════════════════════
#  SERVICE COMPANIES
# ═══════════════════════════════════════════════════════

"TCS": {
    "description": "India's largest IT services company with 600,000+ employees worldwide.",
    "logo": "/logos/tcs.png",
    "locations": ["Pan-India (Hyderabad, Bangalore, Chennai, Pune, Kolkata)"],
    "package": "3.5–7 LPA",
    "difficulty": "Easy",
    "hiring_category": "Service",
    "roles": {
        "Assistant System Engineer": _role(
            skills=["Java","Python","SQL","HTML","CSS","JavaScript","Git","OOP","DBMS"],
            preferred_skills=["Spring Boot","React","Testing","Linux","Selenium"],
            package="3.5–6 LPA", location="Pan-India", difficulty="Easy",
            hiring_category="Service",
            description="India's largest IT services company with 600,000+ employees worldwide.",
            role_description="Entry-level role: develop, test, and maintain enterprise software.",
            skill_groups={
                "Programming Languages": ["Java","Python","JavaScript"],
                "Web": ["HTML","CSS"],
                "Databases": ["SQL","DBMS"],
                "CS Fundamentals": ["OOP"],
                "Tools": ["Git"],
                "Preferred": ["Spring Boot","React","Testing","Selenium"],
            }
        ),
        "Systems Engineer": _role(
            skills=["Java","Python","SQL","Git","OOP","Linux","Testing","DBMS","REST API"],
            preferred_skills=["Docker","Kubernetes","Angular","AWS","Jenkins"],
            package="5–8 LPA", location="Pan-India", difficulty="Easy",
            hiring_category="Service",
            description="India's largest IT services company with 600,000+ employees worldwide.",
            role_description="Design and develop client-facing enterprise software solutions.",
            skill_groups={
                "Programming Languages": ["Java","Python"],
                "Databases": ["SQL","DBMS"],
                "OS": ["Linux"],
                "Testing": ["Testing"],
                "APIs": ["REST API"],
                "Tools": ["Git"],
                "Preferred": ["Docker","Kubernetes","Angular","AWS"],
            }
        ),
        "Test Engineer": _role(
            skills=["Java","Selenium","Manual Testing","SQL","Git","OOP","REST API","JIRA"],
            preferred_skills=["Cucumber","TestNG","Postman","Python","CI/CD"],
            package="4–7 LPA", location="Pan-India", difficulty="Easy",
            hiring_category="Service",
            description="India's largest IT services company with 600,000+ employees worldwide.",
            role_description="Write automated and manual test cases for enterprise client projects.",
            skill_groups={
                "Testing": ["Manual Testing","Selenium","TestNG","Cucumber"],
                "Programming Languages": ["Java"],
                "Databases": ["SQL"],
                "APIs": ["REST API"],
                "Tools": ["Git","JIRA","Postman"],
                "Preferred": ["Python","CI/CD"],
            }
        ),
    }
},

"Infosys": {
    "description": "Global IT consulting and digital transformation services leader.",
    "logo": "/logos/infosys.png",
    "locations": ["Bangalore", "Hyderabad", "Pune", "Chennai", "Mysore"],
    "package": "3.6–8 LPA",
    "difficulty": "Easy",
    "hiring_category": "Service",
    "roles": {
        "Systems Engineer": _role(
            skills=["Java","Python","SQL","HTML","CSS","JavaScript","Git","OOP","DBMS"],
            preferred_skills=["Spring Boot","React","Selenium","Linux","Angular"],
            package="3.6–6.5 LPA", location="Bangalore / Hyderabad / Pune", difficulty="Easy",
            hiring_category="Service",
            description="Global IT consulting and digital transformation services leader.",
            role_description="Develop and maintain enterprise applications for global clients.",
            skill_groups={
                "Programming Languages": ["Java","Python","JavaScript"],
                "Web": ["HTML","CSS"],
                "Databases": ["SQL","DBMS"],
                "CS Fundamentals": ["OOP"],
                "Tools": ["Git"],
                "Preferred": ["Spring Boot","React","Selenium","Linux"],
            }
        ),
        "Technology Analyst": _role(
            skills=["Java","Python","SQL","REST API","Git","OOP","DBMS","Linux","Agile"],
            preferred_skills=["Docker","AWS","React","TypeScript","Jenkins"],
            package="6–10 LPA", location="Bangalore / Hyderabad", difficulty="Medium",
            hiring_category="Service",
            description="Global IT consulting and digital transformation services leader.",
            role_description="Lead small teams delivering digital transformation projects.",
            skill_groups={
                "Programming Languages": ["Java","Python"],
                "Databases": ["SQL","DBMS"],
                "APIs": ["REST API"],
                "Process": ["Agile"],
                "OS": ["Linux"],
                "Tools": ["Git"],
                "Preferred": ["Docker","AWS","React","TypeScript"],
            }
        ),
        "Digital Specialist Engineer": _role(
            skills=["Python","Machine Learning","SQL","Spark","Git","REST API","DBMS","Linux"],
            preferred_skills=["TensorFlow","Scikit-learn","Tableau","AWS","Kafka"],
            package="5–9 LPA", location="Bangalore / Hyderabad", difficulty="Medium",
            hiring_category="Service",
            description="Global IT consulting and digital transformation services leader.",
            role_description="Build digital and AI-powered solutions in Infosys's specialist units.",
            skill_groups={
                "ML / AI": ["Machine Learning"],
                "Data Engineering": ["Spark","Kafka"],
                "Databases": ["SQL","DBMS"],
                "Programming Languages": ["Python"],
                "APIs": ["REST API"],
                "OS": ["Linux"],
                "Tools": ["Git"],
                "Preferred": ["TensorFlow","Scikit-learn","Tableau","AWS"],
            }
        ),
    }
},

"Wipro": {
    "description": "IT services, consulting, and business process outsourcing company.",
    "logo": "/logos/wipro.png",
    "locations": ["Bangalore", "Hyderabad", "Pune", "Chennai", "Kolkata"],
    "package": "3.5–7 LPA",
    "difficulty": "Easy",
    "hiring_category": "Service",
    "roles": {
        "Project Engineer": _role(
            skills=["Java","Python","SQL","HTML","CSS","JavaScript","Git","OOP","Testing"],
            preferred_skills=["Spring Boot","React","Selenium","Linux","DBMS"],
            package="3.5–6 LPA", location="Pan-India", difficulty="Easy",
            hiring_category="Service",
            description="IT services, consulting, and business process outsourcing company.",
            role_description="Develop and test enterprise client applications across domains.",
            skill_groups={
                "Programming Languages": ["Java","Python","JavaScript"],
                "Web": ["HTML","CSS"],
                "Databases": ["SQL"],
                "Testing": ["Testing"],
                "CS Fundamentals": ["OOP"],
                "Tools": ["Git"],
                "Preferred": ["Spring Boot","React","Selenium","Linux"],
            }
        ),
        "Software Engineer": _role(
            skills=["Java","Python","SQL","REST API","Git","OOP","DBMS","Linux","Agile"],
            preferred_skills=["Docker","AWS","Angular","TypeScript","Jenkins"],
            package="5–8 LPA", location="Bangalore / Hyderabad / Pune", difficulty="Easy",
            hiring_category="Service",
            description="IT services, consulting, and business process outsourcing company.",
            role_description="Design and build client-specific software applications.",
            skill_groups={
                "Programming Languages": ["Java","Python"],
                "Databases": ["SQL","DBMS"],
                "APIs": ["REST API"],
                "CS Fundamentals": ["OOP"],
                "OS": ["Linux"],
                "Process": ["Agile"],
                "Tools": ["Git"],
                "Preferred": ["Docker","AWS","Angular","TypeScript"],
            }
        ),
        "Cloud Engineer": _role(
            skills=["AWS","Python","Docker","Linux","Git","Networking","SQL","Terraform"],
            preferred_skills=["Azure","Kubernetes","Ansible","Jenkins","GCP"],
            package="6–10 LPA", location="Bangalore / Hyderabad", difficulty="Medium",
            hiring_category="Service",
            description="IT services, consulting, and business process outsourcing company.",
            role_description="Migrate and manage enterprise workloads on public cloud platforms.",
            skill_groups={
                "Cloud": ["AWS"],
                "DevOps": ["Docker","Terraform","Ansible","Kubernetes"],
                "Programming Languages": ["Python"],
                "OS & Networking": ["Linux","Networking"],
                "Databases": ["SQL"],
                "Tools": ["Git"],
                "Preferred": ["Azure","Jenkins","GCP"],
            }
        ),
    }
},

"Accenture": {
    "description": "Global professional services company: strategy, consulting, and technology.",
    "logo": "/logos/accenture.png",
    "locations": ["Hyderabad", "Bangalore", "Chennai", "Pune", "Mumbai"],
    "package": "4.5–10 LPA",
    "difficulty": "Easy",
    "hiring_category": "Service",
    "roles": {
        "Associate Software Engineer": _role(
            skills=["Java","Python","SQL","JavaScript","Git","OOP","HTML","CSS","REST API"],
            preferred_skills=["React","Angular","Spring Boot","Docker","Testing"],
            package="4.5–8 LPA", location="Pan-India", difficulty="Easy",
            hiring_category="Service",
            description="Global professional services company: strategy, consulting, and technology.",
            role_description="Build and maintain enterprise software for Accenture clients.",
            skill_groups={
                "Programming Languages": ["Java","Python","JavaScript"],
                "Web": ["HTML","CSS"],
                "Databases": ["SQL"],
                "APIs": ["REST API"],
                "CS Fundamentals": ["OOP"],
                "Tools": ["Git"],
                "Preferred": ["React","Angular","Spring Boot","Docker"],
            }
        ),
        "Cloud Practitioner": _role(
            skills=["AWS","Azure","Python","Docker","Linux","Git","Networking","SQL"],
            preferred_skills=["GCP","Kubernetes","Terraform","Jenkins","Ansible"],
            package="6–12 LPA", location="Hyderabad / Bangalore / Pune", difficulty="Medium",
            hiring_category="Service",
            description="Global professional services company: strategy, consulting, and technology.",
            role_description="Deliver cloud migration and modernisation projects for enterprise clients.",
            skill_groups={
                "Cloud": ["AWS","Azure"],
                "DevOps": ["Docker","Kubernetes","Terraform","Ansible"],
                "Programming Languages": ["Python"],
                "OS & Networking": ["Linux","Networking"],
                "Databases": ["SQL"],
                "Tools": ["Git"],
                "Preferred": ["GCP","Jenkins"],
            }
        ),
        "Data Analyst": _role(
            skills=["Python","SQL","Pandas","NumPy","Tableau","Git","Excel","DBMS"],
            preferred_skills=["Power BI","Spark","Scikit-learn","R","Snowflake"],
            package="5–9 LPA", location="Hyderabad / Bangalore", difficulty="Easy",
            hiring_category="Service",
            description="Global professional services company: strategy, consulting, and technology.",
            role_description="Analyse data and build dashboards for client reporting.",
            skill_groups={
                "Data Analysis": ["Pandas","NumPy","Excel"],
                "Visualisation": ["Tableau","Power BI"],
                "Databases": ["SQL","DBMS"],
                "Programming Languages": ["Python"],
                "Tools": ["Git"],
                "Preferred": ["Spark","Scikit-learn","R","Snowflake"],
            }
        ),
    }
},

"Cognizant": {
    "description": "IT services and consulting company focused on digital, cloud, and AI.",
    "logo": "/logos/cognizant.png",
    "locations": ["Chennai", "Hyderabad", "Bangalore", "Pune", "Kolkata"],
    "package": "4–8 LPA",
    "difficulty": "Easy",
    "hiring_category": "Service",
    "roles": {
        "Programmer Analyst Trainee": _role(
            skills=["Java","Python","SQL","HTML","CSS","JavaScript","Git","OOP","DBMS"],
            preferred_skills=["React","Testing","Selenium","Linux","Spring Boot"],
            package="4–7 LPA", location="Pan-India", difficulty="Easy",
            hiring_category="Service",
            description="IT services and consulting company focused on digital, cloud, and AI.",
            role_description="Entry-level development role on client IT projects.",
            skill_groups={
                "Programming Languages": ["Java","Python","JavaScript"],
                "Web": ["HTML","CSS"],
                "Databases": ["SQL","DBMS"],
                "CS Fundamentals": ["OOP"],
                "Tools": ["Git"],
                "Preferred": ["React","Testing","Selenium","Linux"],
            }
        ),
        "Software Engineer": _role(
            skills=["Java","Python","SQL","REST API","Git","OOP","Linux","Agile","DBMS"],
            preferred_skills=["Docker","React","AWS","TypeScript","Kafka"],
            package="5–9 LPA", location="Chennai / Hyderabad / Bangalore", difficulty="Easy",
            hiring_category="Service",
            description="IT services and consulting company focused on digital, cloud, and AI.",
            role_description="Develop enterprise software and APIs for global Cognizant clients.",
            skill_groups={
                "Programming Languages": ["Java","Python"],
                "Databases": ["SQL","DBMS"],
                "APIs": ["REST API"],
                "CS Fundamentals": ["OOP"],
                "OS": ["Linux"],
                "Process": ["Agile"],
                "Tools": ["Git"],
                "Preferred": ["Docker","React","AWS","TypeScript"],
            }
        ),
        "Test Engineer": _role(
            skills=["Java","Selenium","Manual Testing","SQL","Git","REST API","JIRA","OOP"],
            preferred_skills=["Cucumber","TestNG","Postman","Python","CI/CD"],
            package="4–7 LPA", location="Pan-India", difficulty="Easy",
            hiring_category="Service",
            description="IT services and consulting company focused on digital, cloud, and AI.",
            role_description="Plan and execute test strategies for enterprise client applications.",
            skill_groups={
                "Testing": ["Manual Testing","Selenium","TestNG","Cucumber"],
                "Programming Languages": ["Java"],
                "Databases": ["SQL"],
                "APIs": ["REST API"],
                "CS Fundamentals": ["OOP"],
                "Tools": ["Git","JIRA","Postman"],
                "Preferred": ["Python","CI/CD"],
            }
        ),
    }
},

"Capgemini": {
    "description": "French multinational IT services and consulting group.",
    "logo": "/logos/capgemini.png",
    "locations": ["Mumbai", "Pune", "Bangalore", "Hyderabad", "Chennai"],
    "package": "4–9 LPA",
    "difficulty": "Easy",
    "hiring_category": "Service",
    "roles": {
        "Software Analyst": _role(
            skills=["Java","Python","SQL","JavaScript","Git","OOP","REST API","DBMS"],
            preferred_skills=["React","Spring Boot","Docker","AWS","Testing"],
            package="4–8 LPA", location="Pan-India", difficulty="Easy",
            hiring_category="Service",
            description="French multinational IT services and consulting group.",
            role_description="Deliver software analysis and development on client engagements.",
            skill_groups={
                "Programming Languages": ["Java","Python","JavaScript"],
                "Databases": ["SQL","DBMS"],
                "APIs": ["REST API"],
                "CS Fundamentals": ["OOP"],
                "Tools": ["Git"],
                "Preferred": ["React","Spring Boot","Docker","AWS"],
            }
        ),
        "Cloud Developer": _role(
            skills=["AWS","Python","Docker","Linux","Git","SQL","REST API","Terraform"],
            preferred_skills=["Azure","Kubernetes","Ansible","Jenkins","GCP"],
            package="6–11 LPA", location="Mumbai / Pune / Bangalore", difficulty="Medium",
            hiring_category="Service",
            description="French multinational IT services and consulting group.",
            role_description="Build and manage cloud-native applications for enterprise clients.",
            skill_groups={
                "Cloud": ["AWS"],
                "DevOps": ["Docker","Terraform","Kubernetes","Ansible"],
                "Programming Languages": ["Python"],
                "OS": ["Linux"],
                "Databases": ["SQL"],
                "APIs": ["REST API"],
                "Tools": ["Git"],
                "Preferred": ["Azure","Jenkins","GCP"],
            }
        ),
        "SAP Consultant": _role(
            skills=["SAP ABAP","SQL","OOP","Git","Python","REST API","DBMS","Excel"],
            preferred_skills=["SAP S/4HANA","SAP Fiori","JavaScript","JIRA","Agile"],
            package="5–10 LPA", location="Mumbai / Pune", difficulty="Medium",
            hiring_category="Service",
            description="French multinational IT services and consulting group.",
            role_description="Implement and customise SAP ERP solutions for enterprise clients.",
            skill_groups={
                "SAP": ["SAP ABAP","SAP S/4HANA","SAP Fiori"],
                "Databases": ["SQL","DBMS"],
                "CS Fundamentals": ["OOP"],
                "Data": ["Excel"],
                "APIs": ["REST API"],
                "Tools": ["Git","JIRA"],
                "Preferred": ["JavaScript","Agile"],
            }
        ),
    }
},

"HCLTech": {
    "description": "Indian multinational IT services company with strong engineering focus.",
    "logo": "/logos/hcltech.png",
    "locations": ["Noida", "Bangalore", "Chennai", "Hyderabad", "Pune"],
    "package": "4–8 LPA",
    "difficulty": "Easy",
    "hiring_category": "Service",
    "roles": {
        "Graduate Engineer Trainee": _role(
            skills=["Java","Python","SQL","HTML","CSS","JavaScript","Git","OOP","DBMS"],
            preferred_skills=["Spring Boot","React","Selenium","Linux","Testing"],
            package="4–7 LPA", location="Pan-India", difficulty="Easy",
            hiring_category="Service",
            description="Indian multinational IT services company with strong engineering focus.",
            role_description="Entry-level software engineering on enterprise client projects.",
            skill_groups={
                "Programming Languages": ["Java","Python","JavaScript"],
                "Web": ["HTML","CSS"],
                "Databases": ["SQL","DBMS"],
                "CS Fundamentals": ["OOP"],
                "Tools": ["Git"],
                "Preferred": ["Spring Boot","React","Selenium","Linux"],
            }
        ),
        "Software Engineer": _role(
            skills=["Java","Python","SQL","REST API","Git","OOP","Linux","DBMS","Agile"],
            preferred_skills=["Docker","Kubernetes","AWS","React","Jenkins"],
            package="5–9 LPA", location="Noida / Bangalore / Hyderabad", difficulty="Easy",
            hiring_category="Service",
            description="Indian multinational IT services company with strong engineering focus.",
            role_description="Develop scalable software applications for HCL's global clients.",
            skill_groups={
                "Programming Languages": ["Java","Python"],
                "Databases": ["SQL","DBMS"],
                "APIs": ["REST API"],
                "CS Fundamentals": ["OOP"],
                "OS": ["Linux"],
                "Process": ["Agile"],
                "Tools": ["Git"],
                "Preferred": ["Docker","Kubernetes","AWS","React"],
            }
        ),
    }
},

"Tech Mahindra": {
    "description": "IT services and solutions company focused on telecom, media, and enterprise.",
    "logo": "/logos/techmahindra.png",
    "locations": ["Pune", "Hyderabad", "Bangalore", "Chennai", "Noida"],
    "package": "4–8 LPA",
    "difficulty": "Easy",
    "hiring_category": "Service",
    "roles": {
        "Software Engineer": _role(
            skills=["Java","Python","SQL","JavaScript","Git","OOP","REST API","DBMS","HTML","CSS"],
            preferred_skills=["React","Spring Boot","Docker","Selenium","Linux"],
            package="4–8 LPA", location="Pan-India", difficulty="Easy",
            hiring_category="Service",
            description="IT services and solutions company focused on telecom, media, and enterprise.",
            role_description="Develop enterprise software applications for Tech Mahindra clients.",
            skill_groups={
                "Programming Languages": ["Java","Python","JavaScript"],
                "Web": ["HTML","CSS"],
                "Databases": ["SQL","DBMS"],
                "APIs": ["REST API"],
                "CS Fundamentals": ["OOP"],
                "Tools": ["Git"],
                "Preferred": ["React","Spring Boot","Docker","Selenium"],
            }
        ),
        "Network Engineer": _role(
            skills=["Networking","Linux","Python","SQL","Git","Bash","TCP/IP","OSPF"],
            preferred_skills=["AWS","Docker","Ansible","CCNA","Wireshark"],
            package="5–9 LPA", location="Pune / Hyderabad", difficulty="Medium",
            hiring_category="Service",
            description="IT services and solutions company focused on telecom, media, and enterprise.",
            role_description="Design and maintain network infrastructure for telecom clients.",
            skill_groups={
                "Networking": ["Networking","TCP/IP","OSPF"],
                "OS & Scripting": ["Linux","Bash"],
                "Programming Languages": ["Python"],
                "Databases": ["SQL"],
                "Tools": ["Git","Wireshark"],
                "Preferred": ["AWS","Docker","Ansible","CCNA"],
            }
        ),
    }
},

"IBM": {
    "description": "Technology and consulting company: hybrid cloud, AI (watsonx), and quantum.",
    "logo": "/logos/ibm.png",
    "locations": ["Bangalore", "Hyderabad", "Pune", "Delhi"],
    "package": "8–18 LPA",
    "difficulty": "Medium",
    "hiring_category": "Service",
    "roles": {
        "Application Developer": _role(
            skills=["Java","Python","SQL","Docker","Git","REST API","Linux","OOP","DBMS"],
            preferred_skills=["OpenShift","Kubernetes","Node.js","TypeScript","Spring Boot"],
            package="8–15 LPA", location="Bangalore / Hyderabad", difficulty="Medium",
            hiring_category="Service",
            description="Technology and consulting company: hybrid cloud, AI (watsonx), and quantum.",
            role_description="Build cloud-native applications on IBM Cloud and Red Hat OpenShift.",
            skill_groups={
                "Programming Languages": ["Java","Python"],
                "Cloud & DevOps": ["Docker","Kubernetes","OpenShift"],
                "Databases": ["SQL","DBMS"],
                "APIs": ["REST API"],
                "CS Fundamentals": ["OOP"],
                "OS": ["Linux"],
                "Tools": ["Git"],
                "Preferred": ["Node.js","TypeScript","Spring Boot"],
            }
        ),
        "AI Engineer": _role(
            skills=["Python","Machine Learning","SQL","Git","NumPy","Pandas","REST API","Linux"],
            preferred_skills=["watsonx","TensorFlow","PyTorch","Kubernetes","Spark"],
            package="10–18 LPA", location="Bangalore / Hyderabad", difficulty="Medium",
            hiring_category="Service",
            description="Technology and consulting company: hybrid cloud, AI (watsonx), and quantum.",
            role_description="Build AI solutions using IBM watsonx and open-source ML frameworks.",
            skill_groups={
                "ML / AI": ["Machine Learning","watsonx"],
                "Data": ["NumPy","Pandas","SQL"],
                "APIs": ["REST API"],
                "OS": ["Linux"],
                "Tools": ["Git"],
                "Preferred": ["TensorFlow","PyTorch","Kubernetes","Spark"],
            }
        ),
        "Cloud Engineer": _role(
            skills=["AWS","Azure","Docker","Kubernetes","Linux","Terraform","Python","Git","SQL"],
            preferred_skills=["OpenShift","Ansible","Go","IBM Cloud","Prometheus"],
            package="10–18 LPA", location="Bangalore / Pune", difficulty="Medium",
            hiring_category="Service",
            description="Technology and consulting company: hybrid cloud, AI (watsonx), and quantum.",
            role_description="Deploy and manage hybrid cloud solutions for IBM enterprise clients.",
            skill_groups={
                "Cloud": ["AWS","Azure"],
                "DevOps": ["Docker","Kubernetes","Terraform","Ansible"],
                "Programming Languages": ["Python","Go"],
                "OS": ["Linux"],
                "Databases": ["SQL"],
                "Tools": ["Git"],
                "Preferred": ["OpenShift","IBM Cloud","Prometheus"],
            }
        ),
    }
},

"Persistent Systems": {
    "description": "Product engineering and digital transformation services company.",
    "logo": "/logos/image.png",
    "locations": ["Pune", "Nagpur", "Bangalore", "Hyderabad"],
    "package": "5–10 LPA",
    "difficulty": "Easy",
    "hiring_category": "Service",
    "roles": {
        "Software Engineer": _role(
            skills=["Java","Python","SQL","Git","OOP","REST API","JavaScript","DBMS","HTML"],
            preferred_skills=["React","Spring Boot","Docker","AWS","Testing"],
            package="5–10 LPA", location="Pune / Bangalore", difficulty="Easy",
            hiring_category="Service",
            description="Product engineering and digital transformation services company.",
            role_description="Develop product engineering solutions for ISV and enterprise clients.",
            skill_groups={
                "Programming Languages": ["Java","Python","JavaScript"],
                "Web": ["HTML"],
                "Databases": ["SQL","DBMS"],
                "APIs": ["REST API"],
                "CS Fundamentals": ["OOP"],
                "Tools": ["Git"],
                "Preferred": ["React","Spring Boot","Docker","AWS"],
            }
        ),
        "DevOps Engineer": _role(
            skills=["Docker","Kubernetes","Linux","Python","Git","AWS","Terraform","CI/CD","Bash"],
            preferred_skills=["Jenkins","Ansible","Prometheus","Azure","Go"],
            package="6–12 LPA", location="Pune / Hyderabad", difficulty="Medium",
            hiring_category="Service",
            description="Product engineering and digital transformation services company.",
            role_description="Build CI/CD pipelines and manage cloud infrastructure for client products.",
            skill_groups={
                "DevOps": ["Docker","Kubernetes","Terraform","CI/CD","Ansible"],
                "Cloud": ["AWS"],
                "OS & Scripting": ["Linux","Bash","Python"],
                "Tools": ["Git","Jenkins"],
                "Preferred": ["Prometheus","Azure","Go"],
            }
        ),
    }
},

# ═══════════════════════════════════════════════════════
#  STARTUP COMPANIES
# ═══════════════════════════════════════════════════════

"Razorpay": {
    "description": "India's leading B2B payments and fintech infrastructure platform.",
    "logo": "/logos/image.png",
    "locations": ["Bangalore"],
    "package": "12–22 LPA",
    "difficulty": "Medium",
    "hiring_category": "Startup",
    "roles": {
        "Software Engineer": _role(
            skills=["Go","Python","Java","SQL","Kafka","Redis","Git","Docker","DSA","REST API"],
            preferred_skills=["Kubernetes","AWS","gRPC","PostgreSQL","Microservices"],
            package="12–22 LPA", location="Bangalore", difficulty="Medium",
            hiring_category="Startup",
            description="India's leading B2B payments and fintech infrastructure platform.",
            role_description="Build highly reliable payment systems processing millions of transactions.",
            skill_groups={
                "Programming Languages": ["Go","Python","Java"],
                "Messaging": ["Kafka"],
                "Caching": ["Redis"],
                "Databases": ["SQL","PostgreSQL"],
                "DevOps": ["Docker"],
                "APIs": ["REST API"],
                "CS Fundamentals": ["DSA"],
                "Tools": ["Git"],
                "Preferred": ["Kubernetes","AWS","gRPC","Microservices"],
            }
        ),
        "Backend Engineer": _role(
            skills=["Go","Python","PostgreSQL","Redis","Kafka","Git","DSA","System Design","Linux"],
            preferred_skills=["Kubernetes","AWS","gRPC","Temporal","ElasticSearch"],
            package="14–25 LPA", location="Bangalore", difficulty="Medium",
            hiring_category="Startup",
            description="India's leading B2B payments and fintech infrastructure platform.",
            role_description="Design and build Razorpay's core payments and banking APIs.",
            skill_groups={
                "Programming Languages": ["Go","Python"],
                "Databases": ["PostgreSQL"],
                "Caching & Messaging": ["Redis","Kafka"],
                "CS Fundamentals": ["DSA","System Design"],
                "OS": ["Linux"],
                "Tools": ["Git"],
                "Preferred": ["Kubernetes","AWS","gRPC","ElasticSearch"],
            }
        ),
        "SRE": _role(
            skills=["Linux","Python","Docker","Kubernetes","AWS","Terraform","Git","Bash","Networking"],
            preferred_skills=["Prometheus","Grafana","Ansible","Go","ELK Stack"],
            package="14–24 LPA", location="Bangalore", difficulty="Medium",
            hiring_category="Startup",
            description="India's leading B2B payments and fintech infrastructure platform.",
            role_description="Maintain 99.99% uptime for Razorpay's payment infrastructure.",
            skill_groups={
                "Cloud": ["AWS"],
                "DevOps": ["Docker","Kubernetes","Terraform","Ansible"],
                "OS & Scripting": ["Linux","Bash","Python"],
                "Networking": ["Networking"],
                "Tools": ["Git"],
                "Preferred": ["Prometheus","Grafana","Go","ELK Stack"],
            }
        ),
    }
},

"CRED": {
    "description": "Members-only fintech platform for creditworthy Indians — payments, rewards, and lending.",
    "logo": "/logos/image.png",
    "locations": ["Bangalore"],
    "package": "20–40 LPA",
    "difficulty": "Hard",
    "hiring_category": "Startup",
    "roles": {
        "Software Engineer": _role(
            skills=["Go","Python","Kotlin","SQL","Kafka","Redis","Docker","Git","DSA","System Design"],
            preferred_skills=["Kubernetes","PostgreSQL","gRPC","Microservices","AWS"],
            package="20–40 LPA", location="Bangalore", difficulty="Hard",
            hiring_category="Startup",
            description="Members-only fintech platform for creditworthy Indians.",
            role_description="Build high-quality fintech products with a craft-first engineering culture.",
            skill_groups={
                "Programming Languages": ["Go","Python","Kotlin"],
                "Databases": ["SQL","PostgreSQL"],
                "Caching & Messaging": ["Kafka","Redis"],
                "DevOps": ["Docker","Kubernetes"],
                "CS Fundamentals": ["DSA","System Design"],
                "Tools": ["Git"],
                "Preferred": ["gRPC","Microservices","AWS"],
            }
        ),
        "Backend Engineer": _role(
            skills=["Go","Python","PostgreSQL","Kafka","Redis","Git","System Design","Linux","DSA"],
            preferred_skills=["Kubernetes","AWS","Temporal","ElasticSearch","gRPC"],
            package="22–42 LPA", location="Bangalore", difficulty="Hard",
            hiring_category="Startup",
            description="Members-only fintech platform for creditworthy Indians.",
            role_description="Architect and build CRED's credit and rewards platform backend.",
            skill_groups={
                "Programming Languages": ["Go","Python"],
                "Databases": ["PostgreSQL"],
                "Caching & Messaging": ["Kafka","Redis"],
                "CS Fundamentals": ["System Design","DSA"],
                "OS": ["Linux"],
                "Tools": ["Git"],
                "Preferred": ["Kubernetes","AWS","Temporal","ElasticSearch"],
            }
        ),
    }
},

"Freshworks": {
    "description": "NASDAQ-listed SaaS company: CRM, helpdesk, and ITSM products built in India.",
    "logo": "/logos/image.png",
    "locations": ["Chennai", "Bangalore", "Hyderabad"],
    "package": "10–22 LPA",
    "difficulty": "Medium",
    "hiring_category": "Startup",
    "roles": {
        "Software Engineer": _role(
            skills=["Ruby on Rails","Python","JavaScript","React","SQL","Git","REST API","DSA","OOP"],
            preferred_skills=["Kafka","Redis","Docker","AWS","TypeScript"],
            package="10–20 LPA", location="Chennai / Bangalore", difficulty="Medium",
            hiring_category="Startup",
            description="NASDAQ-listed SaaS company: CRM, helpdesk, and ITSM products built in India.",
            role_description="Build scalable multi-tenant SaaS features for Freshworks product suite.",
            skill_groups={
                "Programming Languages": ["Ruby on Rails","Python","JavaScript"],
                "Frameworks": ["React"],
                "Databases": ["SQL"],
                "APIs": ["REST API"],
                "CS Fundamentals": ["DSA","OOP"],
                "Tools": ["Git"],
                "Preferred": ["Kafka","Redis","Docker","AWS"],
            }
        ),
        "Backend Engineer": _role(
            skills=["Ruby on Rails","Python","Java","SQL","Redis","Kafka","Git","REST API","DSA","System Design"],
            preferred_skills=["Docker","Kubernetes","AWS","gRPC","TypeScript"],
            package="12–22 LPA", location="Chennai / Bangalore", difficulty="Medium",
            hiring_category="Startup",
            description="NASDAQ-listed SaaS company: CRM, helpdesk, and ITSM products built in India.",
            role_description="Design backend APIs and microservices for Freshworks SaaS products.",
            skill_groups={
                "Programming Languages": ["Ruby on Rails","Python","Java"],
                "Databases": ["SQL"],
                "Caching & Messaging": ["Redis","Kafka"],
                "APIs": ["REST API"],
                "CS Fundamentals": ["DSA","System Design"],
                "Tools": ["Git"],
                "Preferred": ["Docker","Kubernetes","AWS"],
            }
        ),
        "SRE": _role(
            skills=["Linux","Python","Docker","Kubernetes","AWS","Terraform","Git","Bash"],
            preferred_skills=["Prometheus","Grafana","Ansible","Go","ELK Stack"],
            package="12–22 LPA", location="Chennai", difficulty="Medium",
            hiring_category="Startup",
            description="NASDAQ-listed SaaS company: CRM, helpdesk, and ITSM products built in India.",
            role_description="Ensure reliability and scalability of Freshworks SaaS infrastructure.",
            skill_groups={
                "Cloud": ["AWS"],
                "DevOps": ["Docker","Kubernetes","Terraform","Ansible"],
                "OS & Scripting": ["Linux","Bash","Python"],
                "Tools": ["Git"],
                "Preferred": ["Prometheus","Grafana","Go","ELK Stack"],
            }
        ),
    }
},

"Zerodha": {
    "description": "India's largest stock broker — Kite trading platform, Coin, and Varsity.",
    "logo": "/logos/image.png",
    "locations": ["Bangalore"],
    "package": "12–22 LPA",
    "difficulty": "Medium",
    "hiring_category": "Startup",
    "roles": {
        "Software Engineer": _role(
            skills=["Python","Go","PostgreSQL","Redis","Git","Linux","DSA","REST API","OOP"],
            preferred_skills=["Kafka","Kubernetes","React","WebSockets","Docker"],
            package="12–22 LPA", location="Bangalore", difficulty="Medium",
            hiring_category="Startup",
            description="India's largest stock broker — Kite trading platform, Coin, and Varsity.",
            role_description="Build trading and brokerage platform features handling millions of orders.",
            skill_groups={
                "Programming Languages": ["Python","Go"],
                "Databases": ["PostgreSQL"],
                "Caching": ["Redis"],
                "APIs": ["REST API"],
                "CS Fundamentals": ["DSA","OOP"],
                "OS": ["Linux"],
                "Tools": ["Git"],
                "Preferred": ["Kafka","Kubernetes","React","WebSockets"],
            }
        ),
        "Backend Engineer": _role(
            skills=["Python","Go","PostgreSQL","Redis","Linux","Git","DSA","System Design","WebSockets"],
            preferred_skills=["Kafka","Docker","Kubernetes","C","gRPC"],
            package="14–25 LPA", location="Bangalore", difficulty="Medium",
            hiring_category="Startup",
            description="India's largest stock broker — Kite trading platform, Coin, and Varsity.",
            role_description="Build low-latency backend systems for Zerodha's trading infrastructure.",
            skill_groups={
                "Programming Languages": ["Python","Go"],
                "Databases": ["PostgreSQL"],
                "Caching": ["Redis"],
                "Real-time": ["WebSockets"],
                "CS Fundamentals": ["DSA","System Design"],
                "OS": ["Linux"],
                "Tools": ["Git"],
                "Preferred": ["Kafka","Docker","Kubernetes"],
            }
        ),
    }
},

"Groww": {
    "description": "India's leading investment platform for mutual funds, stocks, and IPOs.",
    "logo": "/logos/image.png",
    "locations": ["Bangalore"],
    "package": "15–30 LPA",
    "difficulty": "Medium",
    "hiring_category": "Startup",
    "roles": {
        "Software Engineer": _role(
            skills=["Go","Python","Java","SQL","Kafka","Redis","Git","Docker","DSA","REST API"],
            preferred_skills=["Kubernetes","AWS","PostgreSQL","gRPC","Microservices"],
            package="15–28 LPA", location="Bangalore", difficulty="Medium",
            hiring_category="Startup",
            description="India's leading investment platform for mutual funds, stocks, and IPOs.",
            role_description="Build fintech platform features serving 10M+ retail investors.",
            skill_groups={
                "Programming Languages": ["Go","Python","Java"],
                "Databases": ["SQL","PostgreSQL"],
                "Caching & Messaging": ["Kafka","Redis"],
                "DevOps": ["Docker"],
                "APIs": ["REST API"],
                "CS Fundamentals": ["DSA"],
                "Tools": ["Git"],
                "Preferred": ["Kubernetes","AWS","gRPC","Microservices"],
            }
        ),
        "Android Developer": _role(
            skills=["Kotlin","Java","Android SDK","Git","REST API","DSA","OOP","Room DB"],
            preferred_skills=["Jetpack Compose","Coroutines","Retrofit","Hilt","Firebase"],
            package="14–25 LPA", location="Bangalore", difficulty="Medium",
            hiring_category="Startup",
            description="India's leading investment platform for mutual funds, stocks, and IPOs.",
            role_description="Build and scale the Groww Android app used by millions of investors.",
            skill_groups={
                "Programming Languages": ["Kotlin","Java"],
                "Mobile": ["Android SDK","Jetpack Compose","Room DB","Coroutines"],
                "APIs": ["REST API"],
                "CS Fundamentals": ["DSA","OOP"],
                "Tools": ["Git"],
                "Preferred": ["Retrofit","Hilt","Firebase"],
            }
        ),
        "Data Engineer": _role(
            skills=["Python","SQL","Spark","Kafka","Airflow","Git","Linux","DBMS"],
            preferred_skills=["Scala","dbt","Snowflake","AWS","Presto"],
            package="14–26 LPA", location="Bangalore", difficulty="Medium",
            hiring_category="Startup",
            description="India's leading investment platform for mutual funds, stocks, and IPOs.",
            role_description="Build real-time and batch data pipelines for Groww's analytics platform.",
            skill_groups={
                "Data Engineering": ["Spark","Kafka","Airflow"],
                "Databases": ["SQL","DBMS"],
                "Programming Languages": ["Python"],
                "OS": ["Linux"],
                "Tools": ["Git"],
                "Preferred": ["Scala","dbt","Snowflake","AWS","Presto"],
            }
        ),
    }
},

"PhonePe": {
    "description": "India's #1 UPI payments app with 500M+ registered users.",
    "logo": "/logos/image.png",
    "locations": ["Bangalore"],
    "package": "15–30 LPA",
    "difficulty": "Medium",
    "hiring_category": "Startup",
    "roles": {
        "Software Engineer": _role(
            skills=["Java","Go","Python","SQL","Kafka","Redis","Docker","Git","DSA","Microservices"],
            preferred_skills=["Kubernetes","AWS","gRPC","PostgreSQL","Spring Boot"],
            package="15–28 LPA", location="Bangalore", difficulty="Medium",
            hiring_category="Startup",
            description="India's #1 UPI payments app with 500M+ registered users.",
            role_description="Build reliable payment features for PhonePe's UPI and fintech platform.",
            skill_groups={
                "Programming Languages": ["Java","Go","Python"],
                "Databases": ["SQL","PostgreSQL"],
                "Caching & Messaging": ["Kafka","Redis"],
                "DevOps": ["Docker"],
                "Architecture": ["Microservices"],
                "CS Fundamentals": ["DSA"],
                "Tools": ["Git"],
                "Preferred": ["Kubernetes","AWS","gRPC","Spring Boot"],
            }
        ),
        "Backend Engineer": _role(
            skills=["Java","Go","PostgreSQL","MySQL","Kafka","Redis","Git","System Design","DSA","Linux"],
            preferred_skills=["Kubernetes","AWS","gRPC","ElasticSearch","Temporal"],
            package="18–32 LPA", location="Bangalore", difficulty="Medium",
            hiring_category="Startup",
            description="India's #1 UPI payments app with 500M+ registered users.",
            role_description="Design backend systems processing millions of daily payment transactions.",
            skill_groups={
                "Programming Languages": ["Java","Go"],
                "Databases": ["PostgreSQL","MySQL"],
                "Caching & Messaging": ["Kafka","Redis"],
                "CS Fundamentals": ["System Design","DSA"],
                "OS": ["Linux"],
                "Tools": ["Git"],
                "Preferred": ["Kubernetes","AWS","gRPC","ElasticSearch"],
            }
        ),
    }
},

"Swiggy": {
    "description": "India's leading food delivery and quick commerce platform.",
    "logo": "/logos/image.png",
    "locations": ["Bangalore", "Hyderabad"],
    "package": "15–28 LPA",
    "difficulty": "Medium",
    "hiring_category": "Startup",
    "roles": {
        "Software Engineer": _role(
            skills=["Java","Go","Python","SQL","Kafka","Redis","Git","Docker","DSA","REST API"],
            preferred_skills=["Kubernetes","AWS","Spark","PostgreSQL","Microservices"],
            package="15–28 LPA", location="Bangalore", difficulty="Medium",
            hiring_category="Startup",
            description="India's leading food delivery and quick commerce platform.",
            role_description="Build scalable systems powering food delivery for millions of customers.",
            skill_groups={
                "Programming Languages": ["Java","Go","Python"],
                "Databases": ["SQL","PostgreSQL"],
                "Caching & Messaging": ["Kafka","Redis"],
                "DevOps": ["Docker"],
                "APIs": ["REST API"],
                "CS Fundamentals": ["DSA"],
                "Tools": ["Git"],
                "Preferred": ["Kubernetes","AWS","Spark","Microservices"],
            }
        ),
        "Machine Learning Engineer": _role(
            skills=["Python","Machine Learning","Deep Learning","SQL","Spark","Kafka","Git","NumPy","Pandas"],
            preferred_skills=["PyTorch","TensorFlow","Airflow","AWS","MLflow"],
            package="18–32 LPA", location="Bangalore", difficulty="Medium",
            hiring_category="Startup",
            description="India's leading food delivery and quick commerce platform.",
            role_description="Build recommendation, ETA prediction, and demand forecasting ML models.",
            skill_groups={
                "ML / AI": ["Machine Learning","Deep Learning"],
                "Data Engineering": ["Spark","Kafka","Airflow"],
                "Data": ["NumPy","Pandas","SQL"],
                "Tools": ["Git"],
                "Preferred": ["PyTorch","TensorFlow","AWS","MLflow"],
            }
        ),
        "Data Engineer": _role(
            skills=["Python","SQL","Spark","Kafka","Airflow","Git","Linux","DBMS"],
            preferred_skills=["Scala","dbt","Presto","AWS","Snowflake"],
            package="14–26 LPA", location="Bangalore", difficulty="Medium",
            hiring_category="Startup",
            description="India's leading food delivery and quick commerce platform.",
            role_description="Build real-time data pipelines for Swiggy's analytics and ML platform.",
            skill_groups={
                "Data Engineering": ["Spark","Kafka","Airflow"],
                "Databases": ["SQL","DBMS"],
                "Programming Languages": ["Python"],
                "OS": ["Linux"],
                "Tools": ["Git"],
                "Preferred": ["Scala","dbt","Presto","AWS"],
            }
        ),
    }
},

} # ← closes COMPANIES

# ─────────────────────────────────────────────────────────────────
# Helpers — called by app.py
# ─────────────────────────────────────────────────────────────────

def get_company_names() -> list:
    """Return sorted list of all company names."""
    return sorted(COMPANIES.keys())


def get_roles_for_company(company: str) -> list:
    """Return sorted list of role names for a given company."""
    entry = COMPANIES.get(company, {})
    roles = entry.get("roles", entry)          # support nested or flat
    return sorted(roles.keys())


def get_role_data(company: str, role: str) -> dict:
    """
    Return the full role metadata dict for a company+role pair.
    Returns {} if not found.
    """
    entry = COMPANIES.get(company, {})
    roles = entry.get("roles", entry)
    return roles.get(role, {})


def get_required_skills(company: str, role: str) -> list:
    """
    Return only the required skills list.  Falls back to [] safely.
    """
    role_data = get_role_data(company, role)
    if isinstance(role_data, list):            # backward-compat with old flat list
        return role_data
    return role_data.get("skills", [])


def get_company_meta(company: str) -> dict:
    """
    Return company-level metadata (description, logo, locations, etc.)
    without role details.
    """
    entry = COMPANIES.get(company, {})
    return {
        "name":        company,
        "description": entry.get("description", ""),
        "logo":        entry.get("logo", "/logos/image.png"),
        "locations":   entry.get("locations", []),
        "package":     entry.get("package", ""),
        "difficulty":  entry.get("difficulty", "Medium"),
        "hiring_category": entry.get("hiring_category", ""),
        "roles":       get_roles_for_company(company),
    }


def get_all_companies_meta() -> list:
    """Return metadata list for every company (no role skill details)."""
    return [get_company_meta(name) for name in sorted(COMPANIES.keys())]
