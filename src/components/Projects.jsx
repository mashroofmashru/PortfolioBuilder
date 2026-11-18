import ProjectCard from './ProjectCard';
import { formatDate } from '../lib/format';

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
          <ProjectCard key={p.id} project={p} label={formatDate(p.pushedAt)} />
        ))}
      </div>
    </section>
  );
}
