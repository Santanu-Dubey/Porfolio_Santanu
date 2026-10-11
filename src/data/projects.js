export const FEATURED_PROJECTS = [
  {
    id: 'phishguard',
    title: 'PhishGuard Forensics',
    category: 'Cybersecurity / AI',
    problem:
      'Malicious phishing emails bypass basic filters through deceptive domains, header spoofing, and manipulative urgency language.',
    solution:
      'An email security forensics analyzer that parses .eml files and headers, extracts and validates URLs, audits SPF/DKIM/DMARC records, detects urgency signals, and synthesizes an actionable risk score with AI-assisted explanations.',
    tech: ['Python', 'FastAPI', 'Streamlit', 'BeautifulSoup', 'Gemini', 'Chrome Extension'],
    techKeys: ['python', 'fastapi', 'streamlit', 'genai', 'emailSec', 'phishing'],
    links: {
      github: 'https://github.com/Santanu-Dubey', // [add link placeholder]
      live: 'https://github.com/Santanu-Dubey', // [add link placeholder]
    },
    image: '/projects/phishguard.webp',
  },
  {
    id: 'assetflow',
    title: 'AssetFlow ERP',
    category: 'Full Stack Web System',
    problem:
      'Organizations struggle with spreadsheet chaos, lacking central visibility into physical and digital asset lifecycles, assignments, and audit trails.',
    solution:
      'A comprehensive full-stack ERP platform engineered for organizational asset lifecycle management featuring granular user role management, reactive CRUD operations, high-throughput REST API, and cloud deployment.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Mongoose', 'Vercel'],
    techKeys: ['react', 'node', 'express', 'mongodb', 'vercel', 'restApi'],
    links: {
      github: 'https://github.com/Santanu-Dubey/assetflow-erp',
      live: 'https://assetflow-erp-sepia.vercel.app',
    },
    image: '/projects/assetflow.webp',
  },
  {
    id: 'drone-ai',
    title: 'Edge-AI Drone Pest Control',
    category: 'AI / Computer Vision',
    problem:
      'Indiscriminate pesticide spraying causes ecological runoff and excessive chemical expenses due to absence of precise, real-time pest localization.',
    solution:
      'YOLO-powered crop pest detection system designed for drone-mounted edge devices, enabling localized detection, geo-tagging, and targeted micro-spraying interventions.',
    tech: ['React', 'Tailwind CSS', 'FastAPI', 'YOLO', 'Python'],
    techKeys: ['react', 'tailwind', 'fastapi', 'yolo', 'python'],
    links: {
      github: 'https://github.com/Santanu-Dubey', // [add link placeholder]
      live: null,
    },
    image: '/projects/drone-ai.webp',
  },
  {
    id: 'eventra',
    title: 'Eventra',
    category: 'Web Development',
    problem:
      'Attendees frequently miss schedule changes, venue logistics, and session agendas across decentralized communication channels.',
    solution:
      'An intuitive event companion web application providing streamlined discovery, categorized schedules, interactive agendas, and real-time updates.',
    tech: ['React', 'JavaScript', 'CSS3', 'Vercel'],
    techKeys: ['react', 'javascript', 'css3', 'vercel'],
    links: {
      github: 'https://github.com/Santanu-Dubey', // [add link placeholder]
      live: 'https://project-eventra.vercel.app',
    },
    image: '/projects/eventra.webp',
  },
  {
    id: 'segmentation',
    title: 'E-Commerce Customer Segmentation',
    category: 'Machine Learning',
    problem:
      'Generic marketing broadcasts yield low conversion rates because distinct customer cohorts with differing purchasing cadences are treated identically.',
    solution:
      'Unsupervised K-Means clustering algorithm segmenting e-commerce customers based on transaction history, purchase frequency, and monetary value for bespoke marketing campaigns.',
    tech: ['Python', 'Pandas', 'Scikit-learn', 'Data Analytics'],
    techKeys: ['python', 'pandas', 'scikit'],
    links: {
      github: 'https://github.com/Santanu-Dubey', // [add link placeholder]
      live: null,
    },
    image: '/projects/segmentation.webp',
  },
  {
    id: 'ott',
    title: 'OTT / Netflix Data Analysis',
    category: 'Data Analytics',
    problem:
      'Vast streaming media libraries obscure historical release trends, international production proportions, and content genre diversification.',
    solution:
      'An interactive analytical dashboard exploring multi-year streaming catalogs across genre distributions, country origin, content classification, and release trends.',
    tech: ['Python', 'Pandas', 'Streamlit', 'Plotly'],
    techKeys: ['python', 'pandas', 'streamlit'],
    links: {
      github: 'https://github.com/Santanu-Dubey', // [add link placeholder]
      live: null,
    },
    image: '/projects/ott.webp',
  },
];

export const MORE_PROJECTS = [
  {
    id: 'complaint-classifier',
    title: 'Smart Complaint Classifier',
    category: 'AI / NLP',
    description:
      'Automated customer grievance classification system routing incoming tickets to appropriate support teams using NLP intent recognition.',
  },
  {
    id: 'fibonacci-gen',
    title: 'Python Fibonacci Generator',
    category: 'Algorithms & Python',
    description:
      'High-performance sequence generator demonstrating generator protocols, memoization, and Big-O computational optimizations.',
  },
  {
    id: 'rent-calculator',
    title: 'Rent Calculator',
    category: 'Web Tool',
    description:
      'Utility web application for transparent shared-living expense splitting, utility metering, and recurring lease payment tracking.',
  },
  {
    id: 'geo-tracker',
    title: 'Geolocation Tracker',
    category: 'Web API & Security',
    description:
      'Browser Geolocation and IP analytics inspector providing real-time telemetry, reverse geocoding, and accuracy radius mapping.',
  },
];
