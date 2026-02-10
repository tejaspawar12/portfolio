export type SocialLink = {
  label: string;
  href: string;
  icon: "github" | "linkedin" | "website" | "email";
};

export type SkillGroup = {
  title: string;
  skills: { name: string; level: number }[];
};

export type CoreSkillCard = {
  id: string;
  title: string;
  oneLiner?: string;
  advanced: string[];
  proficient: string[];
  familiar?: string[];
  usedIn?: string;
  usedInTooltip?: string;
  featured?: boolean;
};

export type ProjectMetric = {
  label: string;
  value: string;
  note?: string;
};

export type ProjectPhase = {
  title: string;
  focus: string;
  bullets: string[];
};

export type ProjectCapability = {
  title: string;
  description: string;
};

export type FeaturedProject = {
  name: string;
  tagline: string;
  summary: string;
  problem: string;
  solution: string;
  solutionBullets: string[];
  features: { title: string; description: string }[];
  techStack: { backend: string; frontend: string; infrastructure: string };
  highlights: string[];
  ctaLine: string;
  links: { github: string; live: string };
};

export type Experience = {
  role: string;
  company: string;
  location?: string;
  period: string;
  summary: string;
  highlights?: string[];
};

export type Education = {
  school: string;
  program: string;
  period: string;
  details: string;
  coursework?: string[];
};

