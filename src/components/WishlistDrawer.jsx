import React from 'react';

export default function WishlistDrawer({ isOpen, onClose, wishlist, onRemove, onMoveToCart }) {
  return (
    <React.Fragment>
      <div className={`cart-backdrop${isOpen ? ' show' : ''}`} onClick={onClose} style={{ zIndex: 1040 }}></div>
      <div
        className={`cart-drawer${isOpen ? ' open' : ''}`}
        style={{ zIndex: 1045 }}
      >
      <div className="d-flex justify-content-between align-items-center p-3 border-bottom border-warning">
        <h5 className="mb-0 text-warning">Wishlist</h5>
        <button onClick={onClose} className="btn btn-link text-light">✕</button>
      </div>
      <div className="p-3" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
        {wishlist.length === 0 && <p className="text-muted">Your wishlist is empty.</p>}
        {wishlist.map((item) => (
          <div key={item.id} className="d-flex gap-3 mb-3 border-bottom border-secondary pb-3">
            <img src={item.imgSrc} alt={item.name} style={{ width: '60px', height: '60px', objectFit: 'contain' }} />
            <div className="flex-grow-1">
              <div className="fw-bold text-light">{item.name}</div>
              <div className="small text-muted">{item.flavor} / {item.strength}</div>
              <div className="text-warning">£{item.price.toFixed(2)}</div>
              <div className="mt-2 d-flex gap-2">
                <button className="btn btn-sm btn-warning text-dark" onClick={() => onMoveToCart(item.id)}>Move to Cart</button>
                <button className="btn btn-sm btn-outline-danger" onClick={() => onRemove(item.id)}>Remove</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>
    </React.Fragment>
  );
}
