export default function Hero({ profile }) {
  return (
    <section className="hero-section">
      <img src={profile.avatar} alt={profile.name} className="hero-avatar" />
      <h1 className="hero-name">{profile.name}</h1>
      {profile.bio && <p className="hero-bio">{profile.bio}</p>}
      
      <div className="hero-meta">
        {profile.location && <span>📍 {profile.location}</span>}
        <span>👥 {profile.followers} Followers</span>
        <a href={profile.githubUrl} target="_blank" rel="noreferrer" style={{color: 'inherit'}}>🐙 GitHub</a>
      </div>
    </section>
  );
}
