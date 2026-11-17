// skills: [{ name, pct }] — share of code across the user's repositories
export default function Skills({ skills }) {
  if (skills.length === 0) return null;
  return (
    <section className="gl-panel pf-panel" aria-labelledby="skills-title">
      <div className="pf-head">
        <h2 className="pf-title" id="skills-title">Top languages</h2>
        <span className="eyebrow">by repo size</span>
      </div>
      <ul className="lang-list">
        {skills.map((s) => (
          <li className="lang-row" key={s.name}>
            <span className="lang-name">{s.name}</span>
            <div className="lang-track" role="img" aria-label={`${s.name} ${s.pct}%`}>
              <div className="lang-fill" style={{ width: `${Math.max(s.pct, 3)}%` }} />
            </div>
            <span className="lang-pct">{s.pct}%</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
