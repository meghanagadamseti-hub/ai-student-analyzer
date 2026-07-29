# data/companies.py  — 52 companies, 5-10 roles each, full skill metadata
# ─────────────────────────────────────────────────────────────────────────────
# Schema per role:
#   skills           – list[str]  required technical skills (ATS matching)
#   preferred_skills – list[str]  nice-to-have / bonus skills
#   skill_groups     – dict       skills grouped by category for the UI
#   package          – str        salary range
#   location         – str
#   difficulty       – "Easy" | "Medium" | "Hard"
#   hiring_category  – "Product" | "Service" | "Startup"
#   description      – str
#   role_description – str
# ─────────────────────────────────────────────────────────────────────────────

def _role(skills, preferred_skills, package, location, difficulty,
          hiring_category, description, role_description, skill_groups):
    return {
        "skills": skills, "preferred_skills": preferred_skills,
        "skill_groups": skill_groups, "package": package,
        "location": location, "difficulty": difficulty,
        "hiring_category": hiring_category, "description": description,
        "role_description": role_description,
    }

COMPANIES = {

# ═══════════════════════════════════════════════════════
#  1. GOOGLE
# ═══════════════════════════════════════════════════════
"Google": {
    "description": "Global technology leader in search, cloud, AI, and advertising.",
    "logo": "/logos/google.png", "locations": ["Bangalore","Hyderabad"],
    "package": "18–45 LPA", "difficulty": "Hard", "hiring_category": "Product",
    "roles": {
        "Software Engineer": _role(
            skills=["Python","Java","C++","DSA","System Design","SQL","Git","OOP","DBMS","Computer Networks","Operating System","Docker"],
            preferred_skills=["Kubernetes","GCP","Go","React","Kafka"],
            package="18–35 LPA", location="Bangalore / Hyderabad", difficulty="Hard",
            hiring_category="Product", description="Global technology leader in search, cloud, AI, and advertising.",
            role_description="Design and build large-scale distributed systems, APIs, and infrastructure.",
            skill_groups={"Programming Languages":["Python","Java","C++"],"CS Fundamentals":["DSA","OOP","DBMS","Operating System","Computer Networks"],"Databases":["SQL"],"DevOps & Cloud":["Docker","Git"],"Preferred":["Kubernetes","GCP","Go","Kafka"]}),
        "Backend Engineer": _role(
            skills=["Python","Go","Java","DSA","System Design","SQL","PostgreSQL","Docker","Kubernetes","Git"],
            preferred_skills=["GCP","Kafka","Redis","gRPC"],
            package="20–40 LPA", location="Bangalore", difficulty="Hard",
            hiring_category="Product", description="Global technology leader in search, cloud, AI, and advertising.",
            role_description="Build reliable, scalable microservices and data pipelines.",
            skill_groups={"Programming Languages":["Python","Go","Java"],"Databases":["SQL","PostgreSQL"],"DevOps & Cloud":["Docker","Kubernetes","Git"],"CS Fundamentals":["DSA","System Design"],"Preferred":["GCP","Kafka","Redis","gRPC"]}),
        "Frontend Engineer": _role(
            skills=["JavaScript","TypeScript","React","HTML","CSS","Git","DSA","REST API"],
            preferred_skills=["GraphQL","Redux","Next.js","Webpack"],
            package="16–30 LPA", location="Bangalore / Hyderabad", difficulty="Hard",
            hiring_category="Product", description="Global technology leader in search, cloud, AI, and advertising.",
            role_description="Build performant, accessible user interfaces at global scale.",
            skill_groups={"Programming Languages":["JavaScript","TypeScript"],"Frameworks":["React"],"Web":["HTML","CSS"],"APIs":["REST API"],"Tools":["Git"],"Preferred":["GraphQL","Redux","Next.js"]}),
        "Machine Learning Engineer": _role(
            skills=["Python","Machine Learning","Deep Learning","TensorFlow","PyTorch","SQL","NumPy","Pandas","DSA","Git"],
            preferred_skills=["GCP","Kubernetes","Scikit-learn","Spark","MLflow"],
            package="22–45 LPA", location="Bangalore / Hyderabad", difficulty="Hard",
            hiring_category="Product", description="Global technology leader in search, cloud, AI, and advertising.",
            role_description="Design, train, and deploy production ML models at scale.",
            skill_groups={"ML / AI":["Machine Learning","Deep Learning","TensorFlow","PyTorch"],"Data":["NumPy","Pandas","SQL"],"Tools":["Git"],"Preferred":["GCP","Kubernetes","Spark","MLflow"]}),
        "Data Engineer": _role(
            skills=["Python","SQL","Spark","Kafka","Airflow","BigQuery","Git","Linux","DBMS"],
            preferred_skills=["Scala","dbt","GCP","Dataflow","Presto"],
            package="18–38 LPA", location="Bangalore / Hyderabad", difficulty="Hard",
            hiring_category="Product", description="Global technology leader in search, cloud, AI, and advertising.",
            role_description="Build petabyte-scale data pipelines powering Google products.",
            skill_groups={"Data Engineering":["Spark","Kafka","Airflow","BigQuery"],"Databases":["SQL","DBMS"],"Programming Languages":["Python"],"OS":["Linux"],"Tools":["Git"],"Preferred":["Scala","dbt","GCP","Dataflow"]}),
        "Site Reliability Engineer": _role(
            skills=["Linux","Python","Go","Docker","Kubernetes","Terraform","Git","Networking","Monitoring"],
            preferred_skills=["GCP","Prometheus","Grafana","Ansible","Bash"],
            package="20–40 LPA", location="Bangalore", difficulty="Hard",
            hiring_category="Product", description="Global technology leader in search, cloud, AI, and advertising.",
            role_description="Ensure reliability and scalability of Google's global infrastructure.",
            skill_groups={"OS & Scripting":["Linux","Bash","Python","Go"],"DevOps":["Docker","Kubernetes","Terraform","Ansible"],"Networking":["Networking"],"Monitoring":["Monitoring","Prometheus","Grafana"],"Tools":["Git"],"Preferred":["GCP"]}),
        "Cloud Engineer": _role(
            skills=["GCP","Python","Docker","Kubernetes","Terraform","Linux","SQL","Git","Networking"],
            preferred_skills=["Go","Ansible","Prometheus","Spanner","BigQuery"],
            package="18–35 LPA", location="Bangalore / Hyderabad", difficulty="Hard",
            hiring_category="Product", description="Global technology leader in search, cloud, AI, and advertising.",
            role_description="Design and operate cloud infrastructure on Google Cloud Platform.",
            skill_groups={"Cloud":["GCP"],"DevOps":["Docker","Kubernetes","Terraform"],"Programming Languages":["Python","Go"],"OS & Networking":["Linux","Networking"],"Databases":["SQL"],"Tools":["Git"],"Preferred":["Ansible","Prometheus","Spanner"]}),
    }
},

# ═══════════════════════════════════════════════════════
#  2. MICROSOFT
# ═══════════════════════════════════════════════════════
"Microsoft": {
    "description": "Creator of Windows, Azure Cloud, Microsoft 365, and GitHub.",
    "logo": "/logos/microsoft.png", "locations": ["Hyderabad","Bangalore","Noida"],
    "package": "16–40 LPA", "difficulty": "Hard", "hiring_category": "Product",
    "roles": {
        "Software Engineer": _role(
            skills=["C#","Java","Python","DSA","Azure","SQL","Git","OOP","System Design","DBMS"],
            preferred_skills=["TypeScript","React","Docker","Kubernetes","PowerShell"],
            package="16–30 LPA", location="Hyderabad / Bangalore", difficulty="Hard",
            hiring_category="Product", description="Creator of Windows, Azure Cloud, Microsoft 365, and GitHub.",
            role_description="Build and maintain Microsoft's core products and cloud services.",
            skill_groups={"Programming Languages":["C#","Java","Python"],"Cloud":["Azure"],"Databases":["SQL"],"CS Fundamentals":["DSA","OOP","System Design","DBMS"],"Tools":["Git"],"Preferred":["TypeScript","React","Docker","Kubernetes"]}),
        "Cloud Engineer": _role(
            skills=["Azure","Python","Docker","Kubernetes","Linux","Terraform","Git","SQL","Networking"],
            preferred_skills=["AWS","GCP","Ansible","Jenkins","Prometheus"],
            package="18–35 LPA", location="Hyderabad", difficulty="Hard",
            hiring_category="Product", description="Creator of Windows, Azure Cloud, Microsoft 365, and GitHub.",
            role_description="Design, deploy, and operate cloud infrastructure on Azure.",
            skill_groups={"Cloud":["Azure"],"DevOps":["Docker","Kubernetes","Terraform","Ansible"],"Programming Languages":["Python"],"OS & Networking":["Linux","Networking"],"Databases":["SQL"],"Tools":["Git"],"Preferred":["AWS","GCP","Jenkins","Prometheus"]}),
        "AI Engineer": _role(
            skills=["Python","Machine Learning","Deep Learning","Azure","SQL","Git","NumPy","Pandas","REST API"],
            preferred_skills=["TensorFlow","PyTorch","MLflow","Spark","C#"],
            package="20–40 LPA", location="Hyderabad / Bangalore", difficulty="Hard",
            hiring_category="Product", description="Creator of Windows, Azure Cloud, Microsoft 365, and GitHub.",
            role_description="Develop AI/ML solutions integrated into Azure and Microsoft products.",
            skill_groups={"ML / AI":["Machine Learning","Deep Learning"],"Cloud":["Azure"],"Data":["NumPy","Pandas","SQL"],"APIs":["REST API"],"Tools":["Git"],"Preferred":["TensorFlow","PyTorch","MLflow","Spark"]}),
        "Backend Engineer": _role(
            skills=["C#","Java","Python","SQL","REST API","Git","Docker","DSA","OOP","Microservices"],
            preferred_skills=["Kafka","Redis","gRPC","TypeScript","Azure"],
            package="16–32 LPA", location="Hyderabad", difficulty="Hard",
            hiring_category="Product", description="Creator of Windows, Azure Cloud, Microsoft 365, and GitHub.",
            role_description="Architect and build high-performance backend services.",
            skill_groups={"Programming Languages":["C#","Java","Python"],"Databases":["SQL"],"APIs":["REST API","Microservices"],"DevOps":["Docker"],"CS Fundamentals":["DSA","OOP"],"Tools":["Git"],"Preferred":["Kafka","Redis","Azure"]}),
        "Frontend Engineer": _role(
            skills=["JavaScript","TypeScript","React","HTML","CSS","Git","REST API","DSA"],
            preferred_skills=["Angular","Vue.js","GraphQL","Azure","Redux"],
            package="14–28 LPA", location="Hyderabad / Bangalore", difficulty="Hard",
            hiring_category="Product", description="Creator of Windows, Azure Cloud, Microsoft 365, and GitHub.",
            role_description="Build rich web experiences for Microsoft 365 and Azure portal.",
            skill_groups={"Programming Languages":["JavaScript","TypeScript"],"Frameworks":["React"],"Web":["HTML","CSS"],"APIs":["REST API"],"CS Fundamentals":["DSA"],"Tools":["Git"],"Preferred":["Angular","GraphQL","Azure"]}),
        "Data Engineer": _role(
            skills=["Python","SQL","Spark","Azure","Kafka","Airflow","Git","Linux","DBMS"],
            preferred_skills=["Scala","dbt","Synapse","Power BI","Databricks"],
            package="16–32 LPA", location="Hyderabad", difficulty="Hard",
            hiring_category="Product", description="Creator of Windows, Azure Cloud, Microsoft 365, and GitHub.",
            role_description="Build data pipelines on Azure for Microsoft analytics products.",
            skill_groups={"Data Engineering":["Spark","Kafka","Airflow"],"Cloud":["Azure"],"Databases":["SQL","DBMS"],"Programming Languages":["Python"],"OS":["Linux"],"Tools":["Git"],"Preferred":["Scala","dbt","Synapse","Databricks"]}),
        "Security Engineer": _role(
            skills=["Python","Linux","Networking","Cryptography","SQL","Git","Security Protocols","OOP"],
            preferred_skills=["Azure Security","Penetration Testing","SIEM","C#","Threat Modeling"],
            package="18–35 LPA", location="Hyderabad", difficulty="Hard",
            hiring_category="Product", description="Creator of Windows, Azure Cloud, Microsoft 365, and GitHub.",
            role_description="Secure Microsoft cloud services and customer workloads on Azure.",
            skill_groups={"Security":["Security Protocols","Cryptography","Penetration Testing","Threat Modeling"],"Programming Languages":["Python","C#"],"OS & Networking":["Linux","Networking"],"Databases":["SQL"],"Tools":["Git"],"Preferred":["Azure Security","SIEM"]}),
    }
},

# ═══════════════════════════════════════════════════════
#  3. AMAZON
# ═══════════════════════════════════════════════════════
"Amazon": {
    "description": "E-commerce, cloud computing (AWS), and AI services at global scale.",
    "logo": "/logos/amazon.png", "locations": ["Hyderabad","Bangalore","Chennai"],
    "package": "15–40 LPA", "difficulty": "Hard", "hiring_category": "Product",
    "roles": {
        "SDE I": _role(
            skills=["Java","Python","DSA","OOP","SQL","Git","System Design","OS","Computer Networks","DBMS"],
            preferred_skills=["AWS","Docker","Spring Boot","Linux"],
            package="18–32 LPA", location="Hyderabad / Bangalore", difficulty="Hard",
            hiring_category="Product", description="E-commerce, cloud computing (AWS), and AI services at global scale.",
            role_description="Entry-level software development role focused on scalable system design.",
            skill_groups={"Programming Languages":["Java","Python"],"CS Fundamentals":["DSA","OOP","OS","Computer Networks","DBMS"],"Databases":["SQL"],"Design":["System Design"],"Tools":["Git"],"Preferred":["AWS","Docker","Spring Boot","Linux"]}),
        "SDE": _role(
            skills=["Java","Python","DSA","OOP","SQL","Git","System Design","OS","Computer Networks","DBMS"],
            preferred_skills=["AWS","Docker","Spring Boot","Linux"],
            package="18–32 LPA", location="Hyderabad / Bangalore", difficulty="Hard",
            hiring_category="Product", description="E-commerce, cloud computing (AWS), and AI services at global scale.",
            role_description="Software Development Engineer building scalable Amazon systems.",
            skill_groups={"Programming Languages":["Java","Python"],"CS Fundamentals":["DSA","OOP","OS","Computer Networks","DBMS"],"Databases":["SQL"],"Design":["System Design"],"Tools":["Git"],"Preferred":["AWS","Docker","Spring Boot","Linux"]}),
        "Software Engineer": _role(
            skills=["Java","Python","DSA","OOP","SQL","Git","System Design","AWS","REST API"],
            preferred_skills=["Docker","Spring Boot","Linux","Microservices"],
            package="18–32 LPA", location="Hyderabad / Bangalore", difficulty="Hard",
            hiring_category="Product", description="E-commerce, cloud computing (AWS), and AI services at global scale.",
            role_description="Build and operate software powering Amazon's global platform.",
            skill_groups={"Programming Languages":["Java","Python"],"CS Fundamentals":["DSA","OOP"],"Databases":["SQL"],"Cloud":["AWS"],"APIs":["REST API"],"Tools":["Git"],"Preferred":["Docker","Spring Boot","Linux","Microservices"]}),
        "Backend Engineer": _role(
            skills=["Java","Python","AWS","SQL","Docker","Git","Linux","DSA","System Design","Microservices"],
            preferred_skills=["Kafka","DynamoDB","Spring Boot","Kubernetes","Redis"],
            package="20–40 LPA", location="Hyderabad / Bangalore", difficulty="Hard",
            hiring_category="Product", description="E-commerce, cloud computing (AWS), and AI services at global scale.",
            role_description="Build distributed backend services powering Amazon's platform.",
            skill_groups={"Programming Languages":["Java","Python"],"Cloud":["AWS"],"Databases":["SQL"],"DevOps":["Docker","Kubernetes","Linux"],"Architecture":["System Design","Microservices"],"Tools":["Git"],"Preferred":["Kafka","DynamoDB","Spring Boot","Redis"]}),
        "DevOps Engineer": _role(
            skills=["AWS","Docker","Kubernetes","Linux","Python","Terraform","CI/CD","Git","Bash","Networking"],
            preferred_skills=["Jenkins","Ansible","Prometheus","ELK Stack","Go"],
            package="18–35 LPA", location="Hyderabad / Bangalore", difficulty="Hard",
            hiring_category="Product", description="E-commerce, cloud computing (AWS), and AI services at global scale.",
            role_description="Automate deployment pipelines and maintain cloud infrastructure.",
            skill_groups={"Cloud":["AWS"],"DevOps":["Docker","Kubernetes","Terraform","CI/CD","Ansible"],"OS & Scripting":["Linux","Bash","Python"],"Networking":["Networking"],"Tools":["Git"],"Preferred":["Jenkins","Prometheus","ELK Stack","Go"]}),
        "Data Engineer": _role(
            skills=["Python","SQL","Spark","AWS","Redshift","Kafka","Airflow","Git","Linux"],
            preferred_skills=["Scala","dbt","Athena","Glue","DynamoDB"],
            package="18–35 LPA", location="Hyderabad / Bangalore", difficulty="Hard",
            hiring_category="Product", description="E-commerce, cloud computing (AWS), and AI services at global scale.",
            role_description="Build data pipelines on AWS for Amazon analytics and ML.",
            skill_groups={"Data Engineering":["Spark","Kafka","Airflow"],"Cloud":["AWS"],"Databases":["SQL","Redshift"],"Programming Languages":["Python"],"OS":["Linux"],"Tools":["Git"],"Preferred":["Scala","dbt","Athena","Glue"]}),
        "Cloud Support Engineer": _role(
            skills=["AWS","Linux","Python","Networking","SQL","Git","Troubleshooting","Docker"],
            preferred_skills=["Terraform","Kubernetes","Ansible","Windows Server","CloudFormation"],
            package="10–20 LPA", location="Hyderabad / Bangalore / Chennai", difficulty="Medium",
            hiring_category="Product", description="E-commerce, cloud computing (AWS), and AI services at global scale.",
            role_description="Provide technical support and guidance to AWS customers worldwide.",
            skill_groups={"Cloud":["AWS"],"OS":["Linux"],"Programming Languages":["Python"],"Networking":["Networking"],"Databases":["SQL"],"Tools":["Git","Docker"],"Preferred":["Terraform","Kubernetes","Ansible"]}),
        "Machine Learning Engineer": _role(
            skills=["Python","Machine Learning","Deep Learning","PyTorch","TensorFlow","SQL","NumPy","Pandas","AWS","Git"],
            preferred_skills=["SageMaker","Spark","Kubernetes","MLflow","Scala"],
            package="22–45 LPA", location="Hyderabad / Bangalore", difficulty="Hard",
            hiring_category="Product", description="E-commerce, cloud computing (AWS), and AI services at global scale.",
            role_description="Build and deploy ML models powering Amazon recommendations and Alexa.",
            skill_groups={"ML / AI":["Machine Learning","Deep Learning","PyTorch","TensorFlow"],"Cloud":["AWS"],"Data":["NumPy","Pandas","SQL"],"Tools":["Git"],"Preferred":["SageMaker","Spark","Kubernetes","MLflow"]}),
    }
},

# ═══════════════════════════════════════════════════════
#  4. META
# ═══════════════════════════════════════════════════════
"Meta": {
    "description": "Social media giant behind Facebook, Instagram, WhatsApp, and Threads.",
    "logo": "/logos/meta.png", "locations": ["Hyderabad","Bangalore"],
    "package": "25–60 LPA", "difficulty": "Hard", "hiring_category": "Product",
    "roles": {
        "Software Engineer": _role(
            skills=["Python","C++","Java","JavaScript","React","DSA","System Design","SQL","Git","OOP"],
            preferred_skills=["Hack","GraphQL","PyTorch","Spark","Kubernetes"],
            package="25–50 LPA", location="Hyderabad / Bangalore", difficulty="Hard",
            hiring_category="Product", description="Social media giant behind Facebook, Instagram, WhatsApp, and Threads.",
            role_description="Build features and infrastructure for Meta's 3B+ user platforms.",
            skill_groups={"Programming Languages":["Python","C++","Java","JavaScript"],"Frameworks":["React"],"CS Fundamentals":["DSA","OOP","System Design"],"Databases":["SQL"],"Tools":["Git"],"Preferred":["Hack","GraphQL","PyTorch","Spark"]}),
        "Machine Learning Engineer": _role(
            skills=["Python","Machine Learning","Deep Learning","PyTorch","SQL","NumPy","Pandas","DSA","Git","Distributed Systems"],
            preferred_skills=["Spark","Kubernetes","Triton","ONNX","MLflow"],
            package="30–55 LPA", location="Hyderabad", difficulty="Hard",
            hiring_category="Product", description="Social media giant behind Facebook, Instagram, WhatsApp, and Threads.",
            role_description="Train and ship large-scale ranking and recommendation ML models.",
            skill_groups={"ML / AI":["Machine Learning","Deep Learning","PyTorch"],"Data":["NumPy","Pandas","SQL"],"Systems":["Distributed Systems"],"CS Fundamentals":["DSA"],"Tools":["Git"],"Preferred":["Spark","Kubernetes","Triton","MLflow"]}),
        "Backend Engineer": _role(
            skills=["Python","C++","Java","SQL","REST API","Git","DSA","System Design","Microservices","Linux"],
            preferred_skills=["Hack","Kafka","Cassandra","GraphQL","gRPC"],
            package="25–48 LPA", location="Hyderabad", difficulty="Hard",
            hiring_category="Product", description="Social media giant behind Facebook, Instagram, WhatsApp, and Threads.",
            role_description="Design distributed backend systems serving billions of requests.",
            skill_groups={"Programming Languages":["Python","C++","Java"],"APIs":["REST API","Microservices"],"Databases":["SQL"],"CS Fundamentals":["DSA","System Design"],"OS":["Linux"],"Tools":["Git"],"Preferred":["Hack","Kafka","Cassandra","GraphQL"]}),
        "Data Engineer": _role(
            skills=["Python","SQL","Spark","Hadoop","Kafka","Airflow","Git","Linux","DBMS"],
            preferred_skills=["Scala","Hive","Presto","Flink","dbt"],
            package="22–42 LPA", location="Hyderabad", difficulty="Hard",
            hiring_category="Product", description="Social media giant behind Facebook, Instagram, WhatsApp, and Threads.",
            role_description="Build petabyte-scale data pipelines for analytics and ML.",
            skill_groups={"Data Engineering":["Spark","Hadoop","Kafka","Airflow","Hive"],"Databases":["SQL","DBMS"],"Programming Languages":["Python"],"OS":["Linux"],"Tools":["Git"],"Preferred":["Scala","Presto","Flink","dbt"]}),
        "Research Engineer": _role(
            skills=["Python","Deep Learning","PyTorch","NLP","Computer Vision","DSA","Git","Linux","NumPy"],
            preferred_skills=["JAX","CUDA","Transformers","Triton","ONNX"],
            package="35–65 LPA", location="Hyderabad", difficulty="Hard",
            hiring_category="Product", description="Social media giant behind Facebook, Instagram, WhatsApp, and Threads.",
            role_description="Conduct applied AI research and ship it to Meta's products.",
            skill_groups={"ML / AI":["Deep Learning","PyTorch","NLP","Computer Vision"],"Data":["NumPy"],"CS Fundamentals":["DSA"],"OS":["Linux"],"Tools":["Git"],"Preferred":["JAX","CUDA","Transformers","Triton"]}),
        "Frontend Engineer": _role(
            skills=["JavaScript","TypeScript","React","HTML","CSS","Git","REST API","DSA"],
            preferred_skills=["GraphQL","Redux","Relay","React Native","Jest"],
            package="22–42 LPA", location="Hyderabad / Bangalore", difficulty="Hard",
            hiring_category="Product", description="Social media giant behind Facebook, Instagram, WhatsApp, and Threads.",
            role_description="Build the web experiences used by 3 billion people daily.",
            skill_groups={"Programming Languages":["JavaScript","TypeScript"],"Frameworks":["React"],"Web":["HTML","CSS"],"APIs":["REST API"],"CS Fundamentals":["DSA"],"Tools":["Git"],"Preferred":["GraphQL","Redux","Relay","React Native"]}),
    }
},

# ═══════════════════════════════════════════════════════
#  5. APPLE
# ═══════════════════════════════════════════════════════
"Apple": {
    "description": "Creator of iPhone, Mac, iOS, and Apple Silicon.",
    "logo": "/logos/apple.png", "locations": ["Hyderabad","Bangalore"],
    "package": "25–55 LPA", "difficulty": "Hard", "hiring_category": "Product",
    "roles": {
        "Software Engineer": _role(
            skills=["C++","Python","Swift","DSA","OOP","Git","System Design","Operating System","Computer Networks"],
            preferred_skills=["Metal","LLVM","CoreML","CUDA","Rust"],
            package="25–50 LPA", location="Hyderabad / Bangalore", difficulty="Hard",
            hiring_category="Product", description="Creator of iPhone, Mac, iOS, and Apple Silicon.",
            role_description="Develop core OS and systems software for Apple platforms.",
            skill_groups={"Programming Languages":["C++","Python","Swift"],"CS Fundamentals":["DSA","OOP","Operating System","Computer Networks"],"Design":["System Design"],"Tools":["Git"],"Preferred":["Metal","LLVM","CoreML","CUDA","Rust"]}),
        "iOS Developer": _role(
            skills=["Swift","Objective-C","Xcode","Git","DSA","OOP","Core Data","REST API"],
            preferred_skills=["SwiftUI","Combine","ARKit","CoreML","C++"],
            package="22–45 LPA", location="Hyderabad", difficulty="Hard",
            hiring_category="Product", description="Creator of iPhone, Mac, iOS, and Apple Silicon.",
            role_description="Build delightful iOS applications and frameworks for billions of users.",
            skill_groups={"Programming Languages":["Swift","Objective-C"],"Frameworks":["Core Data","SwiftUI"],"APIs":["REST API"],"CS Fundamentals":["DSA","OOP"],"Tools":["Xcode","Git"],"Preferred":["Combine","ARKit","CoreML","C++"]}),
        "Machine Learning Engineer": _role(
            skills=["Python","Machine Learning","Deep Learning","CoreML","NumPy","Pandas","Git","DSA"],
            preferred_skills=["TensorFlow","PyTorch","Swift","Metal","Triton"],
            package="28–55 LPA", location="Hyderabad", difficulty="Hard",
            hiring_category="Product", description="Creator of iPhone, Mac, iOS, and Apple Silicon.",
            role_description="Build on-device ML models powering Siri, FaceID, and Photos.",
            skill_groups={"ML / AI":["Machine Learning","Deep Learning","CoreML"],"Data":["NumPy","Pandas"],"CS Fundamentals":["DSA"],"Tools":["Git"],"Preferred":["TensorFlow","PyTorch","Swift","Metal"]}),
        "Computer Vision Engineer": _role(
            skills=["Python","Computer Vision","Deep Learning","OpenCV","PyTorch","C++","Git","NumPy"],
            preferred_skills=["CoreML","Metal","CUDA","ARKit","TensorRT"],
            package="26–50 LPA", location="Hyderabad", difficulty="Hard",
            hiring_category="Product", description="Creator of iPhone, Mac, iOS, and Apple Silicon.",
            role_description="Build computer vision systems powering FaceID, ARKit, and Apple Vision Pro.",
            skill_groups={"ML / AI":["Computer Vision","Deep Learning","OpenCV","PyTorch"],"Programming Languages":["Python","C++"],"Data":["NumPy"],"Tools":["Git"],"Preferred":["CoreML","Metal","CUDA","ARKit","TensorRT"]}),
        "Embedded Software Engineer": _role(
            skills=["C","C++","Python","Embedded Linux","RTOS","Git","Operating System","Debugging","Computer Architecture"],
            preferred_skills=["Swift","Metal","ARM Assembly","LLVM","CMake"],
            package="22–45 LPA", location="Hyderabad / Bangalore", difficulty="Hard",
            hiring_category="Product", description="Creator of iPhone, Mac, iOS, and Apple Silicon.",
            role_description="Build firmware and low-level software for Apple Silicon and peripherals.",
            skill_groups={"Programming Languages":["C","C++","Python"],"Embedded":["Embedded Linux","RTOS","Computer Architecture","ARM Assembly"],"CS Fundamentals":["Operating System","Debugging"],"Tools":["Git","CMake"],"Preferred":["Swift","Metal","LLVM"]}),
        "Security Engineer": _role(
            skills=["Python","C++","Linux","Cryptography","Security Protocols","Git","OOP","Reverse Engineering"],
            preferred_skills=["Swift","Fuzzing","Penetration Testing","macOS Internals","Objective-C"],
            package="25–50 LPA", location="Hyderabad", difficulty="Hard",
            hiring_category="Product", description="Creator of iPhone, Mac, iOS, and Apple Silicon.",
            role_description="Protect Apple platforms and customer data from emerging threats.",
            skill_groups={"Security":["Cryptography","Security Protocols","Reverse Engineering","Penetration Testing"],"Programming Languages":["Python","C++","Swift"],"OS":["Linux"],"CS Fundamentals":["OOP"],"Tools":["Git"],"Preferred":["Fuzzing","macOS Internals","Objective-C"]}),
    }
},

# ═══════════════════════════════════════════════════════
#  6. ADOBE
# ═══════════════════════════════════════════════════════
"Adobe": {
    "description": "Creative software leader: Photoshop, Illustrator, Acrobat, and Experience Cloud.",
    "logo": "/logos/adobe.png", "locations": ["Bangalore","Noida"],
    "package": "12–28 LPA", "difficulty": "Medium", "hiring_category": "Product",
    "roles": {
        "Software Engineer": _role(
            skills=["Java","Python","JavaScript","React","SQL","Git","REST API","DSA","OOP"],
            preferred_skills=["TypeScript","Docker","AWS","Node.js","GraphQL"],
            package="14–28 LPA", location="Bangalore / Noida", difficulty="Medium",
            hiring_category="Product", description="Creative software leader: Photoshop, Illustrator, Acrobat, and Experience Cloud.",
            role_description="Build Adobe's cloud products and creative platform APIs.",
            skill_groups={"Programming Languages":["Java","Python","JavaScript"],"Frameworks":["React"],"Databases":["SQL"],"APIs":["REST API"],"CS Fundamentals":["DSA","OOP"],"Tools":["Git"],"Preferred":["TypeScript","Docker","AWS","Node.js"]}),
        "Frontend Engineer": _role(
            skills=["JavaScript","TypeScript","React","HTML","CSS","Git","REST API","DSA"],
            preferred_skills=["Redux","Angular","WebAssembly","Canvas API","Jest"],
            package="12–24 LPA", location="Bangalore", difficulty="Medium",
            hiring_category="Product", description="Creative software leader: Photoshop, Illustrator, Acrobat, and Experience Cloud.",
            role_description="Develop rich interactive UI for Creative Cloud and Document Cloud.",
            skill_groups={"Programming Languages":["JavaScript","TypeScript"],"Frameworks":["React"],"Web":["HTML","CSS"],"APIs":["REST API"],"CS Fundamentals":["DSA"],"Tools":["Git"],"Preferred":["Redux","Angular","WebAssembly","Canvas API"]}),
        "Data Engineer": _role(
            skills=["Python","SQL","Spark","Airflow","Kafka","Git","DBMS","Linux"],
            preferred_skills=["Scala","Snowflake","dbt","GCP","Tableau"],
            package="14–26 LPA", location="Bangalore", difficulty="Medium",
            hiring_category="Product", description="Creative software leader: Photoshop, Illustrator, Acrobat, and Experience Cloud.",
            role_description="Design data pipelines powering Adobe Analytics and Experience Platform.",
            skill_groups={"Data Engineering":["Spark","Airflow","Kafka"],"Databases":["SQL","DBMS"],"Programming Languages":["Python"],"OS":["Linux"],"Tools":["Git"],"Preferred":["Scala","Snowflake","dbt","GCP"]}),
        "Machine Learning Engineer": _role(
            skills=["Python","Machine Learning","Deep Learning","PyTorch","NumPy","Pandas","SQL","Git"],
            preferred_skills=["TensorFlow","Generative AI","Diffusion Models","AWS","MLflow"],
            package="16–30 LPA", location="Bangalore", difficulty="Medium",
            hiring_category="Product", description="Creative software leader: Photoshop, Illustrator, Acrobat, and Experience Cloud.",
            role_description="Build generative AI features powering Adobe Firefly.",
            skill_groups={"ML / AI":["Machine Learning","Deep Learning","PyTorch","Generative AI"],"Data":["NumPy","Pandas","SQL"],"Tools":["Git"],"Preferred":["TensorFlow","Diffusion Models","AWS","MLflow"]}),
        "Backend Developer": _role(
            skills=["Java","Python","SQL","REST API","Git","Microservices","Docker","OOP","DSA"],
            preferred_skills=["Kafka","Redis","AWS","Spring Boot","Kubernetes"],
            package="13–26 LPA", location="Bangalore / Noida", difficulty="Medium",
            hiring_category="Product", description="Creative software leader: Photoshop, Illustrator, Acrobat, and Experience Cloud.",
            role_description="Build scalable backend services for Adobe's cloud platform.",
            skill_groups={"Programming Languages":["Java","Python"],"APIs":["REST API","Microservices"],"Databases":["SQL"],"DevOps":["Docker"],"CS Fundamentals":["OOP","DSA"],"Tools":["Git"],"Preferred":["Kafka","Redis","AWS","Spring Boot"]}),
        "QA Engineer": _role(
            skills=["Java","Selenium","Manual Testing","SQL","Git","REST API","OOP","JIRA"],
            preferred_skills=["TestNG","Cucumber","Postman","Python","CI/CD"],
            package="10–20 LPA", location="Bangalore / Noida", difficulty="Medium",
            hiring_category="Product", description="Creative software leader: Photoshop, Illustrator, Acrobat, and Experience Cloud.",
            role_description="Ensure quality of Adobe's creative and marketing cloud products.",
            skill_groups={"Testing":["Manual Testing","Selenium","TestNG","Cucumber"],"Programming Languages":["Java"],"Databases":["SQL"],"APIs":["REST API"],"CS Fundamentals":["OOP"],"Tools":["Git","JIRA","Postman"],"Preferred":["Python","CI/CD"]}),
    }
},

# ═══════════════════════════════════════════════════════
#  7. NETFLIX
# ═══════════════════════════════════════════════════════
"Netflix": {
    "description": "World's leading entertainment streaming service with 270M+ subscribers.",
    "logo": "/logos/netflix.png", "locations": ["Bangalore"],
    "package": "35–80 LPA", "difficulty": "Hard", "hiring_category": "Product",
    "roles": {
        "Software Engineer": _role(
            skills=["Java","Python","Go","DSA","System Design","SQL","Git","Microservices","Linux","Networking"],
            preferred_skills=["Kafka","Cassandra","Spinnaker","AWS","Kotlin"],
            package="40–80 LPA", location="Bangalore", difficulty="Hard",
            hiring_category="Product", description="World's leading entertainment streaming service with 270M+ subscribers.",
            role_description="Build and operate systems that stream content to 270M+ users globally.",
            skill_groups={"Programming Languages":["Java","Python","Go"],"Architecture":["System Design","Microservices"],"CS Fundamentals":["DSA"],"Databases":["SQL"],"OS & Networking":["Linux","Networking"],"Tools":["Git"],"Preferred":["Kafka","Cassandra","Spinnaker","AWS"]}),
        "Backend Engineer": _role(
            skills=["Java","Python","Spring Boot","SQL","REST API","Git","DSA","System Design","Docker"],
            preferred_skills=["Kafka","Redis","Kubernetes","Go","Cassandra"],
            package="38–75 LPA", location="Bangalore", difficulty="Hard",
            hiring_category="Product", description="World's leading entertainment streaming service with 270M+ subscribers.",
            role_description="Design resilient microservices for Netflix's recommendation and streaming platform.",
            skill_groups={"Programming Languages":["Java","Python"],"Frameworks":["Spring Boot"],"Databases":["SQL"],"APIs":["REST API"],"DevOps":["Docker"],"CS Fundamentals":["DSA","System Design"],"Tools":["Git"],"Preferred":["Kafka","Redis","Kubernetes","Go"]}),
        "Site Reliability Engineer": _role(
            skills=["Python","Go","Linux","Kubernetes","Docker","AWS","Terraform","Git","Networking","Bash"],
            preferred_skills=["Prometheus","Grafana","Spinnaker","Ansible","Java"],
            package="35–70 LPA", location="Bangalore", difficulty="Hard",
            hiring_category="Product", description="World's leading entertainment streaming service with 270M+ subscribers.",
            role_description="Ensure 99.99% uptime for the world's largest streaming platform.",
            skill_groups={"Cloud":["AWS"],"DevOps":["Kubernetes","Docker","Terraform","Ansible"],"Programming Languages":["Python","Go"],"OS & Scripting":["Linux","Bash"],"Networking":["Networking"],"Tools":["Git"],"Preferred":["Prometheus","Grafana","Spinnaker"]}),
        "Data Engineer": _role(
            skills=["Python","SQL","Spark","Kafka","Airflow","AWS","Git","Linux","Scala"],
            preferred_skills=["Iceberg","Trino","dbt","Flink","Druid"],
            package="35–65 LPA", location="Bangalore", difficulty="Hard",
            hiring_category="Product", description="World's leading entertainment streaming service with 270M+ subscribers.",
            role_description="Build data infrastructure supporting Netflix's content and recommendations.",
            skill_groups={"Data Engineering":["Spark","Kafka","Airflow"],"Cloud":["AWS"],"Databases":["SQL"],"Programming Languages":["Python","Scala"],"OS":["Linux"],"Tools":["Git"],"Preferred":["Iceberg","Trino","dbt","Flink"]}),
        "Machine Learning Engineer": _role(
            skills=["Python","Machine Learning","Deep Learning","PyTorch","SQL","Spark","Git","NumPy","Pandas"],
            preferred_skills=["TensorFlow","Metaflow","Triton","Kubernetes","Scala"],
            package="40–75 LPA", location="Bangalore", difficulty="Hard",
            hiring_category="Product", description="World's leading entertainment streaming service with 270M+ subscribers.",
            role_description="Build personalisation and content recommendation ML systems.",
            skill_groups={"ML / AI":["Machine Learning","Deep Learning","PyTorch"],"Data Engineering":["Spark"],"Data":["NumPy","Pandas","SQL"],"Tools":["Git"],"Preferred":["TensorFlow","Metaflow","Triton","Kubernetes","Scala"]}),
    }
},

# ═══════════════════════════════════════════════════════
#  8. ORACLE
# ═══════════════════════════════════════════════════════
"Oracle": {
    "description": "Enterprise database, cloud infrastructure, and business software leader.",
    "logo": "/logos/oracle.png", "locations": ["Bangalore","Hyderabad"],
    "package": "12–28 LPA", "difficulty": "Medium", "hiring_category": "Product",
    "roles": {
        "Software Engineer": _role(
            skills=["Java","C++","SQL","Oracle DB","PL/SQL","Git","OOP","DSA","Linux"],
            preferred_skills=["Python","Spring Boot","Docker","Kubernetes","OCI"],
            package="12–24 LPA", location="Bangalore / Hyderabad", difficulty="Medium",
            hiring_category="Product", description="Enterprise database, cloud infrastructure, and business software leader.",
            role_description="Develop Oracle's database engine, cloud services, and enterprise applications.",
            skill_groups={"Programming Languages":["Java","C++"],"Databases":["SQL","Oracle DB","PL/SQL"],"CS Fundamentals":["DSA","OOP"],"OS":["Linux"],"Tools":["Git"],"Preferred":["Python","Spring Boot","Docker","Kubernetes","OCI"]}),
        "Cloud Infrastructure Engineer": _role(
            skills=["Python","OCI","Docker","Kubernetes","Linux","Terraform","Git","Networking","SQL"],
            preferred_skills=["AWS","Azure","Ansible","Go","Prometheus"],
            package="14–28 LPA", location="Bangalore", difficulty="Medium",
            hiring_category="Product", description="Enterprise database, cloud infrastructure, and business software leader.",
            role_description="Build and scale Oracle Cloud Infrastructure (OCI) services.",
            skill_groups={"Cloud":["OCI"],"DevOps":["Docker","Kubernetes","Terraform","Ansible"],"Programming Languages":["Python","Go"],"OS & Networking":["Linux","Networking"],"Databases":["SQL"],"Tools":["Git"],"Preferred":["AWS","Azure","Prometheus"]}),
        "Database Administrator": _role(
            skills=["Oracle DB","SQL","PL/SQL","Linux","Backup & Recovery","Performance Tuning","Git"],
            preferred_skills=["Python","RAC","Data Guard","Exadata","PostgreSQL"],
            package="10–20 LPA", location="Hyderabad", difficulty="Medium",
            hiring_category="Product", description="Enterprise database, cloud infrastructure, and business software leader.",
            role_description="Administer, tune, and secure Oracle database systems for enterprise clients.",
            skill_groups={"Databases":["Oracle DB","SQL","PL/SQL"],"OS":["Linux"],"DBA":["Backup & Recovery","Performance Tuning"],"Tools":["Git"],"Preferred":["Python","RAC","Data Guard","Exadata"]}),
        "Java Developer": _role(
            skills=["Java","SQL","Spring Boot","OOP","REST API","Git","DSA","Maven","JUnit"],
            preferred_skills=["Microservices","Oracle DB","Docker","Hibernate","Linux"],
            package="12–22 LPA", location="Bangalore / Hyderabad", difficulty="Medium",
            hiring_category="Product", description="Enterprise database, cloud infrastructure, and business software leader.",
            role_description="Build enterprise Java applications and Oracle Fusion middleware.",
            skill_groups={"Programming Languages":["Java"],"Frameworks":["Spring Boot","Hibernate"],"Databases":["SQL","Oracle DB"],"APIs":["REST API"],"CS Fundamentals":["OOP","DSA"],"Tools":["Git","Maven","JUnit"],"Preferred":["Microservices","Docker","Linux"]}),
        "Data Analyst": _role(
            skills=["SQL","Python","Pandas","Excel","Oracle DB","Git","Tableau","DBMS"],
            preferred_skills=["Power BI","R","PL/SQL","Data Warehousing","Snowflake"],
            package="8–16 LPA", location="Bangalore / Hyderabad", difficulty="Medium",
            hiring_category="Product", description="Enterprise database, cloud infrastructure, and business software leader.",
            role_description="Analyse enterprise data and build reporting dashboards for Oracle customers.",
            skill_groups={"Data Analysis":["Pandas","Excel"],"Databases":["SQL","Oracle DB","DBMS"],"Visualisation":["Tableau","Power BI"],"Programming Languages":["Python"],"Tools":["Git"],"Preferred":["R","PL/SQL","Data Warehousing","Snowflake"]}),
        "Site Reliability Engineer": _role(
            skills=["Linux","Python","OCI","Kubernetes","Docker","Terraform","Git","Monitoring","Networking"],
            preferred_skills=["Prometheus","Grafana","Ansible","Go","Bash"],
            package="14–28 LPA", location="Bangalore", difficulty="Medium",
            hiring_category="Product", description="Enterprise database, cloud infrastructure, and business software leader.",
            role_description="Maintain reliability of Oracle Cloud global infrastructure.",
            skill_groups={"Cloud":["OCI"],"DevOps":["Kubernetes","Docker","Terraform","Ansible"],"Programming Languages":["Python","Go"],"OS":["Linux"],"Monitoring":["Monitoring","Prometheus","Grafana"],"Tools":["Git"],"Preferred":["Bash"]}),
    }
},

# ═══════════════════════════════════════════════════════
#  9. SALESFORCE
# ═══════════════════════════════════════════════════════
"Salesforce": {
    "description": "World's #1 CRM platform — Sales Cloud, Service Cloud, and Einstein AI.",
    "logo": "/logos/salesforce.png", "locations": ["Hyderabad","Bangalore"],
    "package": "14–35 LPA", "difficulty": "Medium", "hiring_category": "Product",
    "roles": {
        "Software Engineer": _role(
            skills=["Java","Python","JavaScript","Apex","SQL","Git","OOP","REST API","DSA"],
            preferred_skills=["Lightning Web Components","SOQL","Salesforce DX","Docker","React"],
            package="16–32 LPA", location="Hyderabad", difficulty="Medium",
            hiring_category="Product", description="World's #1 CRM platform — Sales Cloud, Service Cloud, and Einstein AI.",
            role_description="Build features on Salesforce's multi-tenant SaaS platform.",
            skill_groups={"Programming Languages":["Java","Python","JavaScript","Apex"],"Databases":["SQL","SOQL"],"APIs":["REST API"],"CS Fundamentals":["DSA","OOP"],"Tools":["Git"],"Preferred":["Lightning Web Components","Salesforce DX","Docker","React"]}),
        "Salesforce Developer": _role(
            skills=["Apex","SOQL","Lightning Web Components","JavaScript","Git","REST API","OOP"],
            preferred_skills=["Flow Builder","Salesforce DX","Python","Heroku","CI/CD"],
            package="12–24 LPA", location="Hyderabad / Bangalore", difficulty="Medium",
            hiring_category="Product", description="World's #1 CRM platform — Sales Cloud, Service Cloud, and Einstein AI.",
            role_description="Develop custom solutions on the Salesforce Platform using Apex and LWC.",
            skill_groups={"Salesforce":["Apex","SOQL","Lightning Web Components","Flow Builder"],"Programming Languages":["JavaScript"],"APIs":["REST API"],"CS Fundamentals":["OOP"],"Tools":["Git"],"Preferred":["Salesforce DX","Python","Heroku","CI/CD"]}),
        "Data Engineer": _role(
            skills=["Python","SQL","Spark","Kafka","Airflow","Git","REST API","DBMS"],
            preferred_skills=["Snowflake","dbt","Tableau","Heroku","Scala"],
            package="14–28 LPA", location="Hyderabad", difficulty="Medium",
            hiring_category="Product", description="World's #1 CRM platform — Sales Cloud, Service Cloud, and Einstein AI.",
            role_description="Build data pipelines powering Einstein Analytics and Tableau CRM.",
            skill_groups={"Data Engineering":["Spark","Kafka","Airflow"],"Databases":["SQL","DBMS"],"Programming Languages":["Python"],"APIs":["REST API"],"Tools":["Git"],"Preferred":["Snowflake","dbt","Tableau","Scala"]}),
        "AI Engineer": _role(
            skills=["Python","Machine Learning","NLP","SQL","REST API","Git","NumPy","Pandas"],
            preferred_skills=["PyTorch","TensorFlow","LLMs","Einstein AI","Heroku"],
            package="18–35 LPA", location="Hyderabad / Bangalore", difficulty="Medium",
            hiring_category="Product", description="World's #1 CRM platform — Sales Cloud, Service Cloud, and Einstein AI.",
            role_description="Build Einstein AI features bringing AI to CRM workflows.",
            skill_groups={"ML / AI":["Machine Learning","NLP"],"Data":["NumPy","Pandas","SQL"],"APIs":["REST API"],"Tools":["Git"],"Preferred":["PyTorch","TensorFlow","LLMs","Einstein AI"]}),
        "Backend Engineer": _role(
            skills=["Java","Python","SQL","REST API","Microservices","Docker","Git","OOP","DSA"],
            preferred_skills=["Kafka","Redis","Kubernetes","Spring Boot","Heroku"],
            package="14–28 LPA", location="Hyderabad", difficulty="Medium",
            hiring_category="Product", description="World's #1 CRM platform — Sales Cloud, Service Cloud, and Einstein AI.",
            role_description="Build scalable multi-tenant backend services for Salesforce clouds.",
            skill_groups={"Programming Languages":["Java","Python"],"APIs":["REST API","Microservices"],"Databases":["SQL"],"DevOps":["Docker"],"CS Fundamentals":["OOP","DSA"],"Tools":["Git"],"Preferred":["Kafka","Redis","Kubernetes","Spring Boot"]}),
        "QA Engineer": _role(
            skills=["Java","Selenium","Manual Testing","SQL","Git","REST API","OOP","Apex"],
            preferred_skills=["TestNG","Cucumber","Postman","SOQL","CI/CD"],
            package="10–20 LPA", location="Hyderabad / Bangalore", difficulty="Medium",
            hiring_category="Product", description="World's #1 CRM platform — Sales Cloud, Service Cloud, and Einstein AI.",
            role_description="Test Salesforce platform features and customer customisations.",
            skill_groups={"Testing":["Manual Testing","Selenium","TestNG","Cucumber"],"Salesforce":["Apex","SOQL"],"Databases":["SQL"],"APIs":["REST API"],"CS Fundamentals":["OOP"],"Tools":["Git","Postman"],"Preferred":["CI/CD"]}),
    }
},

# ═══════════════════════════════════════════════════════
#  10. NVIDIA
# ═══════════════════════════════════════════════════════
"NVIDIA": {
    "description": "Leader in GPU computing, AI accelerators, and autonomous driving technology.",
    "logo": "/logos/nvidia.png", "locations": ["Pune","Hyderabad","Bangalore"],
    "package": "20–55 LPA", "difficulty": "Hard", "hiring_category": "Product",
    "roles": {
        "Software Engineer": _role(
            skills=["C++","Python","Linux","Git","DSA","OOP","System Design","CMake","Debugging"],
            preferred_skills=["CUDA","Go","Rust","Docker","gRPC"],
            package="20–40 LPA", location="Hyderabad / Bangalore", difficulty="Hard",
            hiring_category="Product", description="Leader in GPU computing, AI accelerators, and autonomous driving technology.",
            role_description="Develop drivers, compilers, and system software for NVIDIA platforms.",
            skill_groups={"Programming Languages":["C++","Python"],"Build & Debug":["CMake","Debugging"],"CS Fundamentals":["DSA","OOP","System Design"],"OS":["Linux"],"Tools":["Git"],"Preferred":["CUDA","Go","Rust","Docker"]}),
        "CUDA Developer": _role(
            skills=["C++","Python","CUDA","GPU Programming","Linear Algebra","DSA","Git","Linux","OOP"],
            preferred_skills=["TensorRT","Triton","OpenCL","MPI","CMake"],
            package="25–50 LPA", location="Pune / Hyderabad", difficulty="Hard",
            hiring_category="Product", description="Leader in GPU computing, AI accelerators, and autonomous driving technology.",
            role_description="Optimize compute kernels and libraries for NVIDIA GPU architectures.",
            skill_groups={"Programming Languages":["C++","Python"],"GPU":["CUDA","GPU Programming"],"Math":["Linear Algebra"],"CS Fundamentals":["DSA","OOP"],"OS":["Linux"],"Tools":["Git"],"Preferred":["TensorRT","Triton","OpenCL","MPI"]}),
        "Machine Learning Engineer": _role(
            skills=["Python","Deep Learning","PyTorch","TensorFlow","CUDA","NumPy","Git","Linux","DSA"],
            preferred_skills=["TensorRT","Triton","Kubernetes","MLflow","Spark"],
            package="22–45 LPA", location="Pune / Bangalore", difficulty="Hard",
            hiring_category="Product", description="Leader in GPU computing, AI accelerators, and autonomous driving technology.",
            role_description="Train and optimize large-scale AI models on NVIDIA hardware.",
            skill_groups={"ML / AI":["Deep Learning","PyTorch","TensorFlow"],"GPU":["CUDA"],"Data":["NumPy"],"OS":["Linux"],"CS Fundamentals":["DSA"],"Tools":["Git"],"Preferred":["TensorRT","Triton","Kubernetes","MLflow"]}),
        "AI Software Engineer": _role(
            skills=["Python","Machine Learning","Deep Learning","CUDA","NumPy","Git","Linux","DSA","C++"],
            preferred_skills=["TensorRT","ONNX","Triton","PyTorch","Kubernetes"],
            package="22–45 LPA", location="Hyderabad / Bangalore", difficulty="Hard",
            hiring_category="Product", description="Leader in GPU computing, AI accelerators, and autonomous driving technology.",
            role_description="Build AI inference and deployment solutions on NVIDIA platforms.",
            skill_groups={"ML / AI":["Machine Learning","Deep Learning","CUDA"],"Data":["NumPy"],"Programming Languages":["Python","C++"],"OS":["Linux"],"CS Fundamentals":["DSA"],"Tools":["Git"],"Preferred":["TensorRT","ONNX","Triton","PyTorch"]}),
        "Computer Vision Engineer": _role(
            skills=["Python","Computer Vision","Deep Learning","OpenCV","PyTorch","C++","CUDA","Git","NumPy"],
            preferred_skills=["TensorRT","ONNX","Triton","DRIVE Platform","Jetson"],
            package="24–48 LPA", location="Pune / Hyderabad", difficulty="Hard",
            hiring_category="Product", description="Leader in GPU computing, AI accelerators, and autonomous driving technology.",
            role_description="Build vision AI for autonomous vehicles and robotics on NVIDIA DRIVE.",
            skill_groups={"ML / AI":["Computer Vision","Deep Learning","OpenCV","PyTorch"],"GPU":["CUDA"],"Programming Languages":["Python","C++"],"Data":["NumPy"],"Tools":["Git"],"Preferred":["TensorRT","ONNX","Triton","DRIVE Platform"]}),
        "Research Engineer": _role(
            skills=["Python","Deep Learning","PyTorch","CUDA","Linear Algebra","NumPy","Git","Linux"],
            preferred_skills=["JAX","Triton","Distributed Training","C++","ONNX"],
            package="28–55 LPA", location="Hyderabad", difficulty="Hard",
            hiring_category="Product", description="Leader in GPU computing, AI accelerators, and autonomous driving technology.",
            role_description="Research next-gen GPU architectures, training methods, and AI frameworks.",
            skill_groups={"ML / AI":["Deep Learning","PyTorch"],"GPU":["CUDA"],"Math":["Linear Algebra"],"Data":["NumPy"],"OS":["Linux"],"Tools":["Git"],"Preferred":["JAX","Triton","Distributed Training","C++","ONNX"]}),
    }
},

# ═══════════════════════════════════════════════════════
#  11. INTEL
# ═══════════════════════════════════════════════════════
"Intel": {
    "description": "Semiconductor giant powering CPUs, AI accelerators, and edge computing.",
    "logo": "/logos/intel.png", "locations": ["Bangalore","Hyderabad","Pune"],
    "package": "12–30 LPA", "difficulty": "Medium", "hiring_category": "Product",
    "roles": {
        "Software Engineer": _role(
            skills=["C","C++","Python","Linux","Git","DSA","OOP","Computer Architecture","Debugging"],
            preferred_skills=["CUDA","OpenCL","CMake","Rust","Assembly"],
            package="12–28 LPA", location="Bangalore / Hyderabad", difficulty="Medium",
            hiring_category="Product", description="Semiconductor giant powering CPUs, AI accelerators, and edge computing.",
            role_description="Develop firmware, drivers, and software stacks for Intel silicon.",
            skill_groups={"Programming Languages":["C","C++","Python"],"Low-Level":["Computer Architecture","Assembly","CMake"],"CS Fundamentals":["DSA","OOP"],"OS":["Linux","Debugging"],"Tools":["Git"],"Preferred":["CUDA","OpenCL","Rust"]}),
        "AI Software Engineer": _role(
            skills=["Python","Machine Learning","Deep Learning","OpenVINO","NumPy","Git","Linux","DSA"],
            preferred_skills=["PyTorch","TensorFlow","ONNX","C++","CUDA"],
            package="16–30 LPA", location="Bangalore", difficulty="Medium",
            hiring_category="Product", description="Semiconductor giant powering CPUs, AI accelerators, and edge computing.",
            role_description="Build AI inference optimizations for Intel Xeon and Gaudi platforms.",
            skill_groups={"ML / AI":["Machine Learning","Deep Learning","OpenVINO"],"Data":["NumPy"],"OS":["Linux"],"CS Fundamentals":["DSA"],"Tools":["Git"],"Preferred":["PyTorch","TensorFlow","ONNX","C++"]}),
        "VLSI Engineer": _role(
            skills=["Verilog","VHDL","SystemVerilog","C","Linux","Git","Digital Design","DSA"],
            preferred_skills=["UVM","TCL","Python","Synopsys Tools","FPGA"],
            package="10–22 LPA", location="Bangalore / Hyderabad / Pune", difficulty="Medium",
            hiring_category="Product", description="Semiconductor giant powering CPUs, AI accelerators, and edge computing.",
            role_description="Design and verify digital logic for Intel processor architectures.",
            skill_groups={"Hardware":["Verilog","VHDL","SystemVerilog","Digital Design","FPGA"],"Programming Languages":["C"],"OS":["Linux"],"Scripting":["TCL","Python"],"CS Fundamentals":["DSA"],"Tools":["Git"],"Preferred":["UVM","Synopsys Tools"]}),
        "Embedded Software Engineer": _role(
            skills=["C","C++","Python","Embedded Linux","RTOS","Git","Computer Architecture","Debugging"],
            preferred_skills=["Assembly","CMake","OpenCL","JTAG","Yocto"],
            package="12–24 LPA", location="Bangalore / Pune", difficulty="Medium",
            hiring_category="Product", description="Semiconductor giant powering CPUs, AI accelerators, and edge computing.",
            role_description="Develop firmware and embedded software for Intel hardware platforms.",
            skill_groups={"Programming Languages":["C","C++","Python"],"Embedded":["Embedded Linux","RTOS","Computer Architecture","Debugging"],"Tools":["Git","CMake","JTAG"],"Preferred":["Assembly","OpenCL","Yocto"]}),
        "Data Engineer": _role(
            skills=["Python","SQL","Spark","Linux","Git","Airflow","DBMS","REST API"],
            preferred_skills=["Kafka","Scala","dbt","AWS","Tableau"],
            package="12–24 LPA", location="Bangalore / Hyderabad", difficulty="Medium",
            hiring_category="Product", description="Semiconductor giant powering CPUs, AI accelerators, and edge computing.",
            role_description="Build data infrastructure supporting Intel's semiconductor manufacturing analytics.",
            skill_groups={"Data Engineering":["Spark","Airflow","Kafka"],"Databases":["SQL","DBMS"],"Programming Languages":["Python"],"OS":["Linux"],"Tools":["Git"],"Preferred":["Scala","dbt","AWS","Tableau"]}),
    }
},

# ═══════════════════════════════════════════════════════
#  12. SAP
# ═══════════════════════════════════════════════════════
"SAP": {
    "description": "World's largest enterprise software company: ERP, S/4HANA, and BTP.",
    "logo": "/logos/sap.png", "locations": ["Bangalore","Mumbai","Gurgaon"],
    "package": "10–22 LPA", "difficulty": "Medium", "hiring_category": "Product",
    "roles": {
        "Software Developer": _role(
            skills=["Java","Python","SQL","Spring Boot","REST API","Git","OOP","DSA"],
            preferred_skills=["SAP ABAP","Cloud Foundry","SAP BTP","Docker","Microservices"],
            package="12–22 LPA", location="Bangalore / Gurgaon", difficulty="Medium",
            hiring_category="Product", description="World's largest enterprise software company: ERP, S/4HANA, and BTP.",
            role_description="Build next-generation cloud applications on SAP Business Technology Platform.",
            skill_groups={"Programming Languages":["Java","Python"],"Frameworks":["Spring Boot"],"Databases":["SQL"],"APIs":["REST API"],"CS Fundamentals":["OOP","DSA"],"Tools":["Git"],"Preferred":["SAP ABAP","Cloud Foundry","SAP BTP","Docker"]}),
        "ABAP Developer": _role(
            skills=["SAP ABAP","SQL","OOP","Git","Python","REST API","DBMS","Excel"],
            preferred_skills=["SAP S/4HANA","SAP Fiori","OData","SAP UI5","JIRA"],
            package="10–20 LPA", location="Bangalore / Mumbai", difficulty="Medium",
            hiring_category="Product", description="World's largest enterprise software company: ERP, S/4HANA, and BTP.",
            role_description="Develop and customise SAP ERP modules using ABAP.",
            skill_groups={"SAP":["SAP ABAP","SAP S/4HANA","SAP Fiori","OData"],"Databases":["SQL","DBMS"],"CS Fundamentals":["OOP"],"APIs":["REST API"],"Data":["Excel"],"Tools":["Git","JIRA"],"Preferred":["SAP UI5"]}),
        "Cloud Engineer": _role(
            skills=["AWS","Azure","Python","Docker","Linux","Git","SQL","Terraform"],
            preferred_skills=["SAP BTP","Kubernetes","Ansible","Jenkins","GCP"],
            package="12–24 LPA", location="Bangalore", difficulty="Medium",
            hiring_category="Product", description="World's largest enterprise software company: ERP, S/4HANA, and BTP.",
            role_description="Deploy and operate SAP cloud solutions on hyperscaler platforms.",
            skill_groups={"Cloud":["AWS","Azure"],"DevOps":["Docker","Kubernetes","Terraform","Ansible"],"Programming Languages":["Python"],"OS":["Linux"],"Databases":["SQL"],"Tools":["Git"],"Preferred":["SAP BTP","Jenkins","GCP"]}),
        "Data Analyst": _role(
            skills=["SQL","Python","Pandas","SAP Analytics Cloud","Excel","Git","DBMS","Tableau"],
            preferred_skills=["Power BI","R","SAP HANA","Snowflake","Data Warehousing"],
            package="8–16 LPA", location="Bangalore / Mumbai", difficulty="Medium",
            hiring_category="Product", description="World's largest enterprise software company: ERP, S/4HANA, and BTP.",
            role_description="Analyse business data using SAP Analytics Cloud and BI tools.",
            skill_groups={"Data Analysis":["Pandas","Excel"],"Databases":["SQL","SAP HANA","DBMS"],"Visualisation":["Tableau","SAP Analytics Cloud","Power BI"],"Programming Languages":["Python"],"Tools":["Git"],"Preferred":["R","Snowflake","Data Warehousing"]}),
        "SAP Consultant": _role(
            skills=["SAP ABAP","SAP S/4HANA","SQL","OOP","Git","Python","REST API","Excel"],
            preferred_skills=["SAP Fiori","SAP BTP","OData","JIRA","Agile"],
            package="10–20 LPA", location="Bangalore / Mumbai / Gurgaon", difficulty="Medium",
            hiring_category="Product", description="World's largest enterprise software company: ERP, S/4HANA, and BTP.",
            role_description="Implement and configure SAP solutions for enterprise clients.",
            skill_groups={"SAP":["SAP ABAP","SAP S/4HANA","SAP Fiori","SAP BTP"],"Databases":["SQL"],"CS Fundamentals":["OOP"],"APIs":["REST API"],"Data":["Excel"],"Tools":["Git","JIRA"],"Preferred":["OData","Agile"]}),
        "Full Stack Developer": _role(
            skills=["JavaScript","Java","React","SQL","Spring Boot","REST API","Git","OOP","HTML","CSS"],
            preferred_skills=["SAP UI5","TypeScript","Docker","SAP BTP","Node.js"],
            package="12–22 LPA", location="Bangalore", difficulty="Medium",
            hiring_category="Product", description="World's largest enterprise software company: ERP, S/4HANA, and BTP.",
            role_description="Build full-stack enterprise applications integrating with SAP backends.",
            skill_groups={"Programming Languages":["JavaScript","Java"],"Frameworks":["React","Spring Boot"],"Web":["HTML","CSS"],"Databases":["SQL"],"APIs":["REST API"],"CS Fundamentals":["OOP"],"Tools":["Git"],"Preferred":["SAP UI5","TypeScript","Docker"]}),
    }
},

# ═══════════════════════════════════════════════════════
#  13. PAYPAL
# ═══════════════════════════════════════════════════════
"PayPal": {
    "description": "Global digital payments leader: PayPal, Venmo, Braintree, and Hyperwallet.",
    "logo": "/logos/paypal.svg", "locations": ["Bangalore","Chennai"],
    "package": "16–35 LPA", "difficulty": "Medium", "hiring_category": "Product",
    "roles": {
        "Software Engineer": _role(
            skills=["Java","Python","SQL","REST API","Git","OOP","DSA","Microservices","Spring Boot"],
            preferred_skills=["Kafka","Docker","AWS","Redis","Node.js"],
            package="16–30 LPA", location="Bangalore / Chennai", difficulty="Medium",
            hiring_category="Product", description="Global digital payments leader.",
            role_description="Build PayPal's core payment processing and fraud detection systems.",
            skill_groups={"Programming Languages":["Java","Python"],"Frameworks":["Spring Boot"],"Databases":["SQL"],"APIs":["REST API","Microservices"],"CS Fundamentals":["OOP","DSA"],"Tools":["Git"],"Preferred":["Kafka","Docker","AWS","Redis"]}),
        "Java Developer": _role(
            skills=["Java","Spring Boot","SQL","REST API","Git","OOP","DSA","Maven","JUnit"],
            preferred_skills=["Kafka","Microservices","Docker","Redis","Oracle DB"],
            package="14–26 LPA", location="Bangalore / Chennai", difficulty="Medium",
            hiring_category="Product", description="Global digital payments leader.",
            role_description="Develop Java-based microservices for PayPal's payment platform.",
            skill_groups={"Programming Languages":["Java"],"Frameworks":["Spring Boot"],"Databases":["SQL"],"APIs":["REST API"],"CS Fundamentals":["OOP","DSA"],"Tools":["Git","Maven","JUnit"],"Preferred":["Kafka","Microservices","Docker","Redis"]}),
        "Data Scientist": _role(
            skills=["Python","Machine Learning","SQL","NumPy","Pandas","Scikit-learn","Git","Statistics"],
            preferred_skills=["PyTorch","TensorFlow","Spark","AWS","Fraud Detection"],
            package="18–35 LPA", location="Bangalore", difficulty="Medium",
            hiring_category="Product", description="Global digital payments leader.",
            role_description="Build ML models for fraud detection and risk scoring at PayPal.",
            skill_groups={"ML / AI":["Machine Learning","Scikit-learn"],"Data":["NumPy","Pandas","Statistics","SQL"],"Programming Languages":["Python"],"Tools":["Git"],"Preferred":["PyTorch","TensorFlow","Spark","AWS","Fraud Detection"]}),
        "Risk Engineer": _role(
            skills=["Python","SQL","Machine Learning","Statistics","REST API","Git","Pandas","NumPy"],
            preferred_skills=["Fraud Detection","Spark","Scikit-learn","AWS","Tableau"],
            package="16–30 LPA", location="Bangalore / Chennai", difficulty="Medium",
            hiring_category="Product", description="Global digital payments leader.",
            role_description="Build and tune risk models protecting PayPal's payment network.",
            skill_groups={"ML / AI":["Machine Learning","Fraud Detection"],"Data":["Pandas","NumPy","Statistics","SQL"],"APIs":["REST API"],"Programming Languages":["Python"],"Tools":["Git"],"Preferred":["Spark","Scikit-learn","AWS","Tableau"]}),
        "Backend Engineer": _role(
            skills=["Java","Python","SQL","Microservices","Kafka","Docker","Git","REST API","OOP"],
            preferred_skills=["Kubernetes","Redis","AWS","Spring Boot","gRPC"],
            package="18–35 LPA", location="Bangalore", difficulty="Medium",
            hiring_category="Product", description="Global digital payments leader.",
            role_description="Build scalable distributed services processing millions of payment transactions.",
            skill_groups={"Programming Languages":["Java","Python"],"Architecture":["Microservices"],"Messaging":["Kafka"],"Databases":["SQL"],"DevOps":["Docker"],"APIs":["REST API"],"CS Fundamentals":["OOP"],"Tools":["Git"],"Preferred":["Kubernetes","Redis","AWS","Spring Boot"]}),
    }
},

# ═══════════════════════════════════════════════════════
#  14. UBER
# ═══════════════════════════════════════════════════════
"Uber": {
    "description": "Global ride-hailing, Uber Eats, and Uber Freight mobility platform.",
    "logo": "/logos/uber.svg", "locations": ["Hyderabad","Bangalore"],
    "package": "18–40 LPA", "difficulty": "Medium", "hiring_category": "Product",
    "roles": {
        "Software Engineer": _role(
            skills=["Go","Java","Python","DSA","System Design","SQL","Git","Microservices","Linux"],
            preferred_skills=["Kafka","Redis","Kubernetes","MySQL","gRPC"],
            package="20–40 LPA", location="Hyderabad / Bangalore", difficulty="Medium",
            hiring_category="Product", description="Global ride-hailing, Uber Eats, and Uber Freight mobility platform.",
            role_description="Build real-time systems powering Uber's global marketplace.",
            skill_groups={"Programming Languages":["Go","Java","Python"],"Architecture":["System Design","Microservices"],"Databases":["SQL"],"OS":["Linux"],"CS Fundamentals":["DSA"],"Tools":["Git"],"Preferred":["Kafka","Redis","Kubernetes","MySQL"]}),
        "Backend Engineer": _role(
            skills=["Go","Java","Python","SQL","Kafka","Redis","Docker","Git","DSA","System Design"],
            preferred_skills=["Kubernetes","MySQL","gRPC","Cassandra","AWS"],
            package="22–42 LPA", location="Hyderabad / Bangalore", difficulty="Medium",
            hiring_category="Product", description="Global ride-hailing, Uber Eats, and Uber Freight mobility platform.",
            role_description="Design distributed backend services for Uber's platform at scale.",
            skill_groups={"Programming Languages":["Go","Java","Python"],"Messaging":["Kafka"],"Caching":["Redis"],"Databases":["SQL","MySQL"],"DevOps":["Docker"],"CS Fundamentals":["DSA","System Design"],"Tools":["Git"],"Preferred":["Kubernetes","gRPC","Cassandra","AWS"]}),
        "Data Engineer": _role(
            skills=["Python","SQL","Spark","Kafka","Airflow","Git","Linux","DBMS"],
            preferred_skills=["Scala","dbt","Presto","AWS","Hudi"],
            package="18–35 LPA", location="Hyderabad", difficulty="Medium",
            hiring_category="Product", description="Global ride-hailing, Uber Eats, and Uber Freight mobility platform.",
            role_description="Build real-time data pipelines powering Uber's analytics and ML.",
            skill_groups={"Data Engineering":["Spark","Kafka","Airflow"],"Databases":["SQL","DBMS"],"Programming Languages":["Python"],"OS":["Linux"],"Tools":["Git"],"Preferred":["Scala","dbt","Presto","AWS","Hudi"]}),
        "Machine Learning Engineer": _role(
            skills=["Python","Machine Learning","Deep Learning","PyTorch","SQL","Spark","Git","NumPy","Pandas"],
            preferred_skills=["TensorFlow","Michelangelo","Kubernetes","MLflow","Scala"],
            package="22–42 LPA", location="Hyderabad / Bangalore", difficulty="Medium",
            hiring_category="Product", description="Global ride-hailing, Uber Eats, and Uber Freight mobility platform.",
            role_description="Build ML models for surge pricing, ETAs, and driver matching.",
            skill_groups={"ML / AI":["Machine Learning","Deep Learning","PyTorch"],"Data Engineering":["Spark"],"Data":["NumPy","Pandas","SQL"],"Tools":["Git"],"Preferred":["TensorFlow","Michelangelo","Kubernetes","MLflow"]}),
        "DevOps Engineer": _role(
            skills=["AWS","Docker","Kubernetes","Linux","Python","Terraform","CI/CD","Git","Bash"],
            preferred_skills=["Jenkins","Ansible","Prometheus","Grafana","Go"],
            package="18–35 LPA", location="Hyderabad / Bangalore", difficulty="Medium",
            hiring_category="Product", description="Global ride-hailing, Uber Eats, and Uber Freight mobility platform.",
            role_description="Build and operate Uber's global cloud infrastructure.",
            skill_groups={"Cloud":["AWS"],"DevOps":["Docker","Kubernetes","Terraform","CI/CD","Ansible"],"OS & Scripting":["Linux","Bash","Python"],"Tools":["Git"],"Preferred":["Jenkins","Prometheus","Grafana","Go"]}),
        "Mobile Application Developer": _role(
            skills=["Swift","Kotlin","Java","Android SDK","iOS","Git","REST API","OOP","DSA"],
            preferred_skills=["React Native","SwiftUI","Jetpack Compose","Firebase","Redux"],
            package="18–35 LPA", location="Hyderabad / Bangalore", difficulty="Medium",
            hiring_category="Product", description="Global ride-hailing, Uber Eats, and Uber Freight mobility platform.",
            role_description="Build the Uber Driver and Rider apps used by 150M+ users.",
            skill_groups={"Mobile":["Swift","Kotlin","Android SDK","iOS","SwiftUI","Jetpack Compose"],"APIs":["REST API"],"CS Fundamentals":["OOP","DSA"],"Tools":["Git"],"Preferred":["React Native","Firebase","Redux"]}),
    }
},

# ═══════════════════════════════════════════════════════
#  15. ATLASSIAN
# ═══════════════════════════════════════════════════════
"Atlassian": {
    "description": "Maker of Jira, Confluence, Bitbucket, and Trello for software teams.",
    "logo": "/logos/atlassian.svg", "locations": ["Bangalore"],
    "package": "16–35 LPA", "difficulty": "Medium", "hiring_category": "Product",
    "roles": {
        "Software Engineer": _role(
            skills=["Java","Python","JavaScript","DSA","System Design","SQL","Git","OOP","REST API"],
            preferred_skills=["TypeScript","React","Docker","AWS","Kafka"],
            package="18–35 LPA", location="Bangalore", difficulty="Medium",
            hiring_category="Product", description="Maker of Jira, Confluence, Bitbucket, and Trello for software teams.",
            role_description="Build the developer tools used by millions of software teams.",
            skill_groups={"Programming Languages":["Java","Python","JavaScript"],"Databases":["SQL"],"CS Fundamentals":["DSA","OOP","System Design"],"APIs":["REST API"],"Tools":["Git"],"Preferred":["TypeScript","React","Docker","AWS","Kafka"]}),
        "Full Stack Developer": _role(
            skills=["JavaScript","TypeScript","React","Java","SQL","Git","REST API","HTML","CSS","OOP"],
            preferred_skills=["GraphQL","Node.js","Forge Platform","Docker","AWS"],
            package="16–32 LPA", location="Bangalore", difficulty="Medium",
            hiring_category="Product", description="Maker of Jira, Confluence, Bitbucket, and Trello for software teams.",
            role_description="Build full-stack features for Atlassian's collaboration tools.",
            skill_groups={"Programming Languages":["JavaScript","TypeScript","Java"],"Frameworks":["React"],"Web":["HTML","CSS"],"Databases":["SQL"],"APIs":["REST API"],"CS Fundamentals":["OOP"],"Tools":["Git"],"Preferred":["GraphQL","Node.js","Forge Platform","Docker"]}),
        "DevOps Engineer": _role(
            skills=["AWS","Docker","Kubernetes","Linux","Python","Terraform","CI/CD","Git","Bash"],
            preferred_skills=["Ansible","Prometheus","Grafana","Jenkins","Go"],
            package="18–35 LPA", location="Bangalore", difficulty="Medium",
            hiring_category="Product", description="Maker of Jira, Confluence, Bitbucket, and Trello for software teams.",
            role_description="Build CI/CD pipelines and cloud infrastructure for Atlassian's SaaS products.",
            skill_groups={"Cloud":["AWS"],"DevOps":["Docker","Kubernetes","Terraform","CI/CD","Ansible"],"OS & Scripting":["Linux","Bash","Python"],"Tools":["Git"],"Preferred":["Prometheus","Grafana","Jenkins","Go"]}),
        "Site Reliability Engineer": _role(
            skills=["Linux","Python","AWS","Kubernetes","Docker","Terraform","Git","Monitoring","Networking"],
            preferred_skills=["Go","Prometheus","Grafana","Ansible","Bash"],
            package="20–38 LPA", location="Bangalore", difficulty="Medium",
            hiring_category="Product", description="Maker of Jira, Confluence, Bitbucket, and Trello for software teams.",
            role_description="Ensure reliability of Atlassian Cloud serving 10M+ users.",
            skill_groups={"Cloud":["AWS"],"DevOps":["Kubernetes","Docker","Terraform","Ansible"],"OS":["Linux"],"Monitoring":["Monitoring","Prometheus","Grafana"],"Networking":["Networking"],"Tools":["Git"],"Preferred":["Go","Bash"]}),
        "Data Engineer": _role(
            skills=["Python","SQL","Spark","Kafka","Airflow","AWS","Git","Linux"],
            preferred_skills=["Scala","dbt","Snowflake","Presto","Redshift"],
            package="16–30 LPA", location="Bangalore", difficulty="Medium",
            hiring_category="Product", description="Maker of Jira, Confluence, Bitbucket, and Trello for software teams.",
            role_description="Build data infrastructure powering Atlassian's product analytics.",
            skill_groups={"Data Engineering":["Spark","Kafka","Airflow"],"Cloud":["AWS"],"Databases":["SQL"],"Programming Languages":["Python"],"OS":["Linux"],"Tools":["Git"],"Preferred":["Scala","dbt","Snowflake","Presto"]}),
    }
},

# ═══════════════════════════════════════════════════════
#  16. LINKEDIN
# ═══════════════════════════════════════════════════════
"LinkedIn": {
    "description": "World's largest professional network with 1B+ members — a Microsoft company.",
    "logo": "/logos/linkedin.svg", "locations": ["Bangalore"],
    "package": "16–35 LPA", "difficulty": "Medium", "hiring_category": "Product",
    "roles": {
        "Software Engineer": _role(
            skills=["Java","Python","JavaScript","DSA","System Design","SQL","Git","OOP","REST API"],
            preferred_skills=["Kafka","Spark","React","Azure","Hadoop"],
            package="18–35 LPA", location="Bangalore", difficulty="Medium",
            hiring_category="Product", description="World's largest professional network with 1B+ members.",
            role_description="Build products and infrastructure powering LinkedIn's professional ecosystem.",
            skill_groups={"Programming Languages":["Java","Python","JavaScript"],"Databases":["SQL"],"CS Fundamentals":["DSA","OOP","System Design"],"APIs":["REST API"],"Tools":["Git"],"Preferred":["Kafka","Spark","React","Azure"]}),
        "Machine Learning Engineer": _role(
            skills=["Python","Machine Learning","Deep Learning","Spark","SQL","NumPy","Pandas","Git"],
            preferred_skills=["PyTorch","TensorFlow","Kafka","Azure","Scala"],
            package="20–38 LPA", location="Bangalore", difficulty="Medium",
            hiring_category="Product", description="World's largest professional network with 1B+ members.",
            role_description="Build job recommendation and feed ranking ML models for LinkedIn.",
            skill_groups={"ML / AI":["Machine Learning","Deep Learning"],"Data Engineering":["Spark","Kafka"],"Data":["NumPy","Pandas","SQL"],"Tools":["Git"],"Preferred":["PyTorch","TensorFlow","Azure","Scala"]}),
        "Data Engineer": _role(
            skills=["Python","SQL","Spark","Kafka","Hadoop","Airflow","Git","Linux"],
            preferred_skills=["Scala","dbt","Azure","Presto","Iceberg"],
            package="16–30 LPA", location="Bangalore", difficulty="Medium",
            hiring_category="Product", description="World's largest professional network with 1B+ members.",
            role_description="Build data pipelines supporting LinkedIn's analytics and AI products.",
            skill_groups={"Data Engineering":["Spark","Kafka","Hadoop","Airflow"],"Databases":["SQL"],"Programming Languages":["Python"],"OS":["Linux"],"Tools":["Git"],"Preferred":["Scala","dbt","Azure","Presto","Iceberg"]}),
        "Backend Engineer": _role(
            skills=["Java","Python","SQL","REST API","Microservices","Kafka","Git","OOP","DSA"],
            preferred_skills=["Azure","Voldemort","Espresso","Spring Boot","gRPC"],
            package="18–35 LPA", location="Bangalore", difficulty="Medium",
            hiring_category="Product", description="World's largest professional network with 1B+ members.",
            role_description="Build scalable backend services powering LinkedIn's 1B+ user platform.",
            skill_groups={"Programming Languages":["Java","Python"],"APIs":["REST API","Microservices"],"Messaging":["Kafka"],"Databases":["SQL"],"CS Fundamentals":["OOP","DSA"],"Tools":["Git"],"Preferred":["Azure","Spring Boot","gRPC"]}),
        "Security Engineer": _role(
            skills=["Python","Linux","Networking","Security Protocols","SQL","Git","OOP","Cryptography"],
            preferred_skills=["Azure Security","Penetration Testing","SIEM","Threat Modeling","Java"],
            package="18–35 LPA", location="Bangalore", difficulty="Medium",
            hiring_category="Product", description="World's largest professional network with 1B+ members.",
            role_description="Protect LinkedIn's platform and 1B+ member data from threats.",
            skill_groups={"Security":["Security Protocols","Cryptography","Penetration Testing"],"Programming Languages":["Python","Java"],"OS & Networking":["Linux","Networking"],"Databases":["SQL"],"Tools":["Git"],"Preferred":["Azure Security","SIEM","Threat Modeling"]}),
    }
},

# ═══════════════════════════════════════════════════════
#  17. ZOOM
# ═══════════════════════════════════════════════════════
"Zoom": {
    "description": "Cloud-native video conferencing and collaboration platform.",
    "logo": "/logos/zoom.svg", "locations": ["Bangalore"],
    "package": "12–28 LPA", "difficulty": "Medium", "hiring_category": "Product",
    "roles": {
        "Software Engineer": _role(
            skills=["Java","Go","Python","DSA","System Design","SQL","Git","Microservices","Linux"],
            preferred_skills=["WebRTC","Kafka","Kubernetes","AWS","C++"],
            package="14–28 LPA", location="Bangalore", difficulty="Medium",
            hiring_category="Product", description="Cloud-native video conferencing and collaboration platform.",
            role_description="Build real-time communication systems used by 300,000+ enterprise customers.",
            skill_groups={"Programming Languages":["Java","Go","Python"],"Architecture":["System Design","Microservices"],"Databases":["SQL"],"OS":["Linux"],"CS Fundamentals":["DSA"],"Tools":["Git"],"Preferred":["WebRTC","Kafka","Kubernetes","AWS"]}),
        "Backend Engineer": _role(
            skills=["Java","Go","Python","SQL","REST API","Microservices","Git","Docker","DSA"],
            preferred_skills=["WebRTC","Kafka","Redis","Kubernetes","C++"],
            package="14–28 LPA", location="Bangalore", difficulty="Medium",
            hiring_category="Product", description="Cloud-native video conferencing and collaboration platform.",
            role_description="Design backend services handling real-time media routing at scale.",
            skill_groups={"Programming Languages":["Java","Go","Python"],"APIs":["REST API","Microservices"],"Databases":["SQL"],"DevOps":["Docker"],"CS Fundamentals":["DSA"],"Tools":["Git"],"Preferred":["WebRTC","Kafka","Redis","Kubernetes"]}),
        "Cloud Engineer": _role(
            skills=["AWS","Docker","Kubernetes","Linux","Python","Terraform","Git","Networking"],
            preferred_skills=["Go","Ansible","Prometheus","Grafana","Bash"],
            package="14–26 LPA", location="Bangalore", difficulty="Medium",
            hiring_category="Product", description="Cloud-native video conferencing and collaboration platform.",
            role_description="Build and operate Zoom's global cloud media infrastructure.",
            skill_groups={"Cloud":["AWS"],"DevOps":["Docker","Kubernetes","Terraform","Ansible"],"Programming Languages":["Python","Go"],"OS & Networking":["Linux","Networking"],"Tools":["Git"],"Preferred":["Prometheus","Grafana","Bash"]}),
        "QA Engineer": _role(
            skills=["Java","Selenium","Manual Testing","SQL","Git","REST API","OOP","Appium"],
            preferred_skills=["TestNG","Postman","Python","Performance Testing","CI/CD"],
            package="10–20 LPA", location="Bangalore", difficulty="Medium",
            hiring_category="Product", description="Cloud-native video conferencing and collaboration platform.",
            role_description="Ensure quality of Zoom's video, audio, and collaboration features.",
            skill_groups={"Testing":["Manual Testing","Selenium","Appium","TestNG"],"Programming Languages":["Java"],"Databases":["SQL"],"APIs":["REST API"],"CS Fundamentals":["OOP"],"Tools":["Git","Postman"],"Preferred":["Python","Performance Testing","CI/CD"]}),
        "Machine Learning Engineer": _role(
            skills=["Python","Machine Learning","Deep Learning","NLP","NumPy","Pandas","SQL","Git"],
            preferred_skills=["PyTorch","TensorFlow","Transformers","AWS","Kubernetes"],
            package="16–30 LPA", location="Bangalore", difficulty="Medium",
            hiring_category="Product", description="Cloud-native video conferencing and collaboration platform.",
            role_description="Build AI features — transcription, summaries, and AI Companion — for Zoom.",
            skill_groups={"ML / AI":["Machine Learning","Deep Learning","NLP"],"Data":["NumPy","Pandas","SQL"],"Tools":["Git"],"Preferred":["PyTorch","TensorFlow","Transformers","AWS","Kubernetes"]}),
    }
},

# ═══════════════════════════════════════════════════════
#  SERVICE COMPANIES (18-30)
# ═══════════════════════════════════════════════════════

# 18. TCS
"TCS": {
    "description": "India's largest IT services company with 600,000+ employees worldwide.",
    "logo": "/logos/tcs.png", "locations": ["Pan-India"],
    "package": "3.5–8 LPA", "difficulty": "Easy", "hiring_category": "Service",
    "roles": {
        "Software Engineer": _role(
            skills=["Java","Python","SQL","Git","OOP","Linux","Testing","DBMS","REST API"],
            preferred_skills=["Docker","Kubernetes","Angular","AWS","Jenkins"],
            package="3.5–7 LPA", location="Pan-India", difficulty="Easy",
            hiring_category="Service", description="India's largest IT services company with 600,000+ employees worldwide.",
            role_description="Design and develop client-facing enterprise software solutions.",
            skill_groups={"Programming Languages":["Java","Python"],"Databases":["SQL","DBMS"],"OS":["Linux"],"Testing":["Testing"],"APIs":["REST API"],"Tools":["Git"],"Preferred":["Docker","Kubernetes","Angular","AWS"]}),
        "Assistant System Engineer": _role(
            skills=["Java","Python","SQL","HTML","CSS","JavaScript","Git","OOP","DBMS"],
            preferred_skills=["Spring Boot","React","Testing","Linux","Selenium"],
            package="3.5–6 LPA", location="Pan-India", difficulty="Easy",
            hiring_category="Service", description="India's largest IT services company with 600,000+ employees worldwide.",
            role_description="Entry-level role: develop, test, and maintain enterprise software.",
            skill_groups={"Programming Languages":["Java","Python","JavaScript"],"Web":["HTML","CSS"],"Databases":["SQL","DBMS"],"CS Fundamentals":["OOP"],"Tools":["Git"],"Preferred":["Spring Boot","React","Testing","Selenium"]}),
        "Systems Engineer": _role(
            skills=["Java","Python","SQL","Git","OOP","Linux","Testing","DBMS","REST API"],
            preferred_skills=["Docker","Kubernetes","Angular","AWS","Jenkins"],
            package="5–8 LPA", location="Pan-India", difficulty="Easy",
            hiring_category="Service", description="India's largest IT services company with 600,000+ employees worldwide.",
            role_description="Design and develop client-facing enterprise software solutions.",
            skill_groups={"Programming Languages":["Java","Python"],"Databases":["SQL","DBMS"],"OS":["Linux"],"Testing":["Testing"],"APIs":["REST API"],"Tools":["Git"],"Preferred":["Docker","Kubernetes","Angular","AWS"]}),
        "Java Developer": _role(
            skills=["Java","Spring Boot","SQL","OOP","REST API","Git","DSA","Maven","Hibernate"],
            preferred_skills=["Microservices","Docker","Angular","Oracle DB","Linux"],
            package="4–8 LPA", location="Pan-India", difficulty="Easy",
            hiring_category="Service", description="India's largest IT services company with 600,000+ employees worldwide.",
            role_description="Develop Java enterprise applications for TCS clients.",
            skill_groups={"Programming Languages":["Java"],"Frameworks":["Spring Boot","Hibernate"],"Databases":["SQL"],"APIs":["REST API"],"CS Fundamentals":["OOP","DSA"],"Tools":["Git","Maven"],"Preferred":["Microservices","Docker","Angular","Oracle DB"]}),
        "Python Developer": _role(
            skills=["Python","SQL","Django","REST API","Git","OOP","Linux","HTML","CSS"],
            preferred_skills=["Flask","Docker","AWS","NumPy","Pandas"],
            package="4–8 LPA", location="Pan-India", difficulty="Easy",
            hiring_category="Service", description="India's largest IT services company with 600,000+ employees worldwide.",
            role_description="Build Python-based web applications and automation tools for TCS clients.",
            skill_groups={"Programming Languages":["Python"],"Frameworks":["Django","Flask"],"Databases":["SQL"],"APIs":["REST API"],"Web":["HTML","CSS"],"OS":["Linux"],"Tools":["Git"],"Preferred":["Docker","AWS","NumPy","Pandas"]}),
        "Test Engineer": _role(
            skills=["Java","Selenium","Manual Testing","SQL","Git","OOP","REST API","JIRA"],
            preferred_skills=["Cucumber","TestNG","Postman","Python","CI/CD"],
            package="4–7 LPA", location="Pan-India", difficulty="Easy",
            hiring_category="Service", description="India's largest IT services company with 600,000+ employees worldwide.",
            role_description="Write automated and manual test cases for enterprise client projects.",
            skill_groups={"Testing":["Manual Testing","Selenium","TestNG","Cucumber"],"Programming Languages":["Java"],"Databases":["SQL"],"APIs":["REST API"],"CS Fundamentals":["OOP"],"Tools":["Git","JIRA","Postman"],"Preferred":["Python","CI/CD"]}),
        "Data Analyst": _role(
            skills=["Python","SQL","Pandas","Excel","Tableau","Git","DBMS","NumPy"],
            preferred_skills=["Power BI","R","Spark","AWS","Data Warehousing"],
            package="4–8 LPA", location="Pan-India", difficulty="Easy",
            hiring_category="Service", description="India's largest IT services company with 600,000+ employees worldwide.",
            role_description="Analyse client data and build dashboards and reports.",
            skill_groups={"Data Analysis":["Pandas","NumPy","Excel"],"Databases":["SQL","DBMS"],"Visualisation":["Tableau","Power BI"],"Programming Languages":["Python"],"Tools":["Git"],"Preferred":["R","Spark","AWS","Data Warehousing"]}),
    }
},

# 19. INFOSYS
"Infosys": {
    "description": "Global IT consulting and digital transformation services leader.",
    "logo": "/logos/infosys.png", "locations": ["Bangalore","Hyderabad","Pune","Chennai","Mysore"],
    "package": "3.6–10 LPA", "difficulty": "Easy", "hiring_category": "Service",
    "roles": {
        "Systems Engineer": _role(
            skills=["Java","Python","SQL","HTML","CSS","JavaScript","Git","OOP","DBMS"],
            preferred_skills=["Spring Boot","React","Selenium","Linux","Angular"],
            package="3.6–6.5 LPA", location="Bangalore / Hyderabad / Pune", difficulty="Easy",
            hiring_category="Service", description="Global IT consulting and digital transformation services leader.",
            role_description="Develop and maintain enterprise applications for global clients.",
            skill_groups={"Programming Languages":["Java","Python","JavaScript"],"Web":["HTML","CSS"],"Databases":["SQL","DBMS"],"CS Fundamentals":["OOP"],"Tools":["Git"],"Preferred":["Spring Boot","React","Selenium","Linux"]}),
        "Specialist Programmer": _role(
            skills=["Java","Python","SQL","REST API","Git","OOP","System Design","Microservices","Docker"],
            preferred_skills=["AWS","Kubernetes","TypeScript","React","Kafka"],
            package="6–11 LPA", location="Bangalore / Hyderabad", difficulty="Medium",
            hiring_category="Service", description="Global IT consulting and digital transformation services leader.",
            role_description="Lead technical delivery of digital transformation projects.",
            skill_groups={"Programming Languages":["Java","Python"],"Architecture":["System Design","Microservices"],"DevOps":["Docker"],"Databases":["SQL"],"APIs":["REST API"],"CS Fundamentals":["OOP"],"Tools":["Git"],"Preferred":["AWS","Kubernetes","TypeScript","Kafka"]}),
        "Technology Analyst": _role(
            skills=["Java","Python","SQL","REST API","Git","OOP","DBMS","Linux","Agile"],
            preferred_skills=["Docker","AWS","React","TypeScript","Jenkins"],
            package="6–10 LPA", location="Bangalore / Hyderabad", difficulty="Medium",
            hiring_category="Service", description="Global IT consulting and digital transformation services leader.",
            role_description="Lead small teams delivering digital transformation projects.",
            skill_groups={"Programming Languages":["Java","Python"],"Databases":["SQL","DBMS"],"APIs":["REST API"],"Process":["Agile"],"OS":["Linux"],"Tools":["Git"],"Preferred":["Docker","AWS","React","TypeScript"]}),
        "Digital Specialist Engineer": _role(
            skills=["Python","Machine Learning","SQL","Spark","Git","REST API","DBMS","Linux"],
            preferred_skills=["TensorFlow","Scikit-learn","Tableau","AWS","Kafka"],
            package="5–9 LPA", location="Bangalore / Hyderabad", difficulty="Medium",
            hiring_category="Service", description="Global IT consulting and digital transformation services leader.",
            role_description="Build digital and AI-powered solutions in Infosys's specialist units.",
            skill_groups={"ML / AI":["Machine Learning"],"Data Engineering":["Spark","Kafka"],"Databases":["SQL","DBMS"],"Programming Languages":["Python"],"APIs":["REST API"],"OS":["Linux"],"Tools":["Git"],"Preferred":["TensorFlow","Scikit-learn","Tableau","AWS"]}),
        "Data Analyst": _role(
            skills=["Python","SQL","Pandas","Excel","Tableau","Git","DBMS","NumPy"],
            preferred_skills=["Power BI","R","AWS","Spark","Data Warehousing"],
            package="4–8 LPA", location="Pan-India", difficulty="Easy",
            hiring_category="Service", description="Global IT consulting and digital transformation services leader.",
            role_description="Analyse enterprise data and generate insights for Infosys clients.",
            skill_groups={"Data Analysis":["Pandas","NumPy","Excel"],"Databases":["SQL","DBMS"],"Visualisation":["Tableau","Power BI"],"Programming Languages":["Python"],"Tools":["Git"],"Preferred":["R","AWS","Spark","Data Warehousing"]}),
        "Test Analyst": _role(
            skills=["Selenium","Manual Testing","Java","SQL","Git","REST API","JIRA","OOP"],
            preferred_skills=["TestNG","Cucumber","Postman","Python","CI/CD"],
            package="3.6–7 LPA", location="Pan-India", difficulty="Easy",
            hiring_category="Service", description="Global IT consulting and digital transformation services leader.",
            role_description="Plan and execute testing for enterprise client applications.",
            skill_groups={"Testing":["Manual Testing","Selenium","TestNG","Cucumber"],"Programming Languages":["Java"],"Databases":["SQL"],"APIs":["REST API"],"CS Fundamentals":["OOP"],"Tools":["Git","JIRA","Postman"],"Preferred":["Python","CI/CD"]}),
    }
},

# 20. WIPRO
"Wipro": {
    "description": "IT services, consulting, and business process outsourcing company.",
    "logo": "/logos/wipro.png", "locations": ["Bangalore","Hyderabad","Pune","Chennai","Kolkata"],
    "package": "3.5–8 LPA", "difficulty": "Easy", "hiring_category": "Service",
    "roles": {
        "Project Engineer": _role(
            skills=["Java","Python","SQL","HTML","CSS","JavaScript","Git","OOP","Testing"],
            preferred_skills=["Spring Boot","React","Selenium","Linux","DBMS"],
            package="3.5–6 LPA", location="Pan-India", difficulty="Easy",
            hiring_category="Service", description="IT services, consulting, and business process outsourcing company.",
            role_description="Develop and test enterprise client applications across domains.",
            skill_groups={"Programming Languages":["Java","Python","JavaScript"],"Web":["HTML","CSS"],"Databases":["SQL"],"Testing":["Testing"],"CS Fundamentals":["OOP"],"Tools":["Git"],"Preferred":["Spring Boot","React","Selenium","Linux"]}),
        "Software Engineer": _role(
            skills=["Java","Python","SQL","REST API","Git","OOP","DBMS","Linux","Agile"],
            preferred_skills=["Docker","AWS","Angular","TypeScript","Jenkins"],
            package="5–8 LPA", location="Bangalore / Hyderabad / Pune", difficulty="Easy",
            hiring_category="Service", description="IT services, consulting, and business process outsourcing company.",
            role_description="Design and build client-specific software applications.",
            skill_groups={"Programming Languages":["Java","Python"],"Databases":["SQL","DBMS"],"APIs":["REST API"],"CS Fundamentals":["OOP"],"OS":["Linux"],"Process":["Agile"],"Tools":["Git"],"Preferred":["Docker","AWS","Angular","TypeScript"]}),
        "Cloud Engineer": _role(
            skills=["AWS","Python","Docker","Linux","Git","Networking","SQL","Terraform"],
            preferred_skills=["Azure","Kubernetes","Ansible","Jenkins","GCP"],
            package="6–10 LPA", location="Bangalore / Hyderabad", difficulty="Medium",
            hiring_category="Service", description="IT services, consulting, and business process outsourcing company.",
            role_description="Migrate and manage enterprise workloads on public cloud platforms.",
            skill_groups={"Cloud":["AWS"],"DevOps":["Docker","Terraform","Ansible","Kubernetes"],"Programming Languages":["Python"],"OS & Networking":["Linux","Networking"],"Databases":["SQL"],"Tools":["Git"],"Preferred":["Azure","Jenkins","GCP"]}),
        "Data Analyst": _role(
            skills=["Python","SQL","Pandas","Excel","Tableau","Git","DBMS","NumPy"],
            preferred_skills=["Power BI","R","Spark","AWS","Data Warehousing"],
            package="4–8 LPA", location="Pan-India", difficulty="Easy",
            hiring_category="Service", description="IT services, consulting, and business process outsourcing company.",
            role_description="Analyse data and build dashboards for Wipro clients.",
            skill_groups={"Data Analysis":["Pandas","NumPy","Excel"],"Databases":["SQL","DBMS"],"Visualisation":["Tableau","Power BI"],"Programming Languages":["Python"],"Tools":["Git"],"Preferred":["R","Spark","AWS","Data Warehousing"]}),
        "Automation Engineer": _role(
            skills=["Java","Selenium","Python","Git","REST API","SQL","TestNG","JIRA","OOP"],
            preferred_skills=["Cucumber","Appium","Jenkins","CI/CD","Postman"],
            package="4–8 LPA", location="Pan-India", difficulty="Easy",
            hiring_category="Service", description="IT services, consulting, and business process outsourcing company.",
            role_description="Build and maintain automation test suites for Wipro client projects.",
            skill_groups={"Testing":["Selenium","TestNG","Cucumber","Appium"],"Programming Languages":["Java","Python"],"Databases":["SQL"],"APIs":["REST API"],"CS Fundamentals":["OOP"],"Tools":["Git","JIRA","Postman","Jenkins"],"Preferred":["CI/CD"]}),
        "Full Stack Developer": _role(
            skills=["JavaScript","React","Java","SQL","Spring Boot","REST API","Git","HTML","CSS","OOP"],
            preferred_skills=["Angular","TypeScript","Docker","AWS","Node.js"],
            package="5–9 LPA", location="Bangalore / Hyderabad / Pune", difficulty="Easy",
            hiring_category="Service", description="IT services, consulting, and business process outsourcing company.",
            role_description="Build end-to-end web applications for Wipro's enterprise clients.",
            skill_groups={"Programming Languages":["JavaScript","Java"],"Frameworks":["React","Spring Boot"],"Web":["HTML","CSS"],"Databases":["SQL"],"APIs":["REST API"],"CS Fundamentals":["OOP"],"Tools":["Git"],"Preferred":["Angular","TypeScript","Docker","AWS"]}),
    }
},

# 21. ACCENTURE
"Accenture": {
    "description": "Global professional services company: strategy, consulting, and technology.",
    "logo": "/logos/accenture.png", "locations": ["Hyderabad","Bangalore","Chennai","Pune","Mumbai"],
    "package": "4.5–12 LPA", "difficulty": "Easy", "hiring_category": "Service",
    "roles": {
        "Associate Software Engineer": _role(
            skills=["Java","Python","SQL","JavaScript","Git","OOP","HTML","CSS","REST API"],
            preferred_skills=["React","Angular","Spring Boot","Docker","Testing"],
            package="4.5–8 LPA", location="Pan-India", difficulty="Easy",
            hiring_category="Service", description="Global professional services company: strategy, consulting, and technology.",
            role_description="Build and maintain enterprise software for Accenture clients.",
            skill_groups={"Programming Languages":["Java","Python","JavaScript"],"Web":["HTML","CSS"],"Databases":["SQL"],"APIs":["REST API"],"CS Fundamentals":["OOP"],"Tools":["Git"],"Preferred":["React","Angular","Spring Boot","Docker"]}),
        "Cloud Practitioner": _role(
            skills=["AWS","Azure","Python","Docker","Linux","Git","Networking","SQL"],
            preferred_skills=["GCP","Kubernetes","Terraform","Jenkins","Ansible"],
            package="6–12 LPA", location="Hyderabad / Bangalore / Pune", difficulty="Medium",
            hiring_category="Service", description="Global professional services company: strategy, consulting, and technology.",
            role_description="Deliver cloud migration and modernisation projects for enterprise clients.",
            skill_groups={"Cloud":["AWS","Azure"],"DevOps":["Docker","Kubernetes","Terraform","Ansible"],"Programming Languages":["Python"],"OS & Networking":["Linux","Networking"],"Databases":["SQL"],"Tools":["Git"],"Preferred":["GCP","Jenkins"]}),
        "Data Analyst": _role(
            skills=["Python","SQL","Pandas","NumPy","Tableau","Git","Excel","DBMS"],
            preferred_skills=["Power BI","Spark","Scikit-learn","R","Snowflake"],
            package="5–9 LPA", location="Hyderabad / Bangalore", difficulty="Easy",
            hiring_category="Service", description="Global professional services company: strategy, consulting, and technology.",
            role_description="Analyse data and build dashboards for client reporting.",
            skill_groups={"Data Analysis":["Pandas","NumPy","Excel"],"Visualisation":["Tableau","Power BI"],"Databases":["SQL","DBMS"],"Programming Languages":["Python"],"Tools":["Git"],"Preferred":["Spark","Scikit-learn","R","Snowflake"]}),
        "Business Analyst": _role(
            skills=["SQL","Excel","Python","Tableau","Git","JIRA","Communication","Agile"],
            preferred_skills=["Power BI","Confluence","Visio","Salesforce","JIRA Advanced"],
            package="5–10 LPA", location="Pan-India", difficulty="Easy",
            hiring_category="Service", description="Global professional services company: strategy, consulting, and technology.",
            role_description="Bridge business and technology for Accenture client engagements.",
            skill_groups={"Analysis":["SQL","Excel","Agile"],"Visualisation":["Tableau","Power BI"],"Tools":["Git","JIRA","Confluence"],"Soft Skills":["Communication"],"Programming Languages":["Python"],"Preferred":["Visio","Salesforce"]}),
        "Associate Consultant": _role(
            skills=["SQL","Python","Excel","Agile","Git","Communication","REST API","JIRA"],
            preferred_skills=["Tableau","Power BI","Salesforce","SAP","Consulting Frameworks"],
            package="6–12 LPA", location="Pan-India", difficulty="Easy",
            hiring_category="Service", description="Global professional services company: strategy, consulting, and technology.",
            role_description="Deliver technology consulting engagements for global enterprise clients.",
            skill_groups={"Consulting":["Agile","Communication","Consulting Frameworks"],"Analysis":["SQL","Excel"],"Visualisation":["Tableau","Power BI"],"APIs":["REST API"],"Tools":["Git","JIRA"],"Preferred":["Salesforce","SAP"]}),
        "DevOps Engineer": _role(
            skills=["AWS","Docker","Kubernetes","Linux","Python","Terraform","CI/CD","Git","Bash"],
            preferred_skills=["Azure","Jenkins","Ansible","Prometheus","Go"],
            package="7–13 LPA", location="Hyderabad / Bangalore / Pune", difficulty="Medium",
            hiring_category="Service", description="Global professional services company: strategy, consulting, and technology.",
            role_description="Automate and manage cloud infrastructure for Accenture client projects.",
            skill_groups={"Cloud":["AWS"],"DevOps":["Docker","Kubernetes","Terraform","CI/CD","Ansible"],"OS & Scripting":["Linux","Bash","Python"],"Tools":["Git"],"Preferred":["Azure","Jenkins","Prometheus","Go"]}),
    }
},

# 22. COGNIZANT
"Cognizant": {
    "description": "IT services and consulting company focused on digital, cloud, and AI.",
    "logo": "/logos/cognizant.png", "locations": ["Chennai","Hyderabad","Bangalore","Pune","Kolkata"],
    "package": "4–9 LPA", "difficulty": "Easy", "hiring_category": "Service",
    "roles": {
        "Programmer Analyst Trainee": _role(
            skills=["Java","Python","SQL","HTML","CSS","JavaScript","Git","OOP","DBMS"],
            preferred_skills=["React","Testing","Selenium","Linux","Spring Boot"],
            package="4–7 LPA", location="Pan-India", difficulty="Easy",
            hiring_category="Service", description="IT services and consulting company focused on digital, cloud, and AI.",
            role_description="Entry-level development role on client IT projects.",
            skill_groups={"Programming Languages":["Java","Python","JavaScript"],"Web":["HTML","CSS"],"Databases":["SQL","DBMS"],"CS Fundamentals":["OOP"],"Tools":["Git"],"Preferred":["React","Testing","Selenium","Linux"]}),
        "Software Engineer": _role(
            skills=["Java","Python","SQL","REST API","Git","OOP","Linux","Agile","DBMS"],
            preferred_skills=["Docker","React","AWS","TypeScript","Kafka"],
            package="5–9 LPA", location="Chennai / Hyderabad / Bangalore", difficulty="Easy",
            hiring_category="Service", description="IT services and consulting company focused on digital, cloud, and AI.",
            role_description="Develop enterprise software and APIs for global Cognizant clients.",
            skill_groups={"Programming Languages":["Java","Python"],"Databases":["SQL","DBMS"],"APIs":["REST API"],"CS Fundamentals":["OOP"],"OS":["Linux"],"Process":["Agile"],"Tools":["Git"],"Preferred":["Docker","React","AWS","TypeScript"]}),
        "Test Engineer": _role(
            skills=["Java","Selenium","Manual Testing","SQL","Git","REST API","JIRA","OOP"],
            preferred_skills=["Cucumber","TestNG","Postman","Python","CI/CD"],
            package="4–7 LPA", location="Pan-India", difficulty="Easy",
            hiring_category="Service", description="IT services and consulting company focused on digital, cloud, and AI.",
            role_description="Plan and execute test strategies for enterprise client applications.",
            skill_groups={"Testing":["Manual Testing","Selenium","TestNG","Cucumber"],"Programming Languages":["Java"],"Databases":["SQL"],"APIs":["REST API"],"CS Fundamentals":["OOP"],"Tools":["Git","JIRA","Postman"],"Preferred":["Python","CI/CD"]}),
        "Data Analyst": _role(
            skills=["Python","SQL","Pandas","Excel","Tableau","Git","DBMS","NumPy"],
            preferred_skills=["Power BI","R","Spark","AWS","Data Warehousing"],
            package="4–8 LPA", location="Pan-India", difficulty="Easy",
            hiring_category="Service", description="IT services and consulting company focused on digital, cloud, and AI.",
            role_description="Analyse client data and generate business insights.",
            skill_groups={"Data Analysis":["Pandas","NumPy","Excel"],"Databases":["SQL","DBMS"],"Visualisation":["Tableau","Power BI"],"Programming Languages":["Python"],"Tools":["Git"],"Preferred":["R","Spark","AWS","Data Warehousing"]}),
        "Full Stack Developer": _role(
            skills=["JavaScript","React","Java","SQL","Spring Boot","REST API","Git","HTML","CSS","OOP"],
            preferred_skills=["Angular","TypeScript","Docker","AWS","Node.js"],
            package="5–9 LPA", location="Pan-India", difficulty="Easy",
            hiring_category="Service", description="IT services and consulting company focused on digital, cloud, and AI.",
            role_description="Build end-to-end web applications for Cognizant clients.",
            skill_groups={"Programming Languages":["JavaScript","Java"],"Frameworks":["React","Spring Boot"],"Web":["HTML","CSS"],"Databases":["SQL"],"APIs":["REST API"],"CS Fundamentals":["OOP"],"Tools":["Git"],"Preferred":["Angular","TypeScript","Docker","AWS"]}),
    }
},

# 23. CAPGEMINI
"Capgemini": {
    "description": "French multinational IT services and consulting group.",
    "logo": "/logos/capgemini.png", "locations": ["Mumbai","Pune","Bangalore","Hyderabad","Chennai"],
    "package": "4–10 LPA", "difficulty": "Easy", "hiring_category": "Service",
    "roles": {
        "Software Analyst": _role(
            skills=["Java","Python","SQL","JavaScript","Git","OOP","REST API","DBMS"],
            preferred_skills=["React","Spring Boot","Docker","AWS","Testing"],
            package="4–8 LPA", location="Pan-India", difficulty="Easy",
            hiring_category="Service", description="French multinational IT services and consulting group.",
            role_description="Deliver software analysis and development on client engagements.",
            skill_groups={"Programming Languages":["Java","Python","JavaScript"],"Databases":["SQL","DBMS"],"APIs":["REST API"],"CS Fundamentals":["OOP"],"Tools":["Git"],"Preferred":["React","Spring Boot","Docker","AWS"]}),
        "Cloud Developer": _role(
            skills=["AWS","Python","Docker","Linux","Git","SQL","REST API","Terraform"],
            preferred_skills=["Azure","Kubernetes","Ansible","Jenkins","GCP"],
            package="6–11 LPA", location="Mumbai / Pune / Bangalore", difficulty="Medium",
            hiring_category="Service", description="French multinational IT services and consulting group.",
            role_description="Build and manage cloud-native applications for enterprise clients.",
            skill_groups={"Cloud":["AWS"],"DevOps":["Docker","Terraform","Kubernetes","Ansible"],"Programming Languages":["Python"],"OS":["Linux"],"Databases":["SQL"],"APIs":["REST API"],"Tools":["Git"],"Preferred":["Azure","Jenkins","GCP"]}),
        "SAP Consultant": _role(
            skills=["SAP ABAP","SQL","OOP","Git","Python","REST API","DBMS","Excel"],
            preferred_skills=["SAP S/4HANA","SAP Fiori","JavaScript","JIRA","Agile"],
            package="5–10 LPA", location="Mumbai / Pune", difficulty="Medium",
            hiring_category="Service", description="French multinational IT services and consulting group.",
            role_description="Implement and customise SAP ERP solutions for enterprise clients.",
            skill_groups={"SAP":["SAP ABAP","SAP S/4HANA","SAP Fiori"],"Databases":["SQL","DBMS"],"CS Fundamentals":["OOP"],"Data":["Excel"],"APIs":["REST API"],"Tools":["Git","JIRA"],"Preferred":["JavaScript","Agile"]}),
        "Data Analyst": _role(
            skills=["Python","SQL","Pandas","Excel","Tableau","Git","DBMS","NumPy"],
            preferred_skills=["Power BI","R","Spark","Azure","Snowflake"],
            package="4–9 LPA", location="Pan-India", difficulty="Easy",
            hiring_category="Service", description="French multinational IT services and consulting group.",
            role_description="Deliver data analysis and reporting for Capgemini client projects.",
            skill_groups={"Data Analysis":["Pandas","NumPy","Excel"],"Databases":["SQL","DBMS"],"Visualisation":["Tableau","Power BI"],"Programming Languages":["Python"],"Tools":["Git"],"Preferred":["R","Spark","Azure","Snowflake"]}),
        "DevOps Engineer": _role(
            skills=["AWS","Docker","Kubernetes","Linux","Python","Terraform","CI/CD","Git","Bash"],
            preferred_skills=["Azure","Jenkins","Ansible","Prometheus","Go"],
            package="7–12 LPA", location="Pan-India", difficulty="Medium",
            hiring_category="Service", description="French multinational IT services and consulting group.",
            role_description="Build and operate CI/CD pipelines and cloud infrastructure for clients.",
            skill_groups={"Cloud":["AWS"],"DevOps":["Docker","Kubernetes","Terraform","CI/CD","Ansible"],"OS & Scripting":["Linux","Bash","Python"],"Tools":["Git"],"Preferred":["Azure","Jenkins","Prometheus","Go"]}),
    }
},

# 24. HCLTECH
"HCLTech": {
    "description": "Indian multinational IT services company with strong engineering focus.",
    "logo": "/logos/hcltech.png", "locations": ["Noida","Bangalore","Chennai","Hyderabad","Pune"],
    "package": "4–10 LPA", "difficulty": "Easy", "hiring_category": "Service",
    "roles": {
        "Graduate Engineer Trainee": _role(
            skills=["Java","Python","SQL","HTML","CSS","JavaScript","Git","OOP","DBMS"],
            preferred_skills=["Spring Boot","React","Selenium","Linux","Testing"],
            package="4–7 LPA", location="Pan-India", difficulty="Easy",
            hiring_category="Service", description="Indian multinational IT services company with strong engineering focus.",
            role_description="Entry-level software engineering on enterprise client projects.",
            skill_groups={"Programming Languages":["Java","Python","JavaScript"],"Web":["HTML","CSS"],"Databases":["SQL","DBMS"],"CS Fundamentals":["OOP"],"Tools":["Git"],"Preferred":["Spring Boot","React","Selenium","Linux"]}),
        "Software Engineer": _role(
            skills=["Java","Python","SQL","REST API","Git","OOP","Linux","DBMS","Agile"],
            preferred_skills=["Docker","Kubernetes","AWS","React","Jenkins"],
            package="5–9 LPA", location="Noida / Bangalore / Hyderabad", difficulty="Easy",
            hiring_category="Service", description="Indian multinational IT services company with strong engineering focus.",
            role_description="Develop scalable software applications for HCL's global clients.",
            skill_groups={"Programming Languages":["Java","Python"],"Databases":["SQL","DBMS"],"APIs":["REST API"],"CS Fundamentals":["OOP"],"OS":["Linux"],"Process":["Agile"],"Tools":["Git"],"Preferred":["Docker","Kubernetes","AWS","React"]}),
        "Cloud Engineer": _role(
            skills=["AWS","Azure","Python","Docker","Linux","Git","SQL","Terraform"],
            preferred_skills=["Kubernetes","GCP","Ansible","Jenkins","Prometheus"],
            package="6–11 LPA", location="Noida / Bangalore / Hyderabad", difficulty="Medium",
            hiring_category="Service", description="Indian multinational IT services company with strong engineering focus.",
            role_description="Manage and optimise cloud workloads for HCLTech enterprise clients.",
            skill_groups={"Cloud":["AWS","Azure"],"DevOps":["Docker","Terraform","Kubernetes","Ansible"],"Programming Languages":["Python"],"OS":["Linux"],"Databases":["SQL"],"Tools":["Git"],"Preferred":["GCP","Jenkins","Prometheus"]}),
        "Data Analyst": _role(
            skills=["Python","SQL","Pandas","Excel","Tableau","Git","DBMS","NumPy"],
            preferred_skills=["Power BI","R","Spark","AWS","Data Warehousing"],
            package="4–8 LPA", location="Pan-India", difficulty="Easy",
            hiring_category="Service", description="Indian multinational IT services company with strong engineering focus.",
            role_description="Analyse enterprise data for HCL's global clients.",
            skill_groups={"Data Analysis":["Pandas","NumPy","Excel"],"Databases":["SQL","DBMS"],"Visualisation":["Tableau","Power BI"],"Programming Languages":["Python"],"Tools":["Git"],"Preferred":["R","Spark","AWS","Data Warehousing"]}),
        "Test Engineer": _role(
            skills=["Java","Selenium","Manual Testing","SQL","Git","REST API","JIRA","OOP"],
            preferred_skills=["Cucumber","TestNG","Appium","Python","CI/CD"],
            package="4–8 LPA", location="Pan-India", difficulty="Easy",
            hiring_category="Service", description="Indian multinational IT services company with strong engineering focus.",
            role_description="Test enterprise applications and build automated test suites.",
            skill_groups={"Testing":["Manual Testing","Selenium","TestNG","Cucumber","Appium"],"Programming Languages":["Java"],"Databases":["SQL"],"APIs":["REST API"],"CS Fundamentals":["OOP"],"Tools":["Git","JIRA"],"Preferred":["Python","CI/CD"]}),
        "Full Stack Developer": _role(
            skills=["JavaScript","React","Java","SQL","Spring Boot","REST API","Git","HTML","CSS","OOP"],
            preferred_skills=["Angular","TypeScript","Docker","AWS","Node.js"],
            package="5–10 LPA", location="Pan-India", difficulty="Easy",
            hiring_category="Service", description="Indian multinational IT services company with strong engineering focus.",
            role_description="Build full-stack enterprise applications for HCLTech clients.",
            skill_groups={"Programming Languages":["JavaScript","Java"],"Frameworks":["React","Spring Boot"],"Web":["HTML","CSS"],"Databases":["SQL"],"APIs":["REST API"],"CS Fundamentals":["OOP"],"Tools":["Git"],"Preferred":["Angular","TypeScript","Docker","AWS"]}),
    }
},

# 25. TECH MAHINDRA
"Tech Mahindra": {
    "description": "IT services and solutions company focused on telecom, media, and enterprise.",
    "logo": "/logos/techmahindra.png", "locations": ["Pune","Hyderabad","Bangalore","Chennai","Noida"],
    "package": "4–9 LPA", "difficulty": "Easy", "hiring_category": "Service",
    "roles": {
        "Software Engineer": _role(
            skills=["Java","Python","SQL","JavaScript","Git","OOP","REST API","DBMS","HTML","CSS"],
            preferred_skills=["React","Spring Boot","Docker","Selenium","Linux"],
            package="4–8 LPA", location="Pan-India", difficulty="Easy",
            hiring_category="Service", description="IT services and solutions company focused on telecom, media, and enterprise.",
            role_description="Develop enterprise software applications for Tech Mahindra clients.",
            skill_groups={"Programming Languages":["Java","Python","JavaScript"],"Web":["HTML","CSS"],"Databases":["SQL","DBMS"],"APIs":["REST API"],"CS Fundamentals":["OOP"],"Tools":["Git"],"Preferred":["React","Spring Boot","Docker","Selenium"]}),
        "Network Engineer": _role(
            skills=["Networking","Linux","Python","SQL","Git","Bash","TCP/IP","OSPF"],
            preferred_skills=["AWS","Docker","Ansible","CCNA","Wireshark"],
            package="5–9 LPA", location="Pune / Hyderabad", difficulty="Medium",
            hiring_category="Service", description="IT services and solutions company focused on telecom, media, and enterprise.",
            role_description="Design and maintain network infrastructure for telecom clients.",
            skill_groups={"Networking":["Networking","TCP/IP","OSPF"],"OS & Scripting":["Linux","Bash"],"Programming Languages":["Python"],"Databases":["SQL"],"Tools":["Git","Wireshark"],"Preferred":["AWS","Docker","Ansible","CCNA"]}),
        "Data Analyst": _role(
            skills=["Python","SQL","Pandas","Excel","Tableau","Git","DBMS","NumPy"],
            preferred_skills=["Power BI","R","Spark","AWS","Data Warehousing"],
            package="4–8 LPA", location="Pan-India", difficulty="Easy",
            hiring_category="Service", description="IT services and solutions company focused on telecom, media, and enterprise.",
            role_description="Analyse telecom and enterprise data for TechM clients.",
            skill_groups={"Data Analysis":["Pandas","NumPy","Excel"],"Databases":["SQL","DBMS"],"Visualisation":["Tableau","Power BI"],"Programming Languages":["Python"],"Tools":["Git"],"Preferred":["R","Spark","AWS","Data Warehousing"]}),
        "Cloud Practitioner": _role(
            skills=["AWS","Azure","Python","Docker","Linux","Git","SQL","Networking"],
            preferred_skills=["Kubernetes","Terraform","Ansible","Jenkins","GCP"],
            package="5–10 LPA", location="Pan-India", difficulty="Medium",
            hiring_category="Service", description="IT services and solutions company focused on telecom, media, and enterprise.",
            role_description="Deploy and manage cloud solutions for Tech Mahindra clients.",
            skill_groups={"Cloud":["AWS","Azure"],"DevOps":["Docker","Kubernetes","Terraform","Ansible"],"Programming Languages":["Python"],"OS & Networking":["Linux","Networking"],"Databases":["SQL"],"Tools":["Git"],"Preferred":["Jenkins","GCP"]}),
        "QA Engineer": _role(
            skills=["Java","Selenium","Manual Testing","SQL","Git","REST API","JIRA","OOP"],
            preferred_skills=["Cucumber","TestNG","Postman","Python","CI/CD"],
            package="4–8 LPA", location="Pan-India", difficulty="Easy",
            hiring_category="Service", description="IT services and solutions company focused on telecom, media, and enterprise.",
            role_description="Test enterprise and telecom applications for TechM clients.",
            skill_groups={"Testing":["Manual Testing","Selenium","TestNG","Cucumber"],"Programming Languages":["Java"],"Databases":["SQL"],"APIs":["REST API"],"CS Fundamentals":["OOP"],"Tools":["Git","JIRA","Postman"],"Preferred":["Python","CI/CD"]}),
    }
},

# 26. IBM
"IBM": {
    "description": "Technology and consulting company: hybrid cloud, AI (watsonx), and quantum.",
    "logo": "/logos/ibm.png", "locations": ["Bangalore","Hyderabad","Pune","Delhi"],
    "package": "8–20 LPA", "difficulty": "Medium", "hiring_category": "Service",
    "roles": {
        "Application Developer": _role(
            skills=["Java","Python","SQL","Docker","Git","REST API","Linux","OOP","DBMS"],
            preferred_skills=["OpenShift","Kubernetes","Node.js","TypeScript","Spring Boot"],
            package="8–15 LPA", location="Bangalore / Hyderabad", difficulty="Medium",
            hiring_category="Service", description="Technology and consulting company: hybrid cloud, AI, and quantum.",
            role_description="Build cloud-native applications on IBM Cloud and Red Hat OpenShift.",
            skill_groups={"Programming Languages":["Java","Python"],"Cloud & DevOps":["Docker","Kubernetes","OpenShift"],"Databases":["SQL","DBMS"],"APIs":["REST API"],"CS Fundamentals":["OOP"],"OS":["Linux"],"Tools":["Git"],"Preferred":["Node.js","TypeScript","Spring Boot"]}),
        "AI Engineer": _role(
            skills=["Python","Machine Learning","SQL","Git","NumPy","Pandas","REST API","Linux"],
            preferred_skills=["watsonx","TensorFlow","PyTorch","Kubernetes","Spark"],
            package="10–18 LPA", location="Bangalore / Hyderabad", difficulty="Medium",
            hiring_category="Service", description="Technology and consulting company: hybrid cloud, AI, and quantum.",
            role_description="Build AI solutions using IBM watsonx and open-source ML frameworks.",
            skill_groups={"ML / AI":["Machine Learning","watsonx"],"Data":["NumPy","Pandas","SQL"],"APIs":["REST API"],"OS":["Linux"],"Tools":["Git"],"Preferred":["TensorFlow","PyTorch","Kubernetes","Spark"]}),
        "Cloud Engineer": _role(
            skills=["AWS","Azure","Docker","Kubernetes","Linux","Terraform","Python","Git","SQL"],
            preferred_skills=["OpenShift","Ansible","Go","IBM Cloud","Prometheus"],
            package="10–18 LPA", location="Bangalore / Pune", difficulty="Medium",
            hiring_category="Service", description="Technology and consulting company: hybrid cloud, AI, and quantum.",
            role_description="Deploy and manage hybrid cloud solutions for IBM enterprise clients.",
            skill_groups={"Cloud":["AWS","Azure"],"DevOps":["Docker","Kubernetes","Terraform","Ansible"],"Programming Languages":["Python","Go"],"OS":["Linux"],"Databases":["SQL"],"Tools":["Git"],"Preferred":["OpenShift","IBM Cloud","Prometheus"]}),
        "Data Engineer": _role(
            skills=["Python","SQL","Spark","Kafka","Airflow","Git","Linux","DBMS"],
            preferred_skills=["Scala","dbt","IBM Cloud","Db2","DataStage"],
            package="10–18 LPA", location="Bangalore / Hyderabad", difficulty="Medium",
            hiring_category="Service", description="Technology and consulting company: hybrid cloud, AI, and quantum.",
            role_description="Build data pipelines and analytics solutions for IBM enterprise clients.",
            skill_groups={"Data Engineering":["Spark","Kafka","Airflow"],"Databases":["SQL","DBMS","Db2"],"Programming Languages":["Python"],"OS":["Linux"],"Tools":["Git"],"Preferred":["Scala","dbt","IBM Cloud","DataStage"]}),
        "Cybersecurity Analyst": _role(
            skills=["Python","Linux","Networking","Security Protocols","SQL","Git","SIEM","Cryptography"],
            preferred_skills=["QRadar","Penetration Testing","Threat Modeling","AWS","SOAR"],
            package="10–18 LPA", location="Bangalore / Hyderabad / Pune", difficulty="Medium",
            hiring_category="Service", description="Technology and consulting company: hybrid cloud, AI, and quantum.",
            role_description="Monitor and respond to security threats for IBM clients.",
            skill_groups={"Security":["Security Protocols","SIEM","Cryptography","Penetration Testing","Threat Modeling"],"Programming Languages":["Python"],"OS & Networking":["Linux","Networking"],"Databases":["SQL"],"Tools":["Git","QRadar"],"Preferred":["AWS","SOAR"]}),
        "Full Stack Developer": _role(
            skills=["JavaScript","Java","React","SQL","Spring Boot","REST API","Git","HTML","CSS","OOP"],
            preferred_skills=["TypeScript","Node.js","Docker","IBM Cloud","OpenShift"],
            package="9–17 LPA", location="Bangalore / Hyderabad", difficulty="Medium",
            hiring_category="Service", description="Technology and consulting company: hybrid cloud, AI, and quantum.",
            role_description="Build end-to-end enterprise applications for IBM client engagements.",
            skill_groups={"Programming Languages":["JavaScript","Java"],"Frameworks":["React","Spring Boot"],"Web":["HTML","CSS"],"Databases":["SQL"],"APIs":["REST API"],"CS Fundamentals":["OOP"],"Tools":["Git"],"Preferred":["TypeScript","Node.js","Docker","IBM Cloud"]}),
    }
},

# 27. DELOITTE
"Deloitte": {
    "description": "Global professional services firm: audit, consulting, and technology.",
    "logo": "/logos/deloitte.png", "locations": ["Hyderabad","Bangalore","Mumbai","Pune","Chennai"],
    "package": "6–14 LPA", "difficulty": "Easy", "hiring_category": "Service",
    "roles": {
        "Analyst": _role(
            skills=["SQL","Python","Excel","Tableau","Git","Communication","Agile","JIRA"],
            preferred_skills=["Power BI","Salesforce","SAP","Consulting Frameworks","R"],
            package="6–10 LPA", location="Pan-India", difficulty="Easy",
            hiring_category="Service", description="Global professional services firm: audit, consulting, and technology.",
            role_description="Deliver technology and business consulting for Deloitte clients.",
            skill_groups={"Analysis":["SQL","Excel","Agile"],"Visualisation":["Tableau","Power BI"],"Tools":["Git","JIRA"],"Soft Skills":["Communication"],"Programming Languages":["Python"],"Preferred":["Salesforce","SAP","Consulting Frameworks","R"]}),
        "Software Engineer": _role(
            skills=["Java","Python","SQL","REST API","Git","OOP","DSA","JavaScript","DBMS"],
            preferred_skills=["React","Spring Boot","Docker","AWS","TypeScript"],
            package="7–13 LPA", location="Hyderabad / Bangalore / Pune", difficulty="Easy",
            hiring_category="Service", description="Global professional services firm: audit, consulting, and technology.",
            role_description="Build enterprise software solutions for Deloitte's clients.",
            skill_groups={"Programming Languages":["Java","Python","JavaScript"],"Databases":["SQL","DBMS"],"APIs":["REST API"],"CS Fundamentals":["OOP","DSA"],"Tools":["Git"],"Preferred":["React","Spring Boot","Docker","AWS"]}),
        "Cloud Practitioner": _role(
            skills=["AWS","Azure","Python","Docker","Linux","Git","SQL","Terraform"],
            preferred_skills=["GCP","Kubernetes","Ansible","Jenkins","Prometheus"],
            package="8–14 LPA", location="Hyderabad / Bangalore / Mumbai", difficulty="Medium",
            hiring_category="Service", description="Global professional services firm: audit, consulting, and technology.",
            role_description="Lead cloud transformation engagements for Deloitte enterprise clients.",
            skill_groups={"Cloud":["AWS","Azure"],"DevOps":["Docker","Terraform","Kubernetes","Ansible"],"Programming Languages":["Python"],"OS":["Linux"],"Databases":["SQL"],"Tools":["Git"],"Preferred":["GCP","Jenkins","Prometheus"]}),
        "Data Analyst": _role(
            skills=["Python","SQL","Pandas","NumPy","Tableau","Git","Excel","DBMS"],
            preferred_skills=["Power BI","R","Spark","Snowflake","dbt"],
            package="6–12 LPA", location="Pan-India", difficulty="Easy",
            hiring_category="Service", description="Global professional services firm: audit, consulting, and technology.",
            role_description="Generate data-driven insights for Deloitte advisory engagements.",
            skill_groups={"Data Analysis":["Pandas","NumPy","Excel"],"Databases":["SQL","DBMS"],"Visualisation":["Tableau","Power BI"],"Programming Languages":["Python"],"Tools":["Git"],"Preferred":["R","Spark","Snowflake","dbt"]}),
        "Business Analyst": _role(
            skills=["SQL","Excel","Python","Tableau","Communication","JIRA","Git","Agile"],
            preferred_skills=["Power BI","Salesforce","SAP","Visio","Confluence"],
            package="6–12 LPA", location="Pan-India", difficulty="Easy",
            hiring_category="Service", description="Global professional services firm: audit, consulting, and technology.",
            role_description="Bridge business and IT for Deloitte's digital transformation projects.",
            skill_groups={"Analysis":["SQL","Excel","Agile"],"Visualisation":["Tableau","Power BI"],"Tools":["Git","JIRA","Confluence"],"Soft Skills":["Communication"],"Programming Languages":["Python"],"Preferred":["Salesforce","SAP","Visio"]}),
        "DevOps Engineer": _role(
            skills=["AWS","Docker","Kubernetes","Linux","Python","Terraform","CI/CD","Git","Bash"],
            preferred_skills=["Azure","Jenkins","Ansible","Prometheus","Go"],
            package="8–14 LPA", location="Hyderabad / Bangalore / Pune", difficulty="Medium",
            hiring_category="Service", description="Global professional services firm: audit, consulting, and technology.",
            role_description="Automate and manage cloud infrastructure for Deloitte client projects.",
            skill_groups={"Cloud":["AWS"],"DevOps":["Docker","Kubernetes","Terraform","CI/CD","Ansible"],"OS & Scripting":["Linux","Bash","Python"],"Tools":["Git"],"Preferred":["Azure","Jenkins","Prometheus","Go"]}),
    }
},

# 28. PERSISTENT SYSTEMS
"Persistent Systems": {
    "description": "Product engineering and digital transformation services company.",
    "logo": "/logos/image.png", "locations": ["Pune","Nagpur","Bangalore","Hyderabad"],
    "package": "5–12 LPA", "difficulty": "Easy", "hiring_category": "Service",
    "roles": {
        "Software Engineer": _role(
            skills=["Java","Python","SQL","Git","OOP","REST API","JavaScript","DBMS","HTML"],
            preferred_skills=["React","Spring Boot","Docker","AWS","Testing"],
            package="5–10 LPA", location="Pune / Bangalore", difficulty="Easy",
            hiring_category="Service", description="Product engineering and digital transformation services company.",
            role_description="Develop product engineering solutions for ISV and enterprise clients.",
            skill_groups={"Programming Languages":["Java","Python","JavaScript"],"Web":["HTML"],"Databases":["SQL","DBMS"],"APIs":["REST API"],"CS Fundamentals":["OOP"],"Tools":["Git"],"Preferred":["React","Spring Boot","Docker","AWS"]}),
        "DevOps Engineer": _role(
            skills=["Docker","Kubernetes","Linux","Python","Git","AWS","Terraform","CI/CD","Bash"],
            preferred_skills=["Jenkins","Ansible","Prometheus","Azure","Go"],
            package="6–12 LPA", location="Pune / Hyderabad", difficulty="Medium",
            hiring_category="Service", description="Product engineering and digital transformation services company.",
            role_description="Build CI/CD pipelines and manage cloud infrastructure for client products.",
            skill_groups={"DevOps":["Docker","Kubernetes","Terraform","CI/CD","Ansible"],"Cloud":["AWS"],"OS & Scripting":["Linux","Bash","Python"],"Tools":["Git","Jenkins"],"Preferred":["Prometheus","Azure","Go"]}),
        "Full Stack Developer": _role(
            skills=["JavaScript","React","Java","SQL","Spring Boot","REST API","Git","HTML","CSS","OOP"],
            preferred_skills=["TypeScript","Node.js","Docker","AWS","Angular"],
            package="6–11 LPA", location="Pune / Bangalore", difficulty="Easy",
            hiring_category="Service", description="Product engineering and digital transformation services company.",
            role_description="Build full-stack products for ISV and enterprise clients.",
            skill_groups={"Programming Languages":["JavaScript","Java"],"Frameworks":["React","Spring Boot"],"Web":["HTML","CSS"],"Databases":["SQL"],"APIs":["REST API"],"CS Fundamentals":["OOP"],"Tools":["Git"],"Preferred":["TypeScript","Node.js","Docker","AWS"]}),
        "Data Engineer": _role(
            skills=["Python","SQL","Spark","Airflow","Git","Linux","DBMS","REST API"],
            preferred_skills=["Kafka","Scala","dbt","AWS","Snowflake"],
            package="6–12 LPA", location="Pune / Nagpur", difficulty="Medium",
            hiring_category="Service", description="Product engineering and digital transformation services company.",
            role_description="Build data pipelines for product engineering and analytics clients.",
            skill_groups={"Data Engineering":["Spark","Airflow","Kafka"],"Databases":["SQL","DBMS"],"Programming Languages":["Python"],"OS":["Linux"],"Tools":["Git"],"Preferred":["Scala","dbt","AWS","Snowflake"]}),
        "QA Engineer": _role(
            skills=["Java","Selenium","Manual Testing","SQL","Git","REST API","JIRA","OOP"],
            preferred_skills=["TestNG","Cucumber","Postman","Python","CI/CD"],
            package="5–9 LPA", location="Pune / Bangalore", difficulty="Easy",
            hiring_category="Service", description="Product engineering and digital transformation services company.",
            role_description="Test product engineering solutions for Persistent Systems clients.",
            skill_groups={"Testing":["Manual Testing","Selenium","TestNG","Cucumber"],"Programming Languages":["Java"],"Databases":["SQL"],"APIs":["REST API"],"CS Fundamentals":["OOP"],"Tools":["Git","JIRA","Postman"],"Preferred":["Python","CI/CD"]}),
    }
},

# 29. MPHASIS
"Mphasis": {
    "description": "IT services focused on cloud and cognitive services for BFSI sector.",
    "logo": "/logos/mphasis.svg", "locations": ["Bangalore","Chennai","Pune","Hyderabad"],
    "package": "4.5–10 LPA", "difficulty": "Easy", "hiring_category": "Service",
    "roles": {
        "Software Engineer": _role(
            skills=["Java","Python","SQL","REST API","Git","OOP","Spring Boot","DBMS","Linux"],
            preferred_skills=["Microservices","Docker","AWS","Kafka","Angular"],
            package="5–9 LPA", location="Bangalore / Chennai", difficulty="Easy",
            hiring_category="Service", description="IT services focused on cloud and cognitive services for BFSI sector.",
            role_description="Build Java-based enterprise solutions for Mphasis BFSI clients.",
            skill_groups={"Programming Languages":["Java","Python"],"Frameworks":["Spring Boot"],"Databases":["SQL","DBMS"],"APIs":["REST API"],"OS":["Linux"],"CS Fundamentals":["OOP"],"Tools":["Git"],"Preferred":["Microservices","Docker","AWS","Kafka"]}),
        "Java Developer": _role(
            skills=["Java","Spring Boot","SQL","OOP","REST API","Git","DSA","Maven","Hibernate"],
            preferred_skills=["Microservices","Docker","Kafka","Oracle DB","Linux"],
            package="4.5–9 LPA", location="Bangalore / Chennai / Pune", difficulty="Easy",
            hiring_category="Service", description="IT services focused on cloud and cognitive services for BFSI sector.",
            role_description="Develop Java microservices for banking and financial clients.",
            skill_groups={"Programming Languages":["Java"],"Frameworks":["Spring Boot","Hibernate"],"Databases":["SQL"],"APIs":["REST API"],"CS Fundamentals":["OOP","DSA"],"Tools":["Git","Maven"],"Preferred":["Microservices","Docker","Kafka","Oracle DB"]}),
        "Cloud Engineer": _role(
            skills=["AWS","Python","Docker","Linux","Git","SQL","Terraform","Networking"],
            preferred_skills=["Azure","Kubernetes","Ansible","Jenkins","CloudFormation"],
            package="6–11 LPA", location="Bangalore / Hyderabad", difficulty="Medium",
            hiring_category="Service", description="IT services focused on cloud and cognitive services for BFSI sector.",
            role_description="Manage cloud infrastructure for Mphasis BFSI clients on AWS.",
            skill_groups={"Cloud":["AWS"],"DevOps":["Docker","Terraform","Kubernetes","Ansible"],"Programming Languages":["Python"],"OS & Networking":["Linux","Networking"],"Databases":["SQL"],"Tools":["Git"],"Preferred":["Azure","Jenkins","CloudFormation"]}),
        "Data Analyst": _role(
            skills=["Python","SQL","Pandas","Excel","Tableau","Git","DBMS","NumPy"],
            preferred_skills=["Power BI","R","Spark","AWS","Snowflake"],
            package="4.5–9 LPA", location="Bangalore / Chennai", difficulty="Easy",
            hiring_category="Service", description="IT services focused on cloud and cognitive services for BFSI sector.",
            role_description="Analyse BFSI domain data and deliver insights for Mphasis clients.",
            skill_groups={"Data Analysis":["Pandas","NumPy","Excel"],"Databases":["SQL","DBMS"],"Visualisation":["Tableau","Power BI"],"Programming Languages":["Python"],"Tools":["Git"],"Preferred":["R","Spark","AWS","Snowflake"]}),
        "Business Analyst": _role(
            skills=["SQL","Excel","Python","Communication","JIRA","Git","Agile","Tableau"],
            preferred_skills=["Power BI","Salesforce","Confluence","BFSI Domain","Visio"],
            package="5–10 LPA", location="Bangalore / Mumbai", difficulty="Easy",
            hiring_category="Service", description="IT services focused on cloud and cognitive services for BFSI sector.",
            role_description="Bridge business and technology for BFSI digital transformation.",
            skill_groups={"Analysis":["SQL","Excel","Agile"],"Visualisation":["Tableau","Power BI"],"Tools":["Git","JIRA","Confluence"],"Soft Skills":["Communication"],"Programming Languages":["Python"],"Preferred":["Salesforce","BFSI Domain","Visio"]}),
    }
},

# 30. HEXAWARE
"Hexaware": {
    "description": "AI-first IT and BPO services company with RapidX automation platform.",
    "logo": "/logos/image.png", "locations": ["Mumbai","Chennai","Bangalore","Pune"],
    "package": "3.5–8 LPA", "difficulty": "Easy", "hiring_category": "Service",
    "roles": {
        "Software Engineer": _role(
            skills=["Java","Python","SQL","REST API","Git","OOP","DBMS","HTML","CSS"],
            preferred_skills=["Spring Boot","React","Docker","AWS","Testing"],
            package="4–8 LPA", location="Mumbai / Chennai / Bangalore", difficulty="Easy",
            hiring_category="Service", description="AI-first IT and BPO services company with RapidX automation platform.",
            role_description="Build enterprise software for Hexaware's global clients.",
            skill_groups={"Programming Languages":["Java","Python"],"Web":["HTML","CSS"],"Databases":["SQL","DBMS"],"APIs":["REST API"],"CS Fundamentals":["OOP"],"Tools":["Git"],"Preferred":["Spring Boot","React","Docker","AWS"]}),
        "QA Engineer": _role(
            skills=["Java","Selenium","Manual Testing","SQL","Git","REST API","JIRA","OOP"],
            preferred_skills=["Cucumber","TestNG","Postman","Python","CI/CD"],
            package="3.5–7 LPA", location="Pan-India", difficulty="Easy",
            hiring_category="Service", description="AI-first IT and BPO services company with RapidX automation platform.",
            role_description="Ensure software quality for Hexaware client engagements.",
            skill_groups={"Testing":["Manual Testing","Selenium","TestNG","Cucumber"],"Programming Languages":["Java"],"Databases":["SQL"],"APIs":["REST API"],"CS Fundamentals":["OOP"],"Tools":["Git","JIRA","Postman"],"Preferred":["Python","CI/CD"]}),
        "Data Analyst": _role(
            skills=["Python","SQL","Pandas","Excel","Tableau","Git","DBMS","NumPy"],
            preferred_skills=["Power BI","R","AWS","Spark","Data Warehousing"],
            package="4–8 LPA", location="Pan-India", difficulty="Easy",
            hiring_category="Service", description="AI-first IT and BPO services company with RapidX automation platform.",
            role_description="Analyse data and build reports for Hexaware clients.",
            skill_groups={"Data Analysis":["Pandas","NumPy","Excel"],"Databases":["SQL","DBMS"],"Visualisation":["Tableau","Power BI"],"Programming Languages":["Python"],"Tools":["Git"],"Preferred":["R","AWS","Spark","Data Warehousing"]}),
        "Cloud Engineer": _role(
            skills=["AWS","Azure","Python","Docker","Linux","Git","SQL","Terraform"],
            preferred_skills=["Kubernetes","GCP","Ansible","Jenkins","Prometheus"],
            package="5–10 LPA", location="Mumbai / Bangalore / Pune", difficulty="Medium",
            hiring_category="Service", description="AI-first IT and BPO services company with RapidX automation platform.",
            role_description="Manage cloud infrastructure for Hexaware enterprise clients.",
            skill_groups={"Cloud":["AWS","Azure"],"DevOps":["Docker","Terraform","Kubernetes","Ansible"],"Programming Languages":["Python"],"OS":["Linux"],"Databases":["SQL"],"Tools":["Git"],"Preferred":["GCP","Jenkins","Prometheus"]}),
        "Full Stack Developer": _role(
            skills=["JavaScript","React","Java","SQL","Spring Boot","REST API","Git","HTML","CSS","OOP"],
            preferred_skills=["Angular","TypeScript","Docker","Node.js","AWS"],
            package="4–9 LPA", location="Pan-India", difficulty="Easy",
            hiring_category="Service", description="AI-first IT and BPO services company with RapidX automation platform.",
            role_description="Develop end-to-end web solutions for Hexaware clients.",
            skill_groups={"Programming Languages":["JavaScript","Java"],"Frameworks":["React","Spring Boot"],"Web":["HTML","CSS"],"Databases":["SQL"],"APIs":["REST API"],"CS Fundamentals":["OOP"],"Tools":["Git"],"Preferred":["Angular","TypeScript","Docker","Node.js"]}),
    }
},

# ═══════════════════════════════════════════════════════
#  STARTUP COMPANIES (31-52)
# ═══════════════════════════════════════════════════════

# 31. RAZORPAY
"Razorpay": {
    "description": "India's leading B2B payments and fintech infrastructure platform.",
    "logo": "/logos/image.png", "locations": ["Bangalore"],
    "package": "12–25 LPA", "difficulty": "Medium", "hiring_category": "Startup",
    "roles": {
        "Software Engineer": _role(
            skills=["Go","Python","Java","SQL","Kafka","Redis","Git","Docker","DSA","REST API"],
            preferred_skills=["Kubernetes","AWS","gRPC","PostgreSQL","Microservices"],
            package="12–22 LPA", location="Bangalore", difficulty="Medium",
            hiring_category="Startup", description="India's leading B2B payments and fintech infrastructure platform.",
            role_description="Build highly reliable payment systems processing millions of transactions.",
            skill_groups={"Programming Languages":["Go","Python","Java"],"Messaging":["Kafka"],"Caching":["Redis"],"Databases":["SQL","PostgreSQL"],"DevOps":["Docker"],"APIs":["REST API"],"CS Fundamentals":["DSA"],"Tools":["Git"],"Preferred":["Kubernetes","AWS","gRPC","Microservices"]}),
        "Backend Engineer": _role(
            skills=["Go","Python","PostgreSQL","Redis","Kafka","Git","DSA","System Design","Linux"],
            preferred_skills=["Kubernetes","AWS","gRPC","Temporal","ElasticSearch"],
            package="14–25 LPA", location="Bangalore", difficulty="Medium",
            hiring_category="Startup", description="India's leading B2B payments and fintech infrastructure platform.",
            role_description="Design and build Razorpay's core payments and banking APIs.",
            skill_groups={"Programming Languages":["Go","Python"],"Databases":["PostgreSQL"],"Caching & Messaging":["Redis","Kafka"],"CS Fundamentals":["DSA","System Design"],"OS":["Linux"],"Tools":["Git"],"Preferred":["Kubernetes","AWS","gRPC","ElasticSearch"]}),
        "Frontend Developer": _role(
            skills=["JavaScript","TypeScript","React","HTML","CSS","Git","REST API","DSA"],
            preferred_skills=["Redux","Next.js","GraphQL","Jest","Webpack"],
            package="10–20 LPA", location="Bangalore", difficulty="Medium",
            hiring_category="Startup", description="India's leading B2B payments and fintech infrastructure platform.",
            role_description="Build Razorpay's merchant dashboard and payment UX.",
            skill_groups={"Programming Languages":["JavaScript","TypeScript"],"Frameworks":["React"],"Web":["HTML","CSS"],"APIs":["REST API"],"CS Fundamentals":["DSA"],"Tools":["Git"],"Preferred":["Redux","Next.js","GraphQL","Jest"]}),
        "Data Engineer": _role(
            skills=["Python","SQL","Spark","Kafka","Airflow","Git","Linux","PostgreSQL"],
            preferred_skills=["Scala","dbt","AWS","Presto","Redshift"],
            package="12–22 LPA", location="Bangalore", difficulty="Medium",
            hiring_category="Startup", description="India's leading B2B payments and fintech infrastructure platform.",
            role_description="Build data infrastructure for Razorpay's analytics and ML.",
            skill_groups={"Data Engineering":["Spark","Kafka","Airflow"],"Databases":["SQL","PostgreSQL"],"Programming Languages":["Python"],"OS":["Linux"],"Tools":["Git"],"Preferred":["Scala","dbt","AWS","Presto"]}),
        "Site Reliability Engineer": _role(
            skills=["Linux","Python","Docker","Kubernetes","AWS","Terraform","Git","Bash","Networking"],
            preferred_skills=["Prometheus","Grafana","Ansible","Go","ELK Stack"],
            package="14–24 LPA", location="Bangalore", difficulty="Medium",
            hiring_category="Startup", description="India's leading B2B payments and fintech infrastructure platform.",
            role_description="Maintain 99.99% uptime for Razorpay's payment infrastructure.",
            skill_groups={"Cloud":["AWS"],"DevOps":["Docker","Kubernetes","Terraform","Ansible"],"OS & Scripting":["Linux","Bash","Python"],"Networking":["Networking"],"Tools":["Git"],"Preferred":["Prometheus","Grafana","Go","ELK Stack"]}),
    }
},

# 32. CRED
"CRED": {
    "description": "Members-only fintech platform for creditworthy Indians — payments and rewards.",
    "logo": "/logos/image.png", "locations": ["Bangalore"],
    "package": "20–45 LPA", "difficulty": "Hard", "hiring_category": "Startup",
    "roles": {
        "Software Engineer": _role(
            skills=["Go","Python","Kotlin","SQL","Kafka","Redis","Docker","Git","DSA","System Design"],
            preferred_skills=["Kubernetes","PostgreSQL","gRPC","Microservices","AWS"],
            package="20–40 LPA", location="Bangalore", difficulty="Hard",
            hiring_category="Startup", description="Members-only fintech platform for creditworthy Indians.",
            role_description="Build high-quality fintech products with a craft-first engineering culture.",
            skill_groups={"Programming Languages":["Go","Python","Kotlin"],"Databases":["SQL","PostgreSQL"],"Caching & Messaging":["Kafka","Redis"],"DevOps":["Docker","Kubernetes"],"CS Fundamentals":["DSA","System Design"],"Tools":["Git"],"Preferred":["gRPC","Microservices","AWS"]}),
        "Backend Engineer": _role(
            skills=["Go","Python","PostgreSQL","Kafka","Redis","Git","System Design","Linux","DSA"],
            preferred_skills=["Kubernetes","AWS","Temporal","ElasticSearch","gRPC"],
            package="22–42 LPA", location="Bangalore", difficulty="Hard",
            hiring_category="Startup", description="Members-only fintech platform for creditworthy Indians.",
            role_description="Architect and build CRED's credit and rewards platform backend.",
            skill_groups={"Programming Languages":["Go","Python"],"Databases":["PostgreSQL"],"Caching & Messaging":["Kafka","Redis"],"CS Fundamentals":["System Design","DSA"],"OS":["Linux"],"Tools":["Git"],"Preferred":["Kubernetes","AWS","Temporal","ElasticSearch"]}),
        "Android Developer": _role(
            skills=["Kotlin","Java","Android SDK","Git","REST API","OOP","DSA","Room DB"],
            preferred_skills=["Jetpack Compose","Coroutines","Retrofit","Hilt","Firebase"],
            package="18–35 LPA", location="Bangalore", difficulty="Hard",
            hiring_category="Startup", description="Members-only fintech platform for creditworthy Indians.",
            role_description="Build the CRED Android app used by India's most creditworthy users.",
            skill_groups={"Mobile":["Kotlin","Java","Android SDK","Room DB","Jetpack Compose","Coroutines"],"APIs":["REST API"],"CS Fundamentals":["OOP","DSA"],"Tools":["Git"],"Preferred":["Retrofit","Hilt","Firebase"]}),
        "Data Scientist": _role(
            skills=["Python","Machine Learning","SQL","NumPy","Pandas","Scikit-learn","Git","Statistics"],
            preferred_skills=["PyTorch","Spark","Credit Scoring","Feature Engineering","AWS"],
            package="20–38 LPA", location="Bangalore", difficulty="Hard",
            hiring_category="Startup", description="Members-only fintech platform for creditworthy Indians.",
            role_description="Build credit scoring and personalisation models for CRED.",
            skill_groups={"ML / AI":["Machine Learning","Scikit-learn"],"Data":["NumPy","Pandas","Statistics","SQL"],"Programming Languages":["Python"],"Tools":["Git"],"Preferred":["PyTorch","Spark","Credit Scoring","Feature Engineering","AWS"]}),
        "Full Stack Developer": _role(
            skills=["TypeScript","React","Go","SQL","PostgreSQL","REST API","Git","HTML","CSS","OOP"],
            preferred_skills=["GraphQL","Next.js","Redis","Kubernetes","Docker"],
            package="18–35 LPA", location="Bangalore", difficulty="Hard",
            hiring_category="Startup", description="Members-only fintech platform for creditworthy Indians.",
            role_description="Build premium web experiences for CRED's fintech products.",
            skill_groups={"Programming Languages":["TypeScript","Go"],"Frameworks":["React"],"Web":["HTML","CSS"],"Databases":["SQL","PostgreSQL"],"APIs":["REST API"],"CS Fundamentals":["OOP"],"Tools":["Git"],"Preferred":["GraphQL","Next.js","Redis","Kubernetes"]}),
    }
},

# 33. FRESHWORKS
"Freshworks": {
    "description": "NASDAQ-listed SaaS company: CRM, helpdesk, and ITSM products built in India.",
    "logo": "/logos/image.png", "locations": ["Chennai","Bangalore","Hyderabad"],
    "package": "10–25 LPA", "difficulty": "Medium", "hiring_category": "Startup",
    "roles": {
        "Software Engineer": _role(
            skills=["Ruby on Rails","Python","JavaScript","React","SQL","Git","REST API","DSA","OOP"],
            preferred_skills=["Kafka","Redis","Docker","AWS","TypeScript"],
            package="10–20 LPA", location="Chennai / Bangalore", difficulty="Medium",
            hiring_category="Startup", description="NASDAQ-listed SaaS company: CRM, helpdesk, and ITSM products.",
            role_description="Build scalable multi-tenant SaaS features for Freshworks product suite.",
            skill_groups={"Programming Languages":["Ruby on Rails","Python","JavaScript"],"Frameworks":["React"],"Databases":["SQL"],"APIs":["REST API"],"CS Fundamentals":["DSA","OOP"],"Tools":["Git"],"Preferred":["Kafka","Redis","Docker","AWS"]}),
        "Backend Engineer": _role(
            skills=["Ruby on Rails","Python","Java","SQL","Redis","Kafka","Git","REST API","DSA","System Design"],
            preferred_skills=["Docker","Kubernetes","AWS","gRPC","TypeScript"],
            package="12–22 LPA", location="Chennai / Bangalore", difficulty="Medium",
            hiring_category="Startup", description="NASDAQ-listed SaaS company: CRM, helpdesk, and ITSM products.",
            role_description="Design backend APIs and microservices for Freshworks SaaS products.",
            skill_groups={"Programming Languages":["Ruby on Rails","Python","Java"],"Databases":["SQL"],"Caching & Messaging":["Redis","Kafka"],"APIs":["REST API"],"CS Fundamentals":["DSA","System Design"],"Tools":["Git"],"Preferred":["Docker","Kubernetes","AWS"]}),
        "Frontend Developer": _role(
            skills=["JavaScript","TypeScript","React","HTML","CSS","Git","REST API","DSA"],
            preferred_skills=["Redux","Vue.js","GraphQL","Jest","Next.js"],
            package="10–20 LPA", location="Chennai / Bangalore", difficulty="Medium",
            hiring_category="Startup", description="NASDAQ-listed SaaS company: CRM, helpdesk, and ITSM products.",
            role_description="Build Freshdesk, Freshsales, and Freshservice frontend experiences.",
            skill_groups={"Programming Languages":["JavaScript","TypeScript"],"Frameworks":["React"],"Web":["HTML","CSS"],"APIs":["REST API"],"CS Fundamentals":["DSA"],"Tools":["Git"],"Preferred":["Redux","Vue.js","GraphQL","Jest"]}),
        "Machine Learning Engineer": _role(
            skills=["Python","Machine Learning","NLP","SQL","NumPy","Pandas","Git","Scikit-learn"],
            preferred_skills=["PyTorch","TensorFlow","Transformers","AWS","Spark"],
            package="14–25 LPA", location="Chennai / Bangalore", difficulty="Medium",
            hiring_category="Startup", description="NASDAQ-listed SaaS company: CRM, helpdesk, and ITSM products.",
            role_description="Build NLP and AI features for Freshworks Freddy AI platform.",
            skill_groups={"ML / AI":["Machine Learning","NLP","Scikit-learn"],"Data":["NumPy","Pandas","SQL"],"Tools":["Git"],"Preferred":["PyTorch","TensorFlow","Transformers","AWS","Spark"]}),
        "Site Reliability Engineer": _role(
            skills=["Linux","Python","Docker","Kubernetes","AWS","Terraform","Git","Bash"],
            preferred_skills=["Prometheus","Grafana","Ansible","Go","ELK Stack"],
            package="12–22 LPA", location="Chennai", difficulty="Medium",
            hiring_category="Startup", description="NASDAQ-listed SaaS company: CRM, helpdesk, and ITSM products.",
            role_description="Ensure reliability and scalability of Freshworks SaaS infrastructure.",
            skill_groups={"Cloud":["AWS"],"DevOps":["Docker","Kubernetes","Terraform","Ansible"],"OS & Scripting":["Linux","Bash","Python"],"Tools":["Git"],"Preferred":["Prometheus","Grafana","Go","ELK Stack"]}),
        "Data Engineer": _role(
            skills=["Python","SQL","Spark","Kafka","Airflow","AWS","Git","Linux"],
            preferred_skills=["Scala","dbt","Snowflake","Presto","Redshift"],
            package="12–22 LPA", location="Chennai / Bangalore", difficulty="Medium",
            hiring_category="Startup", description="NASDAQ-listed SaaS company: CRM, helpdesk, and ITSM products.",
            role_description="Build data pipelines for Freshworks analytics and product insights.",
            skill_groups={"Data Engineering":["Spark","Kafka","Airflow"],"Cloud":["AWS"],"Databases":["SQL"],"Programming Languages":["Python"],"OS":["Linux"],"Tools":["Git"],"Preferred":["Scala","dbt","Snowflake","Presto"]}),
    }
},

# 34. ZERODHA
"Zerodha": {
    "description": "India's largest stock broker — Kite trading platform, Coin, and Varsity.",
    "logo": "/logos/image.png", "locations": ["Bangalore"],
    "package": "12–25 LPA", "difficulty": "Medium", "hiring_category": "Startup",
    "roles": {
        "Software Engineer": _role(
            skills=["Python","Go","PostgreSQL","Redis","Git","Linux","DSA","REST API","OOP"],
            preferred_skills=["Kafka","Kubernetes","React","WebSockets","Docker"],
            package="12–22 LPA", location="Bangalore", difficulty="Medium",
            hiring_category="Startup", description="India's largest stock broker — Kite trading platform, Coin, and Varsity.",
            role_description="Build trading and brokerage platform features handling millions of orders.",
            skill_groups={"Programming Languages":["Python","Go"],"Databases":["PostgreSQL"],"Caching":["Redis"],"APIs":["REST API"],"CS Fundamentals":["DSA","OOP"],"OS":["Linux"],"Tools":["Git"],"Preferred":["Kafka","Kubernetes","React","WebSockets"]}),
        "Backend Engineer": _role(
            skills=["Python","Go","PostgreSQL","Redis","Linux","Git","DSA","System Design","WebSockets"],
            preferred_skills=["Kafka","Docker","Kubernetes","C","gRPC"],
            package="14–25 LPA", location="Bangalore", difficulty="Medium",
            hiring_category="Startup", description="India's largest stock broker — Kite trading platform, Coin, and Varsity.",
            role_description="Build low-latency backend systems for Zerodha's trading infrastructure.",
            skill_groups={"Programming Languages":["Python","Go"],"Databases":["PostgreSQL"],"Caching":["Redis"],"Real-time":["WebSockets"],"CS Fundamentals":["DSA","System Design"],"OS":["Linux"],"Tools":["Git"],"Preferred":["Kafka","Docker","Kubernetes"]}),
        "Frontend Developer": _role(
            skills=["JavaScript","TypeScript","React","HTML","CSS","Git","REST API","WebSockets"],
            preferred_skills=["Redux","Vue.js","D3.js","Jest","Next.js"],
            package="10–20 LPA", location="Bangalore", difficulty="Medium",
            hiring_category="Startup", description="India's largest stock broker — Kite trading platform, Coin, and Varsity.",
            role_description="Build Kite web trading platform and Coin mutual fund interface.",
            skill_groups={"Programming Languages":["JavaScript","TypeScript"],"Frameworks":["React"],"Web":["HTML","CSS"],"APIs":["REST API"],"Real-time":["WebSockets"],"Tools":["Git"],"Preferred":["Redux","D3.js","Jest","Next.js"]}),
        "DevOps Engineer": _role(
            skills=["Linux","Python","Docker","Go","Git","Networking","Kubernetes","Monitoring","Bash"],
            preferred_skills=["Prometheus","Grafana","Ansible","Terraform","AWS"],
            package="12–22 LPA", location="Bangalore", difficulty="Medium",
            hiring_category="Startup", description="India's largest stock broker — Kite trading platform, Coin, and Varsity.",
            role_description="Keep Zerodha's trading infrastructure reliable and performant.",
            skill_groups={"DevOps":["Docker","Kubernetes","Ansible","Terraform"],"Programming Languages":["Python","Go"],"OS & Scripting":["Linux","Bash"],"Networking":["Networking"],"Monitoring":["Monitoring","Prometheus","Grafana"],"Tools":["Git"],"Preferred":["AWS"]}),
        "Data Analyst": _role(
            skills=["Python","SQL","Pandas","NumPy","Git","Linux","PostgreSQL","Excel"],
            preferred_skills=["Tableau","Power BI","Spark","R","Metabase"],
            package="10–18 LPA", location="Bangalore", difficulty="Medium",
            hiring_category="Startup", description="India's largest stock broker — Kite trading platform, Coin, and Varsity.",
            role_description="Analyse trading data and market patterns for Zerodha's platform.",
            skill_groups={"Data Analysis":["Pandas","NumPy","Excel"],"Databases":["SQL","PostgreSQL"],"Programming Languages":["Python"],"OS":["Linux"],"Tools":["Git"],"Preferred":["Tableau","Power BI","Spark","R","Metabase"]}),
    }
},

# 35. GROWW
"Groww": {
    "description": "India's leading investment platform for mutual funds, stocks, and IPOs.",
    "logo": "/logos/image.png", "locations": ["Bangalore"],
    "package": "14–32 LPA", "difficulty": "Medium", "hiring_category": "Startup",
    "roles": {
        "Software Engineer": _role(
            skills=["Go","Python","Java","SQL","Kafka","Redis","Git","Docker","DSA","REST API"],
            preferred_skills=["Kubernetes","AWS","PostgreSQL","gRPC","Microservices"],
            package="15–28 LPA", location="Bangalore", difficulty="Medium",
            hiring_category="Startup", description="India's leading investment platform for mutual funds, stocks, and IPOs.",
            role_description="Build fintech platform features serving 10M+ retail investors.",
            skill_groups={"Programming Languages":["Go","Python","Java"],"Databases":["SQL","PostgreSQL"],"Caching & Messaging":["Kafka","Redis"],"DevOps":["Docker"],"APIs":["REST API"],"CS Fundamentals":["DSA"],"Tools":["Git"],"Preferred":["Kubernetes","AWS","gRPC","Microservices"]}),
        "Android Developer": _role(
            skills=["Kotlin","Java","Android SDK","Git","REST API","DSA","OOP","Room DB"],
            preferred_skills=["Jetpack Compose","Coroutines","Retrofit","Hilt","Firebase"],
            package="14–25 LPA", location="Bangalore", difficulty="Medium",
            hiring_category="Startup", description="India's leading investment platform for mutual funds, stocks, and IPOs.",
            role_description="Build and scale the Groww Android app used by millions of investors.",
            skill_groups={"Mobile":["Kotlin","Java","Android SDK","Jetpack Compose","Room DB","Coroutines"],"APIs":["REST API"],"CS Fundamentals":["DSA","OOP"],"Tools":["Git"],"Preferred":["Retrofit","Hilt","Firebase"]}),
        "Data Engineer": _role(
            skills=["Python","SQL","Spark","Kafka","Airflow","Git","Linux","DBMS"],
            preferred_skills=["Scala","dbt","Snowflake","AWS","Presto"],
            package="14–26 LPA", location="Bangalore", difficulty="Medium",
            hiring_category="Startup", description="India's leading investment platform for mutual funds, stocks, and IPOs.",
            role_description="Build real-time and batch data pipelines for Groww's analytics platform.",
            skill_groups={"Data Engineering":["Spark","Kafka","Airflow"],"Databases":["SQL","DBMS"],"Programming Languages":["Python"],"OS":["Linux"],"Tools":["Git"],"Preferred":["Scala","dbt","Snowflake","AWS","Presto"]}),
        "Machine Learning Engineer": _role(
            skills=["Python","Machine Learning","SQL","NumPy","Pandas","Scikit-learn","Git","Statistics"],
            preferred_skills=["PyTorch","TensorFlow","Spark","AWS","Feature Engineering"],
            package="16–30 LPA", location="Bangalore", difficulty="Medium",
            hiring_category="Startup", description="India's leading investment platform for mutual funds, stocks, and IPOs.",
            role_description="Build personalisation and risk ML models for Groww investors.",
            skill_groups={"ML / AI":["Machine Learning","Scikit-learn"],"Data":["NumPy","Pandas","Statistics","SQL"],"Programming Languages":["Python"],"Tools":["Git"],"Preferred":["PyTorch","TensorFlow","Spark","AWS"]}),
        "Backend Engineer": _role(
            skills=["Go","Java","Python","SQL","Kafka","Redis","Git","System Design","DSA","Linux"],
            preferred_skills=["Kubernetes","AWS","gRPC","ElasticSearch","Temporal"],
            package="16–30 LPA", location="Bangalore", difficulty="Medium",
            hiring_category="Startup", description="India's leading investment platform for mutual funds, stocks, and IPOs.",
            role_description="Design high-reliability backend systems for fintech at scale.",
            skill_groups={"Programming Languages":["Go","Java","Python"],"Databases":["SQL"],"Caching & Messaging":["Kafka","Redis"],"CS Fundamentals":["System Design","DSA"],"OS":["Linux"],"Tools":["Git"],"Preferred":["Kubernetes","AWS","gRPC","ElasticSearch"]}),
    }
},

# 36. PHONEPE
"PhonePe": {
    "description": "India's #1 UPI payments app with 500M+ registered users.",
    "logo": "/logos/image.png", "locations": ["Bangalore"],
    "package": "14–32 LPA", "difficulty": "Medium", "hiring_category": "Startup",
    "roles": {
        "Software Engineer": _role(
            skills=["Java","Go","Python","SQL","Kafka","Redis","Docker","Git","DSA","Microservices"],
            preferred_skills=["Kubernetes","AWS","gRPC","PostgreSQL","Spring Boot"],
            package="15–28 LPA", location="Bangalore", difficulty="Medium",
            hiring_category="Startup", description="India's #1 UPI payments app with 500M+ registered users.",
            role_description="Build reliable payment features for PhonePe's UPI and fintech platform.",
            skill_groups={"Programming Languages":["Java","Go","Python"],"Databases":["SQL","PostgreSQL"],"Caching & Messaging":["Kafka","Redis"],"DevOps":["Docker"],"Architecture":["Microservices"],"CS Fundamentals":["DSA"],"Tools":["Git"],"Preferred":["Kubernetes","AWS","gRPC","Spring Boot"]}),
        "Backend Engineer": _role(
            skills=["Java","Go","PostgreSQL","MySQL","Kafka","Redis","Git","System Design","DSA","Linux"],
            preferred_skills=["Kubernetes","AWS","gRPC","ElasticSearch","Temporal"],
            package="18–32 LPA", location="Bangalore", difficulty="Medium",
            hiring_category="Startup", description="India's #1 UPI payments app with 500M+ registered users.",
            role_description="Design backend systems processing millions of daily payment transactions.",
            skill_groups={"Programming Languages":["Java","Go"],"Databases":["PostgreSQL","MySQL"],"Caching & Messaging":["Kafka","Redis"],"CS Fundamentals":["System Design","DSA"],"OS":["Linux"],"Tools":["Git"],"Preferred":["Kubernetes","AWS","gRPC","ElasticSearch"]}),
        "Android Developer": _role(
            skills=["Kotlin","Java","Android SDK","Git","REST API","OOP","DSA","Room DB"],
            preferred_skills=["Jetpack Compose","Coroutines","Retrofit","Hilt","Firebase"],
            package="14–26 LPA", location="Bangalore", difficulty="Medium",
            hiring_category="Startup", description="India's #1 UPI payments app with 500M+ registered users.",
            role_description="Build the PhonePe Android app used by 500M+ users.",
            skill_groups={"Mobile":["Kotlin","Java","Android SDK","Room DB","Jetpack Compose","Coroutines"],"APIs":["REST API"],"CS Fundamentals":["OOP","DSA"],"Tools":["Git"],"Preferred":["Retrofit","Hilt","Firebase"]}),
        "Data Engineer": _role(
            skills=["Python","SQL","Spark","Kafka","Airflow","AWS","Git","Linux"],
            preferred_skills=["Scala","dbt","Presto","Hudi","Redshift"],
            package="14–26 LPA", location="Bangalore", difficulty="Medium",
            hiring_category="Startup", description="India's #1 UPI payments app with 500M+ registered users.",
            role_description="Build real-time data pipelines for PhonePe's payment analytics.",
            skill_groups={"Data Engineering":["Spark","Kafka","Airflow"],"Cloud":["AWS"],"Databases":["SQL"],"Programming Languages":["Python"],"OS":["Linux"],"Tools":["Git"],"Preferred":["Scala","dbt","Presto","Hudi"]}),
        "Machine Learning Engineer": _role(
            skills=["Python","Machine Learning","SQL","NumPy","Pandas","Scikit-learn","Git","Statistics"],
            preferred_skills=["PyTorch","Spark","Fraud Detection","Feature Engineering","AWS"],
            package="16–30 LPA", location="Bangalore", difficulty="Medium",
            hiring_category="Startup", description="India's #1 UPI payments app with 500M+ registered users.",
            role_description="Build fraud detection and personalisation models for PhonePe.",
            skill_groups={"ML / AI":["Machine Learning","Scikit-learn","Fraud Detection"],"Data":["NumPy","Pandas","Statistics","SQL"],"Programming Languages":["Python"],"Tools":["Git"],"Preferred":["PyTorch","Spark","Feature Engineering","AWS"]}),
    }
},

# 37. SWIGGY
"Swiggy": {
    "description": "India's leading food delivery and quick commerce platform.",
    "logo": "/logos/image.png", "locations": ["Bangalore","Hyderabad"],
    "package": "14–32 LPA", "difficulty": "Medium", "hiring_category": "Startup",
    "roles": {
        "Software Engineer": _role(
            skills=["Java","Go","Python","SQL","Kafka","Redis","Git","Docker","DSA","REST API"],
            preferred_skills=["Kubernetes","AWS","Spark","PostgreSQL","Microservices"],
            package="15–28 LPA", location="Bangalore", difficulty="Medium",
            hiring_category="Startup", description="India's leading food delivery and quick commerce platform.",
            role_description="Build scalable systems powering food delivery for millions of customers.",
            skill_groups={"Programming Languages":["Java","Go","Python"],"Databases":["SQL","PostgreSQL"],"Caching & Messaging":["Kafka","Redis"],"DevOps":["Docker"],"APIs":["REST API"],"CS Fundamentals":["DSA"],"Tools":["Git"],"Preferred":["Kubernetes","AWS","Spark","Microservices"]}),
        "Machine Learning Engineer": _role(
            skills=["Python","Machine Learning","Deep Learning","SQL","Spark","Kafka","Git","NumPy","Pandas"],
            preferred_skills=["PyTorch","TensorFlow","Airflow","AWS","MLflow"],
            package="18–32 LPA", location="Bangalore", difficulty="Medium",
            hiring_category="Startup", description="India's leading food delivery and quick commerce platform.",
            role_description="Build recommendation, ETA prediction, and demand forecasting ML models.",
            skill_groups={"ML / AI":["Machine Learning","Deep Learning"],"Data Engineering":["Spark","Kafka","Airflow"],"Data":["NumPy","Pandas","SQL"],"Tools":["Git"],"Preferred":["PyTorch","TensorFlow","AWS","MLflow"]}),
        "Data Engineer": _role(
            skills=["Python","SQL","Spark","Kafka","Airflow","Git","Linux","DBMS"],
            preferred_skills=["Scala","dbt","Presto","AWS","Snowflake"],
            package="14–26 LPA", location="Bangalore", difficulty="Medium",
            hiring_category="Startup", description="India's leading food delivery and quick commerce platform.",
            role_description="Build real-time data pipelines for Swiggy's analytics and ML platform.",
            skill_groups={"Data Engineering":["Spark","Kafka","Airflow"],"Databases":["SQL","DBMS"],"Programming Languages":["Python"],"OS":["Linux"],"Tools":["Git"],"Preferred":["Scala","dbt","Presto","AWS"]}),
        "Backend Engineer": _role(
            skills=["Java","Go","Python","SQL","Kafka","Redis","Git","System Design","DSA","Linux"],
            preferred_skills=["Kubernetes","AWS","gRPC","ElasticSearch","Microservices"],
            package="16–30 LPA", location="Bangalore / Hyderabad", difficulty="Medium",
            hiring_category="Startup", description="India's leading food delivery and quick commerce platform.",
            role_description="Build high-throughput backend systems for Swiggy's order platform.",
            skill_groups={"Programming Languages":["Java","Go","Python"],"Databases":["SQL"],"Caching & Messaging":["Kafka","Redis"],"CS Fundamentals":["System Design","DSA"],"OS":["Linux"],"Tools":["Git"],"Preferred":["Kubernetes","AWS","gRPC","ElasticSearch"]}),
        "DevOps Engineer": _role(
            skills=["AWS","Docker","Kubernetes","Linux","Python","Terraform","CI/CD","Git","Bash"],
            preferred_skills=["Jenkins","Ansible","Prometheus","Grafana","Go"],
            package="14–26 LPA", location="Bangalore", difficulty="Medium",
            hiring_category="Startup", description="India's leading food delivery and quick commerce platform.",
            role_description="Build and operate Swiggy's cloud infrastructure serving millions.",
            skill_groups={"Cloud":["AWS"],"DevOps":["Docker","Kubernetes","Terraform","CI/CD","Ansible"],"OS & Scripting":["Linux","Bash","Python"],"Tools":["Git"],"Preferred":["Jenkins","Prometheus","Grafana","Go"]}),
    }
},

# 38. ZOMATO
"Zomato": {
    "description": "Food delivery, Blinkit quick commerce, and Hyperpure B2B supply platform.",
    "logo": "/logos/image.png", "locations": ["Gurugram","Bangalore"],
    "package": "12–28 LPA", "difficulty": "Medium", "hiring_category": "Startup",
    "roles": {
        "Software Engineer": _role(
            skills=["Go","Python","Java","SQL","Kafka","Redis","Git","Docker","DSA","REST API"],
            preferred_skills=["Kubernetes","AWS","Spark","PostgreSQL","Microservices"],
            package="14–26 LPA", location="Gurugram / Bangalore", difficulty="Medium",
            hiring_category="Startup", description="Food delivery, Blinkit quick commerce, and Hyperpure B2B supply platform.",
            role_description="Build systems for food delivery and quick commerce at scale.",
            skill_groups={"Programming Languages":["Go","Python","Java"],"Databases":["SQL","PostgreSQL"],"Caching & Messaging":["Kafka","Redis"],"DevOps":["Docker"],"APIs":["REST API"],"CS Fundamentals":["DSA"],"Tools":["Git"],"Preferred":["Kubernetes","AWS","Spark","Microservices"]}),
        "Backend Engineer": _role(
            skills=["Go","Python","Java","SQL","Kafka","Redis","Git","System Design","DSA","Linux"],
            preferred_skills=["Kubernetes","AWS","gRPC","ElasticSearch","MySQL"],
            package="16–28 LPA", location="Gurugram / Bangalore", difficulty="Medium",
            hiring_category="Startup", description="Food delivery, Blinkit quick commerce, and Hyperpure B2B supply platform.",
            role_description="Design backend for Zomato's order management and logistics platform.",
            skill_groups={"Programming Languages":["Go","Python","Java"],"Databases":["SQL","MySQL"],"Caching & Messaging":["Kafka","Redis"],"CS Fundamentals":["System Design","DSA"],"OS":["Linux"],"Tools":["Git"],"Preferred":["Kubernetes","AWS","gRPC","ElasticSearch"]}),
        "Data Scientist": _role(
            skills=["Python","Machine Learning","SQL","NumPy","Pandas","Scikit-learn","Git","Statistics"],
            preferred_skills=["PyTorch","TensorFlow","Spark","AWS","XGBoost"],
            package="14–26 LPA", location="Gurugram", difficulty="Medium",
            hiring_category="Startup", description="Food delivery, Blinkit quick commerce, and Hyperpure B2B supply platform.",
            role_description="Build demand forecasting and personalisation models for Zomato.",
            skill_groups={"ML / AI":["Machine Learning","Scikit-learn"],"Data":["NumPy","Pandas","Statistics","SQL"],"Programming Languages":["Python"],"Tools":["Git"],"Preferred":["PyTorch","TensorFlow","Spark","AWS","XGBoost"]}),
        "Data Engineer": _role(
            skills=["Python","SQL","Spark","Kafka","Airflow","Git","Linux","DBMS"],
            preferred_skills=["Scala","dbt","AWS","Presto","Delta Lake"],
            package="12–24 LPA", location="Gurugram / Bangalore", difficulty="Medium",
            hiring_category="Startup", description="Food delivery, Blinkit quick commerce, and Hyperpure B2B supply platform.",
            role_description="Build data pipelines for Zomato's analytics and ML platform.",
            skill_groups={"Data Engineering":["Spark","Kafka","Airflow"],"Databases":["SQL","DBMS"],"Programming Languages":["Python"],"OS":["Linux"],"Tools":["Git"],"Preferred":["Scala","dbt","AWS","Presto","Delta Lake"]}),
        "Mobile Application Developer": _role(
            skills=["Kotlin","Swift","Android SDK","iOS","Git","REST API","OOP","DSA"],
            preferred_skills=["Jetpack Compose","SwiftUI","React Native","Firebase","Room DB"],
            package="12–24 LPA", location="Gurugram / Bangalore", difficulty="Medium",
            hiring_category="Startup", description="Food delivery, Blinkit quick commerce, and Hyperpure B2B supply platform.",
            role_description="Build the Zomato and Blinkit apps used by millions daily.",
            skill_groups={"Mobile":["Kotlin","Swift","Android SDK","iOS","Jetpack Compose","SwiftUI"],"APIs":["REST API"],"CS Fundamentals":["OOP","DSA"],"Tools":["Git"],"Preferred":["React Native","Firebase","Room DB"]}),
    }
},

# 39. BROWSERSTACK
"BrowserStack": {
    "description": "Cloud platform for testing web and mobile apps on 3,000+ real devices.",
    "logo": "/logos/image.png", "locations": ["Mumbai","Bangalore"],
    "package": "12–24 LPA", "difficulty": "Medium", "hiring_category": "Startup",
    "roles": {
        "Software Engineer": _role(
            skills=["Java","Python","Node.js","SQL","Docker","Git","DSA","REST API","Linux"],
            preferred_skills=["Kubernetes","AWS","Selenium","Appium","React"],
            package="12–22 LPA", location="Mumbai / Bangalore", difficulty="Medium",
            hiring_category="Startup", description="Cloud platform for testing web and mobile apps on 3,000+ real devices.",
            role_description="Build BrowserStack's cloud platform and developer testing tools.",
            skill_groups={"Programming Languages":["Java","Python","Node.js"],"Databases":["SQL"],"DevOps":["Docker","Kubernetes"],"APIs":["REST API"],"OS":["Linux"],"CS Fundamentals":["DSA"],"Tools":["Git"],"Preferred":["AWS","Selenium","Appium","React"]}),
        "QA Automation Engineer": _role(
            skills=["Java","Selenium","Appium","TestNG","REST API","Git","Python","SQL","Manual Testing"],
            preferred_skills=["Cucumber","Playwright","WebdriverIO","CI/CD","Postman"],
            package="10–20 LPA", location="Mumbai / Bangalore", difficulty="Medium",
            hiring_category="Startup", description="Cloud platform for testing web and mobile apps on 3,000+ real devices.",
            role_description="Build and maintain automation frameworks for BrowserStack's platform.",
            skill_groups={"Testing":["Selenium","Appium","TestNG","Cucumber","Manual Testing","Playwright"],"Programming Languages":["Java","Python"],"Databases":["SQL"],"APIs":["REST API"],"Tools":["Git","Postman"],"Preferred":["WebdriverIO","CI/CD"]}),
        "Backend Engineer": _role(
            skills=["Java","Python","Node.js","SQL","Redis","Kafka","Git","Docker","DSA","REST API"],
            preferred_skills=["Kubernetes","AWS","Go","ElasticSearch","gRPC"],
            package="14–24 LPA", location="Mumbai / Bangalore", difficulty="Medium",
            hiring_category="Startup", description="Cloud platform for testing web and mobile apps on 3,000+ real devices.",
            role_description="Build scalable backend for device management and test orchestration.",
            skill_groups={"Programming Languages":["Java","Python","Node.js"],"Databases":["SQL"],"Caching & Messaging":["Redis","Kafka"],"DevOps":["Docker"],"APIs":["REST API"],"CS Fundamentals":["DSA"],"Tools":["Git"],"Preferred":["Kubernetes","AWS","Go","ElasticSearch"]}),
        "DevOps Engineer": _role(
            skills=["AWS","Docker","Kubernetes","Linux","Python","Terraform","CI/CD","Git","Bash"],
            preferred_skills=["Jenkins","Ansible","Prometheus","Grafana","Go"],
            package="12–22 LPA", location="Mumbai / Bangalore", difficulty="Medium",
            hiring_category="Startup", description="Cloud platform for testing web and mobile apps on 3,000+ real devices.",
            role_description="Manage BrowserStack's global device cloud infrastructure.",
            skill_groups={"Cloud":["AWS"],"DevOps":["Docker","Kubernetes","Terraform","CI/CD","Ansible"],"OS & Scripting":["Linux","Bash","Python"],"Tools":["Git"],"Preferred":["Jenkins","Prometheus","Grafana","Go"]}),
        "Full Stack Developer": _role(
            skills=["JavaScript","TypeScript","React","Node.js","SQL","Git","REST API","HTML","CSS"],
            preferred_skills=["Next.js","GraphQL","Docker","AWS","Redux"],
            package="12–22 LPA", location="Mumbai / Bangalore", difficulty="Medium",
            hiring_category="Startup", description="Cloud platform for testing web and mobile apps on 3,000+ real devices.",
            role_description="Build BrowserStack's web dashboard and product UX.",
            skill_groups={"Programming Languages":["JavaScript","TypeScript"],"Frameworks":["React","Node.js"],"Web":["HTML","CSS"],"Databases":["SQL"],"APIs":["REST API"],"Tools":["Git"],"Preferred":["Next.js","GraphQL","Docker","AWS","Redux"]}),
    }
},

# 40. POSTMAN
"Postman": {
    "description": "World's leading API platform used by 30M+ developers.",
    "logo": "/logos/image.png", "locations": ["Bangalore"],
    "package": "16–35 LPA", "difficulty": "Medium", "hiring_category": "Startup",
    "roles": {
        "Software Engineer": _role(
            skills=["JavaScript","TypeScript","Node.js","React","SQL","Git","REST API","DSA","OOP"],
            preferred_skills=["GraphQL","Docker","AWS","Electron","Go"],
            package="18–35 LPA", location="Bangalore", difficulty="Medium",
            hiring_category="Startup", description="World's leading API platform used by 30M+ developers.",
            role_description="Build Postman's API client, collections, and collaboration features.",
            skill_groups={"Programming Languages":["JavaScript","TypeScript","Node.js"],"Frameworks":["React"],"APIs":["REST API","GraphQL"],"Databases":["SQL"],"CS Fundamentals":["DSA","OOP"],"Tools":["Git"],"Preferred":["Docker","AWS","Electron","Go"]}),
        "Frontend Developer": _role(
            skills=["JavaScript","TypeScript","React","HTML","CSS","Git","REST API","DSA"],
            preferred_skills=["Electron","Redux","GraphQL","Jest","WebSockets"],
            package="16–30 LPA", location="Bangalore", difficulty="Medium",
            hiring_category="Startup", description="World's leading API platform used by 30M+ developers.",
            role_description="Build Postman's UI for API design, testing, and documentation.",
            skill_groups={"Programming Languages":["JavaScript","TypeScript"],"Frameworks":["React"],"Web":["HTML","CSS"],"APIs":["REST API"],"CS Fundamentals":["DSA"],"Tools":["Git"],"Preferred":["Electron","Redux","GraphQL","Jest"]}),
        "Backend Engineer": _role(
            skills=["Node.js","Python","Go","SQL","Redis","Git","Docker","DSA","REST API","Microservices"],
            preferred_skills=["Kubernetes","AWS","Kafka","gRPC","PostgreSQL"],
            package="18–35 LPA", location="Bangalore", difficulty="Medium",
            hiring_category="Startup", description="World's leading API platform used by 30M+ developers.",
            role_description="Build Postman's API management and collaboration backend.",
            skill_groups={"Programming Languages":["Node.js","Python","Go"],"Databases":["SQL","PostgreSQL"],"Caching":["Redis"],"DevOps":["Docker"],"APIs":["REST API","Microservices"],"CS Fundamentals":["DSA"],"Tools":["Git"],"Preferred":["Kubernetes","AWS","Kafka","gRPC"]}),
        "Site Reliability Engineer": _role(
            skills=["Linux","Python","Docker","Kubernetes","AWS","Terraform","Git","Monitoring","Bash"],
            preferred_skills=["Prometheus","Grafana","Ansible","Go","ELK Stack"],
            package="18–32 LPA", location="Bangalore", difficulty="Medium",
            hiring_category="Startup", description="World's leading API platform used by 30M+ developers.",
            role_description="Ensure high availability of Postman's globally distributed platform.",
            skill_groups={"Cloud":["AWS"],"DevOps":["Docker","Kubernetes","Terraform","Ansible"],"OS & Scripting":["Linux","Bash","Python"],"Monitoring":["Monitoring","Prometheus","Grafana"],"Tools":["Git"],"Preferred":["Go","ELK Stack"]}),
        "Data Engineer": _role(
            skills=["Python","SQL","Spark","Kafka","Airflow","AWS","Git","Linux"],
            preferred_skills=["dbt","Snowflake","Scala","Presto","Redshift"],
            package="16–28 LPA", location="Bangalore", difficulty="Medium",
            hiring_category="Startup", description="World's leading API platform used by 30M+ developers.",
            role_description="Build data infrastructure for Postman's developer analytics.",
            skill_groups={"Data Engineering":["Spark","Kafka","Airflow"],"Cloud":["AWS"],"Databases":["SQL"],"Programming Languages":["Python"],"OS":["Linux"],"Tools":["Git"],"Preferred":["dbt","Snowflake","Scala","Presto"]}),
    }
},

# 41. INMOBI
"InMobi": {
    "description": "Global mobile advertising and consumer technology platform.",
    "logo": "/logos/image.png", "locations": ["Bangalore"],
    "package": "12–26 LPA", "difficulty": "Medium", "hiring_category": "Startup",
    "roles": {
        "Software Engineer": _role(
            skills=["Java","Python","SQL","Kafka","Git","Docker","DSA","REST API","OOP"],
            preferred_skills=["Spark","HBase","Aerospike","Kubernetes","Go"],
            package="12–24 LPA", location="Bangalore", difficulty="Medium",
            hiring_category="Startup", description="Global mobile advertising and consumer technology platform.",
            role_description="Build real-time ad serving and targeting systems.",
            skill_groups={"Programming Languages":["Java","Python"],"Databases":["SQL"],"Messaging":["Kafka"],"DevOps":["Docker"],"APIs":["REST API"],"CS Fundamentals":["DSA","OOP"],"Tools":["Git"],"Preferred":["Spark","HBase","Aerospike","Kubernetes","Go"]}),
        "Data Scientist": _role(
            skills=["Python","Machine Learning","SQL","NumPy","Pandas","Scikit-learn","Git","Statistics"],
            preferred_skills=["PyTorch","TensorFlow","Spark","CTR Prediction","Feature Engineering"],
            package="14–26 LPA", location="Bangalore", difficulty="Medium",
            hiring_category="Startup", description="Global mobile advertising and consumer technology platform.",
            role_description="Build ML models for ad targeting and click-through rate prediction.",
            skill_groups={"ML / AI":["Machine Learning","Scikit-learn","CTR Prediction"],"Data":["NumPy","Pandas","Statistics","SQL"],"Programming Languages":["Python"],"Tools":["Git"],"Preferred":["PyTorch","TensorFlow","Spark","Feature Engineering"]}),
        "Data Engineer": _role(
            skills=["Python","SQL","Spark","Kafka","HBase","Git","Linux","Airflow"],
            preferred_skills=["Scala","Flink","Aerospike","AWS","dbt"],
            package="12–24 LPA", location="Bangalore", difficulty="Medium",
            hiring_category="Startup", description="Global mobile advertising and consumer technology platform.",
            role_description="Build real-time and batch pipelines for InMobi's adtech platform.",
            skill_groups={"Data Engineering":["Spark","Kafka","Airflow","HBase"],"Databases":["SQL"],"Programming Languages":["Python"],"OS":["Linux"],"Tools":["Git"],"Preferred":["Scala","Flink","Aerospike","AWS"]}),
        "Backend Engineer": _role(
            skills=["Java","Python","SQL","Kafka","Redis","Git","Docker","DSA","System Design"],
            preferred_skills=["Kubernetes","AWS","HBase","Aerospike","Go"],
            package="14–26 LPA", location="Bangalore", difficulty="Medium",
            hiring_category="Startup", description="Global mobile advertising and consumer technology platform.",
            role_description="Build high-throughput backend for InMobi's real-time bidding platform.",
            skill_groups={"Programming Languages":["Java","Python"],"Databases":["SQL"],"Caching & Messaging":["Kafka","Redis"],"DevOps":["Docker"],"CS Fundamentals":["DSA","System Design"],"Tools":["Git"],"Preferred":["Kubernetes","AWS","HBase","Aerospike","Go"]}),
        "Android Developer": _role(
            skills=["Kotlin","Java","Android SDK","Git","REST API","OOP","DSA"],
            preferred_skills=["Jetpack Compose","Coroutines","Glance","Firebase","AdMob"],
            package="12–22 LPA", location="Bangalore", difficulty="Medium",
            hiring_category="Startup", description="Global mobile advertising and consumer technology platform.",
            role_description="Build InMobi SDK and Glance lock-screen experiences.",
            skill_groups={"Mobile":["Kotlin","Java","Android SDK","Jetpack Compose","Coroutines"],"APIs":["REST API"],"CS Fundamentals":["OOP","DSA"],"Tools":["Git"],"Preferred":["Glance","Firebase","AdMob"]}),
    }
},

# 42. CHARGEBEE
"Chargebee": {
    "description": "Subscription billing and revenue management platform for SaaS companies.",
    "logo": "/logos/image.png", "locations": ["Chennai","Bangalore"],
    "package": "10–24 LPA", "difficulty": "Medium", "hiring_category": "Startup",
    "roles": {
        "Software Engineer": _role(
            skills=["Java","Ruby on Rails","Python","SQL","REST API","Git","OOP","DSA","PostgreSQL"],
            preferred_skills=["Kafka","Redis","Docker","AWS","TypeScript"],
            package="10–20 LPA", location="Chennai / Bangalore", difficulty="Medium",
            hiring_category="Startup", description="Subscription billing and revenue management platform for SaaS companies.",
            role_description="Build Chargebee's subscription billing engine and integrations.",
            skill_groups={"Programming Languages":["Java","Ruby on Rails","Python"],"Databases":["SQL","PostgreSQL"],"APIs":["REST API"],"CS Fundamentals":["OOP","DSA"],"Tools":["Git"],"Preferred":["Kafka","Redis","Docker","AWS"]}),
        "Full Stack Developer": _role(
            skills=["JavaScript","TypeScript","React","Java","SQL","REST API","Git","HTML","CSS","OOP"],
            preferred_skills=["Node.js","GraphQL","Docker","AWS","Redux"],
            package="10–20 LPA", location="Chennai / Bangalore", difficulty="Medium",
            hiring_category="Startup", description="Subscription billing and revenue management platform for SaaS companies.",
            role_description="Build Chargebee's self-service billing portal and merchant dashboard.",
            skill_groups={"Programming Languages":["JavaScript","TypeScript","Java"],"Frameworks":["React"],"Web":["HTML","CSS"],"Databases":["SQL"],"APIs":["REST API"],"CS Fundamentals":["OOP"],"Tools":["Git"],"Preferred":["Node.js","GraphQL","Docker","AWS"]}),
        "Backend Engineer": _role(
            skills=["Java","Python","SQL","REST API","Microservices","Kafka","Docker","Git","OOP","DSA"],
            preferred_skills=["Kubernetes","Redis","AWS","Spring Boot","gRPC"],
            package="12–22 LPA", location="Chennai", difficulty="Medium",
            hiring_category="Startup", description="Subscription billing and revenue management platform for SaaS companies.",
            role_description="Build scalable billing APIs and subscription management backend.",
            skill_groups={"Programming Languages":["Java","Python"],"APIs":["REST API","Microservices"],"Messaging":["Kafka"],"Databases":["SQL"],"DevOps":["Docker"],"CS Fundamentals":["OOP","DSA"],"Tools":["Git"],"Preferred":["Kubernetes","Redis","AWS","Spring Boot"]}),
        "Data Engineer": _role(
            skills=["Python","SQL","Spark","Airflow","Git","Linux","DBMS","REST API"],
            preferred_skills=["Kafka","dbt","Snowflake","AWS","Redshift"],
            package="10–20 LPA", location="Chennai", difficulty="Medium",
            hiring_category="Startup", description="Subscription billing and revenue management platform for SaaS companies.",
            role_description="Build data pipelines for Chargebee's billing analytics.",
            skill_groups={"Data Engineering":["Spark","Airflow","Kafka"],"Databases":["SQL","DBMS"],"Programming Languages":["Python"],"OS":["Linux"],"Tools":["Git"],"Preferred":["dbt","Snowflake","AWS","Redshift"]}),
        "QA Engineer": _role(
            skills=["Java","Selenium","Manual Testing","SQL","Git","REST API","JIRA","OOP"],
            preferred_skills=["TestNG","Cucumber","Postman","Python","CI/CD"],
            package="8–16 LPA", location="Chennai / Bangalore", difficulty="Medium",
            hiring_category="Startup", description="Subscription billing and revenue management platform for SaaS companies.",
            role_description="Ensure quality of Chargebee's billing and subscription features.",
            skill_groups={"Testing":["Manual Testing","Selenium","TestNG","Cucumber"],"Programming Languages":["Java"],"Databases":["SQL"],"APIs":["REST API"],"CS Fundamentals":["OOP"],"Tools":["Git","JIRA","Postman"],"Preferred":["Python","CI/CD"]}),
    }
},

# 43. UPSTOX
"Upstox": {
    "description": "Fast-growing discount brokerage platform backed by Tiger Global and Ratan Tata.",
    "logo": "/logos/image.png", "locations": ["Mumbai","Bangalore"],
    "package": "10–24 LPA", "difficulty": "Medium", "hiring_category": "Startup",
    "roles": {
        "Software Engineer": _role(
            skills=["Java","Go","Python","SQL","Kafka","Redis","Git","Docker","DSA","REST API"],
            preferred_skills=["Kubernetes","AWS","gRPC","PostgreSQL","Spring Boot"],
            package="12–22 LPA", location="Mumbai / Bangalore", difficulty="Medium",
            hiring_category="Startup", description="Fast-growing discount brokerage platform backed by Tiger Global.",
            role_description="Build trading and brokerage features for Upstox's 10M+ investors.",
            skill_groups={"Programming Languages":["Java","Go","Python"],"Databases":["SQL","PostgreSQL"],"Caching & Messaging":["Kafka","Redis"],"DevOps":["Docker"],"APIs":["REST API"],"CS Fundamentals":["DSA"],"Tools":["Git"],"Preferred":["Kubernetes","AWS","gRPC","Spring Boot"]}),
        "Backend Engineer": _role(
            skills=["Java","Go","Python","SQL","Kafka","Redis","Git","System Design","DSA","Linux"],
            preferred_skills=["Kubernetes","AWS","gRPC","ElasticSearch","MySQL"],
            package="14–24 LPA", location="Mumbai / Bangalore", difficulty="Medium",
            hiring_category="Startup", description="Fast-growing discount brokerage platform backed by Tiger Global.",
            role_description="Build low-latency systems for Upstox's order management engine.",
            skill_groups={"Programming Languages":["Java","Go","Python"],"Databases":["SQL","MySQL"],"Caching & Messaging":["Kafka","Redis"],"CS Fundamentals":["System Design","DSA"],"OS":["Linux"],"Tools":["Git"],"Preferred":["Kubernetes","AWS","gRPC","ElasticSearch"]}),
        "Android Developer": _role(
            skills=["Kotlin","Java","Android SDK","Git","REST API","OOP","DSA","Room DB"],
            preferred_skills=["Jetpack Compose","Coroutines","Retrofit","Hilt","Firebase"],
            package="10–20 LPA", location="Mumbai / Bangalore", difficulty="Medium",
            hiring_category="Startup", description="Fast-growing discount brokerage platform backed by Tiger Global.",
            role_description="Build the Upstox Android trading app for millions of investors.",
            skill_groups={"Mobile":["Kotlin","Java","Android SDK","Room DB","Jetpack Compose","Coroutines"],"APIs":["REST API"],"CS Fundamentals":["OOP","DSA"],"Tools":["Git"],"Preferred":["Retrofit","Hilt","Firebase"]}),
        "Data Analyst": _role(
            skills=["Python","SQL","Pandas","NumPy","Git","Linux","Excel","Statistics"],
            preferred_skills=["Tableau","Power BI","Spark","R","Metabase"],
            package="8–16 LPA", location="Mumbai / Bangalore", difficulty="Medium",
            hiring_category="Startup", description="Fast-growing discount brokerage platform backed by Tiger Global.",
            role_description="Analyse trading and investor data for Upstox product decisions.",
            skill_groups={"Data Analysis":["Pandas","NumPy","Excel","Statistics"],"Databases":["SQL"],"Programming Languages":["Python"],"OS":["Linux"],"Tools":["Git"],"Preferred":["Tableau","Power BI","Spark","R","Metabase"]}),
        "DevOps Engineer": _role(
            skills=["AWS","Docker","Kubernetes","Linux","Python","Terraform","CI/CD","Git","Bash"],
            preferred_skills=["Jenkins","Ansible","Prometheus","Grafana","Go"],
            package="10–20 LPA", location="Mumbai / Bangalore", difficulty="Medium",
            hiring_category="Startup", description="Fast-growing discount brokerage platform backed by Tiger Global.",
            role_description="Build and operate Upstox's cloud trading infrastructure.",
            skill_groups={"Cloud":["AWS"],"DevOps":["Docker","Kubernetes","Terraform","CI/CD","Ansible"],"OS & Scripting":["Linux","Bash","Python"],"Tools":["Git"],"Preferred":["Jenkins","Prometheus","Grafana","Go"]}),
    }
},

# 44. RAPIDO
"Rapido": {
    "description": "India's largest bike taxi and auto-rickshaw platform.",
    "logo": "/logos/image.png", "locations": ["Bangalore","Hyderabad"],
    "package": "8–20 LPA", "difficulty": "Medium", "hiring_category": "Startup",
    "roles": {
        "Software Engineer": _role(
            skills=["Python","Go","Java","SQL","Kafka","Redis","Git","Docker","DSA","REST API"],
            preferred_skills=["Kubernetes","AWS","MySQL","Microservices","gRPC"],
            package="10–20 LPA", location="Bangalore / Hyderabad", difficulty="Medium",
            hiring_category="Startup", description="India's largest bike taxi and auto-rickshaw platform.",
            role_description="Build real-time systems for Rapido's ride-hailing platform.",
            skill_groups={"Programming Languages":["Python","Go","Java"],"Databases":["SQL","MySQL"],"Caching & Messaging":["Kafka","Redis"],"DevOps":["Docker"],"APIs":["REST API"],"CS Fundamentals":["DSA"],"Tools":["Git"],"Preferred":["Kubernetes","AWS","Microservices","gRPC"]}),
        "Backend Engineer": _role(
            skills=["Python","Go","Java","SQL","Kafka","Redis","Git","System Design","DSA","Linux"],
            preferred_skills=["Kubernetes","AWS","MySQL","ElasticSearch","gRPC"],
            package="12–20 LPA", location="Bangalore", difficulty="Medium",
            hiring_category="Startup", description="India's largest bike taxi and auto-rickshaw platform.",
            role_description="Build location services, matching, and pricing backends.",
            skill_groups={"Programming Languages":["Python","Go","Java"],"Databases":["SQL","MySQL"],"Caching & Messaging":["Kafka","Redis"],"CS Fundamentals":["System Design","DSA"],"OS":["Linux"],"Tools":["Git"],"Preferred":["Kubernetes","AWS","ElasticSearch","gRPC"]}),
        "Machine Learning Engineer": _role(
            skills=["Python","Machine Learning","SQL","NumPy","Pandas","Scikit-learn","Git","Statistics"],
            preferred_skills=["PyTorch","Spark","XGBoost","AWS","Feature Engineering"],
            package="12–22 LPA", location="Bangalore", difficulty="Medium",
            hiring_category="Startup", description="India's largest bike taxi and auto-rickshaw platform.",
            role_description="Build ETA, surge pricing, and captain-rider matching ML models.",
            skill_groups={"ML / AI":["Machine Learning","Scikit-learn"],"Data":["NumPy","Pandas","Statistics","SQL"],"Programming Languages":["Python"],"Tools":["Git"],"Preferred":["PyTorch","Spark","XGBoost","AWS"]}),
        "Android Developer": _role(
            skills=["Kotlin","Java","Android SDK","Git","REST API","OOP","DSA"],
            preferred_skills=["Jetpack Compose","Coroutines","Google Maps SDK","Firebase","Retrofit"],
            package="10–18 LPA", location="Bangalore / Hyderabad", difficulty="Medium",
            hiring_category="Startup", description="India's largest bike taxi and auto-rickshaw platform.",
            role_description="Build the Rapido captain and rider Android apps.",
            skill_groups={"Mobile":["Kotlin","Java","Android SDK","Jetpack Compose","Coroutines"],"APIs":["REST API"],"CS Fundamentals":["OOP","DSA"],"Tools":["Git"],"Preferred":["Google Maps SDK","Firebase","Retrofit"]}),
        "Data Engineer": _role(
            skills=["Python","SQL","Spark","Kafka","Airflow","Git","Linux","DBMS"],
            preferred_skills=["Scala","dbt","AWS","Presto","MySQL"],
            package="10–18 LPA", location="Bangalore", difficulty="Medium",
            hiring_category="Startup", description="India's largest bike taxi and auto-rickshaw platform.",
            role_description="Build data pipelines for Rapido's ride analytics platform.",
            skill_groups={"Data Engineering":["Spark","Kafka","Airflow"],"Databases":["SQL","DBMS"],"Programming Languages":["Python"],"OS":["Linux"],"Tools":["Git"],"Preferred":["Scala","dbt","AWS","Presto"]}),
    }
},

# 45. DARWINBOX
"Darwinbox": {
    "description": "Asia's fastest-growing HR technology platform for 850+ global enterprises.",
    "logo": "/logos/image.png", "locations": ["Hyderabad","Bangalore","Delhi"],
    "package": "8–20 LPA", "difficulty": "Medium", "hiring_category": "Startup",
    "roles": {
        "Software Engineer": _role(
            skills=["Python","Java","JavaScript","React","SQL","Git","REST API","OOP","DSA"],
            preferred_skills=["Node.js","Docker","AWS","PostgreSQL","Redis"],
            package="10–20 LPA", location="Hyderabad / Bangalore", difficulty="Medium",
            hiring_category="Startup", description="Asia's fastest-growing HR technology platform.",
            role_description="Build scalable HRMS features for Darwinbox's enterprise clients.",
            skill_groups={"Programming Languages":["Python","Java","JavaScript"],"Frameworks":["React"],"Databases":["SQL","PostgreSQL"],"APIs":["REST API"],"CS Fundamentals":["OOP","DSA"],"Tools":["Git"],"Preferred":["Node.js","Docker","AWS","Redis"]}),
        "Full Stack Developer": _role(
            skills=["JavaScript","TypeScript","React","Java","SQL","REST API","Git","HTML","CSS","OOP"],
            preferred_skills=["Node.js","GraphQL","Docker","AWS","Angular"],
            package="10–20 LPA", location="Hyderabad / Bangalore", difficulty="Medium",
            hiring_category="Startup", description="Asia's fastest-growing HR technology platform.",
            role_description="Build Darwinbox's HRMS portal and employee self-service features.",
            skill_groups={"Programming Languages":["JavaScript","TypeScript","Java"],"Frameworks":["React"],"Web":["HTML","CSS"],"Databases":["SQL"],"APIs":["REST API"],"CS Fundamentals":["OOP"],"Tools":["Git"],"Preferred":["Node.js","GraphQL","Docker","AWS"]}),
        "Machine Learning Engineer": _role(
            skills=["Python","Machine Learning","NLP","SQL","NumPy","Pandas","Scikit-learn","Git"],
            preferred_skills=["PyTorch","TensorFlow","Transformers","AWS","Spark"],
            package="12–22 LPA", location="Hyderabad", difficulty="Medium",
            hiring_category="Startup", description="Asia's fastest-growing HR technology platform.",
            role_description="Build AI features for performance management and talent analytics.",
            skill_groups={"ML / AI":["Machine Learning","NLP","Scikit-learn"],"Data":["NumPy","Pandas","SQL"],"Tools":["Git"],"Preferred":["PyTorch","TensorFlow","Transformers","AWS","Spark"]}),
        "DevOps Engineer": _role(
            skills=["AWS","Docker","Kubernetes","Linux","Python","Terraform","CI/CD","Git","Bash"],
            preferred_skills=["Jenkins","Ansible","Prometheus","Grafana","Go"],
            package="10–18 LPA", location="Hyderabad / Bangalore", difficulty="Medium",
            hiring_category="Startup", description="Asia's fastest-growing HR technology platform.",
            role_description="Build and operate Darwinbox's multi-tenant SaaS infrastructure.",
            skill_groups={"Cloud":["AWS"],"DevOps":["Docker","Kubernetes","Terraform","CI/CD","Ansible"],"OS & Scripting":["Linux","Bash","Python"],"Tools":["Git"],"Preferred":["Jenkins","Prometheus","Grafana","Go"]}),
        "Data Analyst": _role(
            skills=["Python","SQL","Pandas","NumPy","Tableau","Git","Excel","DBMS"],
            preferred_skills=["Power BI","R","AWS","Spark","Metabase"],
            package="8–15 LPA", location="Hyderabad", difficulty="Medium",
            hiring_category="Startup", description="Asia's fastest-growing HR technology platform.",
            role_description="Analyse HR and workforce data for Darwinbox's product decisions.",
            skill_groups={"Data Analysis":["Pandas","NumPy","Excel"],"Databases":["SQL","DBMS"],"Visualisation":["Tableau","Power BI"],"Programming Languages":["Python"],"Tools":["Git"],"Preferred":["R","AWS","Spark","Metabase"]}),
    }
},

# 46. SHARECHAT
"ShareChat": {
    "description": "India's largest Indian-language social platform — Moj short video app.",
    "logo": "/logos/image.png", "locations": ["Bangalore"],
    "package": "14–30 LPA", "difficulty": "Medium", "hiring_category": "Startup",
    "roles": {
        "Software Engineer": _role(
            skills=["Python","Go","Java","SQL","Kafka","Redis","Git","Docker","DSA","REST API"],
            preferred_skills=["Kubernetes","AWS","Spark","ElasticSearch","Microservices"],
            package="15–28 LPA", location="Bangalore", difficulty="Medium",
            hiring_category="Startup", description="India's largest Indian-language social platform — Moj short video app.",
            role_description="Build social platform features serving 400M+ users.",
            skill_groups={"Programming Languages":["Python","Go","Java"],"Databases":["SQL"],"Caching & Messaging":["Kafka","Redis"],"DevOps":["Docker"],"APIs":["REST API"],"CS Fundamentals":["DSA"],"Tools":["Git"],"Preferred":["Kubernetes","AWS","Spark","ElasticSearch"]}),
        "Machine Learning Engineer": _role(
            skills=["Python","Machine Learning","Deep Learning","NLP","SQL","NumPy","Pandas","Git","Spark"],
            preferred_skills=["PyTorch","TensorFlow","Transformers","AWS","Kubernetes"],
            package="16–30 LPA", location="Bangalore", difficulty="Medium",
            hiring_category="Startup", description="India's largest Indian-language social platform — Moj short video app.",
            role_description="Build content recommendation and moderation ML models.",
            skill_groups={"ML / AI":["Machine Learning","Deep Learning","NLP"],"Data Engineering":["Spark"],"Data":["NumPy","Pandas","SQL"],"Tools":["Git"],"Preferred":["PyTorch","TensorFlow","Transformers","AWS","Kubernetes"]}),
        "Data Engineer": _role(
            skills=["Python","SQL","Spark","Kafka","Airflow","Git","Linux","DBMS"],
            preferred_skills=["Scala","dbt","AWS","Presto","Delta Lake"],
            package="14–26 LPA", location="Bangalore", difficulty="Medium",
            hiring_category="Startup", description="India's largest Indian-language social platform — Moj short video app.",
            role_description="Build data pipelines for ShareChat's content analytics.",
            skill_groups={"Data Engineering":["Spark","Kafka","Airflow"],"Databases":["SQL","DBMS"],"Programming Languages":["Python"],"OS":["Linux"],"Tools":["Git"],"Preferred":["Scala","dbt","AWS","Presto","Delta Lake"]}),
        "Android Developer": _role(
            skills=["Kotlin","Java","Android SDK","Git","REST API","OOP","DSA","Room DB"],
            preferred_skills=["Jetpack Compose","Coroutines","ExoPlayer","Firebase","CameraX"],
            package="14–26 LPA", location="Bangalore", difficulty="Medium",
            hiring_category="Startup", description="India's largest Indian-language social platform — Moj short video app.",
            role_description="Build the ShareChat and Moj Android apps.",
            skill_groups={"Mobile":["Kotlin","Java","Android SDK","Room DB","Jetpack Compose","Coroutines"],"APIs":["REST API"],"CS Fundamentals":["OOP","DSA"],"Tools":["Git"],"Preferred":["ExoPlayer","Firebase","CameraX"]}),
        "NLP Engineer": _role(
            skills=["Python","NLP","Deep Learning","PyTorch","Transformers","Git","NumPy","SQL"],
            preferred_skills=["Indic NLP","BERT","XLM-R","Spark","AWS"],
            package="16–30 LPA", location="Bangalore", difficulty="Medium",
            hiring_category="Startup", description="India's largest Indian-language social platform — Moj short video app.",
            role_description="Build multilingual NLP models for 15+ Indian language content.",
            skill_groups={"ML / AI":["NLP","Deep Learning","PyTorch","Transformers"],"Data":["NumPy","SQL"],"Programming Languages":["Python"],"Tools":["Git"],"Preferred":["Indic NLP","BERT","XLM-R","Spark","AWS"]}),
    }
},

# 47. JUSPAY
"Juspay": {
    "description": "B2B payments infrastructure startup powering 100M+ transactions/month.",
    "logo": "/logos/image.png", "locations": ["Bangalore"],
    "package": "10–24 LPA", "difficulty": "Medium", "hiring_category": "Startup",
    "roles": {
        "Software Engineer": _role(
            skills=["Haskell","PureScript","Java","Python","SQL","Git","OOP","DSA","REST API"],
            preferred_skills=["Rust","PostgreSQL","Kafka","AWS","Functional Programming"],
            package="12–22 LPA", location="Bangalore", difficulty="Medium",
            hiring_category="Startup", description="B2B payments infrastructure startup powering 100M+ transactions/month.",
            role_description="Build payment orchestration systems using functional programming.",
            skill_groups={"Programming Languages":["Haskell","PureScript","Java","Python"],"Databases":["SQL","PostgreSQL"],"APIs":["REST API"],"CS Fundamentals":["OOP","DSA","Functional Programming"],"Tools":["Git"],"Preferred":["Rust","Kafka","AWS"]}),
        "Backend Engineer": _role(
            skills=["Haskell","PureScript","Java","PostgreSQL","Kafka","Git","System Design","DSA","Linux"],
            preferred_skills=["Rust","gRPC","AWS","Temporal","Kubernetes"],
            package="14–24 LPA", location="Bangalore", difficulty="Medium",
            hiring_category="Startup", description="B2B payments infrastructure startup powering 100M+ transactions/month.",
            role_description="Architect Juspay's payment gateway and Hyperswitch orchestration layer.",
            skill_groups={"Programming Languages":["Haskell","PureScript","Java"],"Databases":["PostgreSQL"],"Messaging":["Kafka"],"CS Fundamentals":["System Design","DSA"],"OS":["Linux"],"Tools":["Git"],"Preferred":["Rust","gRPC","AWS","Temporal","Kubernetes"]}),
        "Full Stack Developer": _role(
            skills=["JavaScript","TypeScript","React","Node.js","SQL","Git","REST API","HTML","CSS"],
            preferred_skills=["GraphQL","Next.js","Docker","AWS","Redux"],
            package="10–20 LPA", location="Bangalore", difficulty="Medium",
            hiring_category="Startup", description="B2B payments infrastructure startup powering 100M+ transactions/month.",
            role_description="Build Juspay's merchant dashboard and payment UX.",
            skill_groups={"Programming Languages":["JavaScript","TypeScript","Node.js"],"Frameworks":["React"],"Web":["HTML","CSS"],"Databases":["SQL"],"APIs":["REST API"],"Tools":["Git"],"Preferred":["GraphQL","Next.js","Docker","AWS"]}),
        "DevOps Engineer": _role(
            skills=["AWS","Docker","Kubernetes","Linux","Python","Terraform","CI/CD","Git","Bash"],
            preferred_skills=["Ansible","Prometheus","Grafana","Jenkins","Go"],
            package="12–22 LPA", location="Bangalore", difficulty="Medium",
            hiring_category="Startup", description="B2B payments infrastructure startup powering 100M+ transactions/month.",
            role_description="Maintain 99.99% uptime for Juspay's payment infrastructure.",
            skill_groups={"Cloud":["AWS"],"DevOps":["Docker","Kubernetes","Terraform","CI/CD","Ansible"],"OS & Scripting":["Linux","Bash","Python"],"Tools":["Git"],"Preferred":["Prometheus","Grafana","Jenkins","Go"]}),
        "Data Engineer": _role(
            skills=["Python","SQL","Spark","Kafka","Airflow","AWS","Git","Linux"],
            preferred_skills=["Scala","dbt","Presto","Redshift","PostgreSQL"],
            package="10–20 LPA", location="Bangalore", difficulty="Medium",
            hiring_category="Startup", description="B2B payments infrastructure startup powering 100M+ transactions/month.",
            role_description="Build data pipelines for Juspay's transaction analytics.",
            skill_groups={"Data Engineering":["Spark","Kafka","Airflow"],"Cloud":["AWS"],"Databases":["SQL","PostgreSQL"],"Programming Languages":["Python"],"OS":["Linux"],"Tools":["Git"],"Preferred":["Scala","dbt","Presto","Redshift"]}),
    }
},

# 48. ATHER ENERGY
"Ather Energy": {
    "description": "India's leading electric two-wheeler company — Ather 450X and Ather Grid.",
    "logo": "/logos/image.png", "locations": ["Bangalore","Chennai"],
    "package": "8–22 LPA", "difficulty": "Medium", "hiring_category": "Startup",
    "roles": {
        "Embedded Software Engineer": _role(
            skills=["C","C++","Python","Embedded Linux","RTOS","Git","Computer Architecture","Debugging","CAN Protocol"],
            preferred_skills=["CMake","Yocto","JTAG","OTA Updates","Bluetooth"],
            package="10–20 LPA", location="Bangalore / Chennai", difficulty="Medium",
            hiring_category="Startup", description="India's leading electric two-wheeler company.",
            role_description="Build firmware for Ather's vehicle control units and EV platform.",
            skill_groups={"Programming Languages":["C","C++","Python"],"Embedded":["Embedded Linux","RTOS","CAN Protocol","Computer Architecture","Debugging"],"Tools":["Git","CMake","JTAG"],"Preferred":["Yocto","OTA Updates","Bluetooth"]}),
        "Cloud Engineer": _role(
            skills=["AWS","Python","Docker","Linux","Git","IoT","SQL","Terraform"],
            preferred_skills=["Kubernetes","MQTT","AWS IoT","Ansible","Grafana"],
            package="10–20 LPA", location="Bangalore", difficulty="Medium",
            hiring_category="Startup", description="India's leading electric two-wheeler company.",
            role_description="Build Ather's connected vehicle cloud platform and data infrastructure.",
            skill_groups={"Cloud":["AWS"],"IoT":["IoT","MQTT","AWS IoT"],"DevOps":["Docker","Terraform","Kubernetes","Ansible"],"Programming Languages":["Python"],"OS":["Linux"],"Databases":["SQL"],"Tools":["Git"],"Preferred":["Grafana"]}),
        "Data Engineer": _role(
            skills=["Python","SQL","Spark","Kafka","Airflow","AWS","Git","Linux"],
            preferred_skills=["Scala","dbt","Presto","IoT Data","Snowflake"],
            package="10–20 LPA", location="Bangalore", difficulty="Medium",
            hiring_category="Startup", description="India's leading electric two-wheeler company.",
            role_description="Build vehicle telemetry data pipelines for Ather's analytics.",
            skill_groups={"Data Engineering":["Spark","Kafka","Airflow"],"Cloud":["AWS"],"Databases":["SQL"],"Programming Languages":["Python"],"OS":["Linux"],"Tools":["Git"],"Preferred":["Scala","dbt","IoT Data","Snowflake"]}),
        "Android Developer": _role(
            skills=["Kotlin","Java","Android SDK","Git","REST API","OOP","DSA","Bluetooth"],
            preferred_skills=["Jetpack Compose","Coroutines","BLE","Firebase","Automotive"],
            package="10–18 LPA", location="Bangalore / Chennai", difficulty="Medium",
            hiring_category="Startup", description="India's leading electric two-wheeler company.",
            role_description="Build the Ather app connecting riders to their electric scooter.",
            skill_groups={"Mobile":["Kotlin","Java","Android SDK","Jetpack Compose","Coroutines","Bluetooth"],"APIs":["REST API"],"CS Fundamentals":["OOP","DSA"],"Tools":["Git"],"Preferred":["BLE","Firebase","Automotive"]}),
        "Machine Learning Engineer": _role(
            skills=["Python","Machine Learning","SQL","NumPy","Pandas","Scikit-learn","Git","Statistics"],
            preferred_skills=["PyTorch","Time Series Analysis","Spark","AWS","Anomaly Detection"],
            package="12–22 LPA", location="Bangalore", difficulty="Medium",
            hiring_category="Startup", description="India's leading electric two-wheeler company.",
            role_description="Build predictive maintenance and battery analytics ML models.",
            skill_groups={"ML / AI":["Machine Learning","Scikit-learn","Time Series Analysis","Anomaly Detection"],"Data":["NumPy","Pandas","Statistics","SQL"],"Tools":["Git"],"Preferred":["PyTorch","Spark","AWS"]}),
    }
},

# 49. MINDTICKLE
"Mindtickle": {
    "description": "AI-powered sales readiness and enablement platform.",
    "logo": "/logos/image.png", "locations": ["Pune","Bangalore"],
    "package": "8–22 LPA", "difficulty": "Medium", "hiring_category": "Startup",
    "roles": {
        "Software Engineer": _role(
            skills=["Java","Python","JavaScript","React","SQL","Git","REST API","OOP","DSA"],
            preferred_skills=["Node.js","Docker","AWS","PostgreSQL","Redis"],
            package="10–20 LPA", location="Pune / Bangalore", difficulty="Medium",
            hiring_category="Startup", description="AI-powered sales readiness and enablement platform.",
            role_description="Build scalable SaaS features for Mindtickle's sales platform.",
            skill_groups={"Programming Languages":["Java","Python","JavaScript"],"Frameworks":["React"],"Databases":["SQL","PostgreSQL"],"APIs":["REST API"],"CS Fundamentals":["OOP","DSA"],"Tools":["Git"],"Preferred":["Node.js","Docker","AWS","Redis"]}),
        "Full Stack Developer": _role(
            skills=["JavaScript","TypeScript","React","Java","SQL","REST API","Git","HTML","CSS","OOP"],
            preferred_skills=["Node.js","GraphQL","Docker","AWS","Redux"],
            package="10–20 LPA", location="Pune / Bangalore", difficulty="Medium",
            hiring_category="Startup", description="AI-powered sales readiness and enablement platform.",
            role_description="Build Mindtickle's learning portal and coaching UI.",
            skill_groups={"Programming Languages":["JavaScript","TypeScript","Java"],"Frameworks":["React"],"Web":["HTML","CSS"],"Databases":["SQL"],"APIs":["REST API"],"CS Fundamentals":["OOP"],"Tools":["Git"],"Preferred":["Node.js","GraphQL","Docker","AWS"]}),
        "Machine Learning Engineer": _role(
            skills=["Python","Machine Learning","NLP","SQL","NumPy","Pandas","Scikit-learn","Git"],
            preferred_skills=["PyTorch","TensorFlow","Transformers","Speech Recognition","AWS"],
            package="12–22 LPA", location="Pune / Bangalore", difficulty="Medium",
            hiring_category="Startup", description="AI-powered sales readiness and enablement platform.",
            role_description="Build NLP and AI coaching models for Mindtickle's platform.",
            skill_groups={"ML / AI":["Machine Learning","NLP","Scikit-learn","Speech Recognition"],"Data":["NumPy","Pandas","SQL"],"Tools":["Git"],"Preferred":["PyTorch","TensorFlow","Transformers","AWS"]}),
        "DevOps Engineer": _role(
            skills=["AWS","Docker","Kubernetes","Linux","Python","Terraform","CI/CD","Git","Bash"],
            preferred_skills=["Jenkins","Ansible","Prometheus","Grafana","Go"],
            package="10–18 LPA", location="Pune / Bangalore", difficulty="Medium",
            hiring_category="Startup", description="AI-powered sales readiness and enablement platform.",
            role_description="Build and operate Mindtickle's cloud SaaS infrastructure.",
            skill_groups={"Cloud":["AWS"],"DevOps":["Docker","Kubernetes","Terraform","CI/CD","Ansible"],"OS & Scripting":["Linux","Bash","Python"],"Tools":["Git"],"Preferred":["Jenkins","Prometheus","Grafana","Go"]}),
        "Data Analyst": _role(
            skills=["Python","SQL","Pandas","NumPy","Tableau","Git","Excel","DBMS"],
            preferred_skills=["Power BI","R","AWS","Spark","Metabase"],
            package="8–15 LPA", location="Pune / Bangalore", difficulty="Medium",
            hiring_category="Startup", description="AI-powered sales readiness and enablement platform.",
            role_description="Analyse sales enablement data for Mindtickle's product decisions.",
            skill_groups={"Data Analysis":["Pandas","NumPy","Excel"],"Databases":["SQL","DBMS"],"Visualisation":["Tableau","Power BI"],"Programming Languages":["Python"],"Tools":["Git"],"Preferred":["R","AWS","Spark","Metabase"]}),
    }
},

# 50. NINJACART
"Ninjacart": {
    "description": "India's largest fresh produce B2B supply chain startup — backed by Walmart.",
    "logo": "/logos/image.png", "locations": ["Bangalore","Chennai"],
    "package": "8–20 LPA", "difficulty": "Medium", "hiring_category": "Startup",
    "roles": {
        "Software Engineer": _role(
            skills=["Python","Java","Go","SQL","Kafka","Redis","Git","Docker","DSA","REST API"],
            preferred_skills=["Kubernetes","AWS","MySQL","Microservices","ElasticSearch"],
            package="10–18 LPA", location="Bangalore / Chennai", difficulty="Medium",
            hiring_category="Startup", description="India's largest fresh produce B2B supply chain startup.",
            role_description="Build supply chain and logistics software for Ninjacart's platform.",
            skill_groups={"Programming Languages":["Python","Java","Go"],"Databases":["SQL","MySQL"],"Caching & Messaging":["Kafka","Redis"],"DevOps":["Docker"],"APIs":["REST API"],"CS Fundamentals":["DSA"],"Tools":["Git"],"Preferred":["Kubernetes","AWS","Microservices","ElasticSearch"]}),
        "Backend Engineer": _role(
            skills=["Python","Java","Go","SQL","Kafka","Redis","Git","System Design","DSA","Linux"],
            preferred_skills=["Kubernetes","AWS","MySQL","gRPC","ElasticSearch"],
            package="12–20 LPA", location="Bangalore", difficulty="Medium",
            hiring_category="Startup", description="India's largest fresh produce B2B supply chain startup.",
            role_description="Build order management and routing backend for Ninjacart.",
            skill_groups={"Programming Languages":["Python","Java","Go"],"Databases":["SQL","MySQL"],"Caching & Messaging":["Kafka","Redis"],"CS Fundamentals":["System Design","DSA"],"OS":["Linux"],"Tools":["Git"],"Preferred":["Kubernetes","AWS","gRPC","ElasticSearch"]}),
        "Machine Learning Engineer": _role(
            skills=["Python","Machine Learning","SQL","NumPy","Pandas","Scikit-learn","Git","Statistics"],
            preferred_skills=["PyTorch","Spark","XGBoost","AWS","Time Series Analysis"],
            package="12–20 LPA", location="Bangalore", difficulty="Medium",
            hiring_category="Startup", description="India's largest fresh produce B2B supply chain startup.",
            role_description="Build demand forecasting and route optimisation ML models.",
            skill_groups={"ML / AI":["Machine Learning","Scikit-learn","Time Series Analysis"],"Data":["NumPy","Pandas","Statistics","SQL"],"Tools":["Git"],"Preferred":["PyTorch","Spark","XGBoost","AWS"]}),
        "Data Engineer": _role(
            skills=["Python","SQL","Spark","Kafka","Airflow","Git","Linux","DBMS"],
            preferred_skills=["Scala","dbt","AWS","Presto","MySQL"],
            package="10–18 LPA", location="Bangalore / Chennai", difficulty="Medium",
            hiring_category="Startup", description="India's largest fresh produce B2B supply chain startup.",
            role_description="Build data pipelines for Ninjacart's supply chain analytics.",
            skill_groups={"Data Engineering":["Spark","Kafka","Airflow"],"Databases":["SQL","DBMS"],"Programming Languages":["Python"],"OS":["Linux"],"Tools":["Git"],"Preferred":["Scala","dbt","AWS","Presto"]}),
        "Android Developer": _role(
            skills=["Kotlin","Java","Android SDK","Git","REST API","OOP","DSA"],
            preferred_skills=["Jetpack Compose","Coroutines","Google Maps SDK","Firebase","Retrofit"],
            package="10–18 LPA", location="Bangalore / Chennai", difficulty="Medium",
            hiring_category="Startup", description="India's largest fresh produce B2B supply chain startup.",
            role_description="Build the Ninjacart delivery partner and vendor Android apps.",
            skill_groups={"Mobile":["Kotlin","Java","Android SDK","Jetpack Compose","Coroutines"],"APIs":["REST API"],"CS Fundamentals":["OOP","DSA"],"Tools":["Git"],"Preferred":["Google Maps SDK","Firebase","Retrofit"]}),
    }
},

# 51. PORTER
"Porter": {
    "description": "India's largest intra-city logistics platform for B2B freight.",
    "logo": "/logos/image.png", "locations": ["Bangalore","Mumbai","Delhi"],
    "package": "8–18 LPA", "difficulty": "Medium", "hiring_category": "Startup",
    "roles": {
        "Software Engineer": _role(
            skills=["Python","Node.js","Java","SQL","Redis","Kafka","Git","Docker","DSA","REST API"],
            preferred_skills=["Kubernetes","AWS","MySQL","Microservices","ElasticSearch"],
            package="10–18 LPA", location="Bangalore / Mumbai", difficulty="Medium",
            hiring_category="Startup", description="India's largest intra-city logistics platform for B2B freight.",
            role_description="Build logistics and vehicle routing systems for Porter's platform.",
            skill_groups={"Programming Languages":["Python","Node.js","Java"],"Databases":["SQL","MySQL"],"Caching & Messaging":["Kafka","Redis"],"DevOps":["Docker"],"APIs":["REST API"],"CS Fundamentals":["DSA"],"Tools":["Git"],"Preferred":["Kubernetes","AWS","Microservices","ElasticSearch"]}),
        "Backend Engineer": _role(
            skills=["Python","Node.js","Java","SQL","Kafka","Redis","Git","System Design","DSA","Linux"],
            preferred_skills=["Kubernetes","AWS","MySQL","gRPC","ElasticSearch"],
            package="12–18 LPA", location="Bangalore", difficulty="Medium",
            hiring_category="Startup", description="India's largest intra-city logistics platform for B2B freight.",
            role_description="Build order allocation and dynamic pricing backend for Porter.",
            skill_groups={"Programming Languages":["Python","Node.js","Java"],"Databases":["SQL","MySQL"],"Caching & Messaging":["Kafka","Redis"],"CS Fundamentals":["System Design","DSA"],"OS":["Linux"],"Tools":["Git"],"Preferred":["Kubernetes","AWS","gRPC","ElasticSearch"]}),
        "Data Analyst": _role(
            skills=["Python","SQL","Pandas","NumPy","Tableau","Git","Excel","DBMS"],
            preferred_skills=["Power BI","R","AWS","Spark","Metabase"],
            package="8–15 LPA", location="Bangalore / Mumbai", difficulty="Medium",
            hiring_category="Startup", description="India's largest intra-city logistics platform for B2B freight.",
            role_description="Analyse logistics and freight data for Porter's operations.",
            skill_groups={"Data Analysis":["Pandas","NumPy","Excel"],"Databases":["SQL","DBMS"],"Visualisation":["Tableau","Power BI"],"Programming Languages":["Python"],"Tools":["Git"],"Preferred":["R","AWS","Spark","Metabase"]}),
        "Machine Learning Engineer": _role(
            skills=["Python","Machine Learning","SQL","NumPy","Pandas","Scikit-learn","Git","Statistics"],
            preferred_skills=["PyTorch","XGBoost","Spark","AWS","Routing Algorithms"],
            package="12–18 LPA", location="Bangalore", difficulty="Medium",
            hiring_category="Startup", description="India's largest intra-city logistics platform for B2B freight.",
            role_description="Build vehicle routing, demand forecasting, and pricing ML models.",
            skill_groups={"ML / AI":["Machine Learning","Scikit-learn"],"Data":["NumPy","Pandas","Statistics","SQL"],"Tools":["Git"],"Preferred":["PyTorch","XGBoost","Spark","AWS","Routing Algorithms"]}),
        "Android Developer": _role(
            skills=["Kotlin","Java","Android SDK","Git","REST API","OOP","DSA"],
            preferred_skills=["Jetpack Compose","Coroutines","Google Maps SDK","Firebase","Retrofit"],
            package="10–18 LPA", location="Bangalore / Mumbai / Delhi", difficulty="Medium",
            hiring_category="Startup", description="India's largest intra-city logistics platform for B2B freight.",
            role_description="Build the Porter captain and customer booking Android apps.",
            skill_groups={"Mobile":["Kotlin","Java","Android SDK","Jetpack Compose","Coroutines"],"APIs":["REST API"],"CS Fundamentals":["OOP","DSA"],"Tools":["Git"],"Preferred":["Google Maps SDK","Firebase","Retrofit"]}),
    }
},

# 52. COFORGE
"Coforge": {
    "description": "IT services company with expertise in travel, BFSI, and insurance sectors.",
    "logo": "/logos/image.png", "locations": ["Noida","Hyderabad","Bangalore","Chennai"],
    "package": "4–9 LPA", "difficulty": "Easy", "hiring_category": "Service",
    "roles": {
        "Software Engineer": _role(
            skills=["Java","Python","SQL","REST API","Git","OOP","DBMS","HTML","CSS"],
            preferred_skills=["Spring Boot","React","Docker","AWS","Microservices"],
            package="4–8 LPA", location="Pan-India", difficulty="Easy",
            hiring_category="Service", description="IT services company with expertise in travel, BFSI, and insurance sectors.",
            role_description="Build enterprise software for Coforge's travel and banking clients.",
            skill_groups={"Programming Languages":["Java","Python"],"Web":["HTML","CSS"],"Databases":["SQL","DBMS"],"APIs":["REST API"],"CS Fundamentals":["OOP"],"Tools":["Git"],"Preferred":["Spring Boot","React","Docker","AWS"]}),
        "Cloud Developer": _role(
            skills=["AWS","Python","Docker","Linux","Git","SQL","REST API","Terraform"],
            preferred_skills=["Azure","Kubernetes","Ansible","Jenkins","GCP"],
            package="6–11 LPA", location="Noida / Hyderabad / Bangalore", difficulty="Medium",
            hiring_category="Service", description="IT services company with expertise in travel, BFSI, and insurance sectors.",
            role_description="Build and manage cloud-native applications for Coforge clients.",
            skill_groups={"Cloud":["AWS"],"DevOps":["Docker","Terraform","Kubernetes","Ansible"],"Programming Languages":["Python"],"OS":["Linux"],"Databases":["SQL"],"APIs":["REST API"],"Tools":["Git"],"Preferred":["Azure","Jenkins","GCP"]}),
        "QA Engineer": _role(
            skills=["Java","Selenium","Manual Testing","SQL","Git","REST API","JIRA","OOP"],
            preferred_skills=["Cucumber","TestNG","Postman","Python","CI/CD"],
            package="4–8 LPA", location="Pan-India", difficulty="Easy",
            hiring_category="Service", description="IT services company with expertise in travel, BFSI, and insurance sectors.",
            role_description="Test travel and BFSI enterprise applications for Coforge clients.",
            skill_groups={"Testing":["Manual Testing","Selenium","TestNG","Cucumber"],"Programming Languages":["Java"],"Databases":["SQL"],"APIs":["REST API"],"CS Fundamentals":["OOP"],"Tools":["Git","JIRA","Postman"],"Preferred":["Python","CI/CD"]}),
        "Data Analyst": _role(
            skills=["Python","SQL","Pandas","Excel","Tableau","Git","DBMS","NumPy"],
            preferred_skills=["Power BI","R","AWS","Spark","Data Warehousing"],
            package="4–8 LPA", location="Pan-India", difficulty="Easy",
            hiring_category="Service", description="IT services company with expertise in travel, BFSI, and insurance sectors.",
            role_description="Analyse travel and insurance domain data for Coforge clients.",
            skill_groups={"Data Analysis":["Pandas","NumPy","Excel"],"Databases":["SQL","DBMS"],"Visualisation":["Tableau","Power BI"],"Programming Languages":["Python"],"Tools":["Git"],"Preferred":["R","AWS","Spark","Data Warehousing"]}),
        "Full Stack Developer": _role(
            skills=["JavaScript","React","Java","SQL","Spring Boot","REST API","Git","HTML","CSS","OOP"],
            preferred_skills=["Angular","TypeScript","Docker","AWS","Node.js"],
            package="5–9 LPA", location="Pan-India", difficulty="Easy",
            hiring_category="Service", description="IT services company with expertise in travel, BFSI, and insurance sectors.",
            role_description="Build full-stack enterprise applications for Coforge clients.",
            skill_groups={"Programming Languages":["JavaScript","Java"],"Frameworks":["React","Spring Boot"],"Web":["HTML","CSS"],"Databases":["SQL"],"APIs":["REST API"],"CS Fundamentals":["OOP"],"Tools":["Git"],"Preferred":["Angular","TypeScript","Docker","AWS"]}),
    }
},

} # ← closes COMPANIES

