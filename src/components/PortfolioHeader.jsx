import { Moon, Sun, Link2, Zap } from 'lucide-react';

export default function PortfolioHeader({ mode, toggleTheme, handleShare }) {
  return (
    <header className="gl-panel gl-nav">
      <a className="gl-brand" href={`/?mode=${mode}`} aria-label="PortfolioBuilder home">
        <span className="gl-badge gl-badge--sm"><Zap size={16} aria-hidden="true" /></span>
        PortfolioBuilder
      </a>
      <div className="topbar-actions">
        <button
          type="button"
          className="gl-icon-btn"
          onClick={toggleTheme}
          aria-label={mode === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          title="Toggle theme"
        >
          {mode === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </button>
        {handleShare && (
          <button type="button" className="gl-icon-btn" onClick={handleShare} aria-label="Copy portfolio link" title="Copy link">
            <Link2 size={18} />
          </button>
        )}
      </div>
    </header>
  );
}
