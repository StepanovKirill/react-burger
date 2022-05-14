import {React, useEffect, useMemo, useCallback} from 'react'
import {useDrop} from "react-dnd"
import uuid from 'react-uuid'
import style from'./burger-constructor.module.css'
import {
  CurrencyIcon,
  Button,
  ConstructorElement
} from '@ya.praktikum/react-developer-burger-ui-components';
import ConstructorIngredient from '../constructor-ingredient/constructor-ingredient.jsx'
import {useDispatch, useSelector} from 'react-redux';
import {postOrder} from '../../services/actions/order.js';
import {
  setTotalPrice,
  addIngredient,
  deleteIngredient,
  resetIngredients,
  moveIngredient
} from '../../services/actions/constructor';

function calculateTotalPrice(order) {
  if (!order) {
    return 0;
  }
  return order.reduce((sum, item) => sum + item.price, 0)
}

const BurgerConstructor = () => {
  const dispatch = useDispatch()

  const ingredients = useSelector(store => store.constructor.ingredientsConstructor)
  const totalPrice = useMemo(() => calculateTotalPrice(ingredients), [ingredients])
  const {orderRequest, orderFailed} = useSelector(store => store.order);
  
  const bunIngredient = ingredients?.filter((item) => item.type === 'bun')[0]
  const otherIngredients = ingredients?.filter((item) => item.type !== 'bun')

  useEffect(() => {
    if (ingredients) {
      setTotalPrice(totalPrice)
    } 
    if (orderFailed) {
      dispatch(resetIngredients())
    }
  }, [dispatch, ingredients, orderFailed, totalPrice])

  const handleDeleteIngredient = (uid) => {
    dispatch(deleteIngredient(uid));
}
  const makeOrder = useCallback(() => {
    if (ingredients) {
      const order = ingredients?.map(((item) => item._id)) 
      dispatch(postOrder(order))
      dispatch(resetIngredients())
    }
  }, [dispatch, ingredients])

  const handleMoveIngredient = useCallback((sourceIndex, targetIndex) => {
    dispatch(moveIngredient(sourceIndex, targetIndex))
  }, [dispatch])

  const handleDrop = (ingredient) => {
    if (ingredient.type === "bun" && bunIngredient) {
      dispatch(deleteIngredient(bunIngredient.uid));
    } 
    dispatch(addIngredient(ingredient, uuid()));
  };

  const [, dropTarget] = useDrop({
    accept: "ingredients",
    drop: (ingredient) => {
      handleDrop(ingredient);
    }
  });

  const containerStyle = `${ingredients && style.container}
                          ${(!ingredients || ingredients?.length < 1) && style.emptyContainer}`
  const mainContainerStyle = `${otherIngredients && style.main}
                              ${!otherIngredients && style.main}
                              ${(bunIngredient && otherIngredients?.length < 1) && style.mainEmpty}`
  const itemContainerStyle = `${!ingredients && style.item_container}
                              ${(otherIngredients?.length > 0 && !bunIngredient) && style.itemContainerEmpty}`                           
  return (
    <section className={style.wrapper}>
      <div className={containerStyle} ref={dropTarget}>
        <div className={`${itemContainerStyle} pl-8`}>
        {(otherIngredients?.length > 0 && !bunIngredient) && <div>
           <p className="text text_type_main-medium">
            Выберите булочку
          </p>
        </div>}         
          {bunIngredient && 
          <ConstructorElement
            key={bunIngredient.uid}
            text={bunIngredient.name + "\n(верх)"}
            type='top'
            isLocked={true}
            price={bunIngredient.price}
            thumbnail={bunIngredient.image}
          />}
        </div>
      <div className={mainContainerStyle}>
        {(!otherIngredients || otherIngredients?.length < 1) && <div>
           <p className="text text_type_main-medium">
            Перетащите ингридиенты сюда
          </p>
        </div>}
        {(otherIngredients && otherIngredients?.length > 0) && <div className={style.scrolled}>
          {otherIngredients?.map((item, index) => (
            <ConstructorIngredient
              index={index}
              item={item}
              key={item.uid}
              onMove={handleMoveIngredient}
              onDelete={() => {handleDeleteIngredient(item.uid)}}
          />))}
        </div>}
      </div>
      <div className={`${itemContainerStyle} pl-8`}>
      {(otherIngredients?.length > 0 && !bunIngredient) && <div>
           <p className="text text_type_main-medium">
            Выберите булочку
          </p>
        </div>}     
        {bunIngredient && 
          <ConstructorElement
            key={bunIngredient.uid}
            text={bunIngredient.name + "\n(низ)"}
            type='bottom'
            isLocked={true}
            price={bunIngredient.price}
            thumbnail={bunIngredient.image}
          />}
        </div>

     </div>
     <div className={style.total_container}>
        <div className={style.price_value}>
          <p className="text text_type_digits-medium">{totalPrice}</p>
        </div>
        <div className={style.currency_container}>
          <CurrencyIcon/>
        </div>
        <Button 
          type="primary"
          size="large" 
          onClick={makeOrder}
          disabled={orderRequest || !bunIngredient || bunIngredient?.length < 2 || !otherIngredients || otherIngredients?.length < 1}
        >
          {orderRequest ? "Заказ готовится" : "Оформить заказ"}
        </Button>
     </div>
     
    </section>
  );
}

export default BurgerConstructor;