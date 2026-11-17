import { Link2, Zap } from 'lucide-react';

export default function PortfolioHeader({ handleShare }) {
  return (
    <header className="gl-panel gl-nav">
      <a className="gl-brand" href="/" aria-label="PortfolioBuilder home">
        <span className="gl-badge gl-badge--sm"><Zap size={16} aria-hidden="true" /></span>
        PortfolioBuilder
      </a>
      {handleShare && (
        <div className="topbar-actions">
          <button type="button" className="gl-icon-btn" onClick={handleShare} aria-label="Copy portfolio link" title="Copy link">
            <Link2 size={18} />
          </button>
        </div>
      )}
    </header>
  );
}
