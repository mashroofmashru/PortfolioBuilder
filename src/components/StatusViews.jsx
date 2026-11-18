export function LoadingView({ username }) {
  return (
    <div className="container loading-view" role="status" aria-live="polite">
      <div className="spinner"></div>
      <h2>Building portfolio for {username}…</h2>
    </div>
  );
}

export function ErrorView({ message, onRetry }) {
  return (
    <div className="container loading-view">
      <div className="tile error-tile" role="alert">
        <h2>Couldn't load this portfolio</h2>
        <p>{message}</p>
        <button type="button" onClick={onRetry} className="btn">Try another username</button>
      </div>
    </div>
  );
}
