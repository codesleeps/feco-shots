import React from 'react';

export default function ProductSearchBar({ searchTerm, setSearchTerm, activeCategory, setActiveCategory }) {
  const categories = [
    { id: 'all', label: 'All Products' },
    { id: 'smokeless', label: 'Smokeless Range' },
    { id: 'shots', label: 'Feco Shots' },
    { id: 'cocktails', label: 'Contender Selection' },
    { id: 'chocolates', label: 'Chocolates' }
  ];

  return (
    <section className="bg-black py-4 border-top border-bottom border-secondary">
      <div className="container">
        <div className="row g-3 align-items-center">
          {/* Search Box */}
          <div className="col-md-5">
            <div className="input-group">
              <span className="input-group-text bg-dark text-warning border-secondary">
                <i className="fas fa-search"></i>
              </span>
              <input
                type="text"
                className="form-control bg-dark text-light border-secondary py-2"
                placeholder="Search flavors, strength (250mg), or product..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  className="btn btn-dark text-warning border-secondary"
                  onClick={() => setSearchTerm('')}
                  title="Clear search"
                >
                  &times;
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Chips */}
          <div className="col-md-7">
            <div className="d-flex flex-wrap gap-2 justify-content-md-end">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`btn btn-sm ${
                    activeCategory === cat.id ? 'btn-warning text-dark fw-bold' : 'btn-outline-secondary text-light'
                  }`}
                  style={{ borderRadius: '20px', padding: '6px 14px' }}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
