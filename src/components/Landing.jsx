export default function Landing({ handleStart, inputUsername, setInputUsername }) {
  return (
    <div className="home-layout">
      <header className="home-header">
        <div className="container">
          <h1 className="home-logo">PortfolioBuilder ⚡</h1>
          <p className="home-tagline">Stop building portfolios from scratch. Provide your GitHub username and instantly generate a stunning, responsive portfolio ready to share with the world.</p>
        </div>
      </header>

      <main className="container home-main">
        <div className="home-hero-grid">
          {/* Input Section */}
          <div className="landing-card home-card">
            <h2>Generate Yours Now</h2>
            <p>It's completely free. Just enter your username.</p>
            
            <form onSubmit={handleStart}>
              <div className="form-group">
                <label htmlFor="username">GitHub Username *</label>
                <input 
                  id="username"
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. torvalds"
                  value={inputUsername}
                  onChange={(e) => setInputUsername(e.target.value)}
                  required
                />
              </div>
              
              <button type="submit" className="btn-primary">Generate Portfolio</button>
            </form>
          </div>

          {/* Features Info Section */}
          <div className="section" style={{ marginTop: '5rem', animationDelay: '0.2s' }}>
            <h2 className="section-title" style={{ justifyContent: 'center' }}>
              <span style={{ display: 'none' }}></span>
              Why Choose PortfolioBuilder?
              <span style={{ display: 'none' }}></span>
            </h2>
            <div className="features-grid">
              <div className="feature-item">
                <div className="feature-icon">🚀</div>
                <h3>Instant Generation</h3>
                <p>We fetch your public GitHub data in real-time and construct a beautiful layout based on your repositories, languages, and activity.</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">🎨</div>
                <h3>Beautiful Themes</h3>
                <p>Enjoy a responsive design featuring glassmorphism, native dark/light modes, and a layout that focuses entirely on your work.</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">🔗</div>
                <h3>Easy Sharing</h3>
                <p>Your generated portfolio acts as a shareable link. No sign ups, no deployments necessary. Just copy the URL and send it to recruiters.</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">📊</div>
                <h3>Insights & Activity</h3>
                <p>We automatically calculate your top languages and summarize your recent GitHub contributions all on one page.</p>
              </div>
            </div>
          </div>

          {/* How It Works Section */}
          <div className="section" style={{ marginTop: '4rem', animationDelay: '0.3s' }}>
            <h2 className="section-title" style={{ justifyContent: 'center' }}>
              <span style={{ display: 'none' }}></span>
              How It Works
              <span style={{ display: 'none' }}></span>
            </h2>
            <div className="steps-container">
              <div className="step-card">
                <div className="step-number">1</div>
                <h4>Provide Username</h4>
                <p>Simply type in your GitHub username above. No tedious sign-ups or OAuth permissions required.</p>
              </div>
              <div className="step-card">
                <div className="step-number">2</div>
                <h4>We Fetch Your Data</h4>
                <p>Our site queries the public GitHub REST API for your profile, top-starred repositories, and latest events.</p>
              </div>
              <div className="step-card">
                <div className="step-number">3</div>
                <h4>Share Your Link</h4>
                <p>Your beautiful portfolio is created instantly. The URL saves your state, ready to be sent to anyone.</p>
              </div>
            </div>
          </div>

          {/* Audience Section */}
          <div className="section" style={{ marginTop: '4rem', animationDelay: '0.4s', textAlign: 'center' }}>
            <h2 className="section-title" style={{ justifyContent: 'center' }}>
              <span style={{ display: 'none' }}></span>
              Who Is This For?
              <span style={{ display: 'none' }}></span>
            </h2>
            <div className="audience-grid">
              <div className="audience-card">
                <h4>💼 Job Hunters</h4>
                <p>Stand out to recruiters with a clean, professional summary of your code, instead of just a raw GitHub profile.</p>
              </div>
              <div className="audience-card">
                <h4>🔥 OSS Contributors</h4>
                <p>Showcase your latest pull requests, issues, and top starred packages in a beautiful timeline.</p>
              </div>
              <div className="audience-card">
                <h4>🎓 Students & Grads</h4>
                <p>Turn your school assignments and personal projects into a compelling resume supplement automatically.</p>
              </div>
            </div>
          </div>

          <div className="cta-banner" style={{ marginTop: '3rem', textAlign: 'center', padding: '3rem 1rem', background: 'var(--card-bg)', borderRadius: '20px', border: '1px solid var(--glass-border)' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--text-color)' }}>Ready to look professional?</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Scroll back up to the top and generate your free portfolio in 3 seconds flat.</p>
            <button className="btn-primary" style={{ maxWidth: '250px' }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              Get Started Now
            </button>
          </div>
        </div>
      </main>
      
      <footer className="home-footer">
        <p>Built with React & GitHub REST API. 
           &nbsp;•&nbsp; <a href="/developer" style={{ color: 'var(--accent-color)', fontWeight: 500, textDecoration: 'none' }}>About the Developer</a>
        </p>
      </footer>
    </div>
  );
}
