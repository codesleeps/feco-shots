import React, { useState, useMemo } from 'react';
import ProductReviews from './ProductReviews';
import NotifyMeButton from './NotifyMeButton';

export default function ProductCard({
  imgSrc,
  imgAlt,
  flavors,
  strengths = [],
  amounts = [],
  borderColorClass = 'border-warning',
  buttonId,
  ratingText = '⭐⭐⭐⭐⭐',
  onAddToCart,
  imageMap,
  productKey,
  wishlistIds = [],
  onToggleWishlist,
  outOfStock = false
}) {
  const [selectedFlavor, setSelectedFlavor] = useState(flavors && flavors[0] && flavors[0].value ? flavors[0].value : '');
  const [selectedStrength, setSelectedStrength] = useState(strengths && strengths[0] && strengths[0].value ? strengths[0].value : '');
  const [selectedAmount, setSelectedAmount] = useState(amounts && amounts[0] && amounts[0].value ? amounts[0].value : '');

  const currentItemId = useMemo(() => {
    const productName = productKey || 'product';
    return `${productName}-${selectedFlavor}-${selectedStrength}`;
  }, [productKey, selectedFlavor, selectedStrength]);

  const isWishlisted = wishlistIds.includes(currentItemId);

  const handleOrderSubmit = () => {
    onAddToCart(selectedFlavor, selectedStrength, selectedAmount);
  };

  const handleWishlistToggle = () => {
    if (!onToggleWishlist || !productKey) return;
    const productName = productKey;
    onToggleWishlist({
      id: currentItemId,
      name: productName,
      imgSrc: (imageMap && imageMap[selectedFlavor]) || imgSrc,
      flavor: selectedFlavor,
      strength: selectedStrength,
      price: 0,
      count: 1
    });
  };

  const currentImgSrc = (imageMap && imageMap[selectedFlavor]) || imgSrc;

  return (
    <div className="col">
      <div className={`card h-100 border border-3 ${borderColorClass}`}>
        <div className="position-relative">
          <img
            src={currentImgSrc}
            className="card-img-top"
            alt={imgAlt}
            loading="lazy"
            style={{ objectFit: 'contain', height: '295px', padding: '10px' }}
          />
          {onToggleWishlist && (
            <button
              onClick={handleWishlistToggle}
              className="btn btn-link position-absolute top-0 end-0 m-2 p-1"
              style={{ zIndex: 2, color: isWishlisted ? '#ffb338' : '#fff' }}
              aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <i className={`${isWishlisted ? 'fas' : 'far'} fa-heart`} style={{ fontSize: '20px' }}></i>
            </button>
          )}
        </div>
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

            {/* Strength Select */}
            <div className="product-quantity-container mt-2">
              <select
                value={selectedStrength}
                onChange={(e) => setSelectedStrength(e.target.value)}
                aria-label="strength"
                className="form-select bg-dark text-light border-secondary py-1"
                style={{ width: '100%', borderRadius: '4px' }}
              >
                {strengths.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Amount Select */}
            <div className="product-quantity-container mt-2">
              <select
                value={selectedAmount}
                onChange={(e) => setSelectedAmount(e.target.value)}
                aria-label="amount"
                className="form-select bg-dark text-light border-secondary py-1"
                style={{ width: '100%', borderRadius: '4px' }}
              >
                {amounts.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {outOfStock && (
              <div className="mt-2">
                <span className="badge bg-danger">Out of Stock</span>
              </div>
            )}
          </div>

          {/* Add to Cart Trigger */}
          {!outOfStock && (
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
          )}

          {productKey && <ProductReviews productKey={productKey} />}
          {outOfStock && <NotifyMeButton productKey={productKey} flavor={selectedFlavor} />}
        </div>
      </div>
    </div>
  );
}
