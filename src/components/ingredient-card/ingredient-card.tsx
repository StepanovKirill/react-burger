import React from 'react';
import { useDrag } from 'react-dnd';
import { useLocation, Link } from 'react-router-dom';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';

import { TIngredient } from '../../utils/types';
import style from './ingredient-card.module.css';
import { useSelector, useDispatch } from '../../services/types/hooks';
import { openModalIngredient } from '../../services/actions/ingredients';

const IngredientCard: React.FC<{ ingredient: TIngredient }> = ({ ingredient }) => {
  const order: TIngredient[] | null = useSelector((store) => store.constructor.ingredientsConstructor);

  const dispatch = useDispatch();

  const location = useLocation<Location>();

  const [, dragRef] = useDrag({
    type: 'ingredients',
    item: ingredient,
  });

  const openIngredientsDetail = React.useCallback(
    (ingredientID: string) => {
      dispatch(openModalIngredient(ingredientID));
    },
    [dispatch],
  );

  const handleOpenDetail = React.useCallback(() => openIngredientsDetail, [openIngredientsDetail]);

  const path = React.useMemo(() => ({ pathname: `/ingredients/${ingredient._id}`, state: { background: location } }), [
    ingredient._id,
    location,
  ]);

  const count = order?.filter((item: TIngredient) => item._id === ingredient._id).length;

  return (
    <Link to={path} onClick={handleOpenDetail} className={style.link}>
      <div className={style.container} ref={dragRef} data-test={ingredient._id}>
        <div className={style.image_container}>
          <img src={ingredient.image} alt={ingredient.name} />
          <div className={style.counter}>{count > 0 && <Counter count={count} size="default" />}</div>
        </div>
        <div className={style.price_container}>
          <div className={style.price_value}>
            <p className="text text_type_digits-default">{ingredient.price}</p>
          </div>
          <div className={style.icon}>
            <CurrencyIcon type="primary" />
          </div>
        </div>
        <div className={style.name_container}>
          <p className={`text text_type_main-small ${style.name_text}`}>{ingredient.name}</p>
        </div>
      </div>
    </Link>
  );
};

export default IngredientCard;
