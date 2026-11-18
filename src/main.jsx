import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { redirectLegacyUrl } from './lib/routing'

// Rewrite old /?username=foo links to /foo before the app reads the URL.
redirectLegacyUrl()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
