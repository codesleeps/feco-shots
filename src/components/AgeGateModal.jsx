import React, { useState, useEffect } from 'react';

export default function AgeGateModal() {
  const [isVerified, setIsVerified] = useState(true);
  const [underAge, setUnderAge] = useState(false);

  useEffect(() => {
    const ageVerified = localStorage.getItem('feco_age_verified');
    if (!ageVerified) {
      setIsVerified(false);
    }
  }, []);

  const handleConfirmAge = () => {
    localStorage.setItem('feco_age_verified', 'true');
    setIsVerified(true);
  };

  const handleUnderAge = () => {
    setUnderAge(true);
  };

  if (isVerified) return null;

  return (
    <React.Fragment>
      <div className="cart-backdrop" style={{ zIndex: 2000, background: 'rgba(0,0,0,0.95)' }}></div>
      <div className="modal d-block" tabIndex="-1" role="dialog" style={{ zIndex: 2005 }}>
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content bg-black border border-warning text-light p-4 text-center">
            <div className="mb-3">
              <img
                src="./img/logo/leaf.png"
                alt="Club Feco Leaf Logo"
                width="60"
                height="55"
                className="mb-2"
              />
              <h3 className="text-warning fw-bold">Age Verification Required</h3>
            </div>

            {underAge ? (
              <div className="py-4">
                <i className="fas fa-exclamation-triangle fa-3x text-danger mb-3"></i>
                <h5 className="text-danger fw-bold mb-3">Access Restricted</h5>
                <p className="text-muted fs-5">
                  You must be 18 years of age or older to enter Club Feco and view our infused products.
                </p>
                <button
                  className="btn btn-outline-warning mt-3"
                  onClick={() => setUnderAge(false)}
                >
                  Back to Age Check
                </button>
              </div>
            ) : (
              <div className="py-3">
                <p className="fs-4 mb-4">
                  Welcome to <strong>Club Feco</strong>. Are you at least 18 years of age?
                </p>

                <div className="d-grid gap-3 d-sm-flex justify-content-sm-center">
                  <button
                    className="btn btn-warning btn-lg px-4 font-weight-bold text-dark me-sm-2"
                    onClick={handleConfirmAge}
                    style={{ letterSpacing: '1px', borderRadius: '6px' }}
                  >
                    <i className="fas fa-check-circle me-2"></i> YES, I AM 18 OR OLDER
                  </button>
                  <button
                    className="btn btn-outline-secondary btn-lg px-4"
                    onClick={handleUnderAge}
                    style={{ borderRadius: '6px' }}
                  >
                    I AM UNDER 18
                  </button>
                </div>
                <p className="text-muted small mt-4 mb-0">
                  By entering, you confirm you are of legal age to view infused product content in your jurisdiction.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
