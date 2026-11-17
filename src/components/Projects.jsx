import { Star, GitFork, ArrowUpRight } from 'lucide-react';

const LANG_COLORS = {
  JavaScript: '#F1E05A', TypeScript: '#3178C6', Python: '#3572A5', Java: '#B07219',
  HTML: '#E34C26', CSS: '#7B5BD6', 'C++': '#F34B7D', C: '#6B7280', 'C#': '#178600',
  Go: '#00ADD8', Rust: '#DEA584', PHP: '#4F5D95', Ruby: '#CC342D', Swift: '#F05138',
  Kotlin: '#A97BFF', Dart: '#00B4AB', Shell: '#89E051', Vue: '#41B883', SCSS: '#C6538C',
};

const formatDate = (iso) =>
  iso ? new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '';

function ProjectCard({ p, label }) {
  return (
    <a href={p.url} target="_blank" rel="noreferrer" className="gl-panel pf-project">
      <div className="pf-project-top">
        <span className="pf-rank">{label}</span>
        <ArrowUpRight size={18} aria-hidden="true" />
      </div>
      <h3>{p.name}</h3>
      <p>{p.description || 'No description provided.'}</p>
      <div className="pf-project-foot">
        {p.language ? (
          <span>
            <span className="lang-dot" style={LANG_COLORS[p.language] ? { background: LANG_COLORS[p.language] } : undefined} />
            {p.language}
          </span>
        ) : <span />}
        <span className="pf-project-stats">
          <span><Star size={14} aria-hidden="true" /> {p.stars}<span className="sr-only"> stars</span></span>
          <span><GitFork size={14} aria-hidden="true" /> {p.forks}<span className="sr-only"> forks</span></span>
        </span>
      </div>
    </a>
  );
}

export default function Projects({ projects }) {
  if (projects.length === 0) return null;
  return (
    <section aria-labelledby="projects-title">
      <div className="pf-head">
        <h2 className="pf-title" id="projects-title">Latest repositories</h2>
        <span className="eyebrow">recently updated</span>
      </div>
      <div className="pf-projects">
        {projects.map((p) => (
          <ProjectCard key={p.id} p={p} label={formatDate(p.pushedAt)} />
        ))}
      </div>
    </section>
  );
}
