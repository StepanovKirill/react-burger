import React from 'react';
import style from './modal-overlay.module.css';

const ModalOverlay: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <button type="button" className={style.modalOverlay} onClick={onClose} />
);

export default ModalOverlay;
