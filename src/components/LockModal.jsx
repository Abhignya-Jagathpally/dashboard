import { useEffect, useId, useRef } from 'react';

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

/**
 * Accessible credentials modal.
 *
 * Fixes over the original inline modal:
 *   - role="dialog" + aria-modal + aria-labelledby
 *   - Escape key closes
 *   - Tab/Shift-Tab focus trap
 *   - Focus moves to first control on open, returns to trigger on close
 *   - useId() ensures input ids don't collide if rendered more than once
 */
const LockModal = ({ source, onClose }) => {
  const modalRef = useRef(null);
  const previousFocusRef = useRef(null);
  const titleId = useId();
  const accessId = useId();
  const contactId = useId();

  // Remember what had focus, focus the first control, restore on unmount.
  useEffect(() => {
    previousFocusRef.current = document.activeElement;
    const first = modalRef.current?.querySelector(FOCUSABLE_SELECTOR);
    first?.focus();
    return () => {
      if (previousFocusRef.current && typeof previousFocusRef.current.focus === 'function') {
        previousFocusRef.current.focus();
      }
    };
  }, []);

  // Escape to close + focus trap within the dialog.
  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        onClose();
        return;
      }
      if (event.key !== 'Tab') return;

      const focusables = modalRef.current?.querySelectorAll(FOCUSABLE_SELECTOR);
      if (!focusables || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        ref={modalRef}
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(event) => event.stopPropagation()}
      >
        <h3 id={titleId}>Credentials Required</h3>
        <p>
          Access to <strong>{source.name}</strong> is controlled ({source.access}). Provide
          credentials or approval details before downloading or syncing this dataset.
        </p>

        <label htmlFor={accessId}>Access ID or IRB approval</label>
        <input id={accessId} placeholder="Enter approval / access token" />

        <label htmlFor={contactId}>Contact email</label>
        <input id={contactId} type="email" placeholder="name@institution.edu" />

        <div className="modal-actions">
          <button type="button" disabled title="Demo build — wire to access endpoint">
            Request access
          </button>
          <button type="button" className="ghost" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LockModal;