export const profile = {
  name: "Tejas Pawar",
  title: "AI Systems Engineer",
  subRoles: ["Machine Learning Engineer", "Cloud Specialist"],
  focusAreas: "Generative AI · Cloud · AWS",
  tagline: "Engineering Production-Ready AI Systems from Model to Deployment",
  location: "Newark, DE",
  email: "tejasp@udel.edu",
  resumeUrl: "/resume.pdf",
  avatarUrl: "/avatar.png",
  availability: "Open to full-time opportunities",
  openTo: "Full-time · Remote/Hybrid",
  timezone: "ET (UTC-5)",
  highlights: ["Generative AI", "Cloud", "AWS", "LLM Orchestration", "Data Pipelines", "FastAPI", "Docker"],
  socials: [
    { label: "GitHub", href: "https://github.com/tejaspawar12", icon: "github" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/pawar-tejas123/", icon: "linkedin" },
    { label: "Website", href: "https://example.com", icon: "website" },
    { label: "Email", href: "mailto:tejasp@udel.edu", icon: "email" },
  ] satisfies SocialLink[],
};

export const aboutOverview = {
  title: "Profile Overview",
  intro:
    "I'm an AI Systems Engineer who builds end-to-end products — modern frontend experiences, backend APIs, and AI-enabled services. I focus on production-ready architectures that are measurable, reliable, and deployable.",
  coreStrengths: [
    "Full-stack engineering (frontend + backend)",
    "AI systems (RAG, agent-style tooling, evaluation/guardrails)",
    "Data systems (SQL + graphs + vectors)",
  ],
  tech: [
    { label: "Backend", items: "Python, FastAPI, REST" },
    { label: "Data", items: "SQL, PostgreSQL, MySQL, Neo4j, vector search" },
    { label: "AI", items: "LLM integration, embeddings, RAG pipelines, prompt guardrails" },
    { label: "Cloud", items: "AWS (Bedrock, IAM, RDS), Docker, deployment workflows" },
  ],
  lookingFor: "AI Engineer / ML Engineer / Applied AI roles (Full-time, Remote/Hybrid)",
  locationLine: "Newark, DE (ET)",
};

export const aboutSpotlight = {
  badge: "Flagship Case Study",
  title: "Fitness Workout Tracker & AI Coach",
  bullets: [
    "Full-stack app: workout logging, AI coach (Claude/Bedrock), behavior insights",
    "Offline-first, cross-platform (web + iOS + Android via Expo)",
    "Production deployment on Railway — live for recruiters to try",
  ],
  stackChips: ["React Native", "Expo", "FastAPI", "PostgreSQL", "AWS Bedrock", "Railway", "JWT"],
  capabilitiesTitle: "Key capabilities",
  capabilities: [
    "Workout logging & training plans",
    "AI coach with daily message + chat",
    "Offline sync & production auth",
  ],
  caseStudyHref: "#projects",
  architectureHref: "#projects",
};

export const stats = [
  { label: "Projects shipped", value: "24+" },
  { label: "Technologies", value: "18" },
  { label: "Years building", value: "5" },
];

export const skillsSubtitle = "Core engineering strengths for production AI systems";

/** Simple block: big title + 6–8 bullet skills. No chips, no sublabels. */
export type SkillBlock = { title: string; skills: string[] };

/** Left column (dominant): one strong anchor. */
export const skillsDominant: SkillBlock = {
  title: "AI Systems Engineering",
  skills: [
    "RAG & embeddings",
    "Vector search (pgvector)",
    "Prompt guardrails & grounding",
    "Tool / function calling",
    "Agent-style workflows",
    "LLM evaluation & failure handling",
    "Model integration (APIs, cloud)",
    "Responsible AI design",
  ],
};

/** Right column (supporting): Data & Backend, then Cloud. */
export const skillsSupporting: SkillBlock[] = [
  {
    title: "Data & Backend",
    skills: [
      "SQL, PostgreSQL, MySQL",
      "Neo4j (graph modeling)",
      "Schema design for AI",
      "FastAPI, Python, REST",
      "Pydantic, auth, error handling",
      "ETL & data pipelines",
    ],
  },
  {
    title: "Cloud",
    skills: [
      "AWS (Bedrock, RDS, S3, IAM)",
      "Docker & Docker Compose",
      "Railway",
      "CI/CD (GitHub Actions)",
    ],
  },
];

/** Legacy: kept for type compatibility; Skills section uses skillsDominant + skillsSupporting. */
export const coreSkills: CoreSkillCard[] = [];

export const toolingChips: string[] = [
  "Cursor",
  "GitHub Copilot",
  "Claude (Projects / Agents)",
  "OpenAI API",
  "Prompt Engineering",
];

export const skillGroups: SkillGroup[] = [
  { title: "Frontend", skills: [{ name: "Next.js", level: 90 }, { name: "React", level: 92 }] },
  { title: "Backend", skills: [{ name: "Node.js", level: 84 }, { name: "PostgreSQL", level: 78 }] },
  { title: "AI/ML", skills: [{ name: "Python", level: 82 }, { name: "LangChain", level: 70 }] },
  { title: "DevOps", skills: [{ name: "Docker", level: 80 }, { name: "AWS", level: 68 }] },
];

export const featuredProject: FeaturedProject = {
  name: "Fitness Workout Tracker & AI Coach",
  tagline:
    "Full-stack fitness app with workout logging, behavior insights, and an AI coach—shipped for web and mobile.",
  summary:
    "A production-ready fitness app where users log workouts, follow training plans, and get daily guidance from an AI coach powered by AWS Bedrock. The app works offline, syncs when back online, and is deployed on Railway for web and mobile so recruiters can try it live.",
  problem:
    "People want to track workouts, see progress, and get simple coaching without switching between multiple tools or losing data when offline.",
  solution:
    "A single app that combines workout logging, an AI coach (daily message and chat powered by Claude via AWS Bedrock using real user data), behavior insights (consistency, momentum, dropout/burnout risk, weekly focus), training plans with weekly adjustments and transformation timeline, and offline support. Built and deployed so it's live and usable—recruiters can sign up, try the demo, and experience the full flow.",
  solutionBullets: [
    "Workout logging – Start sessions, add exercises, log sets (reps, weight, RPE), reorder exercises, finish with summary.",
    "AI coach – Daily message and chat powered by Claude (AWS Bedrock), using the user's real data (metrics, plan, history).",
    "Behavior insights – Consistency, momentum, dropout/burnout risk, weekly focus derived from workout history.",
    "Training plan – Set goals (days/week, session length), weekly adjustments, transformation timeline with predictions.",
    "Offline support – Log and edit workouts without internet; changes sync automatically when connected.",
  ],
  features: [
    {
      title: "Workout logging",
      description:
        "Start/continue/finish workouts, add exercises from a searchable library, log sets with reps, weight, RPE, and set type; reorder exercises; view previous performance per exercise.",
    },
    {
      title: "AI coach",
      description:
        "Daily personalized message and multi-turn chat (Claude via AWS Bedrock); coach uses only real user data (metrics, plan, history).",
    },
    {
      title: "Behavior metrics",
      description:
        "Consistency score, momentum trend, dropout/burnout risk, adherence type, and weekly focus; computed from workout history and timezone.",
    },
    {
      title: "Training plan",
      description:
        "Set target days per week and session length; weekly adjustments; transformation timeline with body-weight predictions.",
    },
    {
      title: "Weekly reports",
      description: "AI-generated narrative summaries of the past week's training.",
    },
    {
      title: "Auth & profile",
      description:
        "Register, login, JWT + refresh tokens; profile with email verification; demo/try mode for quick testing.",
    },
    {
      title: "Offline support",
      description:
        "Read cache and offline queue so users can log workouts without connectivity; sync when back online.",
    },
    {
      title: "Cross-platform",
      description: "One codebase for web, iOS, and Android (Expo + React Native Web).",
    },
    {
      title: "Production deployment",
      description:
        "Backend and frontend on Railway; PostgreSQL; health checks; CORS and env-based API URL for production.",
    },
  ],
  techStack: {
    backend:
      "Python · FastAPI · SQLAlchemy 2 · PostgreSQL · Pydantic · Alembic · JWT · bcrypt · AWS Bedrock (Claude) · boto3",
    frontend:
      "React Native · Expo · TypeScript · Zustand · React Navigation · Axios · React Native Web",
    infrastructure: "Railway (hosting) · PostgreSQL (DB) · AWS (Bedrock) · pytest · Jest",
  },
  highlights: [
    "Live, production app – Not a tutorial clone; deployed so anyone can sign up and use it end-to-end.",
    "Full-stack ownership – Backend API, frontend app, auth, database design, and deployment pipeline.",
    "AI integration – Real LLM integration (AWS Bedrock) with structured prompts, context, and error handling.",
    "Cross-platform – Single codebase for web and mobile; responsive UI and platform-specific details.",
    "Offline-first – Caching and mutation queue so the app remains useful without connectivity.",
    "Production practices – JWT + refresh flow, env-based config, CORS, health checks, and clear API versioning (/api/v1).",
  ],
  ctaLine: "Sign up or use 'Try Demo' to explore the app. Best experienced on web or in the Expo Go app.",
  links: {
    github: "https://github.com/tejaspawar12/Pulse",
    live: "https://enchanting-heart-production.up.railway.app/",
  },
};

export const experience: Experience[] = [
  {
    role: "Graduate Assistant (IT-ATS)",
    company: "University of Delaware, Academic Technology Services",
    location: "Newark, Delaware, United States",
    period: "June 2025 – May 2026",
    summary:
      "Contributed to UD Study AiDE (AI-driven learning tool on AWS Bedrock), PATHS Engine (Neo4j knowledge graph), and ProfAI. Built RAG pipelines, backend services, and AI tooling with focus on explainability, retrieval quality, and ethical AI in higher education.",
    highlights: [
      "UD Study AiDE: AI-driven study tool using foundation models on AWS Bedrock; faculty-reviewed, contextually rich study objects; responsible AI design.",
      "PATHS Engine: Structured knowledge graph (Neo4j) for academic content; retrieval, curriculum mapping, AI-assisted educational tooling.",
      "Backend services and AI pipelines with Neo4j; data pipelines feeding graph data into retrieval and learning workflows.",
      "RAG pipelines: ingestion, chunking, embeddings, vector store, retrieval logic; grounded responses; integrated with backend endpoints.",
      "AWS Bedrock for model inference and fine-tuning; scalable APIs for content analysis and faculty AI agents.",
      "Collaboration with engineers, instructional designers, and academic stakeholders; FERPA/compliance and explainable AI.",
    ],
  },
  {
    role: "Machine Learning Engineer Intern",
    company: "LogicMo Systems Private Limited",
    location: "Pune, India",
    period: "March 2023 – July 2023",
    summary:
      "Developed and trained CNN models for computer vision (detection, semantic segmentation). Dataset preparation, preprocessing, annotation; architecture design and optimization; training, validation, hyperparameter tuning; data augmentation; integration and deployment documentation.",
    highlights: [
      "Developed and trained CNN models for image detection and semantic segmentation.",
      "Dataset preparation, preprocessing, and annotation for supervised learning pipelines.",
      "Designed and optimized neural network architectures; training, validation, hyperparameter tuning.",
      "Data augmentation for generalization; collaborated on model integration and deployment feasibility.",
    ],
  },
];

export const education: Education[] = [
  {
    school: "University of Delaware",
    program: "M.S. in Data Science",
    period: "May 2026",
    details: "Professional master's from UD's Graduate College — interdisciplinary program building expertise in data science methods for large-scale and dynamic data, aligned with data engineering and ML systems roles.",
    coursework: [
      "Applied Multivariate Statistics",
      "Applied Multivariate Data Analysis",
      "Data Mining",
      "Applied Database Management Systems",
      "Natural Language Processing",
      "Mathematical Techniques in Data Science",
      "Algorithm Design and Analysis",
      "Unstructured Data Analytics",
      "Data Computing",
      "Ethical AI Design",
    ],
  },
  {
    school: "Savitribai Phule Pune University",
    program: "B.E. in Electronics and Telecommunication Engineering (Honors in Data Science)",
    period: "May 2024",
    details: "Premier institution (referred to as the 'Oxford of the East') — B.E. with Honors in Data Science, combining core engineering rigor with applied data science and research-oriented learning.",
    coursework: [
      "Machine Learning",
      "Deep Learning",
      "Data Structures and Algorithms",
      "Microcontroller",
      "Probability and Statistics",
      "Digital Signal Processing",
      "Database Management Systems",
      "Object-Oriented Programming",
      "Communication Systems",
      "Computer Networks",
    ],
  },
];

export const testimonials = [
  {
    quote:
      "Tejas is a powerful innovator. In our university department (Academic Technology Services) we habitually design, build, and implement cutting edge solutions that helps bridge the gap between Teaching and Technology. Tejas heard about the impactful Ai project our department was building (UD Study AiDE) and took it upon himself to find if we had need of any assistance. Once we became familiar with not only his skillsets, but his determination, work ethic, and prodigious ability to transform a proof of concept into production-ready solutions and run with it, Tejas became our powerhouse innovator. I personally have overseen many graduate and phd candidates over the 20 years I've worked at the university; Tejas stands out. He is able to effortlessly apply research in practice - which is a fine line many students grapple with. Together we have explored Federated Learning for creating educational AI models, training models for faculty use, and help building out our structured Knowledge Graphs for Ai material generation. Any program would be enhanced by Tejas Pawar's enthusiasm, knowledge, and forward thinking mindset.",
    name: "Jevonia Harris",
    title: "University of Delaware, Academic Technology Services",
    linkedin: "https://www.linkedin.com/in/jevonia-harris-65143a196/",
  },
];

export type GalleryPhoto = {
  id: string;
  image: string;
  title: string;
  alt: string;
  description?: string;
};

export type GallerySlide = {
  id: string;
  photos: GalleryPhoto[];
};

export const gallerySlides: GallerySlide[] = [
  {
    id: "slide-1",
    photos: [
      { id: "photo-1", image: "/gallery/photo1.jpg", title: "Speaking at Tech Conference", alt: "Speaking engagement at tech conference", description: "Live presentation of ProfAI Agent at the Aim Higher East Coast AI Conference 2025 at UD. Demonstrated real-time academic AI assistance and explained the system's architecture and impact." },
      { id: "photo-2", image: "/gallery/photo2.jpg", title: "Conference Panel Discussion", alt: "Panel discussion at conference", description: "Conference attendees exploring and testing ProfAI during the demo session. Engaged in discussions around AI in education, agent design, and responsible LLM integration." },
    ],
  },
  {
    id: "slide-2",
    photos: [
      { id: "photo-3", image: "/gallery/photo3.jpeg", title: "Hen Street Hackathon Presentation", alt: "AI workshop presentation", description: "Presenting our AR + LLM-powered solution to the judges at Hen Street Hackathon. Built and demonstrated a working prototype in 3 days, integrating vision models, AR, and intelligent agent design." },
    ],
  },
  {
    id: "slide-3",
    photos: [
      { id: "photo-4", image: "/gallery/photo4.jpeg", title: "Originality & Creativity Award Winner", alt: "Networking at industry event", description: "Awarded \"Originality & Creativity\" at Hen Street Hacks 2025. Recognized for innovative integration of AR, LLMs, and vision models in a production-ready demo." },
      { id: "photo-5", image: "/gallery/photo5.jpeg", title: "Originality & Creativity Award Winner", alt: "Tech talk presentation" },
    ],
  },
  {
    id: "slide-4",
    photos: [
      { id: "photo-6", image: "/gallery/photo6.jpeg", title: "Git & GitHub Workshop", alt: "Keynote speech at conference", description: "Led a Git & GitHub workshop for University of Delaware students as Technical Lead of DSSA. Taught practical Git workflows, version control best practices, and collaborative development strategies to undergrad and grad students." },
    ],
  },
  {
    id: "slide-5",
    photos: [
      { id: "photo-7", image: "/gallery/photo7.jpeg", title: "Speaking Engagement", alt: "Speaking engagement", description: "Delivered a UD DSSA workshop on real-world project building and automation systems. Walked students through email automation pipelines and practical marketing-tech integrations." },
    ],
  },
  {
    id: "slide-6",
    photos: [
      { id: "photo-8", image: "/gallery/photo8.jpeg", title: "Team IT-ATS", alt: "Work at professional event", description: "AI Engineer Intern with the IT Academic Technology Services (ATS) team. Worked collaboratively on AI-driven educational tools and systems from June 2025 to May 2026." },
    ],
  },
  {
    id: "slide-7",
    photos: [
      { id: "photo-9", image: "/gallery/photo9.jpeg", title: "Leadership", alt: "Industry presentation", description: "Technical Lead, University of Delaware Data Science Student Association (DSSA). Led technical initiatives, workshops, and project mentorship to help students build real-world data and AI systems." },
    ],
  },
];
