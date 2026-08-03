import React, { useState } from 'react';

export default function AdminOrdersModal({ isOpen, onClose, orders, onUpdateStatus, onDeleteOrder, onClearCompleted }) {
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [waPhone, setWaPhone] = useState(() => localStorage.getItem('feco_whatsapp_number') || '447000000000');
  const [waSaved, setWaSaved] = useState(false);

  if (!isOpen) return null;

  const handleSaveWaPhone = (e) => {
    e.preventDefault();
    localStorage.setItem('feco_whatsapp_number', waPhone.trim());
    setWaSaved(true);
    setTimeout(() => setWaSaved(false), 2500);
  };

  const filteredOrders = orders.filter((order) => {
    const matchesStatus = filterStatus === 'All' || order.status === filterStatus;
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.address.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-warning text-dark';
      case 'Preparing':
        return 'bg-info text-dark';
      case 'Out for Delivery':
        return 'bg-primary text-white';
      case 'Completed':
        return 'bg-success text-white';
      default:
        return 'bg-secondary text-white';
    }
  };

  return (
    <React.Fragment>
      <div className="cart-backdrop" onClick={onClose}></div>
      <div className="modal d-block" tabIndex="-1" role="dialog" style={{ zIndex: 1050 }}>
        <div className="modal-dialog modal-xl modal-dialog-scrollable" role="document">
          <div className="modal-content bg-black border border-warning text-light">
            {/* Modal Header */}
            <div className="modal-header border-bottom border-warning">
              <h4 className="modal-title text-warning fw-bold d-flex align-items-center">
                <i className="fas fa-clipboard-list me-2"></i> Store Owner - Orders Management
              </h4>
              <button
                type="button"
                className="btn btn-link text-warning fs-2 p-0 text-decoration-none"
                onClick={onClose}
                aria-label="Close Modal"
                style={{ lineHeight: 1 }}
              >
                &times;
              </button>
            </div>

            {/* Modal Body */}
            <div className="modal-body p-4">
              {/* WhatsApp Store Contact Bar */}
              <div className="bg-dark border border-secondary rounded p-2 mb-3">
                <form onSubmit={handleSaveWaPhone} className="row g-2 align-items-center">
                  <div className="col-sm-4">
                    <span className="small text-warning fw-bold d-flex align-items-center">
                      <i className="fab fa-whatsapp text-success me-1 fs-5"></i> Store WhatsApp Number:
                    </span>
                  </div>
                  <div className="col-sm-5">
                    <input
                      type="text"
                      placeholder="e.g. 447123456789"
                      value={waPhone}
                      onChange={(e) => setWaPhone(e.target.value)}
                      className="form-control form-control-sm bg-black text-light border-secondary"
                    />
                  </div>
                  <div className="col-sm-3 d-flex align-items-center gap-2">
                    <button type="submit" className="btn btn-warning btn-sm fw-bold">
                      Save Number
                    </button>
                    {waSaved && <span className="text-success small"><i className="fas fa-check"></i> Saved!</span>}
                  </div>
                </form>
              </div>

              {/* Controls & Search */}
              <div className="row g-3 mb-4">
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control bg-dark text-light border-secondary"
                    placeholder="Search by Order #, Name, or Address..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="col-md-3">
                  <select
                    className="form-select bg-dark text-light border-secondary"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    <option value="All">All Statuses</option>
                    <option value="Pending">Pending</option>
                    <option value="Preparing">Preparing</option>
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
                <div className="col-md-3 text-end d-flex gap-2 justify-content-end">
                  <button
                    className="btn btn-outline-warning btn-sm"
                    onClick={() => window.print()}
                    title="Print Orders Summary"
                  >
                    <i className="fas fa-print me-1"></i> Print
                  </button>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={onClearCompleted}
                    title="Remove all completed orders"
                  >
                    <i className="fas fa-trash-alt me-1"></i> Clear Completed
                  </button>
                </div>
              </div>

              {/* Orders List */}
              {filteredOrders.length === 0 ? (
                <div className="text-center py-5 text-muted">
                  <i className="fas fa-box-open fa-4x mb-3"></i>
                  <h5>No orders found</h5>
                  <p className="small">Customer orders will appear here as soon as they checkout.</p>
                </div>
              ) : (
                <div className="accordion" id="ordersAccordion">
                  {filteredOrders.map((order) => (
                    <div
                      key={order.id}
                      className="card bg-dark border border-secondary mb-3 text-light"
                    >
                      <div className="card-header d-flex flex-wrap justify-content-between align-items-center bg-black border-bottom border-secondary p-3">
                        <div className="d-flex align-items-center me-3 mb-2 mb-md-0">
                          <span className="fw-bold text-warning fs-4 me-3">{order.id}</span>
                          <span className={`badge ${getStatusBadgeClass(order.status)} fs-6 me-2`}>
                            {order.status}
                          </span>
                          <span className="text-muted fs-6">
                            {new Date(order.timestamp).toLocaleString()}
                          </span>
                        </div>

                        <div className="d-flex align-items-center">
                          {/* Status Change Selector */}
                          <select
                            className="form-select form-select-sm bg-black text-warning border-warning me-2"
                            style={{ width: 'auto' }}
                            value={order.status}
                            onChange={(e) => onUpdateStatus(order.id, e.target.value)}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Preparing">Preparing</option>
                            <option value="Out for Delivery">Out for Delivery</option>
                            <option value="Completed">Completed</option>
                          </select>

                          <button
                            className="btn btn-outline-danger btn-sm p-1 px-2"
                            onClick={() => onDeleteOrder(order.id)}
                            title="Delete Order"
                          >
                            <i className="fas fa-trash-alt"></i>
                          </button>
                        </div>
                      </div>

                      <div className="card-body">
                        <div className="row">
                          {/* Customer Info */}
                          <div className="col-md-5 border-end border-secondary pe-3 mb-3 mb-md-0">
                            <h6 className="text-warning text-uppercase fw-bold mb-2">
                              Customer Details
                            </h6>
                            <p className="mb-1">
                              <strong>Name:</strong> {order.customer.name}
                            </p>
                            <p className="mb-1">
                              <strong>Email:</strong>{' '}
                              <a href={`mailto:${order.customer.email}`} className="text-info">
                                {order.customer.email}
                              </a>
                            </p>
                            {order.customer.phone && (
                              <p className="mb-1">
                                <strong>Phone / SMS:</strong>{' '}
                                <a href={`tel:${order.customer.phone}`} className="text-warning me-2">
                                  {order.customer.phone}
                                </a>
                                <a
                                  href={`https://wa.me/${order.customer.phone.replace(/[^0-9]/g, '')}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="btn btn-sm btn-outline-success py-0 px-1 ms-1"
                                >
                                  <i className="fab fa-whatsapp me-1"></i> WhatsApp
                                </a>
                              </p>
                            )}
                            <p className="mb-1">
                              <strong>Delivery Address:</strong>
                              <br />
                              <span className="text-light">{order.customer.address}</span>
                            </p>
                            <p className="mb-0">
                              <strong>Payment Method:</strong>{' '}
                              <span className="text-capitalize text-warning">
                                {order.customer.payment}
                              </span>
                            </p>
                           </div>

                           {/* Tracking Info */}
                           {order.estimatedDelivery && (
                             <div className="col-md-12 mt-3 pt-3 border-top border-secondary">
                               <h6 className="text-info text-uppercase fw-bold mb-2">Tracking</h6>
                               <p className="mb-1"><strong>Estimated Delivery:</strong> {order.estimatedDelivery}</p>
                               <div className="d-flex justify-content-between align-items-center">
                                 {['Pending', 'Preparing', 'Out for Delivery', 'Delivered'].map((step, idx) => {
                                   const currentIdx = ['Pending', 'Preparing', 'Out for Delivery', 'Delivered'].indexOf(order.status);
                                   const isActive = idx <= currentIdx;
                                   return (
                                     <div key={step} className="text-center">
                                       <div className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-1"
                                         style={{
                                           width: '28px',
                                           height: '28px',
                                           backgroundColor: isActive ? '#ffb338' : '#333',
                                           color: isActive ? '#000' : '#999'
                                         }}>
                                         {idx + 1}
                                       </div>
                                       <small className={isActive ? 'text-warning' : 'text-muted'}>{step}</small>
                                     </div>
                                   );
                                 })}
                               </div>
                             </div>
                           )}

                           {/* Ordered Items List */}
                          <div className="col-md-7 ps-md-3">
                            <h6 className="text-warning text-uppercase fw-bold mb-2">
                              Items Ordered ({order.items.reduce((s, i) => s + i.count, 0)})
                            </h6>
                            <ul className="list-group list-group-flush bg-transparent mb-3">
                              {order.items.map((item, idx) => (
                                <li
                                  key={idx}
                                  className="list-group-item bg-transparent text-light border-secondary p-2 d-flex align-items-center justify-content-between"
                                >
                                  <div className="d-flex align-items-center">
                                    <img
                                      src={item.imgSrc}
                                      alt={item.name}
                                      style={{
                                        width: '40px',
                                        height: '40px',
                                        objectFit: 'contain',
                                        borderRadius: '4px',
                                        background: '#000'
                                      }}
                                      className="me-2 border border-secondary"
                                    />
                                    <div>
                                      <div className="fw-bold">{item.name}</div>
                                        <small className="text-muted">
                                          {item.flavor} ({item.strength}) x {item.count}
                                        </small>
                                    </div>
                                  </div>
                                  <div className="fw-bold text-warning">
                                    £{(item.price * item.count).toFixed(2)}
                                  </div>
                                </li>
                              ))}
                            </ul>
                            <div className="d-flex justify-content-between align-items-center pt-2 border-top border-warning">
                              <span className="fs-5 text-light font-weight-bold">Total:</span>
                              <span className="fs-4 text-warning fw-bold">
                                £{order.subtotal.toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="modal-footer border-top border-warning">
              <span className="me-auto text-muted small">
                Total Orders: {orders.length} | Filtered: {filteredOrders.length}
              </span>
              <button className="btn btn-warning text-dark font-weight-bold" onClick={onClose}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
