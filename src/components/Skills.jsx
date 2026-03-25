export default function Skills({ skills }) {
  if (skills.length === 0) return null;
  return (
    <section className="section" style={{animationDelay: '0.1s'}}>
      <h2 className="section-title">Top Languages</h2>
      <div className="skills-container">
        {skills.map(skill => (
          <div key={skill} className="skill-bubble">{skill}</div>
        ))}
      </div>
    </section>
  );
}
