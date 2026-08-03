import React from 'react';

export default function Hero() {
  return (
    <section className="hero">
      <div
        className="p-5 text-center bg-image"
        style={{
          backgroundImage: "url('./img/logo/hero2_501x301.webp')",
          height: '500px',
        }}
      >
        <div className="mask" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
          <div className="d-flex justify-content-center align-items-center h-100">
            <div className="text-white">
              <div className="wrapper mb-5">
                <div className="bg">Club Feco</div>
                <div className="fg">Club Feco</div>
              </div>

              <a
                href="https://www.bccannabisstores.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="animated-button1 mt-5"
              >
                <h1>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  welcome
                </h1>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
