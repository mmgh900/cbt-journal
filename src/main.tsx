import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './lib/i18n'; // Initialize i18n


// Register service worker in production
if (import.meta.env.PROD && 'serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
        .then(registration => {
            console.log('SW registered: ', registration.scope);
        })
        .catch(error => {
            console.log('SW registration failed: ', error);
        });
}

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App />
    </StrictMode>,
)
