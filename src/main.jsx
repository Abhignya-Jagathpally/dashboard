import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App.jsx';
import './styles.css';

// HashRouter is used (vs BrowserRouter) because GitHub Pages has no
// SPA fallback — direct navigation to /dashboard/science would 404.
// Hash routing sidesteps this entirely: URLs look like
// https://user.github.io/dashboard/#/science
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
);
