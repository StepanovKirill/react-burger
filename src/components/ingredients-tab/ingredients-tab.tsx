import React from 'react';

import IngredientCard from '../ingredient-card/ingredient-card';
import style from './ingredients-tab.module.css';
import { TIngredient } from '../../utils/types';

type TIngredientTab = {
  ingredients: Array<TIngredient>;
  title: string;
};

const IngredientsTab = React.forwardRef<HTMLDivElement, TIngredientTab>(({ ingredients, title }, ref) => (
  <div ref={ref}>
    <div className={style.tab_name}>
      <p className="text text_type_main-medium">{title}</p>
    </div>
    <div className={style.two_column}>
      {ingredients.map((item: TIngredient) => (
        <IngredientCard key={item._id} ingredient={item} />
      ))}
    </div>
  </div>
));

IngredientsTab.displayName = 'IngredientsTab';

export default IngredientsTab;
