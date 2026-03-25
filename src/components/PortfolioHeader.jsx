export default function PortfolioHeader({ mode, toggleTheme, handleShare }) {
  return (
    <header className="portfolio-header">
      <div style={{ fontWeight: 700, letterSpacing: '-0.5px' }}></div>
      <div className="portfolio-actions">
        <button className="icon-btn" onClick={toggleTheme} title="Toggle Theme">
          {mode === 'light' ? '🌙' : '☀️'}
        </button>
        <button className="icon-btn" onClick={handleShare} title="Share">🔗</button>
      </div>
    </header>
  );
}
