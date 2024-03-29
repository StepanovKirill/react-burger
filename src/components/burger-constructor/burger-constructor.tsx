import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { History } from 'history';
import { useDrop } from 'react-dnd';
import { v4 as uuid } from 'uuid';
import { CurrencyIcon, Button, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

import style from './burger-constructor.module.css';
import ConstructorIngredient from '../constructor-ingredient/constructor-ingredient';
import { useSelector, useDispatch } from '../../services/types/hooks';
import { postOrder } from '../../services/actions/order';
import {
  setTotalPrice,
  addIngredient,
  deleteIngredient,
  resetIngredients,
  moveIngredient,
} from '../../services/actions/constructor';
import { TIngredient } from '../../utils/types';

function calculateTotalPrice(order: TIngredient[] | undefined) {
  if (!order) {
    return 0;
  }
  return order.reduce((sum: number, item: TIngredient) => sum + item.price, 0);
}

const BurgerConstructor: FC = () => {
  const history: History = useHistory();

  const isLogged = useSelector((store) => store.user.isLogged);
  const ingredients = useSelector((store) => store.constructor.ingredientsConstructor);
  const { orderRequest, orderFailed } = useSelector((store) => store.order);

  const dispatch = useDispatch();

  const totalPrice = React.useMemo(() => calculateTotalPrice(ingredients), [ingredients]);

  const bunIngredient = ingredients?.filter((item: TIngredient) => item.type === 'bun')[0];
  const otherIngredients = ingredients?.filter((item: TIngredient) => item.type !== 'bun');

  React.useEffect(() => {
    if (ingredients) {
      setTotalPrice(totalPrice);
    }
    if (orderFailed) {
      dispatch(resetIngredients());
    }
  }, [dispatch, ingredients, orderFailed, totalPrice]);

  const handleDeleteIngredient = React.useCallback(
    (uid: string | undefined) => {
      dispatch(deleteIngredient(uid));
    },
    [dispatch],
  );

  const makeOrder = React.useCallback(() => {
    if (ingredients && isLogged) {
      const order: string[] = ingredients?.map((item: TIngredient) => item._id);
      dispatch(postOrder(order));
      dispatch(resetIngredients());
    } else {
      history.push({ pathname: '/login' });
    }
  }, [dispatch, ingredients, isLogged, history]);

  const handleMoveIngredient = React.useCallback(
    (sourceIndex, targetIndex) => {
      dispatch(moveIngredient(sourceIndex, targetIndex));
    },
    [dispatch],
  );

  const handleDrop = (ingredient: TIngredient) => {
    if (ingredient.type === 'bun' && bunIngredient) {
      dispatch(deleteIngredient(bunIngredient.uid));
    }
    dispatch(addIngredient(ingredient, uuid()));
  };

  const [, dropTarget] = useDrop({
    accept: 'ingredients',
    drop: (ingredient: TIngredient) => {
      handleDrop(ingredient);
    },
  });

  const containerStyle = `${ingredients && style.container}
                          ${(!ingredients || ingredients?.length < 1) && style.emptyContainer}`;
  const mainContainerStyle = `${otherIngredients && style.main}
                              ${!otherIngredients && style.main}
                              ${bunIngredient && otherIngredients?.length < 1 && style.mainEmpty}`;
  const itemContainerStyle = `${!ingredients && style.item_container}
                              ${otherIngredients?.length > 0 && !bunIngredient && style.itemContainerEmpty}`;

  const otherIngredientsElements = React.useMemo(
    () =>
      otherIngredients?.map((item, index) => (
        <ConstructorIngredient
          index={index}
          item={item}
          key={item.uid}
          onMove={handleMoveIngredient}
          // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
          onDelete={() => {
            handleDeleteIngredient(item.uid);
          }}
        />
      )),
    [otherIngredients, handleMoveIngredient, handleDeleteIngredient],
  );

  return (
    <section className={style.wrapper}>
      <div className={containerStyle} ref={dropTarget} data-test="constructor">
        <div className={`${itemContainerStyle} pl-8`}>
          {otherIngredients?.length > 0 && !bunIngredient && (
            <div>
              <p className="text text_type_main-medium">Выберите булочку</p>
            </div>
          )}
          {bunIngredient && (
            <ConstructorElement
              key={bunIngredient.uid}
              text={`${bunIngredient.name} \n(верх)`}
              type="top"
              isLocked
              price={bunIngredient.price}
              thumbnail={bunIngredient.image}
            />
          )}
        </div>
        <div className={mainContainerStyle}>
          {(!otherIngredients || otherIngredients?.length < 1) && (
            <div>
              <p className="text text_type_main-medium">Перетащите ингридиенты сюда</p>
            </div>
          )}
          {otherIngredients && otherIngredients?.length > 0 && (
            <div className={style.scrolled}>{otherIngredientsElements}</div>
          )}
        </div>
        <div className={`${itemContainerStyle} pl-8`}>
          {otherIngredients?.length > 0 && !bunIngredient && (
            <div>
              <p className="text text_type_main-medium">Выберите булочку</p>
            </div>
          )}
          {bunIngredient && (
            <ConstructorElement
              key={bunIngredient.uid}
              text={`${bunIngredient.name} \n(низ)`}
              type="bottom"
              isLocked
              price={bunIngredient.price}
              thumbnail={bunIngredient.image}
            />
          )}
        </div>
      </div>
      <div className={style.total_container}>
        <div className={style.price_value}>
          <p className="text text_type_digits-medium" data-test="total-price">
            {totalPrice}
          </p>
        </div>
        <div className={style.currency_container}>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          type="primary"
          size="large"
          onClick={makeOrder}
          disabled={orderRequest || !bunIngredient || !otherIngredients || otherIngredients?.length < 1}
        >
          {orderRequest ? 'Заказ готовится' : 'Оформить заказ'}
        </Button>
      </div>
    </section>
  );
};

export default BurgerConstructor;
