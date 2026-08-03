import React, { useState, useEffect } from 'react';

export default function ProductReviews({ productKey }) {
  const [reviews, setReviews] = useState([]);
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  useEffect(() => {
    const all = JSON.parse(localStorage.getItem('feco_reviews') || '{}');
    setReviews(all[productKey] || []);
  }, [productKey]);

  const submit = (e) => {
    e.preventDefault();
    const entry = { name: name.trim() || 'Anonymous', rating, comment: comment.trim(), date: new Date().toISOString() };
    const all = JSON.parse(localStorage.getItem('feco_reviews') || '{}');
    all[productKey] = [entry, ...(all[productKey] || [])];
    localStorage.setItem('feco_reviews', JSON.stringify(all));
    setReviews(all[productKey]);
    setName('');
    setComment('');
    setRating(5);
  };

  const avg = reviews.length ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1) : '—';

  return (
    <div className="mt-3">
      <div className="d-flex align-items-center gap-2 mb-2">
        <strong className="text-warning">Reviews</strong>
        <span className="badge bg-warning text-dark">{avg}</span>
        <span className="text-muted small">({reviews.length})</span>
      </div>
      <ul className="list-unstyled mb-2">
        {reviews.slice(0, 5).map((r, idx) => (
          <li key={idx} className="border-bottom border-secondary pb-2 mb-2">
            <div className="d-flex justify-content-between">
              <strong className="text-light small">{r.name}</strong>
              <span className="text-warning small">{'⭐'.repeat(r.rating)}</span>
            </div>
            <p className="mb-0 small text-muted">{r.comment}</p>
          </li>
        ))}
      </ul>
      <form onSubmit={submit} className="row g-2">
        <div className="col-sm-3">
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control bg-dark text-light border-secondary"
          />
        </div>
        <div className="col-sm-2">
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="form-select bg-dark text-light border-secondary"
          >
            {[5,4,3,2,1].map((n) => (
              <option key={n} value={n}>{n} ⭐</option>
            ))}
          </select>
        </div>
        <div className="col-sm-4">
          <input
            type="text"
            required
            placeholder="Write a review"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="form-control bg-dark text-light border-secondary"
          />
        </div>
        <div className="col-sm-3">
          <button type="submit" className="btn btn-outline-warning w-100">Submit</button>
        </div>
      </form>
    </div>
  );
}
