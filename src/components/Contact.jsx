import { Globe } from 'lucide-react';
import { LinkedinIcon, XIcon } from './Icons';

const ICONS = { website: Globe, linkedin: LinkedinIcon, twitter: XIcon };

export default function Contact({ links }) {
  if (links.length === 0) return null;
  return (
    <section className="gl-panel pf-card" aria-labelledby="contact-title">
      <p className="eyebrow" id="contact-title" style={{ marginBottom: 12 }}>Let's connect</p>
      <ul className="link-list">
        {links.map((l) => {
          const Icon = ICONS[l.type] || Globe;
          return (
            <li key={l.url}>
              <a href={l.url} target="_blank" rel="noreferrer">
                <Icon size={18} />
                <span>{l.label || l.type.charAt(0).toUpperCase() + l.type.slice(1)}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
