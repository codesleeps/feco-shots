import React, { useState, useEffect } from 'react';

const DEFAULT_REVIEWS = {
  smokeless: [
    { name: 'Marcus T.', rating: 5, comment: 'Super refreshing! The pineapple CBD juice is my daily morning go-to.', date: '02 Aug 2026' },
    { name: 'Elena R.', rating: 5, comment: 'Pure quality extract. Tastes amazing chilled.', date: '28 Jul 2026' }
  ],
  shots: [
    { name: 'Sarah K.', rating: 5, comment: 'Potent and great tasting syrup! Mixes perfectly with soda.', date: '01 Aug 2026' },
    { name: 'Jason B.', rating: 5, comment: 'Kola Champagne flavor is unmatched. Fast acting.', date: '25 Jul 2026' }
  ],
  contender: [
    { name: 'David P.', rating: 5, comment: 'Best infused Jamaican rum cocktail experience! Smooth and rich.', date: '30 Jul 2026' },
    { name: 'Chloe M.', rating: 5, comment: 'Brought this to a celebration, everyone was impressed.', date: '20 Jul 2026' }
  ],
  chocolate: [
    { name: 'Emma W.', rating: 5, comment: 'The Baileys & Honeycomb bar is pure luxury chocolate!', date: '03 Aug 2026' },
    { name: 'Oliver H.', rating: 5, comment: 'Decadent taste, perfect balance of CBD and rich dark cacao.', date: '29 Jul 2026' }
  ]
};

export default function ProductReviewsModal({ isOpen, onClose, activeProduct }) {
  const [reviews, setReviews] = useState([]);
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submittedMessage, setSubmittedMessage] = useState('');

  const productKey = activeProduct?.key || 'smokeless';
  const productTitle = activeProduct?.title || 'Product Reviews';

  useEffect(() => {
    if (!isOpen) return;
    try {
      const stored = JSON.parse(localStorage.getItem('feco_reviews') || '{}');
      const productReviews = stored[productKey] || DEFAULT_REVIEWS[productKey] || [];
      setReviews(productReviews);
    } catch (e) {
      setReviews(DEFAULT_REVIEWS[productKey] || []);
    }
  }, [isOpen, productKey]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    const newReview = {
      name: name.trim() || 'Verified Customer',
      rating: Number(rating),
      comment: comment.trim(),
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    };

    const updatedReviews = [newReview, ...reviews];
    setReviews(updatedReviews);

    try {
      const stored = JSON.parse(localStorage.getItem('feco_reviews') || '{}');
      stored[productKey] = updatedReviews;
      localStorage.setItem('feco_reviews', JSON.stringify(stored));
    } catch (err) {
      console.error('Failed to save review:', err);
    }

    setName('');
    setComment('');
    setRating(5);
    setSubmittedMessage('Thank you! Your review has been published.');
    setTimeout(() => setSubmittedMessage(''), 4000);
  };

  const avgRating = reviews.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : '5.0';

  return (
    <React.Fragment>
      <div className="cart-backdrop" onClick={onClose} style={{ zIndex: 2000 }}></div>
      <div className="modal d-block" tabIndex="-1" role="dialog" style={{ zIndex: 2005 }}>
        <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
          <div className="modal-content bg-black border border-warning text-light shadow-lg">
            {/* Modal Header */}
            <div className="modal-header border-bottom border-warning p-3">
              <div>
                <h4 className="modal-title text-warning fw-bold mb-0 d-flex align-items-center">
                  <i className="fas fa-star text-warning me-2"></i> {productTitle} Reviews
                </h4>
                <div className="small text-muted mt-1">
                  Overall Rating: <span className="text-warning fw-bold fs-6 me-2">{avgRating} ⭐</span> ({reviews.length} Verified Reviews)
                </div>
              </div>
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
            <div className="modal-body p-4" style={{ maxHeight: '75vh', overflowY: 'auto' }}>
              {/* Existing Reviews List */}
              <h5 className="text-warning h6 fw-bold mb-3">Customer Feedback</h5>
              {reviews.length === 0 ? (
                <p className="text-muted small">No reviews yet. Be the first to leave a review!</p>
              ) : (
                <div className="mb-4">
                  {reviews.map((rev, index) => (
                    <div key={index} className="bg-dark border border-secondary rounded p-3 mb-2">
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <span className="fw-bold text-light">{rev.name}</span>
                        <span className="text-warning small">{'⭐'.repeat(rev.rating)}</span>
                      </div>
                      <p className="mb-1 text-light small">{rev.comment}</p>
                      <span className="text-muted opacity-75" style={{ fontSize: '11px' }}>{rev.date}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Leave a Review Form */}
              <div className="bg-dark border border-warning rounded p-3 mt-4">
                <h5 className="text-warning h6 fw-bold mb-3 d-flex align-items-center">
                  <i className="fas fa-pen-to-square me-2"></i> Leave a Review & Rating
                </h5>

                {submittedMessage && (
                  <div className="alert alert-success py-2 small mb-3">
                    <i className="fas fa-check-circle me-1"></i> {submittedMessage}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="row g-2 mb-2">
                    <div className="col-md-7">
                      <input
                        type="text"
                        placeholder="Your Name (Optional)"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="form-control bg-black text-light border-secondary"
                      />
                    </div>
                    <div className="col-md-5">
                      <select
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        className="form-select bg-black text-warning border-secondary"
                      >
                        <option value="5">⭐⭐⭐⭐⭐ (5 / 5)</option>
                        <option value="4">⭐⭐⭐⭐ (4 / 5)</option>
                        <option value="3">⭐⭐⭐ (3 / 5)</option>
                        <option value="2">⭐⭐ (2 / 5)</option>
                        <option value="1">⭐ (1 / 5)</option>
                      </select>
                    </div>
                  </div>

                  <div className="mb-3">
                    <textarea
                      required
                      rows="3"
                      placeholder="Write your review or product experience..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="form-control bg-black text-light border-secondary"
                    ></textarea>
                  </div>

                  <div className="text-end">
                    <button type="submit" className="btn btn-warning text-dark font-weight-bold px-4">
                      Submit Review
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
