import React, { useRef } from 'react';

export default function Navbar({ cartCount, onCartClick, wishlistCount = 0, onWishlistClick, pendingOrdersCount = 0, onOpenAdminOrders, onOpenTracking }) {
  const collapseRef = useRef(null);

  const closeNavbar = () => {
    if (collapseRef.current) {
      collapseRef.current.classList.remove('show');
      const toggler = document.querySelector('[data-mdb-target="#navbarExample01"]');
      if (toggler) toggler.setAttribute('aria-expanded', 'false');
    }
  };

  return (
    <nav className="navbar navbar-expand-lg fixed-top bg-black border-bottom border-warning py-1 py-lg-2">
      <div className="container-fluid px-2 px-sm-3">
        <div className="d-flex align-items-center me-2">
          <button
            className="navbar-toggler text-white me-2 p-1"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarExample01"
            aria-controls="navbarExample01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars text-warning fs-3"></i>
          </button>
          
          <a className="navbar-brand me-1 p-0 d-flex align-items-center" href="#about">
            <img
              src="./img/logo/logo113x113.png"
              className="rounded-circle"
              width="50"
              height="50"
              alt="Club Feco Logo"
              loading="lazy"
            />
          </a>
        </div>

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
        
        {/* Responsive Header Action Buttons Container */}
        <div className="d-flex flex-wrap align-items-center justify-content-end gap-1 ms-auto py-1">
          {/* Track Order */}
          {onOpenTracking && (
            <button
              onClick={onOpenTracking}
              className="btn btn-outline-info btn-sm px-2 py-1 d-flex align-items-center"
              style={{ borderRadius: '6px', fontSize: '12px' }}
              title="Track your order"
            >
              <i className="fas fa-truck me-1"></i> Track
            </button>
          )}

          {/* Store Owner Orders Button */}
          {onOpenAdminOrders && (
            <button
              onClick={onOpenAdminOrders}
              className="btn btn-outline-warning btn-sm px-2 py-1 position-relative d-flex align-items-center"
              style={{ borderRadius: '6px', fontSize: '12px' }}
              title="Store Owner - View Orders"
            >
              <i className="fas fa-clipboard-list me-1"></i> Orders
              {pendingOrdersCount > 0 && (
                <span className="badge rounded-pill bg-danger ms-1" style={{ fontSize: '10px' }}>
                  {pendingOrdersCount}
                </span>
              )}
            </button>
          )}

          {/* Wishlist Button */}
          {onWishlistClick && (
            <button
              onClick={onWishlistClick}
              className="btn btn-outline-danger btn-sm px-2 py-1 position-relative d-flex align-items-center"
              style={{ borderRadius: '6px', fontSize: '12px' }}
              title="Wishlist"
            >
              <i className="fas fa-heart me-1"></i> Wishlist
              {wishlistCount > 0 && (
                <span className="badge rounded-pill bg-danger ms-1" style={{ fontSize: '10px' }}>{wishlistCount}</span>
              )}
            </button>
          )}

          {/* Header Cart Button */}
          <button 
            onClick={onCartClick} 
            className="btn btn-warning text-dark font-weight-bold btn-sm px-2 py-1 d-flex align-items-center" 
            style={{ borderRadius: '6px', fontSize: '12px' }}
            aria-label="Open Shopping Cart"
          >
            <i className="fas fa-shopping-cart me-1"></i> Cart
            {cartCount > 0 && (
              <span 
                className="badge rounded-pill bg-danger ms-1"
                style={{ fontSize: '10px' }}
              >
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
