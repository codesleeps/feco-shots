import React from 'react';

export default function WhatsAppButton({ phoneNumber = '447000000000' }) {
  const message = encodeURIComponent('Hi Club Feco, I have a question about your products.');
  const href = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 1055,
        backgroundColor: '#25D366',
        color: '#fff',
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textDecoration: 'none',
        boxShadow: '0 4px 12px rgba(0,0,0,0.35)'
      }}
    >
      <i className="fab fa-whatsapp" style={{ fontSize: '32px' }}></i>
    </a>
  );
}
