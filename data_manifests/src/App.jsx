import { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import Nav from './components/Nav.jsx';
import Home from './pages/Home.jsx';
import Science from './pages/Science.jsx';
import SubAgents from './pages/SubAgents.jsx';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <section className="section">
          <h3 className="section-title">Something went wrong</h3>
          <p className="section-subtitle">
            An unexpected error occurred. Please refresh the page or try again later.
          </p>
        </section>
      );
    }
    return this.props.children;
  }
}

const App = () => (
  <div className="page">
    <Nav />
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/science" element={<Science />} />
        <Route path="/sub-agents" element={<SubAgents />} />
        <Route
          path="*"
          element={
            <section className="section">
              <h3 className="section-title">Not found</h3>
              <p className="section-subtitle">
                The page you requested doesn&apos;t exist. Return to the{' '}
                <a href="/">Dashboard</a>, explore the{' '}
                <a href="/science">Methodology</a>, or view the{' '}
                <a href="/sub-agents">Case Study</a>.
              </p>
            </section>
          }
        />
      </Routes>
    </ErrorBoundary>
    <footer className="footer">
      <div>ResistanceMap · Abhignya Jagathpally · PhD Candidate</div>
      <div>Multi-modal pharmacogenomic resistance forecasting for hematologic malignancies</div>
    </footer>
  </div>
);

export default App;
