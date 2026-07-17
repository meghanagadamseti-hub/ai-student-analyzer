const companies = [
  {
    id: 1,
    name: "Google",
    logo: "/logos/google.png",
    role: "Software Engineer",
    location: "Bangalore",
    package: "₹18 - ₹30 LPA",
    website: "https://careers.google.com",
    hiring: true,
    description:
      "Google develops search, cloud, AI, Android, and productivity products used by billions.",
    skills: [
      "React",
      "Node.js",
      "Python",
      "SQL",
      "Git",
      "Docker",
      "AWS",
      "DSA",
    ],
  },

  {
    id: 2,
    name: "Microsoft",
    logo: "/logos/microsoft.png",
    role: "Software Engineer",
    location: "Hyderabad",
    package: "₹16 - ₹28 LPA",
    website: "https://careers.microsoft.com",
    hiring: true,
    description:
      "Microsoft builds Windows, Azure Cloud, AI services, Office, and enterprise software.",
    skills: [
      "C#",
      "React",
      "Azure",
      "SQL",
      "Git",
      "DSA",
    ],
  },

  {
    id: 3,
    name: "Amazon",
    logo: "/logos/amazon.png",
    role: "SDE I",
    location: "Hyderabad",
    package: "₹15 - ₹28 LPA",
    website: "https://www.amazon.jobs",
    hiring: true,
    description:
      "Amazon builds e-commerce, AWS cloud, Alexa, logistics, and AI-powered services.",
    skills: [
      "Java",
      "AWS",
      "SQL",
      "OOP",
      "DSA",
    ],
  },

  {
    id: 4,
    name: "Adobe",
    logo: "/logos/adobe.png",
    role: "Frontend Developer",
    location: "Noida",
    package: "₹14 - ₹24 LPA",
    website: "https://careers.adobe.com",
    hiring: true,
    description:
      "Adobe creates Photoshop, Illustrator, Acrobat, Creative Cloud, and AI-powered design tools.",
    skills: [
      "React",
      "JavaScript",
      "CSS",
      "Git",
    ],
  },

  {
    id: 5,
    name: "Apple",
    logo: "/logos/apple.png",
    role: "Software Engineer",
    location: "Bangalore",
    package: "₹25 - ₹45 LPA",
    website: "https://jobs.apple.com",
    hiring: true,
    description:
      "Apple develops innovative hardware, software, cloud services, and AI experiences.",
    skills: [
      "Swift",
      "Python",
      "React",
      "Git",
      "DSA",
    ],
  },

  {
    id: 6,
    name: "Meta",
    logo: "/logos/meta.png",
    role: "Software Engineer",
    location: "Hyderabad",
    package: "₹30 - ₹60 LPA",
    website: "https://www.metacareers.com",
    hiring: true,
    description:
      "Meta develops Facebook, Instagram, WhatsApp, Reality Labs, and AI products.",
    skills: [
      "React",
      "GraphQL",
      "Python",
      "System Design",
      "DSA",
    ],
  },

  {
    id: 7,
    name: "Netflix",
    logo: "/logos/netflix.png",
    role: "Backend Engineer",
    location: "Remote",
    package: "₹35 - ₹70 LPA",
    website: "https://jobs.netflix.com",
    hiring: true,
    description:
      "Netflix builds high-performance streaming systems and cloud infrastructure.",
    skills: [
      "Java",
      "Spring Boot",
      "AWS",
      "Kafka",
      "Microservices",
    ],
  },

  {
    id: 8,
    name: "Oracle",
    logo: "/logos/oracle.png",
    role: "Software Engineer",
    location: "Bangalore",
    package: "₹14 - ₹26 LPA",
    website: "https://careers.oracle.com",
    hiring: true,
    description:
      "Oracle develops enterprise databases, cloud infrastructure, and ERP software.",
    skills: [
      "Java",
      "SQL",
      "Oracle DB",
      "Linux",
      "Git",
    ],
  },

  {
    id: 9,
    name: "IBM",
    logo: "/logos/ibm.png",
    role: "Application Developer",
    location: "Bangalore",
    package: "₹8 - ₹18 LPA",
    website: "https://careers.ibm.com",
    hiring: true,
    description:
      "IBM focuses on enterprise AI, consulting, hybrid cloud, and business software.",
    skills: [
      "Java",
      "Python",
      "Cloud",
      "SQL",
      "Git",
    ],
  },

  {
    id: 10,
    name: "Intel",
    logo: "/logos/intel.png",
    role: "Software Engineer",
    location: "Bangalore",
    package: "₹15 - ₹25 LPA",
    website: "https://jobs.intel.com",
    hiring: true,
    description:
      "Intel develops processors, AI chips, embedded systems, and developer tools.",
    skills: [
      "C++",
      "Python",
      "Linux",
      "Embedded Systems",
      "DSA",
    ],
  },

  {
    id: 11,
    name: "NVIDIA",
    logo: "/logos/nvidia.png",
    role: "AI Software Engineer",
    location: "Pune",
    package: "₹20 - ₹45 LPA",
    website: "https://careers.nvidia.com",
    hiring: true,
    description:
      "NVIDIA builds GPUs, AI platforms, autonomous systems, and CUDA technologies.",
    skills: [
      "Python",
      "CUDA",
      "Deep Learning",
      "PyTorch",
      "C++",
    ],
  },

  {
    id: 12,
    name: "Cisco",
    logo: "/logos/cisco.png",
    role: "Software Engineer",
    location: "Bangalore",
    package: "₹12 - ₹24 LPA",
    website: "https://jobs.cisco.com",
    hiring: true,
    description:
      "Cisco develops networking, cybersecurity, cloud, and collaboration solutions.",
    skills: [
      "Networking",
      "Python",
      "Linux",
      "Cloud",
      "Git",
    ],
  },

  {
    id: 13,
    name: "Salesforce",
    logo: "/logos/salesforce.png",
    role: "Software Engineer",
    location: "Hyderabad",
    package: "₹18 - ₹35 LPA",
    website: "https://careers.salesforce.com",
    hiring: true,
    description:
      "Salesforce develops CRM platforms, AI products, and enterprise cloud solutions.",
    skills: [
      "Java",
      "Apex",
      "SQL",
      "React",
      "Cloud",
    ],
  },
  {
  id: 14,
  name: "SAP",
  logo: "/logos/sap.png",
  role: "Software Developer",
  location: "Bangalore",
  package: "₹12 - ₹24 LPA",
  website: "https://www.sap.com/careers",
  hiring: true,
  description:
    "SAP develops enterprise software, ERP solutions, cloud platforms, and AI-powered business applications.",
  skills: [
    "Java",
    "Spring Boot",
    "SQL",
    "Cloud",
    "Git",
  ],
 },

 {
  id: 15,
  name: "Accenture",
  logo: "/logos/accenture.png",
  role: "Associate Software Engineer",
  location: "Hyderabad",
  package: "₹4.5 - ₹10 LPA",
  website: "https://www.accenture.com/careers",
  hiring: true,
  description:
    "Accenture provides consulting, cloud, AI, cybersecurity, and software engineering services.",
  skills: [
    "Java",
    "Python",
    "SQL",
    "Cloud",
    "Git",
  ],
 },

 {
  id: 16,
  name: "Deloitte",
  logo: "/logos/deloitte.png",
  role: "Software Developer",
  location: "Hyderabad",
  package: "₹6 - ₹14 LPA",
  website: "https://www2.deloitte.com/careers",
  hiring: true,
  description:
    "Deloitte develops enterprise applications, analytics platforms, and cloud-based solutions.",
  skills: [
    "Java",
    "Python",
    "SQL",
    "Power BI",
    "Cloud",
  ],
 },

 {
  id: 17,
  name: "Infosys",
  logo: "/logos/infosys.png",
  role: "Systems Engineer",
  location: "Mysore",
  package: "₹3.6 - ₹9 LPA",
  website: "https://career.infosys.com",
  hiring: true,
  description:
    "Infosys delivers digital transformation, AI, cloud computing, and software engineering services.",
  skills: [
    "Java",
    "Python",
    "SQL",
    "React",
    "Git",
  ],
 },

 {
  id: 18,
  name: "TCS",
  logo: "/logos/tcs.png",
  role: "Assistant System Engineer",
  location: "Hyderabad",
  package: "₹3.5 - ₹8 LPA",
  website: "https://www.tcs.com/careers",
  hiring: true,
  description:
    "TCS provides IT consulting, software development, cloud services, and AI solutions.",
  skills: [
    "Java",
    "Python",
    "SQL",
    "Git",
    "OOP",
  ],
 },

 {
  id: 19,
  name: "Wipro",
  logo: "/logos/wipro.png",
  role: "Project Engineer",
  location: "Bangalore",
  package: "₹3.5 - ₹8 LPA",
  website: "https://careers.wipro.com",
  hiring: true,
  description:
    "Wipro offers cloud, AI, cybersecurity, digital engineering, and consulting services.",
  skills: [
    "Java",
    "Python",
    "SQL",
    "Linux",
    "Git",
  ],
 },

 {
  id: 20,
  name: "Capgemini",
  logo: "/logos/capgemini.png",
  role: "Software Engineer",
  location: "Pune",
  package: "₹4 - ₹9 LPA",
  website: "https://www.capgemini.com/careers",
  hiring: true,
  description:
    "Capgemini provides software engineering, cloud transformation, AI, and consulting solutions.",
  skills: [
    "Java",
    "Python",
    "React",
    "SQL",
    "Git",
  ],
 },
  {
  id: 21,
  name: "Cognizant",
  logo: "/logos/cognizant.png",
  role: "Programmer Analyst",
  location: "Chennai",
  package: "₹4 - ₹9 LPA",
  website: "https://careers.cognizant.com",
  hiring: true,
  description:
    "Cognizant provides digital engineering, AI, cloud, data analytics, and enterprise software solutions.",
  skills: [
    "Java",
    "Python",
    "SQL",
    "React",
    "Git",
  ],
 },

 {
  id: 22,
  name: "HCLTech",
  logo: "/logos/hcltech.png",
  role: "Graduate Engineer Trainee",
  location: "Noida",
  package: "₹4 - ₹8 LPA",
  website: "https://www.hcltech.com/careers",
  hiring: true,
  description:
    "HCLTech delivers IT services, cloud transformation, cybersecurity, AI, and software engineering solutions.",
  skills: [
    "Java",
    "Python",
    "SQL",
    "Linux",
    "Git",
  ],
 },

 {
  id: 23,
  name: "Tech Mahindra",
  logo: "/logos/techmahindra.png",
  role: "Software Engineer",
  location: "Hyderabad",
  package: "₹4 - ₹9 LPA",
  website: "https://careers.techmahindra.com",
  hiring: true,
  description:
    "Tech Mahindra specializes in digital transformation, telecom solutions, AI, cloud, and enterprise software.",
  skills: [
    "Java",
    "Python",
    "SQL",
    "Cloud",
    "Git",
  ],
 },

 {
  id: 24,
  name: "Zoho",
  logo: "/logos/zoho.png",
  role: "Software Developer",
  location: "Chennai",
  package: "₹8 - ₹18 LPA",
  website: "https://www.zoho.com/careers",
  hiring: true,
  description:
    "Zoho develops business productivity software, SaaS products, cloud applications, and AI-powered tools.",
  skills: [
    "Java",
    "C++",
    "JavaScript",
    "SQL",
    "DSA",
  ],
 },

 {
  id: 25,
  name: "PayPal",
  logo: "/logos/paypal.png",
  role: "Software Engineer",
  location: "Bangalore",
  package: "₹18 - ₹35 LPA",
  website: "https://careers.pypl.com",
  hiring: true,
  description:
    "PayPal builds secure digital payment systems, fintech platforms, fraud detection, and AI-driven financial services.",
  skills: [
    "Java",
    "Spring Boot",
    "Microservices",
    "SQL",
    "AWS",
  ],
  },
];

export default companies;