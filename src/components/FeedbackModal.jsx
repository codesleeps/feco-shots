import React, { useState } from 'react';

export default function FeedbackModal() {
  const [feedbackText, setFeedbackText] = useState('');

  const handleSubmit = () => {
    if (feedbackText.trim()) {
      alert(`Feedback submitted: "${feedbackText}"`);
      setFeedbackText('');
    }
  };

  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content bg-dark text-light border border-warning">
          <div className="modal-header border-bottom border-warning">
            <h5 className="modal-title" id="exampleModalLabel">
              Feedback
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              data-mdb-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <textarea
              name="feedback"
              id="modal"
              autoComplete="name"
              cols="30"
              rows="5"
              className="form-control bg-dark text-light border border-secondary"
              placeholder="Tell us your feedback..."
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
            ></textarea>
          </div>
          <div className="modal-footer border-top border-warning">
            <button type="button" className="btn btn-secondary" data-mdb-dismiss="modal">
              Close
            </button>
            <button
              type="button"
              className="btn btn-warning text-dark"
              data-mdb-dismiss="modal"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
