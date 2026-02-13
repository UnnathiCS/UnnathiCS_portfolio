
import { Experience, Project, SkillCategory } from './types';

export const PERSONAL_INFO = {
  name: "UNNATHI C S",
  location: "Bengaluru, India",
  phone: "9353570398",
  email: "65.unnathics@gmail.com",
  linkedin: "https://linkedin.com/in/unnathi-c-s-3498502a1",
  github: "https://github.com/UnnathiCS",
  leetcode: "https://leetcode.com/u/Unnathi_CS",
  // Using GitHub's direct avatar endpoint which is highly reliable
  profileImage: "https://github.com/UnnathiCS.png",
  summary: "Aspiring AI/ML professional with a strong academic foundation in Computer Science and hands-on experience in machine learning, deep learning, and natural language processing. Passionate about applying data-driven methods and developing intelligent systems to solve real-world problems. Eager to contribute to research and development in large language models (LLMs), with a focus on fine-tuning, explainability, and generative AI."
};

export const EDUCATION = {
  degree: "Bachelor of Technology in Computer Science and Engineering",
  institution: "R V University, Bengaluru",
  graduation: "Expected 2027",
  cgpa: "9 / 10 (Top 5% of Class)"
};

export const SKILLS: SkillCategory[] = [
  {
    category: "Programming",
    skills: ["Python", "Java", "C", "SQL", "Rust"]
  },
  {
    category: "AI/ML & Data Science",
    skills: ["Machine Learning", "Deep Learning", "NLP", "LLMs", "Generative AI", "Reinforcement Learning", "Foundation Models", "Time-Series Modeling"]
  },
  {
    category: "Frameworks & Tools",
    skills: ["PyTorch", "TensorFlow", "Keras", "Scikit-learn", "LangChain", "Crew.ai", "NumPy", "Pandas", "Matplotlib"]
  },
  {
    category: "Cloud & DevOps",
    skills: ["AWS", "Docker", "Kubernetes", "CI/CD", "Linux", "GitOps", "Watsonx.ai"]
  },
  {
    category: "Web & Services",
    skills: ["Django", "Flask", "Node.js", "Angular", "REST APIs", "Vector Databases"]
  }
];

export const EXPERIENCES: Experience[] = [
  {
    role: "AIML Intern",
    company: "Infosys Springboard",
    period: "Dec 2025 – Jan 2026",
    description: [
      "Developed an LLM-powered visa eligibility screening agent evaluating qualifications based on structured inputs.",
      "Implemented Retrieval-Augmented Generation (RAG) grounded in immigration policy documents for high-accuracy reasoning."
    ]
  },
  {
    role: "Computer Vision Intern",
    company: "GridleyAI",
    period: "July 2025 – Aug 2025",
    description: [
      "Optimized real-time computer vision models for classification and detection using PyTorch and OpenCV.",
      "Improved model inference time by 20% through CNN-based feature extraction pipelines."
    ]
  },
  {
    role: "AIML & Data Analyst Intern",
    company: "CarbonSustain",
    period: "Jan 2025 – June 2025",
    description: [
      "Performed data analytics with PostgreSQL and Python, streamlining sustainability workflows.",
      "Increased backend data delivery efficiency by 90% via REST API integration with Angular and Node.js."
    ]
  },
  {
    role: "AI ML Intern",
    company: "Dhee Center of AIML",
    period: "June 2024 – Dec 2024",
    description: [
      "Designed facial emotion recognition models using CNN and TensorFlow.",
      "Built real-time video-based detection systems using Haar Cascades and OpenCV."
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    title: "SwiftVisa AI Agent",
    description: "LLM-powered agent grounded in immigration policy using RAG for automated visa eligibility reasoning.",
    link: "https://swiftvisaeligibilityukunnathics.streamlit.app/",
    tech: ["LLM", "RAG", "Python", "Streamlit"]
  },
  {
    title: "Slacklytics",
    description: "Real-time Slack assistant processing event streams through Pathway for low-latency analytics.",
    github: "https://github.com/UnnathiCS",
    tech: ["Flask", "Pathway", "REST APIs", "Message Indexing"]
  },
  {
    title: "Gesture-Based HCI",
    description: "Deep learning model mapping hand gestures to mouse actions (movement, clicks, scroll) using CNN.",
    tech: ["CNN", "Computer Vision", "PyTorch", "Human-Computer Interaction"]
  },
  {
    title: "Sustainable Farming",
    description: "ML models for crop recommendation and deficiency detection. Published in IEEE Xplore.",
    tech: ["Machine Learning", "Agriculture AI", "Data Analysis"]
  }
];

export const ACHIEVEMENTS = [
  "Winner – Microsoft Code Cubicle 5.0 (National Hackathon)",
  "2nd Place – HPCC Systems Hackathon, USA",
  "IEEE Publication – Crop Recommendation for Sustainable Farming",
  "94.33% Score in TCS NQT (2025)",
  "Top 2% (Golden+Elite) in NPTEL HCI Certification",
  "Shortlisted – Google Girl Hackathon"
];
