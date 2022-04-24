import React from 'react';
import PropTypes from 'prop-types';
import IngredientCard from '../ingredients-card/ingredient-card';
import style from './ingredients-tab.module.css'
import ingredient from '../../utils/types';

function IngredientTab(props) {
    const names = {bun: "Булки", main: "Начинки", sauce: "Соусы"}

    return (
    <section>
      <div className={style.tab_name}>
        <p className="text text_type_main-medium">{names[props.name]}</p>
      </div>
      <div className={style.two_column}>
        {props.ingredients.map((item) => (<IngredientCard key={item._id} data={item} count={item.count} onModalOpen={props.onModalOpen}/>))}
      </div>
    </section>
    )
}

IngredientTab.propTypes = {
  name: PropTypes.string,
  ingredients: PropTypes.arrayOf(ingredient).isRequired
}

export default IngredientTab