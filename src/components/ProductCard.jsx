import React, { useState } from 'react';

export default function ProductCard({
  imgSrc,
  imgAlt,
  flavors,
  quantities,
  borderColorClass = 'border-warning',
  orderUrl = 'https://www.youtube.com/watch?v=-ZhxFtmAoXg',
  buttonId,
  ratingText = '⭐⭐⭐⭐⭐',
  onFeedbackClick
}) {
  const [selectedFlavor, setSelectedFlavor] = useState(flavors[0]?.value || '');
  const [selectedQuantity, setSelectedQuantity] = useState(quantities[0]?.value || '');

  // Generate order URL with query parameters for selection (useful interactive improvement!)
  const getOrderLink = () => {
    try {
      const url = new URL(orderUrl);
      url.searchParams.set('flavor', selectedFlavor);
      url.searchParams.set('quantity', selectedQuantity);
      return url.toString();
    } catch (e) {
      return orderUrl;
    }
  };

  return (
    <div className="col">
      <div className={`card h-100 border border-3 ${borderColorClass}`}>
        <img
          src={imgSrc}
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
              onClick={onFeedbackClick}
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

          {/* Cart Button */}
          <button id={buttonId} className="button-85 mt-3 w-100 border-0" role="button">
            <a
              href={getOrderLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="text-light text-decoration-none d-block w-100 h-100 py-1"
              aria-label="Order Button"
            >
              Order
            </a>
          </button>
        </div>
      </div>
    </div>
  );
}
