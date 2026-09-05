import React from "react";
import "./Modal.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedMedia: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, selectedMedia }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="close-icon" onClick={onClose}>
          &times;
        </span>
        <h2 className="modal-title">✅ Postulación Exitosa</h2>

          <video
          src={selectedMedia}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="modal-gif"
          />

        <p>¡Tu postulación ha sido enviada correctamente!</p>
      </div>
    </div>
  );
};

export default Modal;



