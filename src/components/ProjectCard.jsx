import { Star, GitFork, ArrowUpRight } from 'lucide-react';
import { languageColor } from '../lib/languageColors';

// `label` is the small mono text in the top-left (e.g. the last-updated date).
export default function ProjectCard({ project: p, label }) {
  const color = languageColor(p.language);
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
            <span className="lang-dot" style={color ? { background: color } : undefined} />
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
