import React, { useState } from 'react';

export default function OwnerPinModal({ isOpen, onClose, onSuccess }) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedPin = localStorage.getItem('feco_owner_pin') || '1234';
    if (pin === storedPin) {
      setError('');
      setPin('');
      onSuccess();
    } else {
      setError('Incorrect PIN. Try default (1234)');
    }
  };

  const handleClose = () => {
    setPin('');
    setError('');
    onClose();
  };

  return (
    <React.Fragment>
      <div className="cart-backdrop" onClick={handleClose} style={{ zIndex: 1045 }}></div>
      <div className="modal d-block" tabIndex="-1" role="dialog" style={{ zIndex: 1048 }}>
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content bg-black border border-warning text-light p-3">
            <div className="modal-header border-bottom border-warning pb-2">
              <h5 className="modal-title text-warning fw-bold d-flex align-items-center">
                <i className="fas fa-lock me-2"></i> Owner Access Required
              </h5>
              <button
                type="button"
                className="btn btn-link text-warning fs-2 p-0 text-decoration-none"
                onClick={handleClose}
                aria-label="Close Modal"
                style={{ lineHeight: 1 }}
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSubmit} className="modal-body py-4">
              <p className="text-muted fs-6 mb-3">
                Please enter your store owner 4-digit PIN to access customer orders.
              </p>

              {error && <div className="alert alert-danger py-2 mb-3">{error}</div>}

              <div className="mb-4">
                <label className="form-label text-light fs-5">4-Digit PIN</label>
                <input
                  type="password"
                  maxLength="6"
                  className="form-control bg-dark text-warning border-warning fs-3 text-center py-2"
                  style={{ letterSpacing: '8px' }}
                  placeholder="••••"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  autoFocus
                  required
                />
                <div className="form-text text-muted small mt-2">Default PIN: 1234</div>
              </div>

              <div className="d-grid gap-2">
                <button type="submit" className="btn btn-warning text-dark font-weight-bold py-2">
                  Unlock Orders Dashboard
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
