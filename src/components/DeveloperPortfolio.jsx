import PortfolioHeader from './PortfolioHeader';
import { MapPin, Phone, Mail } from 'lucide-react';

const GithubIcon = ({ size = 18 }) => (
   <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
      <path d="M9 18c-4.51 2-5-2-7-2"/>
   </svg>
);

const LinkedinIcon = ({ size = 18 }) => (
   <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>
   </svg>
);

export default function DeveloperPortfolio({ mode, toggleTheme, handleShare }) {
   const profile = { name: 'Mashroof PP' };

   return (
      <div className="container" style={{ paddingBottom: '4rem', paddingTop: '6rem' }}>
         {/* <PortfolioHeader mode={mode} toggleTheme={toggleTheme} handleShare={handleShare} /> */}

         {/* Hero Section */}
         <section className="section hero-section" style={{ textAlign: 'left', alignItems: 'flex-start', display: 'flex', flexDirection: 'column' }}>
            <h1 className="hero-name" style={{ fontSize: '3rem', marginBottom: '0.5rem', background: 'var(--text-color)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Mashroof PP</h1>
            <h2 style={{ color: 'var(--accent-color)', fontSize: '1.5rem', marginBottom: '1.25rem', fontWeight: 600 }}>Full Stack Developer (MERN)</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '800px', lineHeight: '1.7' }}>
               Motivated MERN Stack Developer with hands-on experience building web applications using React.js, TypeScript, Node.js, Express.js, and MongoDB. Strong interest in backend development, real-time features, and third-party integrations. Eager to learn, contribute to real-world projects, and grow as a developer while writing clean, maintainable code.
            </p>
            <div className="hero-meta" style={{ justifyContent: 'flex-start', flexWrap: 'wrap', gap: '1.5rem', marginTop: '1.5rem' }}>
               <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><MapPin size={18} /> Kannur</span>
               <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Phone size={18} /> +91 8078861815</span>
               <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Mail size={18} /> mashroofvlk@gmail.com</span>
               <a href="https://www.linkedin.com/in/mashroof-mashru/" target="_blank" rel="noreferrer" style={{ color: 'var(--text-muted)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><LinkedinIcon size={18} /> LinkedIn</a>
               <a href="https://github.com/mashroofmashru" target="_blank" rel="noreferrer" style={{ color: 'var(--text-muted)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><GithubIcon size={18} /> GitHub</a>
            </div>
         </section>

         {/* Skills */}
         <section className="section">
            <h2 className="section-title">Technical Skills</h2>
            <div className="dev-details-grid">
               <div className="dev-detail-card">
                  <h3 className="dev-detail-title">Frontend</h3>
                  <p className="dev-detail-content">React.js, Redux (basic), HTML5, CSS3, Tailwind CSS, Bootstrap</p>
               </div>
               <div className="dev-detail-card">
                  <h3 className="dev-detail-title">Backend</h3>
                  <p className="dev-detail-content">JavaScript (ES6+), Node.js, Express.js</p>
               </div>
               <div className="dev-detail-card">
                  <h3 className="dev-detail-title">Databases</h3>
                  <p className="dev-detail-content">MongoDB, PostgreSQL (basic understanding)</p>
               </div>
               <div className="dev-detail-card">
                  <h3 className="dev-detail-title">Integrations & Tools</h3>
                  <p className="dev-detail-content">Stripe, Razorpay, Multer, Cloudinary, Gemini, OpenAI, Git, Postman, Figma</p>
               </div>
            </div>
         </section>

         {/* Projects */}
         <section className="section">
            <h2 className="section-title">Projects</h2>
            <div className="projects-grid" style={{ gridTemplateColumns: '1fr' }}>
               <a href="https://github.com/mashroofmashru/Edusphere" target="_blank" rel="noreferrer" className="project-card" style={{ textAlign: 'left' }}>
                  <h3 className="project-name" style={{ fontSize: '1.4rem' }}>EduSphere – Online Learning Management Platform</h3>
                  <p className="project-desc" style={{ marginBottom: '1.5rem', color: 'var(--accent-color)', fontWeight: 500 }}>
                     Tech Stack: React (Vite), Tailwind CSS, Node.js, Express.js, MongoDB, JavaScript
                  </p>
                  <ul style={{ color: 'var(--text-muted)', fontSize: '1rem', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', lineHeight: '1.6' }}>
                     <li>Developed a full-stack online learning management platform for managing users, courses, and learning content.</li>
                     <li>Built a responsive frontend using React (Vite) and Tailwind CSS with reusable components and clean UI design.</li>
                     <li>Implemented MVC architecture to maintain clear separation of models, controllers, and routes.</li>
                     <li>Designed and developed RESTful APIs for authentication, course management, and content access.</li>
                     <li>Implemented JWT-based authentication with role-based access for students and administrators.</li>
                     <li>Designed structured MongoDB schemas for users, courses, and enrollments with proper relationships.</li>
                  </ul>
               </a>
               <a href="https://github.com/mashroofmashru/Carverse" target="_blank" rel="noreferrer" className="project-card" style={{ textAlign: 'left' }}>
                  <h3 className="project-name" style={{ fontSize: '1.4rem' }}>Carverse – Automotive Marketplace Platform</h3>
                  <p className="project-desc" style={{ marginBottom: '1.5rem', color: 'var(--accent-color)', fontWeight: 500 }}>
                     Tech Stack: React (Vite), Tailwind CSS, Node.js, Express.js, MongoDB, JavaScript
                  </p>
                  <ul style={{ color: 'var(--text-muted)', fontSize: '1rem', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', lineHeight: '1.6' }}>
                     <li>Built a full-stack automotive marketplace platform for browsing, listing, and managing car listings.</li>
                     <li>Developed a responsive frontend using React (Vite) and Tailwind CSS with dynamic data rendering.</li>
                     <li>Designed and implemented RESTful APIs using Node.js and Express.js.</li>
                     <li>Implemented JWT-based authentication and authorization for secured user actions.</li>
                     <li>Integrated image uploads for car listings using Multer and Cloudinary.</li>
                     <li>Structured MongoDB schemas for users and car listings with proper indexing.</li>
                  </ul>
               </a>
            </div>
         </section>

         {/* Mini Projects */}
         <section className="section">
            <h2 className="section-title">Mini Projects</h2>
            <div className="projects-grid">
               <div className="project-card" style={{ cursor: 'default', transform: 'none', textAlign: 'left' }}>
                  <h3 className="project-name">PortfolioBuilder</h3>
                  <p className="project-desc">A React (Vite) application that instantly generates responsive, themed developer portfolios using public GitHub data.</p>
               </div>
               <div className="project-card" style={{ cursor: 'default', transform: 'none', textAlign: 'left' }}>
                  <h3 className="project-name">GeminiClone</h3>
                  <p className="project-desc">Built a frontend-only AI chat interface using React (Vite) and Tailwind CSS. Integrated OpenAI API for real-time AI responses.</p>
               </div>
               <div className="project-card" style={{ cursor: 'default', transform: 'none', textAlign: 'left' }}>
                  <h3 className="project-name">Netflix Clone</h3>
                  <p className="project-desc">Built a Netflix-style frontend UI using React.js and Tailwind CSS. Integrated TMDB API to fetch and display real-time movie data.</p>
               </div>
            </div>
         </section>

         {/* Education */}
         <section className="section">
            <h2 className="section-title">Education</h2>
            <div className="timeline">
               <div className="timeline-item">
                  <div className="timeline-date" style={{ width: '120px', flexShrink: 0 }}>2023 – Present</div>
                  <div className="timeline-content" style={{ textAlign: 'left' }}>
                     <strong style={{ fontSize: '1.1rem', color: 'var(--text-color)' }}>Bachelor of Computer Applications (BCA)</strong><br />
                     <span style={{ color: 'var(--text-muted)' }}>SES College, Sreekandapuram — Affiliated to Kannur University</span>
                  </div>
               </div>
               <div className="timeline-item">
                  <div className="timeline-date" style={{ width: '120px', flexShrink: 0 }}>2021 – 2023</div>
                  <div className="timeline-content" style={{ textAlign: 'left' }}>
                     <strong style={{ fontSize: '1.1rem', color: 'var(--text-color)' }}>Higher Secondary Education – Bio Science</strong><br />
                     <span style={{ color: 'var(--text-muted)' }}>Government Higher Secondary School, Koyyam, Kannur</span>
                  </div>
               </div>
            </div>
         </section>
      </div>
   );
}
