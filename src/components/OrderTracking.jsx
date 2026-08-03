import React, { useState, useEffect } from 'react';

const STATUS_STEPS = ['Pending', 'Processing', 'Shipped', 'Delivered'];

export default function OrderTracking({ isOpen, onClose, orders }) {
  const [orderId, setOrderId] = useState('');
  const [found, setFound] = useState(null);

  useEffect(() => {
    if (!isOpen) {
      setOrderId('');
      setFound(null);
    }
  }, [isOpen]);

  const track = (e) => {
    e.preventDefault();
    const order = orders.find((o) => o.id.toLowerCase() === orderId.trim().toLowerCase());
    setFound(order || null);
  };

  const statusIndex = found ? Math.max(0, STATUS_STEPS.indexOf(found.status)) : -1;

  return (
    <div className={`modal fade${isOpen ? ' show' : ''}`} tabIndex="-1" role="dialog" style={{ display: isOpen ? 'block' : 'none', zIndex: 1060 }}>
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content bg-black text-light border border-warning">
          <div className="modal-header border-warning">
            <h5 className="modal-title text-warning">Track Order</h5>
            <button type="button" className="btn btn-link text-light" onClick={onClose}>✕</button>
          </div>
          <div className="modal-body">
            <form onSubmit={track} className="row g-2 mb-3">
              <div className="col-8">
                <input
                  type="text"
                  required
                  placeholder="Order number"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  className="form-control bg-dark text-light border-secondary"
                />
              </div>
              <div className="col-4">
                <button type="submit" className="btn btn-warning text-dark w-100 fw-bold">Track</button>
              </div>
            </form>
            {found && (
              <div>
                <p className="mb-1"><strong>Order:</strong> {found.id}</p>
                <p className="mb-1"><strong>Customer:</strong> {found.customer?.name}</p>
                <div className="d-flex justify-content-between align-items-center mt-3">
                  {STATUS_STEPS.map((step, idx) => (
                    <div key={step} className="text-center">
                      <div className={`rounded-circle d-flex align-items-center justify-content-center mx-auto mb-1`}
                        style={{
                          width: '32px',
                          height: '32px',
                          backgroundColor: idx <= statusIndex ? '#ffb338' : '#333',
                          color: idx <= statusIndex ? '#000' : '#999'
                        }}>
                        {idx + 1}
                      </div>
                      <small className={idx <= statusIndex ? 'text-warning' : 'text-muted'}>{step}</small>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {!found && orderId && (
              <p className="text-danger">Order not found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
