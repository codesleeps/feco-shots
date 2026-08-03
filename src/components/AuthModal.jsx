import React, { useState, useEffect } from 'react';

export default function AuthModal({ isOpen, onClose, currentUser, onLoginSuccess, onLogout, userOrders = [] }) {
  const [mode, setMode] = useState('login'); // 'login', 'register', 'profile'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    if (currentUser) {
      setMode('profile');
      setName(currentUser.name || '');
      setEmail(currentUser.email || '');
      setPhone(currentUser.phone || '');
      setAddress(currentUser.address || '');
    } else {
      setMode('login');
    }
  }, [currentUser, isOpen]);

  if (!isOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !password) {
      setErrorMsg('Please enter both email and password.');
      return;
    }

    try {
      const users = JSON.parse(localStorage.getItem('feco_users') || '[]');
      const found = users.find((u) => u.email.toLowerCase() === cleanEmail && u.password === password);

      if (found) {
        onLoginSuccess(found);
        setSuccessMsg(`Welcome back, ${found.name || 'Member'}!`);
        setTimeout(() => {
          setSuccessMsg('');
          onClose();
        }, 1200);
      } else {
        // Allow instant quick-login demo fallback if credentials don't exist yet
        const demoUser = {
          name: cleanEmail.split('@')[0],
          email: cleanEmail,
          phone: '',
          address: '',
          memberSince: new Date().toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })
        };
        users.push({ ...demoUser, password });
        localStorage.setItem('feco_users', JSON.stringify(users));
        onLoginSuccess(demoUser);
        onClose();
      }
    } catch (err) {
      setErrorMsg('Authentication error. Please try again.');
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email.trim() || !password || !name.trim()) {
      setErrorMsg('Please fill in Name, Email, and Password.');
      return;
    }

    const newUser = {
      id: 'USR-' + Date.now(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      address: address.trim(),
      password,
      memberSince: new Date().toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })
    };

    try {
      const users = JSON.parse(localStorage.getItem('feco_users') || '[]');
      if (users.some((u) => u.email.toLowerCase() === newUser.email)) {
        setErrorMsg('An account with this email already exists.');
        return;
      }

      users.push(newUser);
      localStorage.setItem('feco_users', JSON.stringify(users));
      onLoginSuccess(newUser);
      setSuccessMsg('Account created successfully!');
      setTimeout(() => {
        setSuccessMsg('');
        onClose();
      }, 1200);
    } catch (err) {
      setErrorMsg('Failed to register account.');
    }
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    const updated = {
      ...currentUser,
      name: name.trim(),
      phone: phone.trim(),
      address: address.trim()
    };
    onLoginSuccess(updated);
    setSuccessMsg('Profile updated!');
    setTimeout(() => setSuccessMsg(''), 2500);
  };

  return (
    <React.Fragment>
      <div className="cart-backdrop" onClick={onClose} style={{ zIndex: 1060 }}></div>
      <div className="modal d-block" tabIndex="-1" role="dialog" style={{ zIndex: 1065 }}>
        <div className="modal-dialog modal-dialog-centered modal-md" role="document">
          <div className="modal-content bg-black border border-warning text-light shadow-lg">
            {/* Modal Header */}
            <div className="modal-header border-bottom border-warning p-3">
              <h4 className="modal-title text-warning fw-bold d-flex align-items-center mb-0">
                <i className="fas fa-user-circle me-2"></i>
                {currentUser ? 'My Account' : mode === 'login' ? 'Customer Sign In' : 'Create Account'}
              </h4>
              <button
                type="button"
                className="btn btn-link text-warning fs-2 p-0 text-decoration-none"
                onClick={onClose}
                aria-label="Close Modal"
                style={{ lineHeight: 1 }}
              >
                &times;
              </button>
            </div>

            {/* Modal Body */}
            <div className="modal-body p-4">
              {errorMsg && (
                <div className="alert alert-danger py-2 small mb-3">
                  <i className="fas fa-exclamation-circle me-1"></i> {errorMsg}
                </div>
              )}
              {successMsg && (
                <div className="alert alert-success py-2 small mb-3">
                  <i className="fas fa-check-circle me-1"></i> {successMsg}
                </div>
              )}

              {/* PROFILE DASHBOARD (LOGGED IN) */}
              {currentUser && mode === 'profile' ? (
                <div>
                  <div className="bg-dark border border-warning rounded p-3 mb-4 text-center">
                    <div className="bg-warning text-dark rounded-circle mx-auto d-flex align-items-center justify-content-center fw-bold fs-4 mb-2" style={{ width: '50px', height: '50px' }}>
                      {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <h5 className="text-warning fw-bold mb-0">{currentUser.name}</h5>
                    <div className="text-muted small">{currentUser.email}</div>
                    <span className="badge bg-warning text-dark mt-2">VIP Club Member</span>
                  </div>

                  <form onSubmit={handleUpdateProfile} className="mb-4">
                    <h6 className="text-warning fw-bold mb-2">Delivery & Contact Settings</h6>
                    <div className="mb-2">
                      <label className="form-label small text-muted mb-1">Full Name</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="form-control form-control-sm bg-black text-light border-secondary"
                      />
                    </div>
                    <div className="mb-2">
                      <label className="form-label small text-muted mb-1">Mobile Number (SMS)</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="form-control form-control-sm bg-black text-light border-secondary"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label small text-muted mb-1">Saved Delivery Address</label>
                      <textarea
                        rows="2"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="form-control form-control-sm bg-black text-light border-secondary"
                      ></textarea>
                    </div>
                    <button type="submit" className="btn btn-warning btn-sm w-100 fw-bold">
                      Save Profile Updates
                    </button>
                  </form>

                  {/* Recent Orders List */}
                  <h6 className="text-warning fw-bold mb-2">My Orders ({userOrders.length})</h6>
                  {userOrders.length === 0 ? (
                    <p className="text-muted small">No past orders found.</p>
                  ) : (
                    <div className="mb-3" style={{ maxHeight: '160px', overflowY: 'auto' }}>
                      {userOrders.map((ord) => (
                        <div key={ord.id} className="bg-dark border border-secondary rounded p-2 mb-2 d-flex justify-content-between align-items-center">
                          <div>
                            <div className="fw-bold small text-light">{ord.id}</div>
                            <div className="text-muted opacity-75" style={{ fontSize: '11px' }}>{ord.date} • £{ord.total ? ord.total.toFixed(2) : '0.00'}</div>
                          </div>
                          <span className={`badge ${ord.status === 'Completed' ? 'bg-success' : 'bg-warning text-dark'}`}>
                            {ord.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="border-top border-secondary pt-3 text-end">
                    <button
                      onClick={() => {
                        onLogout();
                        setMode('login');
                      }}
                      className="btn btn-outline-danger btn-sm"
                    >
                      <i className="fas fa-sign-out-alt me-1"></i> Sign Out
                    </button>
                  </div>
                </div>
              ) : mode === 'login' ? (
                /* SIGN IN FORM */
                <form onSubmit={handleLogin}>
                  <div className="mb-3">
                    <label className="form-label small text-muted">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-control bg-dark text-light border-secondary"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="form-label small text-muted">Password</label>
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="form-control bg-dark text-light border-secondary"
                    />
                  </div>
                  <button type="submit" className="btn btn-warning text-dark w-100 fw-bold py-2 mb-3">
                    Sign In
                  </button>
                  <div className="text-center small text-muted">
                    Don't have an account yet?{' '}
                    <button
                      type="button"
                      onClick={() => {
                        setErrorMsg('');
                        setMode('register');
                      }}
                      className="btn btn-link p-0 text-warning text-decoration-none fw-bold"
                    >
                      Register Now
                    </button>
                  </div>
                </form>
              ) : (
                /* REGISTER FORM */
                <form onSubmit={handleRegister}>
                  <div className="mb-2">
                    <label className="form-label small text-muted">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="form-control bg-dark text-light border-secondary"
                    />
                  </div>
                  <div className="mb-2">
                    <label className="form-label small text-muted">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-control bg-dark text-light border-secondary"
                    />
                  </div>
                  <div className="mb-2">
                    <label className="form-label small text-muted">Mobile Number (SMS)</label>
                    <input
                      type="tel"
                      placeholder="e.g. 07123456789"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="form-control bg-dark text-light border-secondary"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small text-muted">Password</label>
                    <input
                      type="password"
                      required
                      placeholder="Create password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="form-control bg-dark text-light border-secondary"
                    />
                  </div>
                  <button type="submit" className="btn btn-warning text-dark w-100 fw-bold py-2 mb-3">
                    Create VIP Account
                  </button>
                  <div className="text-center small text-muted">
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => {
                        setErrorMsg('');
                        setMode('login');
                      }}
                      className="btn btn-link p-0 text-warning text-decoration-none fw-bold"
                    >
                      Sign In
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
