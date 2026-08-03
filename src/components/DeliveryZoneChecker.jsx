import React, { useState } from 'react';

export default function DeliveryZoneChecker({ onDeliveryAvailable }) {
  const [postcode, setPostcode] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const allowedPrefixes = ['SW', 'SE', 'N', 'NW', 'W', 'E', 'EC', 'WC', 'BR', 'CR', 'DA', 'EN', 'IG', 'KT', 'RM', 'SM', 'TN', 'TW', 'UB', 'W', 'WD'];

  const checkDelivery = (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      const upper = postcode.trim().toUpperCase();
      const available = allowedPrefixes.some((prefix) => upper.startsWith(prefix));
      const estimate = available ? 'Same day or next day' : '3-5 business days';
      setResult({ available, estimate, postcode: upper });
      setLoading(false);
      if (onDeliveryAvailable) onDeliveryAvailable(available);
    }, 600);
  };

  return (
    <div className="bg-dark text-light p-3 border border-secondary rounded">
      <h3 className="h6 fw-bold text-warning mb-2">Check Delivery</h3>
      <form onSubmit={checkDelivery} className="row g-2">
        <div className="col-8">
          <input
            type="text"
            required
            placeholder="Enter postcode"
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
            className="form-control bg-black text-light border-secondary"
          />
        </div>
        <div className="col-4">
          <button type="submit" className="btn btn-warning text-dark w-100 fw-bold" disabled={loading}>
            {loading ? 'Checking...' : 'Check'}
          </button>
        </div>
      </form>
      {result && (
        <div className={`mt-2 small ${result.available ? 'text-success' : 'text-danger'}`}>
          {result.available ? (
            <>Delivers to {result.postcode} — estimated: {result.estimate}</>
          ) : (
            <>Sorry, {result.postcode} is outside our standard delivery zone — estimated: {result.estimate}</>
          )}
        </div>
      )}
    </div>
  );
}
