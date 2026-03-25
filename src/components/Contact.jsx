export default function Contact({ links }) {
  if (links.length === 0) return null;
  return (
    <section className="section" style={{animationDelay: '0.4s', textAlign: 'center'}}>
      <h2 className="section-title" style={{justifyContent: 'center'}}>
        <span style={{display: 'none'}}></span>
        Let's Connect
        <span style={{display: 'none'}}></span>
      </h2>
      <div className="contact-links" style={{marginTop: '2rem'}}>
        {links.map(l => (
          <a key={l.url} href={l.url} target="_blank" rel="noreferrer" className={`contact-link ${l.type}`}>
            {l.type === 'website' && '🌐'}
            {l.type === 'twitter' && '𝕏'}
            {l.type === 'linkedin' && '💼'}
            <span>{l.label || l.type.charAt(0).toUpperCase() + l.type.slice(1)}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
