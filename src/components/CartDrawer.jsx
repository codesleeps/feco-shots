import React, { useState, useEffect } from 'react';

export default function CartDrawer({ isOpen, onClose, cart, updateQty, removeItem, clearCart, onSaveOrder, deliveryAvailable, onReorder, pastOrders = [] }) {
  const [view, setView] = useState('cart'); // 'cart' | 'checkout' | 'success'
  const [orderNum, setOrderNum] = useState('');
  const [checkoutForm, setCheckoutForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    payment: 'delivery',
    notifySmsEmail: true
  });

  useEffect(() => {
    if (isOpen) {
      try {
        const savedUser = JSON.parse(localStorage.getItem('feco_current_user') || 'null');
        if (savedUser) {
          setCheckoutForm((prev) => ({
            ...prev,
            name: prev.name || savedUser.name || '',
            email: prev.email || savedUser.email || '',
            phone: prev.phone || savedUser.phone || '',
            address: prev.address || savedUser.address || ''
          }));
        }
      } catch (e) {
        // ignore
      }
    }
  }, [isOpen, view]);

  const getSubtotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.count), 0);
  };

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    if (!checkoutForm.name || !checkoutForm.email || !checkoutForm.phone || !checkoutForm.address) {
      alert('Please fill out all required fields.');
      return;
    }
    
    const randomNum = 'F-' + Math.floor(10000 + Math.random() * 90000);
    const newOrder = {
      id: randomNum,
      customer: { ...checkoutForm },
      items: [...cart],
      subtotal: getSubtotal(),
      timestamp: new Date().toISOString(),
      status: 'Pending',
      estimatedDelivery: getEstimatedDelivery()
    };

    if (onSaveOrder) {
      onSaveOrder(newOrder);
    }

    setOrderNum(randomNum);
    setView('success');
    clearCart();
  };

  const getEstimatedDelivery = () => {
    const date = new Date();
    date.setDate(date.getDate() + (deliveryAvailable ? 1 : 5));
    return date.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' });
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => setView('cart'), 500);
  };

  return (
    <React.Fragment>
      {isOpen && <div className="cart-backdrop" onClick={handleClose}></div>}
      
      <div className={`cart-drawer ${isOpen ? 'open' : ''} p-4`}>
        {/* Drawer Header */}
        <div className="d-flex justify-content-between align-items-center border-bottom border-warning pb-3 mb-3">
          <h3 className="text-warning mb-0 fs-2 font-weight-bold">
            <i className="fas fa-shopping-cart me-2"></i> 
            {view === 'cart' ? 'Your Cart' : view === 'checkout' ? 'Checkout' : 'Success!'}
          </h3>
          <button 
            onClick={handleClose} 
            className="btn btn-link text-warning p-0 fs-1 text-decoration-none" 
            style={{ lineHeight: '1' }}
          >
            &times;
          </button>
        </div>

        {/* View 1: Cart Items */}
        {view === 'cart' && (
          <div className="d-flex flex-column flex-grow-1" style={{ overflow: 'hidden' }}>
            {cart.length === 0 ? (
              <div className="d-flex flex-column align-items-center justify-content-center flex-grow-1 text-muted">
                <i className="fas fa-shopping-basket fa-3x mb-3 text-warning opacity-50"></i>
                <p className="fs-4">Your cart is empty</p>
                {pastOrders.length > 0 && (
                  <div className="mt-3 w-100">
                    <p className="fs-5 text-warning">Quick Reorder</p>
                    {pastOrders.map((order) => (
                      <div key={order.id} className="d-flex justify-content-between align-items-center bg-dark p-2 rounded mb-2 border border-secondary">
                        <div>
                          <strong>{order.id}</strong>
                          <div className="small text-muted">{order.items.length} items</div>
                        </div>
                        <button className="btn btn-sm btn-warning text-dark" onClick={() => onReorder(order)}>Reorder</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <React.Fragment>
                <div className="flex-grow-1" style={{ overflowY: 'auto' }}>
                  {cart.map((item) => (
                    <div key={item.id} className="cart-item-row d-flex py-3 align-items-center">
                      <img 
                        src={item.imgSrc} 
                        alt={item.name} 
                        style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }}
                        className="me-3"
                      />
                      <div className="flex-grow-1 text-light">
                        <h5 className="fs-5 mb-0 fw-bold">{item.name}</h5>
                         <span className="text-muted fs-6" style={{ letterSpacing: '0' }}>
                           {item.flavor} / {item.strength} x {item.count}
                         </span>
                        <div className="d-flex align-items-center justify-content-between mt-2">
                          <span className="text-warning fs-5 fw-bold">£{(item.price * item.count).toFixed(2)}</span>
                          
                          <div className="d-flex align-items-center">
                            <button className="btn-qty" onClick={() => updateQty(item.id, -1)}>-</button>
                            <span className="mx-3 text-white fw-bold fs-5">{item.count}</span>
                            <button className="btn-qty" onClick={() => updateQty(item.id, 1)}>+</button>
                          </div>
                        </div>
                      </div>
                      
                      <button 
                        onClick={() => removeItem(item.id)} 
                        className="btn btn-link text-danger ms-3 p-1 fs-4"
                        aria-label="Remove Item"
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </div>
                  ))}
                </div>

                <div className="border-top border-secondary pt-3 mt-3">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="fs-3 text-light">Subtotal:</span>
                    <span className="fs-2 text-warning fw-bold">£{getSubtotal().toFixed(2)}</span>
                  </div>
                  <button 
                    onClick={() => setView('checkout')}
                    className="btn btn-warning btn-lg w-100 text-dark font-weight-bold"
                    style={{ letterSpacing: '2px', borderRadius: '6px' }}
                  >
                    PROCEED TO CHECKOUT
                  </button>
                </div>
              </React.Fragment>
            )}
          </div>
        )}

        {/* View 2: Checkout Form */}
        {view === 'checkout' && (
          <form onSubmit={handleCheckoutSubmit} className="d-flex flex-column flex-grow-1" style={{ overflowY: 'auto' }}>
            <div className="mb-3">
              <label htmlFor="chkName" className="form-label text-light fs-5">Full Name</label>
              <input 
                type="text" 
                id="chkName"
                required
                placeholder="Enter your name" 
                className="form-control input-glass py-2"
                value={checkoutForm.name}
                onChange={(e) => setCheckoutForm({...checkoutForm, name: e.target.value})}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="chkEmail" className="form-label text-light fs-5">Email Address</label>
              <input 
                type="email" 
                id="chkEmail"
                required
                placeholder="name@example.com" 
                className="form-control input-glass py-2"
                value={checkoutForm.email}
                onChange={(e) => setCheckoutForm({...checkoutForm, email: e.target.value})}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="chkPhone" className="form-label text-light fs-5">Mobile Number (SMS Dispatch Updates)</label>
              <input 
                type="tel" 
                id="chkPhone"
                required
                placeholder="+44 7123 456789" 
                className="form-control input-glass py-2"
                value={checkoutForm.phone}
                onChange={(e) => setCheckoutForm({...checkoutForm, phone: e.target.value})}
              />
            </div>

            <div className="form-check mb-3 text-start">
              <input 
                className="form-check-input" 
                type="checkbox" 
                id="notifyCheck"
                checked={checkoutForm.notifySmsEmail}
                onChange={(e) => setCheckoutForm({...checkoutForm, notifySmsEmail: e.target.checked})}
              />
              <label className="form-check-label text-light small" htmlFor="notifyCheck">
                Send me Email & SMS dispatch & order tracking updates
              </label>
            </div>

            <div className="mb-3">
              <label htmlFor="chkAddress" className="form-label text-light fs-5">Delivery Address</label>
              <textarea 
                id="chkAddress"
                required
                rows="3"
                placeholder="Street, City, Postal Code" 
                className="form-control input-glass py-2"
                value={checkoutForm.address}
                onChange={(e) => setCheckoutForm({...checkoutForm, address: e.target.value})}
              />
            </div>

            <div className="mb-4">
              <label className="form-label text-light fs-5">Payment Method</label>
              <select 
                className="form-select input-glass py-2" 
                style={{ width: '100%' }}
                value={checkoutForm.payment}
                onChange={(e) => setCheckoutForm({...checkoutForm, payment: e.target.value})}
              >
                <option value="delivery">Cash on Delivery</option>
                <option value="transfer">Bank Transfer (Manual)</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label text-light fs-5">Estimated Delivery</label>
              <div className="alert alert-info py-2">{getEstimatedDelivery()}</div>
              {deliveryAvailable === false && (
                <div className="text-warning small">Standard delivery applies.</div>
              )}
            </div>

            <div className="border-top border-secondary pt-3 mt-auto">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="fs-3 text-light">Total Amount:</span>
                <span className="fs-2 text-warning fw-bold">£{getSubtotal().toFixed(2)}</span>
              </div>
              
              <div className="row g-2">
                <div className="col-6">
                  <button 
                    type="button" 
                    onClick={() => setView('cart')}
                    className="btn btn-outline-warning w-100 font-weight-bold"
                    style={{ borderRadius: '6px' }}
                  >
                    BACK TO CART
                  </button>
                </div>
                <div className="col-6">
                  <button 
                    type="submit" 
                    className="btn btn-warning w-100 text-dark font-weight-bold"
                    style={{ borderRadius: '6px' }}
                  >
                    PLACE ORDER
                  </button>
                </div>
              </div>
            </div>
          </form>
        )}

        {/* View 3: Order Success Screen */}
        {view === 'success' && (
          <div className="d-flex flex-column align-items-center justify-content-center flex-grow-1 text-center text-light">
            <div className="mb-4">
              <i className="fas fa-circle-check fa-5x text-success"></i>
            </div>
            <h4 className="text-warning fs-1 font-weight-bold mb-3">Order Received!</h4>
            <p className="fs-4 px-2 mb-2">Thank you for your order, <strong>{checkoutForm.name}</strong>!</p>
            <p className="fs-5 text-muted px-2">
              Receipt dispatched to <strong>{checkoutForm.email}</strong>.
              {checkoutForm.phone && (
                <span> SMS tracking notification sent to <strong>{checkoutForm.phone}</strong>.</span>
              )}
            </p>
            <div className="bg-dark border border-secondary p-3 rounded my-4 w-100">
              <span className="text-muted d-block fs-6">Order Number</span>
              <span className="text-warning font-weight-bold fs-3" style={{ letterSpacing: '3px' }}>{orderNum}</span>
            </div>
            <div className="d-flex gap-2 justify-content-center w-100 mt-2">
              <button 
                onClick={() => window.print()} 
                className="btn btn-outline-warning font-weight-bold py-2 px-3 me-2"
                style={{ borderRadius: '6px' }}
              >
                <i className="fas fa-print me-1"></i> Print Receipt
              </button>
              <button 
                onClick={handleClose} 
                className="btn btn-warning text-dark font-weight-bold py-2 px-4"
                style={{ borderRadius: '6px' }}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
}