# ─────────────────────────────────────────────────────────────────────────────
# Helper functions (backward-compatible with all existing callers)
# ─────────────────────────────────────────────────────────────────────────────

def _match_company(company: str):
    """Return canonical company name (case-insensitive) or None."""
    needle = company.strip().lower()
    for key in COMPANIES:
        if key.strip().lower() == needle:
            return key
    return None


def _match_role(roles: dict, role: str):
    """Return canonical role key (case-insensitive) or None."""
    needle = role.strip().lower()
    for key in roles:
        if key.strip().lower() == needle:
            return key
    return None


def get_company_names() -> list:
    return sorted(COMPANIES.keys())


def get_roles_for_company(company: str) -> list:
    matched = _match_company(company)
    if not matched:
        return []
    entry = COMPANIES[matched]
    roles = entry.get("roles", entry)
    return sorted(roles.keys())


def get_role_data(company: str, role: str) -> dict:
    matched_company = _match_company(company)
    if not matched_company:
        print(f"[get_role_data] Company '{company}' not found.")
        print(f"[get_role_data] Available companies: {sorted(COMPANIES.keys())}")
        return {}
    entry = COMPANIES[matched_company]
    roles = entry.get("roles", entry)
    matched_role = _match_role(roles, role)
    if not matched_role:
        available = sorted(roles.keys())
        print(f"[get_role_data] Role '{role}' not found for '{matched_company}'.")
        print(f"[get_role_data] Available roles: {available}")
        return {
            "_error": "role_not_found",
            "_company": matched_company,
            "_role_requested": role,
            "_available_roles": available,
        }
    return roles[matched_role]


def get_required_skills(company: str, role: str) -> list:
    role_data = get_role_data(company, role)
    if role_data.get("_error"):
        return []
    if isinstance(role_data, list):
        return role_data
    return role_data.get("skills", [])


def get_company_meta(company: str) -> dict:
    matched = _match_company(company)
    if not matched:
        return {
            "name": company, "description": "", "logo": "/logos/image.png",
            "locations": [], "package": "", "difficulty": "Medium",
            "hiring_category": "", "roles": [],
        }
    entry = COMPANIES[matched]
    return {
        "name":             matched,
        "description":      entry.get("description", ""),
        "logo":             entry.get("logo", "/logos/image.png"),
        "locations":        entry.get("locations", []),
        "package":          entry.get("package", ""),
        "difficulty":       entry.get("difficulty", "Medium"),
        "hiring_category":  entry.get("hiring_category", ""),
        "roles":            get_roles_for_company(matched),
    }


def get_all_companies_meta() -> list:
    return [get_company_meta(name) for name in sorted(COMPANIES.keys())]
