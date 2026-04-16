import { NavLink, Link, useLocation } from 'react-router-dom';

const HOME_ANCHORS = [
  { href: '#overview', label: 'Overview' },
  { href: '#pipeline', label: 'Pipeline' },
  { href: '#interpretability', label: 'Interpretability' },
  { href: '#governance', label: 'Governance' },
  { href: '#data', label: 'Data' },
  { href: '#api', label: 'API' },
];

const Nav = () => {
  const location = useLocation();
  const onHome = location.pathname === '/';

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
        {onHome &&
          HOME_ANCHORS.map((a) => (
            <a key={a.href} href={a.href}>
              {a.label}
            </a>
          ))}

        <NavLink
          to="/science"
          className={({ isActive }) => `nav-route${isActive ? ' nav-route--active' : ''}`}
        >
          Science
        </NavLink>
        <NavLink
          to="/sub-agents"
          className={({ isActive }) => `nav-route${isActive ? ' nav-route--active' : ''}`}
        >
          Sub-agents
        </NavLink>

        {!onHome && (
          <NavLink
            to="/"
            className={({ isActive }) => `nav-route${isActive ? ' nav-route--active' : ''}`}
            end
          >
            Dashboard
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default Nav;
