/**
 * Repeated in every section: a title + subtitle + optional badges.
 * Extracting it removes ~40 lines of duplicated markup across App.jsx.
 */
const SectionHeader = ({ title, subtitle, badges }) => (
  <div className="section-header">
    <div>
      <h3 className="section-title">{title}</h3>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </div>
    {badges && badges.length > 0 && (
      <div className="badges">
        {badges.map(({ id, label, locked }) => (
          <span key={id} className={`badge${locked ? ' locked' : ''}`}>
            {label}
          </span>
        ))}
      </div>
    )}
  </div>
);

export default SectionHeader;
