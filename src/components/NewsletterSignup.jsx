import React, { useState } from 'react';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const entry = {
      email: email.trim(),
      phone: phone.trim(),
      date: new Date().toISOString()
    };
    const existing = JSON.parse(localStorage.getItem('feco_newsletter') || '[]');
    existing.push(entry);
    localStorage.setItem('feco_newsletter', JSON.stringify(existing));
    setSubscribed(true);
    setEmail('');
    setPhone('');
  };

  return (
    <section className="bg-black text-light py-5 border-top border-warning">
      <div className="container">
        <div className="row align-items-center g-4">
          <div className="col-lg-6">
            <h2 className="h3 fw-bold text-warning">Stay in the loop</h2>
            <p className="mb-0">
              Get updates on new flavors, limited drops, and exclusive offers by email or SMS.
            </p>
          </div>
          <div className="col-lg-6">
            {subscribed ? (
              <div className="alert alert-success py-2">You're on the list!</div>
            ) : (
              <form onSubmit={handleSubmit} className="row g-2">
                <div className="col-sm-5">
                  <input
                    type="email"
                    required
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control bg-dark text-light border-secondary"
                  />
                </div>
                <div className="col-sm-5">
                  <input
                    type="tel"
                    placeholder="Phone number"
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
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
