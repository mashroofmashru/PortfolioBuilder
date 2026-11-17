import { Rocket, Palette, Link2, BarChart3, ArrowRight } from 'lucide-react';
import PortfolioHeader from './PortfolioHeader';

const FEATURES = [
  { icon: Rocket, title: 'Instant generation', text: 'Your public GitHub data, read in real time and laid out for you.' },
  { icon: Palette, title: 'Clean, responsive design', text: 'A polished layout that looks great on any screen and keeps the focus on your work.' },
  { icon: Link2, title: 'One link to share', text: 'No sign-ups, no deployments. Copy the URL and send it.' },
  { icon: BarChart3, title: 'Language insights', text: 'Top languages and most-starred repositories, ranked on one page.' },
];

const STEPS = [
  { title: 'Enter a username', text: 'No sign-up and no OAuth permissions.' },
  { title: 'We fetch your data', text: 'Profile and top repositories from the public GitHub REST API.' },
  { title: 'Share your link', text: 'Your portfolio lives at a clean /username link.' },
];

const AUDIENCE = [
  { title: 'Job hunters', text: 'A clean summary for recruiters instead of a raw GitHub profile.' },
  { title: 'Open-source contributors', text: 'Your most-starred packages and the languages you use.' },
  { title: 'Students and graduates', text: 'Coursework and side projects, presented as a resume supplement.' },
];

export default function Landing({ handleStart, inputUsername, setInputUsername }) {
  const focusInput = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.getElementById('username')?.focus({ preventScroll: true });
  };

  return (
    <div className="container">
      <PortfolioHeader />

        <main>
          <section className="gl-panel gl-hero" aria-labelledby="hero-title">
            <p className="gl-eyebrow">GitHub → Portfolio</p>
            <h1 id="hero-title">Your GitHub, as a <span>portfolio</span> worth sharing.</h1>
            <p className="gl-sub">Enter a username. Get a responsive, shareable portfolio in seconds.</p>
            <form className="gl-form" onSubmit={handleStart}>
              <label htmlFor="username" className="sr-only">GitHub username</label>
              <input
                id="username"
                type="text"
                placeholder="github-username"
                value={inputUsername}
                onChange={(e) => setInputUsername(e.target.value)}
                autoComplete="off"
                autoCapitalize="off"
                spellCheck="false"
                maxLength={40}
                pattern="@?[A-Za-z0-9](?:[A-Za-z0-9\-]{0,38})"
                title="Letters, numbers and hyphens only (a valid GitHub username)"
                required
              />
              <button type="submit" className="gl-btn">
                Generate <ArrowRight size={18} aria-hidden="true" />
              </button>
            </form>
            <ul className="gl-pills">
              <li>Free</li>
              <li>No sign-up</li>
              <li>Public data only</li>
            </ul>
          </section>

          <section className="gl-section" aria-labelledby="features-title">
            <h2 className="gl-title" id="features-title">Why PortfolioBuilder</h2>
            <div className="gl-grid gl-grid--4">
              {FEATURES.map((f) => {
                const Icon = f.icon;
                return (
                  <article className="gl-panel gl-card" key={f.title}>
                    <span className="gl-badge"><Icon size={20} aria-hidden="true" /></span>
                    <h3>{f.title}</h3>
                    <p>{f.text}</p>
                  </article>
                );
              })}
            </div>
          </section>

          <section className="gl-section" aria-labelledby="how-title">
            <h2 className="gl-title" id="how-title">How it works</h2>
            <ol className="gl-panel gl-steps">
              {STEPS.map((s, i) => (
                <li key={s.title}>
                  <span className="gl-num">0{i + 1}</span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className="gl-section" aria-labelledby="who-title">
            <h2 className="gl-title" id="who-title">Who it's for</h2>
            <div className="gl-grid gl-grid--3">
              {AUDIENCE.map((a) => (
                <article className="gl-panel gl-card" key={a.title}>
                  <h3>{a.title}</h3>
                  <p>{a.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="gl-panel gl-cta" aria-labelledby="cta-title">
            <h2 id="cta-title">Ready when you are.</h2>
            <button type="button" className="gl-btn" onClick={focusInput}>
              Generate your portfolio <ArrowRight size={18} aria-hidden="true" />
            </button>
          </section>
        </main>

        <footer className="gl-footer">
          <span>Built with React &amp; the GitHub REST API</span>
          <a href="https://mashroof.in">About the developer</a>
        </footer>
    </div>
  );
}
