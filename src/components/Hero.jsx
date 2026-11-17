import { useState } from 'react';
import { MapPin } from 'lucide-react';
import { GithubIcon } from './Icons';

const nf = new Intl.NumberFormat('en-US', { notation: 'compact' });

// Sticky profile card shown in the sidebar.
export default function Hero({ profile }) {
  const [imgFailed, setImgFailed] = useState(false);
  const initial = (profile.name || '?').charAt(0).toUpperCase();

  return (
    <section className="gl-panel pf-card pf-profile" aria-label="Profile">
      {imgFailed || !profile.avatar ? (
        <div className="pf-avatar pf-avatar--fallback" aria-hidden="true">{initial}</div>
      ) : (
        <img
          src={profile.avatar}
          alt={`${profile.name} avatar`}
          className="pf-avatar"
          width="128"
          height="128"
          onError={() => setImgFailed(true)}
        />
      )}
      <div>
        <h1 className="pf-name">{profile.name}</h1>
        {profile.login && <p className="pf-handle">@{profile.login}</p>}
      </div>
      {profile.bio && <p className="pf-bio">{profile.bio}</p>}
      {profile.location && (
        <span className="chip"><MapPin size={14} aria-hidden="true" /> {profile.location}</span>
      )}

      <ul className="pf-stats">
        <li><strong>{nf.format(profile.followers ?? 0)}</strong><span>Followers</span></li>
        <li><strong>{nf.format(profile.publicRepos ?? 0)}</strong><span>Repos</span></li>
        <li><strong>{nf.format(profile.totalStars ?? 0)}</strong><span>Stars</span></li>
      </ul>

      <a className="gl-btn pf-btn" href={profile.githubUrl} target="_blank" rel="noreferrer">
        <GithubIcon size={18} /> View on GitHub
      </a>
    </section>
  );
}
