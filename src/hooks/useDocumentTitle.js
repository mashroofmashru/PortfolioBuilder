import { useEffect } from 'react';

const DEFAULT_TITLE = 'PortfolioBuilder — Turn your GitHub into a portfolio';

// "<name> — Portfolio" while a portfolio is shown, the default title otherwise.
export default function useDocumentTitle(name) {
  useEffect(() => {
    document.title = name ? `${name} — Portfolio` : DEFAULT_TITLE;
  }, [name]);
}
