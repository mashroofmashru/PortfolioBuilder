import { useMemo } from 'react';
import Landing from './components/Landing';
import Portfolio from './components/Portfolio';
import { LoadingView, ErrorView } from './components/StatusViews';
import usePortfolio from './hooks/usePortfolio';
import useDocumentTitle from './hooks/useDocumentTitle';
import { buildPortfolio } from './lib/portfolio';

// Chooses which screen to show: landing, loading, error or the generated portfolio.
function App() {
  const { username, loading, error, data, start, goHome } = usePortfolio();
  const portfolio = useMemo(() => (data ? buildPortfolio(data) : null), [data]);
  useDocumentTitle(portfolio?.profile.name);

  if (!username) return <Landing onStart={start} />;
  if (loading) return <LoadingView username={username} />;
  if (error) return <ErrorView message={error} onRetry={goHome} />;
  if (!portfolio) return null;
  return <Portfolio portfolio={portfolio} />;
}

export default App;
