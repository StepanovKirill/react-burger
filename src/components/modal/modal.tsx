import React from 'react';
import ReactDOM from 'react-dom';
import { useParams, useRouteMatch } from 'react-router-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { useSelector } from '../../services/types/hooks';

type TModalTypes = {
  onClose: () => void;
  title: string | undefined;
};

const Modal: React.FC<TModalTypes> = ({ onClose, title, children }) => {
  const { id } = useParams<{ id: string }>();

  const allOrders = useSelector((store) => store.feed.orders);
  const userOrders = useSelector((store) => store.feed.userOrders);

  const isFeedOrder = useRouteMatch({ path: '/order-feed' });
  const feedOrderNumber = isFeedOrder && allOrders.find((item) => item._id === id)?.number;

  const isProfileOrders = useRouteMatch({ path: '/profile/orders' });
  const profileOrderNumber = isProfileOrders && userOrders.find((item) => item._id === id)?.number;

  const orderNumber = feedOrderNumber || profileOrderNumber;

  React.useEffect(() => {
    const closeModal = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.keyCode === 27) {
        onClose();
      }
    };

    document.addEventListener('keydown', closeModal);
    return () => {
      document.removeEventListener('keydown', closeModal);
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    <>
      <div className={style.popup_container} data-test="modal">
        <div className={style.title_container}>
          {title && <p className="text text_type_main-large">{title}</p>}
          {orderNumber && <p className="text text_type_digits-default">#{orderNumber}</p>}
          <div className={style.icon_container} data-test="close-modal">
            <CloseIcon type="primary" onClick={onClose} />
          </div>
        </div>
        {children}
      </div>
      <ModalOverlay onClose={onClose} />
    </>,
    document.getElementById('modal') as HTMLElement,
  );
};

export default Modal;
