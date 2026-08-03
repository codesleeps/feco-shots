import React from 'react';

export default function About() {
  return (
    <section id="about" className="about bg-black text-light p-3 fs-3">
      <div className="container">
        <div className="row">
          <div className="col-lg-4">
            <img
              src="./img/about/about_club_500x334.webp"
              width="500"
              height="334"
              loading="lazy"
              className="img-fluid mt-5 rounded rounded-3"
              alt="Cannabis indoor farm"
            />
          </div>
          <div className="col-lg-8 pt-4 pt-lg-0">
            <a
              href="https://codesleeps.github.io/solid-octo-enigma/"
              aria-label="Enter This Cannabis Quiz"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h2 className="text-success mb-3 display-2 fw-normal">About Us</h2>
            </a>
            <p className="mt-3">
              At <em>Club Feco</em>, we're dedicated to bringing you the finest Canna products that promote
              wellness and relaxation. Explore our <em>diverse range</em> of CBD products, including CBD-infused
              drinks, shots, cocktails, and chocolates, designed to cater to your unique preferences and needs.
              CBD is typically extracted from hemp, a variety of cannabis with low levels of THC. 😁
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
