import React from 'react';

export default function Footer() {
  return (
    <footer className="text-center text-lg-start">
      {/* Section: Social media */}
      <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom border-warning border-3">
        <div className="me-5 d-none d-lg-block text-light">
          <span>Get connected with us on social networks:</span>
        </div>
        <div className="text-light">
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="me-4 text-reset"
            aria-label="Read more on social media"
          >
            <i className="fab fa-facebook-f"></i>
          </a>
          <a
            href="https://twitter.com/cannavissyrup"
            target="_blank"
            rel="noopener noreferrer"
            className="me-4 text-reset"
            aria-label="Read more on social media"
          >
            <i className="fab fa-twitter"></i>
          </a>
          <a
            href="https://oaksterdamuniversity.com/feco-distillate-isolate-whats-the-difference/"
            target="_blank"
            rel="noopener noreferrer"
            className="me-4 text-reset"
            aria-label="Read more on social media"
          >
            <i className="fab fa-google"></i>
          </a>
          <a
            href="https://www.instagram.com/unitedpatientsgroup/"
            target="_blank"
            rel="noopener noreferrer"
            className="me-4 text-reset"
            aria-label="Read more on social media"
          >
            <i className="fab fa-instagram"></i>
          </a>
          <a
            href="https://www.youtube.com/channel/UCQNsgOEAzItPZzkjZZw5LwA"
            target="_blank"
            rel="noopener noreferrer"
            className="me-4 text-reset"
            aria-label="Read more on social media"
          >
            <i className="fab fa-youtube"></i>
          </a>
        </div>
      </section>

      {/* Section: Links */}
      <section id="contact">
        <div className="container text-center text-md-start mt-5">
          <div className="row mt-3">
            {/* Grid column 1: Brand/Address */}
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4 text-light">
              <h4 className="text-uppercase fw-bold mb-4 display-6">
                <i className="fas fa-gem me-3 text-success"></i>Club Feco
              </h4>
              <p>
                <i className="fas fa-home me-3 text-light"></i> Brumstadam
              </p>
              <p>
                <i className="fas fa-envelope me-3 text-light"></i> info@example.com
              </p>
              <p>
                <i className="fas fa-phone me-3 text-light"></i> + 0121 456788
              </p>
              <p>
                <i className="fas fa-print me-3 text-light"></i> + 0121 456789
              </p>
            </div>

            {/* Grid column 2: Products */}
            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4 text-light">
              <h5 id="mainProducts" className="text-uppercase fw-bold mb-4 text-warning">
                Products
              </h5>
              <p>
                <a href="#smokeless" className="text-reset text-decoration-none" aria-label="Read more about Club Feco products">
                  Smokeless Range
                </a>
              </p>
              <p>
                <a href="#shots" className="text-reset text-decoration-none" aria-label="Read more about Club Feco products">
                  Feco Shots
                </a>
              </p>
              <p>
                <a href="#cocktails" className="text-reset text-decoration-none" aria-label="Read more about Club Feco products">
                  Contender (Cocktails)
                </a>
              </p>
              <p>
                <a href="#chocolates" className="text-reset text-decoration-none" aria-label="Read more about Club Feco products">
                  Chocolates
                </a>
              </p>
            </div>

            {/* Grid column 3: Useful links */}
            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4 text-light">
              <h6 className="text-uppercase fw-bold mb-4 text-warning">Useful links</h6>
              <p>
                <a
                  href="https://homesteadandchill.com/how-to-decarboxylate-cannabis/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-reset text-decoration-none"
                  aria-label="Read more about how to decarboxylate"
                >
                  Decarbing
                </a>
              </p>
              <p>
                <a
                  href="https://www.youtube.com/watch?v=huzhPzLwGz0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-reset text-decoration-none"
                  aria-label="Watch cannabis comedy movie"
                >
                  Movie
                </a>
              </p>
              <p>
                <a
                  href="https://jcyounger.com/5-most-common-cannabis-extraction-methods-in-2020/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-reset text-decoration-none"
                  aria-label="Read more about extraction methods"
                >
                  Extraction
                </a>
              </p>
              <p>
                <a
                  href="https://www.vice.com/en/article/k7qvyw/investigating-thc-syrup-cannabis-with-the-consistency-of-cough-medicine"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-reset text-decoration-none"
                  aria-label="Read more about THC syrup"
                >
                  THC Syrup Info
                </a>
              </p>
            </div>

            {/* Grid column 4: More Links */}
            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4 text-light">
              <h6 className="text-uppercase fw-bold mb-4 text-warning">More Links</h6>
              <p>
                <a
                  href="https://codesleeps.github.io/Food-Analyzer/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-reset text-decoration-none"
                  aria-label="Use this free AI food analyzer app"
                >
                  AI Food Analyzer
                </a>
              </p>
              <p>
                <a
                  href="https://www.youtube.com/watch?v=y3RIHnK0_NE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-reset text-decoration-none"
                  aria-label="Watch more on youtube"
                >
                  A.I. Action
                </a>
              </p>
              <p>
                <a
                  href="https://codesleeps.github.io/solid-octo-enigma/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-reset text-decoration-none"
                  aria-label="Enter this cannabis quiz"
                >
                  Quiz
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Copyright */}
      <div className="text-center p-4 text-light border-top border-secondary mt-4">
        © 2026 Copyright Club Feco
      </div>
    </footer>
  );
}
