import PortfolioHeader from './PortfolioHeader';
import { MapPin, Phone, Mail, ArrowUpRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

const SKILLS = [
  { title: 'Frontend', items: ['React.js', 'Redux (basic)', 'HTML5', 'CSS3', 'Tailwind CSS', 'Bootstrap'] },
  { title: 'Backend', items: ['JavaScript (ES6+)', 'Node.js', 'Express.js'] },
  { title: 'Databases', items: ['MongoDB', 'PostgreSQL (basic)'] },
  { title: 'Integrations & tools', items: ['Stripe', 'Razorpay', 'Multer', 'Cloudinary', 'Gemini', 'OpenAI', 'Git', 'Postman', 'Figma'] },
];

const PROJECTS = [
  {
    name: 'EduSphere – Online Learning Management Platform',
    url: 'https://github.com/mashroofmashru/Edusphere',
    stack: ['React (Vite)', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB', 'JavaScript'],
    points: [
      'Developed a full-stack online learning management platform for managing users, courses, and learning content.',
      'Built a responsive frontend using React (Vite) and Tailwind CSS with reusable components and clean UI design.',
      'Implemented MVC architecture to maintain clear separation of models, controllers, and routes.',
      'Designed and developed RESTful APIs for authentication, course management, and content access.',
      'Implemented JWT-based authentication with role-based access for students and administrators.',
      'Designed structured MongoDB schemas for users, courses, and enrollments with proper relationships.',
    ],
  },
  {
    name: 'Carverse – Automotive Marketplace Platform',
    url: 'https://github.com/mashroofmashru/Carverse',
    stack: ['React (Vite)', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB', 'JavaScript'],
    points: [
      'Built a full-stack automotive marketplace platform for browsing, listing, and managing car listings.',
      'Developed a responsive frontend using React (Vite) and Tailwind CSS with dynamic data rendering.',
      'Designed and implemented RESTful APIs using Node.js and Express.js.',
      'Implemented JWT-based authentication and authorization for secured user actions.',
      'Integrated image uploads for car listings using Multer and Cloudinary.',
      'Structured MongoDB schemas for users and car listings with proper indexing.',
    ],
  },
];

const MINI_PROJECTS = [
  { name: 'PortfolioBuilder', text: 'A React (Vite) application that instantly generates responsive, themed developer portfolios using public GitHub data.' },
  { name: 'GeminiClone', text: 'Built a frontend-only AI chat interface using React (Vite) and Tailwind CSS. Integrated OpenAI API for real-time AI responses.' },
  { name: 'Netflix Clone', text: 'Built a Netflix-style frontend UI using React.js and Tailwind CSS. Integrated TMDB API to fetch and display real-time movie data.' },
];

const EDUCATION = [
  { years: '2023 – Present', title: 'Bachelor of Computer Applications (BCA)', place: 'SES College, Sreekandapuram — Affiliated to Kannur University' },
  { years: '2021 – 2023', title: 'Higher Secondary Education – Bio Science', place: 'Government Higher Secondary School, Koyyam, Kannur' },
];

export default function DeveloperPortfolio() {
  return (
    <div className="container">
      <PortfolioHeader />

      <main className="pf">
        <aside className="pf-side">
          <section className="gl-panel pf-card pf-profile" aria-label="Profile">
            <div className="pf-avatar pf-avatar--fallback" aria-hidden="true">MP</div>
            <div>
              <h1 className="pf-name">Mashroof PP</h1>
              <p className="pf-handle">Full Stack Developer (MERN)</p>
            </div>
            <span className="chip"><MapPin size={14} aria-hidden="true" /> Kannur</span>
          </section>

          <section className="gl-panel pf-card" aria-labelledby="dev-contact">
            <p className="eyebrow" id="dev-contact" style={{ marginBottom: 12 }}>Contact</p>
            <ul className="link-list">
              <li><a href="tel:+918078861815"><Phone size={18} aria-hidden="true" /> +91 8078861815</a></li>
              <li><a href="mailto:mashroofvlk@gmail.com"><Mail size={18} aria-hidden="true" /> Email</a></li>
              <li><a href="https://www.linkedin.com/in/mashroof-mashru/" target="_blank" rel="noreferrer"><LinkedinIcon size={18} /> LinkedIn</a></li>
              <li><a href="https://github.com/mashroofmashru" target="_blank" rel="noreferrer"><GithubIcon size={18} /> GitHub</a></li>
            </ul>
          </section>
        </aside>

        <div className="pf-main">
          <section className="gl-panel pf-panel" aria-labelledby="about-h">
            <div className="pf-head"><h2 className="pf-title" id="about-h">About</h2></div>
            <p className="pf-bio" style={{ fontSize: '1.0625rem' }}>
              Motivated MERN Stack Developer with hands-on experience building web applications using React.js, TypeScript, Node.js, Express.js, and MongoDB. Strong interest in backend development, real-time features, and third-party integrations. Eager to learn, contribute to real-world projects, and grow as a developer while writing clean, maintainable code.
            </p>
          </section>

          <section className="gl-panel pf-panel" aria-labelledby="skills-h">
            <div className="pf-head"><h2 className="pf-title" id="skills-h">Technical skills</h2></div>
            <div className="skill-groups">
              {SKILLS.map((s) => (
                <div key={s.title}>
                  <p className="eyebrow" style={{ marginBottom: 8 }}>{s.title}</p>
                  <ul className="chips" style={{ listStyle: 'none' }}>
                    {s.items.map((i) => <li className="chip" key={i}>{i}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section aria-labelledby="projects-h">
            <div className="pf-head"><h2 className="pf-title" id="projects-h">Projects</h2></div>
            <div className="pf-projects pf-projects--1">
              {PROJECTS.map((p, idx) => (
                <a key={p.name} className="gl-panel pf-project" href={p.url} target="_blank" rel="noreferrer">
                  <div className="pf-project-top">
                    <span className="pf-rank">{String(idx + 1).padStart(2, '0')}</span>
                    <ArrowUpRight size={18} aria-hidden="true" />
                  </div>
                  <h3>{p.name}</h3>
                  <ul className="chips" style={{ listStyle: 'none' }}>
                    {p.stack.map((t) => <li className="chip chip--mono" key={t}>{t}</li>)}
                  </ul>
                  <ul className="dev-list">
                    {p.points.map((pt) => <li key={pt}>{pt}</li>)}
                  </ul>
                </a>
              ))}
            </div>
          </section>

          <section aria-labelledby="mini-h">
            <div className="pf-head"><h2 className="pf-title" id="mini-h">Mini projects</h2></div>
            <div className="pf-mini">
              {MINI_PROJECTS.map((p) => (
                <div className="gl-panel pf-card" key={p.name}>
                  <h3 className="pf-mini-name">{p.name}</h3>
                  <p className="pf-bio">{p.text}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="gl-panel pf-panel" aria-labelledby="edu-h">
            <div className="pf-head"><h2 className="pf-title" id="edu-h">Education</h2></div>
            <ol className="pf-timeline">
              {EDUCATION.map((e) => (
                <li key={e.title}>
                  <span className="year">{e.years}</span>
                  <h3>{e.title}</h3>
                  <p>{e.place}</p>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </main>
    </div>
  );
}
