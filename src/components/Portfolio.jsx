import PortfolioHeader from './PortfolioHeader';
import Hero from './Hero';
import Contact from './Contact';
import Skills from './Skills';
import Projects from './Projects';
import useToast from '../hooks/useToast';

// The generated portfolio page: sticky profile sidebar + languages and latest repositories.
export default function Portfolio({ portfolio }) {
  const { profile, projects, skills, links } = portfolio;
  const toast = useToast();

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.show('Portfolio URL copied to clipboard!');
    } catch {
      toast.show('Could not copy. Copy the URL from the address bar.');
    }
  };

  return (
    <div className="container">
      <PortfolioHeader handleShare={handleShare} />
      <main className="pf">
        <aside className="pf-side">
          <Hero profile={profile} />
          <Contact links={links} />
        </aside>
        <div className="pf-main">
          <Skills skills={skills} />
          <Projects projects={projects} />
        </div>
      </main>

      <div className={`toast ${toast.message ? 'show' : ''}`} role="status" aria-live="polite">{toast.message}</div>
    </div>
  );
}
