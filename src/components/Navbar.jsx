import React from 'react';

export default function Navbar({ cartCount, onCartClick }) {
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
        <div className="collapse navbar-collapse" id="navbarExample01">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link text-warning" href="#about" aria-label="About Club Feco">
                About
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-warning" href="#smokeless" aria-label="Read more about our Smokeless Range">
                Smokeless
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-warning" href="#shots" aria-label="Read more about our CBD shots">
                Shots
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-warning" href="#cocktails" aria-label="Read more about our CBD cocktails">
                Cocktails
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-warning" href="#chocolates" aria-label="Read more about our CBD chocolates">
                Chocolates
              </a>
            </li>
          </ul>
        </div>
        
        <div className="d-flex align-items-center">
          {/* Header Cart Button */}
          <button 
            onClick={onCartClick} 
            className="btn btn-link text-warning me-3 position-relative" 
            style={{ padding: '8px' }}
            aria-label="Toggle Cart View"
          >
            <i className="fas fa-shopping-cart fa-lg"></i>
            {cartCount > 0 && (
              <span 
                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                style={{ fontSize: '10px' }}
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
                src="/app/img/logo/logo113x113.png"
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
