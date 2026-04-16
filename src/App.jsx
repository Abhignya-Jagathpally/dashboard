import { Routes, Route } from 'react-router-dom';
import Nav from './components/Nav.jsx';
import Home from './pages/Home.jsx';
import Science from './pages/Science.jsx';

const App = () => (
  <div className="page">
    <Nav />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/science" element={<Science />} />
      <Route
        path="*"
        element={
          <section className="section">
            <h3 className="section-title">Not found</h3>
            <p className="section-subtitle">The page you requested doesn&apos;t exist.</p>
          </section>
        }
      />
    </Routes>
    <footer className="footer">
      <div>ResistanceMap Dashboard · React static build</div>
      <div>GitHub Pages ready (base path: /dashboard/)</div>
    </footer>
  </div>
);

export default App;
