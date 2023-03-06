import React from 'react';
import { useParams } from 'react-router-dom';

import style from './ingredient-details.module.css';
import { useSelector } from '../../services/types/hooks';
import { TIngredient } from '../../utils/types';

export default function IngredientDetails(): JSX.Element | null {
  const params = useParams<{ id: string }>();

  const ingredients: TIngredient[] = useSelector((store) => store.ingredients.ingredients);

  const currentIngredient: TIngredient | undefined = ingredients?.find((item: TIngredient) => item._id === params.id);

  React.useEffect(() => {}, [ingredients]);

  if (ingredients.length === 0) {
    return null;
  }

  return (
    <>
      <div className={style.image_container}>
        <img src={currentIngredient?.image_large} alt={currentIngredient?.name} />
      </div>
      <div className={style.name_container}>
        <p className="text text_type_main-medium">{currentIngredient?.name}</p>
      </div>
      <div className={style.property_container}>
        <div className={style.property_item}>
          <p className="text text_type_main-default text_color_inactive">Калории, ккал</p>
          <p className={`text text_type_digits-default ${style.property_value}`}>{currentIngredient?.calories}</p>
        </div>
        <div className={style.property_item}>
          <p className="text text_type_main-default text_color_inactive">Белки, г</p>
          <p className={`text text_type_digits-default ${style.property_value}`}>{currentIngredient?.proteins}</p>
        </div>
        <div className={style.property_item}>
          <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
          <p className={`text text_type_digits-default ${style.property_value}`}>{currentIngredient?.fat}</p>
        </div>
        <div className={style.property_item}>
          <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
          <p className={`text text_type_digits-default ${style.property_value}`}>{currentIngredient?.carbohydrates}</p>
        </div>
      </div>
    </>
  );
}
