import React, {useEffect} from 'react'
import ReactDOM from 'react-dom'
import style from './modal.module.css'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import ModalOverlay from '../modal-overlay/modal-overlay'
import PropTypes from 'prop-types'

function Modal(props) {
  const onClose = props.onClose

  useEffect(() => {
    const closeModal = (event) => {
      if (event.key === 'Escape' || event.keyCode === 27) {
        onClose();
      }
    }
    document.addEventListener('keydown', closeModal);
    return () => {
      document.removeEventListener('keydown', closeModal);
    };
  }, [onClose])

  return ReactDOM.createPortal(
    (
    <>
      <div className={style.popup_container}>
      <div className={style.title_container}>
        <p className={`text text_type_main-large ${style.title}`}>
        {props.title}
        </p>
        <div className={style.icon_container}>
         <CloseIcon type="primary" onClick={onClose}/>
        </div>
      </div>
      {props.children}
      </div>
    <ModalOverlay onClose={onClose} />
    </>
    ), document.getElementById('modal')
  )
}

Modal.propTypes = {
  children: PropTypes.element,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
};

export default Modal;