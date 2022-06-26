import React, {FC} from 'react'
import ReactDOM from 'react-dom'
import style from './modal.module.css'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ModalOverlay } from '../modal-overlay/modal-overlay'

type TModalTypes = {
  onClose: () => void;
  title: string | undefined;
};

export const Modal: FC<TModalTypes> = ({onClose, title, children}) => {

  //TODO: check event typing
  React.useEffect(() => {
    const closeModal = (e: {key: string, keyCode: number}) => {
      if (e.key === 'Escape' || e.keyCode === 27) {
        onClose()
      }
    };
  
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
            {title}
          </p>
          <div className={style.icon_container}>
            <CloseIcon type="primary" onClick={onClose}/>
          </div>
        </div>
        {children}
      </div>
      <ModalOverlay onClose={onClose} />
    </>
    ), document.getElementById('modal') as HTMLElement
  )
};