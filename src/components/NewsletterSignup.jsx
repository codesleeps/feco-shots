import React, { useState } from 'react';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subscribed, setSubscribed] = useState(() => {
    return localStorage.getItem('feco_newsletter_subscribed') === 'true';
  });
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanEmail = email.trim();
    const cleanPhone = phone.trim();

    if (!cleanEmail && !cleanPhone) {
      setErrorMsg('Please enter either an email address or a phone number.');
      return;
    }

    setErrorMsg('');
    const entry = {
      id: 'SUB-' + Math.floor(1000 + Math.random() * 9000),
      email: cleanEmail || 'N/A',
      phone: cleanPhone || 'N/A',
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
    };

    try {
      const existing = JSON.parse(localStorage.getItem('feco_newsletter') || '[]');
      existing.unshift(entry);
      localStorage.setItem('feco_newsletter', JSON.stringify(existing));
      localStorage.setItem('feco_newsletter_subscribed', 'true');
    } catch (err) {
      console.error('Failed to save newsletter subscriber:', err);
    }

    setSubscribed(true);
    setEmail('');
    setPhone('');
  };

  return (
    <section className="bg-black text-light py-5 border-top border-warning">
      <div className="container">
        <div className="row align-items-center g-4">
          <div className="col-lg-6">
            <h2 className="h3 fw-bold text-warning d-flex align-items-center">
              <i className="fas fa-paper-plane me-2"></i> Stay in the Loop
            </h2>
            <p className="mb-0 text-muted">
              Get instant updates on new flavors, limited drops, and exclusive offers by Email or SMS.
            </p>
          </div>
          <div className="col-lg-6">
            {subscribed ? (
              <div className="bg-dark border border-warning rounded p-3 text-center">
                <i className="fas fa-circle-check text-success fa-2x mb-2"></i>
                <h5 className="text-warning fw-bold mb-1">You're on the VIP List!</h5>
                <p className="small text-light mb-2">
                  Use promo code <strong className="text-warning bg-black px-2 py-1 rounded border border-warning">CLUBFECO10</strong> for 10% off your order.
                </p>
                <button 
                  className="btn btn-link btn-sm text-muted"
                  onClick={() => {
                    localStorage.removeItem('feco_newsletter_subscribed');
                    setSubscribed(false);
                  }}
                >
                  Subscribe another contact
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="row g-2">
                <div className="col-sm-5">
                  <input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control bg-dark text-light border-secondary"
                  />
                </div>
                <div className="col-sm-5">
                  <input
                    type="tel"
                    placeholder="Phone / Mobile (SMS)"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="form-control bg-dark text-light border-secondary"
                  />
                </div>
                <div className="col-sm-2">
                  <button type="submit" className="btn btn-warning text-dark w-100 fw-bold">
                    Sign Up
                  </button>
                </div>
                {errorMsg && (
                  <div className="col-12 text-danger small mt-1">
                    <i className="fas fa-exclamation-circle me-1"></i> {errorMsg}
                  </div>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
