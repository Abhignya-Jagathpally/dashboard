import { NavLink, Link, useLocation } from 'react-router-dom';

const HOME_ANCHORS = [
  { id: 'overview', label: 'Overview' },
  { id: 'interpretability', label: 'Interpretability' },
  { id: 'governance', label: 'Governance' },
  { id: 'data', label: 'Data Sources' },
];

const Nav = () => {
  const location = useLocation();
  const onHome = location.pathname === '/';

  const scrollTo = (e, id) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="nav" aria-label="Primary">
      <Link to="/" className="brand">
        <div className="brand-mark" aria-hidden="true" />
        <div>
          <h1>ResistanceMap</h1>
          <div className="brand-tagline">Agentic multi-omics resistance intelligence</div>
        </div>
      </Link>

      <div className="nav-links">
        <NavLink
          to="/"
          className={({ isActive }) => `nav-route${isActive ? ' nav-route--active' : ''}`}
          end
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/science"
          className={({ isActive }) => `nav-route${isActive ? ' nav-route--active' : ''}`}
        >
          Methodology
        </NavLink>
        <NavLink
          to="/sub-agents"
          className={({ isActive }) => `nav-route${isActive ? ' nav-route--active' : ''}`}
        >
          Case Study
        </NavLink>

        {onHome &&
          HOME_ANCHORS.map((a) => (
            <a
              key={a.id}
              href={`#${a.id}`}
              onClick={(e) => scrollTo(e, a.id)}
            >
              {a.label}
            </a>
          ))}
      </div>
    </nav>
  );
};

export default Nav;
