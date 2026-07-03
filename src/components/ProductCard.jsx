import React, { useState } from 'react';

export default function ProductCard({
  imgSrc,
  imgAlt,
  flavors,
  quantities,
  borderColorClass = 'border-warning',
  buttonId,
  ratingText = '⭐⭐⭐⭐⭐',
  onAddToCart,
  imageMap
}) {
  const [selectedFlavor, setSelectedFlavor] = useState(flavors[0]?.value || '');
  const [selectedQuantity, setSelectedQuantity] = useState(quantities[0]?.value || '');

  const handleOrderSubmit = () => {
    onAddToCart(selectedFlavor, selectedQuantity);
  };

  // Resolve current image dynamically based on selected flavor mapping
  const currentImgSrc = (imageMap && imageMap[selectedFlavor]) || imgSrc;

  return (
    <div className="col">
      <div className={`card h-100 border border-3 ${borderColorClass}`}>
        <img
          src={currentImgSrc}
          className="card-img-top"
          alt={imgAlt}
          loading="lazy"
          style={{ objectFit: 'cover', height: '225px' }}
        />
        <div className="card-body px-2">
          <div className="card-text text-light">
            <a
              href="#exampleModal"
              type="button"
              data-mdb-toggle="modal"
              data-mdb-target="#exampleModal"
              aria-label="Submit Feedback"
              className="text-decoration-none"
            >
              {ratingText}
            </a>
            <br />
            <em className="fs-3">Selection</em>

            {/* Flavor Select */}
            <div className="product-size-container mt-2">
              <select
                value={selectedFlavor}
                onChange={(e) => setSelectedFlavor(e.target.value)}
                aria-label="flavours"
                className="form-select bg-dark text-light border-secondary py-1"
                style={{ width: '100%', borderRadius: '4px' }}
              >
                {flavors.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Quantity Select */}
            <div className="product-quantity-container mt-2">
              <select
                value={selectedQuantity}
                onChange={(e) => setSelectedQuantity(e.target.value)}
                aria-label="quantity"
                className="form-select bg-dark text-light border-secondary py-1"
                style={{ width: '100%', borderRadius: '4px' }}
              >
                {quantities.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Add to Cart Trigger */}
          <button 
            id={buttonId} 
            onClick={handleOrderSubmit}
            className="button-85 mt-3 w-100 border-0" 
            role="button"
          >
            <span className="text-light text-decoration-none d-block w-100 h-100 py-1">
              Add to Cart
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
