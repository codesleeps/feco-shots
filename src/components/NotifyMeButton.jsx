import React, { useState } from 'react';

export default function NotifyMeButton({ productKey, flavor, onNotify }) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const entry = { productKey, flavor, email, date: new Date().toISOString() };
    const existing = JSON.parse(localStorage.getItem('feco_notify_me') || '[]');
    existing.push(entry);
    localStorage.setItem('feco_notify_me', JSON.stringify(existing));
    setSubmitted(true);
    if (onNotify) onNotify(entry);
  };

  return (
    <div className="mt-2">
      {submitted ? (
        <div className="alert alert-success py-2">We'll notify you when this is back in stock.</div>
      ) : (
        <form onSubmit={handleSubmit} className="row g-2">
          <div className="col-sm-8">
            <input
              type="email"
              required
              placeholder="Email for restock alert"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control bg-dark text-light border-secondary"
            />
          </div>
          <div className="col-sm-4">
            <button type="submit" className="btn btn-outline-warning w-100">Notify Me</button>
          </div>
        </form>
      )}
    </div>
  );
}
