import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

// Grab the root element from index.html
const rootElement = document.getElementById('root');

// Create a React root (React 18+)
const root = createRoot(rootElement);

// Render your app inside StrictMode for dev checks
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

