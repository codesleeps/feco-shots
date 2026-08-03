import React, { useRef } from 'react';

export default function Navbar({ cartCount, onCartClick, pendingOrdersCount = 0, onOpenAdminOrders }) {
  const collapseRef = useRef(null);

  const closeNavbar = () => {
    if (collapseRef.current) {
      collapseRef.current.classList.remove('show');
      const toggler = document.querySelector('[data-mdb-target="#navbarExample01"]');
      if (toggler) toggler.setAttribute('aria-expanded', 'false');
    }
  };

  return (
    <nav className="navbar navbar-expand-lg fixed-top navbar">
      <div className="container-fluid">
        <button
          className="navbar-toggler text-white"
          type="button"
          data-mdb-toggle="collapse"
          data-mdb-target="#navbarExample01"
          aria-controls="navbarExample01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fas fa-bars text-warning"></i>
        </button>
        <div className="collapse navbar-collapse" id="navbarExample01" ref={collapseRef}>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link text-warning" href="#about" onClick={closeNavbar} aria-label="About Club Feco">
                About
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-warning" href="#smokeless" onClick={closeNavbar} aria-label="Read more about our Smokeless Range">
                Smokeless
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-warning" href="#shots" onClick={closeNavbar} aria-label="Read more about our CBD shots">
                Shots
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-warning" href="#cocktails" onClick={closeNavbar} aria-label="Read more about our Contender range">
                Contender
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-warning" href="#chocolates" onClick={closeNavbar} aria-label="Read more about our CBD chocolates">
                Chocolates
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link text-warning fw-bold"
                href="#cart"
                onClick={(e) => {
                  e.preventDefault();
                  closeNavbar();
                  onCartClick();
                }}
                aria-label="Open Shopping Cart"
              >
                <i className="fas fa-shopping-cart me-1"></i> Cart {cartCount > 0 && `(${cartCount})`}
              </a>
            </li>
          </ul>
        </div>
        
        <div className="d-flex align-items-center">
          {/* Store Owner Orders Button */}
          {onOpenAdminOrders && (
            <button
              onClick={onOpenAdminOrders}
              className="btn btn-outline-warning btn-sm me-3 position-relative d-flex align-items-center"
              style={{ borderRadius: '6px' }}
              title="Store Owner - View Orders"
            >
              <i className="fas fa-clipboard-list me-1"></i> Orders
              {pendingOrdersCount > 0 && (
                <span className="badge rounded-pill bg-danger ms-1">
                  {pendingOrdersCount}
                </span>
              )}
            </button>
          )}

          {/* Header Cart Button */}
          <button 
            onClick={onCartClick} 
            className="btn btn-warning text-dark font-weight-bold btn-sm me-3 position-relative d-flex align-items-center" 
            style={{ borderRadius: '6px', padding: '6px 14px' }}
            aria-label="Open Shopping Cart"
          >
            <i className="fas fa-shopping-cart me-1"></i> Cart
            {cartCount > 0 && (
              <span 
                className="badge rounded-pill bg-danger ms-2"
                style={{ fontSize: '11px' }}
              >
                {cartCount}
              </span>
            )}
          </button>

          <div className="dropdown">
            <a
              className="dropdown-toggle d-flex align-items-center hidden-arrow"
              href="#about"
              id="navbarDropdownMenuAvatar"
              role="button"
              data-mdb-toggle="dropdown"
              aria-expanded="false"
              aria-label="Club Feco Logo"
            >
              <img
                src="./img/logo/logo113x113.png"
                className="rounded-circle"
                width="75"
                height="75"
                alt="Brand Logo gold lion head with crown"
                loading="lazy"
              />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
