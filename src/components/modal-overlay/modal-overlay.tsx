import React, {FC} from 'react';
import style from './modal-overlay.module.css';

export const ModalOverlay: FC<{onClose: () => void}>= ({onClose}) => {
  return (
    <div className={style.modalOverlay} onClick={onClose}></div>
  )
}