export const SKILL_GROUPS = {
  languages: { name: 'Languages', pattern: 'pointed', description: 'Pointed Petal Mandala' },
  frontend: { name: 'Frontend', pattern: 'lotus', description: 'Lotus Petal Mandala' },
  backend: { name: 'Backend & APIs', pattern: 'arches', description: 'Arched Petal Mandala' },
  databases: { name: 'Databases', pattern: 'teardrops', description: 'Teardrop Petal Mandala' },
  aiml: { name: 'AI & Machine Learning', pattern: 'spirals', description: 'Spiral Petal Mandala' },
  cybersecurity: { name: 'Cybersecurity', pattern: 'shield', description: 'Shield Petal Mandala' },
  tools: { name: 'Tools & Platforms', pattern: 'diamonds', description: 'Diamond & Dot Mandala' },
};

export const SKILLS = [
  // Languages (pointed petals)
  { id: 'cpp', name: 'C++', group: 'languages', pattern: 'pointed', radius: 36, iconKey: 'cpp' },
  { id: 'java', name: 'Java', group: 'languages', pattern: 'pointed', radius: 38, iconKey: 'java' },
  { id: 'python', name: 'Python', group: 'languages', pattern: 'pointed', radius: 44, iconKey: 'python' },
  { id: 'javascript', name: 'JavaScript', group: 'languages', pattern: 'pointed', radius: 42, iconKey: 'javascript' },
  { id: 'dsa', name: 'Data Structures & Algorithms', group: 'languages', pattern: 'pointed', radius: 38, iconKey: 'dsa' },

  // Frontend (lotus petals)
  { id: 'react', name: 'React', group: 'frontend', pattern: 'lotus', radius: 44, iconKey: 'react' },
  { id: 'react-native', name: 'React Native', group: 'frontend', pattern: 'lotus', radius: 34, iconKey: 'reactNative' },
  { id: 'tailwind', name: 'Tailwind CSS', group: 'frontend', pattern: 'lotus', radius: 38, iconKey: 'tailwind' },
  { id: 'html5', name: 'HTML5', group: 'frontend', pattern: 'lotus', radius: 32, iconKey: 'html5' },
  { id: 'css3', name: 'CSS3', group: 'frontend', pattern: 'lotus', radius: 32, iconKey: 'css3' },

  // Backend & APIs (arches)
  { id: 'nodejs', name: 'Node.js', group: 'backend', pattern: 'arches', radius: 40, iconKey: 'node' },
  { id: 'express', name: 'Express', group: 'backend', pattern: 'arches', radius: 34, iconKey: 'express' },
  { id: 'fastapi', name: 'FastAPI', group: 'backend', pattern: 'arches', radius: 38, iconKey: 'fastapi' },
  { id: 'rest-apis', name: 'REST APIs', group: 'backend', pattern: 'arches', radius: 36, iconKey: 'restApi' },
  { id: 'system-design', name: 'System Design', group: 'backend', pattern: 'arches', radius: 34, iconKey: 'systemDesign' },

  // Databases (teardrops)
  { id: 'mongodb', name: 'MongoDB', group: 'databases', pattern: 'teardrops', radius: 40, iconKey: 'mongodb' },
  { id: 'mysql', name: 'MySQL', group: 'databases', pattern: 'teardrops', radius: 36, iconKey: 'mysql' },
  { id: 'postgresql', name: 'PostgreSQL', group: 'databases', pattern: 'teardrops', radius: 38, iconKey: 'postgresql' },
  { id: 'mongodb-atlas', name: 'MongoDB Atlas', group: 'databases', pattern: 'teardrops', radius: 32, iconKey: 'atlas' },
  { id: 'sql', name: 'SQL', group: 'databases', pattern: 'teardrops', radius: 34, iconKey: 'sql' },

  // AI & ML (spirals)
  { id: 'yolo', name: 'YOLO Computer Vision', group: 'aiml', pattern: 'spirals', radius: 42, iconKey: 'yolo' },
  { id: 'pandas', name: 'Pandas', group: 'aiml', pattern: 'spirals', radius: 36, iconKey: 'pandas' },
  { id: 'scikit-learn', name: 'Scikit-learn', group: 'aiml', pattern: 'spirals', radius: 38, iconKey: 'scikit' },
  { id: 'genai', name: 'Generative AI APIs', group: 'aiml', pattern: 'spirals', radius: 40, iconKey: 'genai' },
  { id: 'streamlit', name: 'Streamlit', group: 'aiml', pattern: 'spirals', radius: 34, iconKey: 'streamlit' },

  // Cybersecurity (shield petals)
  { id: 'email-sec', name: 'Email Security', group: 'cybersecurity', pattern: 'shield', radius: 42, iconKey: 'emailSec' },
  { id: 'phishing-det', name: 'Phishing Detection', group: 'cybersecurity', pattern: 'shield', radius: 44, iconKey: 'phishing' },
  { id: 'spf-dkim-dmarc', name: 'SPF / DKIM / DMARC', group: 'cybersecurity', pattern: 'shield', radius: 38, iconKey: 'spfDkim' },
  { id: 'url-analysis', name: 'URL Analysis', group: 'cybersecurity', pattern: 'shield', radius: 36, iconKey: 'urlAnalysis' },
  { id: 'email-forensics', name: 'Email Forensics', group: 'cybersecurity', pattern: 'shield', radius: 40, iconKey: 'forensics' },

  // Tools & Platforms (dots & diamonds)
  { id: 'git', name: 'Git', group: 'tools', pattern: 'diamonds', radius: 36, iconKey: 'git' },
  { id: 'github', name: 'GitHub', group: 'tools', pattern: 'diamonds', radius: 42, iconKey: 'github' },
  { id: 'vscode', name: 'VS Code', group: 'tools', pattern: 'diamonds', radius: 38, iconKey: 'vscode' },
  { id: 'postman', name: 'Postman', group: 'tools', pattern: 'diamonds', radius: 36, iconKey: 'postman' },
  { id: 'vercel', name: 'Vercel', group: 'tools', pattern: 'diamonds', radius: 34, iconKey: 'vercel' },
  { id: 'gcp', name: 'Google Cloud Platform', group: 'tools', pattern: 'diamonds', radius: 38, iconKey: 'gcp' },
];
