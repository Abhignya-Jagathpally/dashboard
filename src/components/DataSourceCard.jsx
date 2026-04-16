/**
 * Single data source card. Locked sources are keyboard-activatable
 * buttons that open the LockModal; open sources are plain cards.
 *
 * Splitting this out of App.jsx removes the `role={locked ? 'button' : undefined}`
 * / `tabIndex={locked ? 0 : -1}` branching, which was harder to read than
 * two explicit variants.
 */
const DataSourceCard = ({ source, onLockClick }) => {
  if (!source.locked) {
    return (
      <div className="card">
        <span className="pill">{source.type}</span>
        <h4>{source.name}</h4>
        <p>Access: {source.access}</p>
        <div className="badges">
          <span className="badge">Open access</span>
          <span className="badge">{source.size}</span>
        </div>
      </div>
    );
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onLockClick(source);
    }
  };

  return (
    <div
      className="card card--interactive"
      role="button"
      tabIndex={0}
      aria-haspopup="dialog"
      onClick={() => onLockClick(source)}
      onKeyDown={handleKeyDown}
    >
      <span className="pill">{source.type}</span>
      <h4>{source.name}</h4>
      <p>Access: {source.access}</p>
      <div className="badges">
        <span className="badge locked">Credentials required</span>
        <span className="badge">{source.size}</span>
      </div>
    </div>
  );
};

export default DataSourceCard;
