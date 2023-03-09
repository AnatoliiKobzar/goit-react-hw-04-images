import { useEffect } from 'react';
import PropTypes from 'prop-types';

export const Modal = ({ alt, src, onClose }) => {
  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  useEffect(() => {
    const handleEsc = event => {
      if (event.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  return (
    <div className="Overlay" onClick={handleBackdropClick}>
      <div className="Modal">
        <img src={src} alt={alt} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  alt: PropTypes.string,
  src: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
