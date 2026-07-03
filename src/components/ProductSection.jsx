import React from 'react';

export default function ProductSection({
  id,
  title,
  quizUrl = 'https://codesleeps.github.io/solid-octo-enigma/',
  imgSrc,
  imgAlt,
  subTitle,
  subTitleColorClass = 'text-danger',
  description,
  bullets = [],
  children
}) {
  return (
    <section id={id} className="about bg-black text-light p-3">
      {/* Category Heading Link */}
      <div>
        <a
          href={quizUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Enter This Cannabis Quiz"
          className="text-decoration-none"
        >
          <h2 className="card-body text-center display-2 bg-black fw-normal pb-5 text-light">
            <em>{title}</em>
          </h2>
        </a>
      </div>

      {/* Category Description Info */}
      <div className="container mb-4">
        <div className="row">
          <div className="col-lg-4 d-flex align-items-center justify-content-center">
            <img
              src={imgSrc}
              className="img-fluid rounded rounded-3"
              loading="lazy"
              alt={imgAlt}
              style={{ maxHeight: '350px', objectFit: 'cover' }}
            />
          </div>
          <div className="col-lg-8 pt-4 pt-lg-0">
            <h3 className={`${subTitleColorClass} mb-3 display-5 fw-normal`}>{subTitle}</h3>
            <p className="fs-3">{description}</p>
            {bullets.length > 0 && (
              <ul className="fs-4 text-success mt-3">
                {bullets.map((bullet, idx) => (
                  <li key={idx}>{bullet}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Cards Showcase Area */}
      <div className="container feco-shots pt-lg-0 pb-1 fs-3 bg-black">
        <div className="row row-cols-1 row-cols-lg-4 row-cols-md-3 row-cols-sm-2 g-3 mx-1 mb-5">
          {children}
        </div>
      </div>
    </section>
  );
}
