export default function Projects({ projects }) {
  if (projects.length === 0) return null;
  return (
    <section className="section" style={{animationDelay: '0.2s'}}>
      <h2 className="section-title">Featured Projects</h2>
      <div className="projects-grid">
        {projects.map(p => (
          <a href={p.url} target="_blank" rel="noreferrer" className="project-card" key={p.id}>
            <h3 className="project-name">{p.name}</h3>
            <p className="project-desc">{p.description || 'No description provided.'}</p>
            <div className="project-meta">
              <div className="project-stats">
                <span>⭐ {p.stars}</span>
                <span>🍴 {p.forks}</span>
              </div>
              {p.language && (
                <span style={{display: 'flex', alignItems: 'center', gap: '0.3rem'}}>
                  <span className="lang-dot"></span> {p.language}
                </span>
              )}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
