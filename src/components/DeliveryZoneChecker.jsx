import React, { useState } from 'react';

export default function DeliveryZoneChecker({ onDeliveryAvailable }) {
  const [postcode, setPostcode] = useState(() => {
    return localStorage.getItem('feco_last_postcode') || '';
  });
  const [result, setResult] = useState(() => {
    const saved = localStorage.getItem('feco_last_delivery_result');
    try {
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });
  const [loading, setLoading] = useState(false);
  const [showZoneInfo, setShowZoneInfo] = useState(false);

  const allowedPrefixes = ['SW', 'SE', 'N', 'NW', 'W', 'E', 'EC', 'WC', 'BR', 'CR', 'DA', 'EN', 'HA', 'IG', 'KT', 'RM', 'SM', 'TN', 'TW', 'UB', 'WD'];

  const checkDelivery = (e) => {
    e.preventDefault();
    if (!postcode.trim()) return;
    setLoading(true);
    setResult(null);

    setTimeout(() => {
      const upper = postcode.trim().toUpperCase();
      const match = upper.match(/^[A-Z]{1,2}/);
      const prefix = match ? match[0] : '';
      const available = allowedPrefixes.includes(prefix);
      const estimate = available 
        ? 'Express Same-Day / Next-Day Local Delivery' 
        : 'Standard 3-5 Business Days Nationwide Courier';

      const resObj = { available, estimate, postcode: upper, prefix };
      setResult(resObj);
      setLoading(false);
      localStorage.setItem('feco_last_postcode', upper);
      localStorage.setItem('feco_last_delivery_result', JSON.stringify(resObj));
      if (onDeliveryAvailable) onDeliveryAvailable(available);
    }, 350);
  };

  const handleClear = () => {
    setPostcode('');
    setResult(null);
    localStorage.removeItem('feco_last_postcode');
    localStorage.removeItem('feco_last_delivery_result');
    if (onDeliveryAvailable) onDeliveryAvailable(null);
  };

  return (
    <div className="bg-dark text-light p-4 border border-warning rounded-3 shadow">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="h5 fw-bold text-warning mb-0 d-flex align-items-center">
          <i className="fas fa-truck-fast me-2"></i> Check Delivery Availability
        </h3>
        <button 
          className="btn btn-link btn-sm text-muted text-decoration-none p-0"
          onClick={() => setShowZoneInfo(!showZoneInfo)}
        >
          <i className="fas fa-info-circle me-1"></i> {showZoneInfo ? 'Hide Express Zones' : 'View Express Zones'}
        </button>
      </div>

      <form onSubmit={checkDelivery} className="row g-2 align-items-center">
        <div className="col-8 col-sm-9">
          <div className="input-group">
            <span className="input-group-text bg-black text-warning border-secondary">
              <i className="fas fa-location-dot"></i>
            </span>
            <input
              type="text"
              required
              placeholder="e.g. SW1A 1AA or E1 6AN"
              value={postcode}
              onChange={(e) => setPostcode(e.target.value)}
              className="form-control bg-black text-light border-secondary"
            />
          </div>
        </div>
        <div className="col-4 col-sm-3 d-flex gap-1">
          <button type="submit" className="btn btn-warning text-dark flex-grow-1 fw-bold" disabled={loading}>
            {loading ? <i className="fas fa-spinner fa-spin"></i> : 'Check'}
          </button>
          {result && (
            <button type="button" onClick={handleClear} className="btn btn-outline-secondary" title="Clear search">
              &times;
            </button>
          )}
        </div>
      </form>

      {result && (
        <div className={`mt-3 p-3 rounded border ${result.available ? 'bg-black border-success text-success' : 'bg-black border-warning text-warning'}`}>
          <div className="d-flex align-items-center">
            <i className={`fas ${result.available ? 'fa-circle-check text-success' : 'fa-clock text-warning'} fa-2x me-3`}></i>
            <div>
              <div className="fw-bold fs-6">
                {result.available ? `Express Delivery Available for ${result.postcode}!` : `Standard Courier Shipping for ${result.postcode}`}
              </div>
              <div className="small opacity-75">
                <i className="fas fa-shipping-fast me-1"></i> Estimated: {result.estimate}
              </div>
            </div>
          </div>
        </div>
      )}

      {showZoneInfo && (
        <div className="mt-3 p-3 bg-black border border-secondary rounded small text-muted">
          <strong className="text-warning d-block mb-1">Express Same-Day / Next-Day Postcode Zones:</strong>
          <span>SW, SE, N, NW, W, E, EC, WC, BR, CR, DA, EN, HA, IG, KT, RM, SM, TN, TW, UB, WD</span>
        </div>
      )}
    </div>
  );
}
