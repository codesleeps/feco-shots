import React, { useState, useEffect } from 'react';

export default function WhatsAppButton({ defaultPhone = '447000000000' }) {
  const [phone, setPhone] = useState(defaultPhone);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('feco_whatsapp_number');
    if (saved) {
      setPhone(saved);
    }
  }, []);

  const message = encodeURIComponent('Hi Club Feco! I would like to inquire about your CBD products and ordering.');
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const href = `https://wa.me/${cleanPhone || defaultPhone}?text=${message}`;

  return (
    <div 
      className="position-fixed"
      style={{
        bottom: '24px',
        right: '24px',
        zIndex: 1055
      }}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {showTooltip && (
        <div 
          className="position-absolute bg-black text-warning border border-warning px-3 py-1 rounded shadow small fw-bold me-2"
          style={{
            right: '70px',
            top: '12px',
            whiteSpace: 'nowrap'
          }}
        >
          Chat on WhatsApp
        </div>
      )}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="btn p-0 d-flex align-items-center justify-content-center shadow-lg border border-2 border-light"
        style={{
          backgroundColor: '#25D366',
          color: '#fff',
          width: '58px',
          height: '58px',
          borderRadius: '50%',
          boxShadow: '0 4px 14px rgba(37, 211, 102, 0.4)',
          transition: 'transform 0.2s ease-in-out'
        }}
        onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
        onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1.0)')}
      >
        <i className="fab fa-whatsapp" style={{ fontSize: '32px' }}></i>
      </a>
    </div>
  );
}
