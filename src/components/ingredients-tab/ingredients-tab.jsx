import React from 'react';
import PropTypes from 'prop-types';
import IngredientCard from '../ingredients-card/ingredient-card';
import style from './ingredients-tab.module.css'

function IngredientTab(props) {
    const names = {bun: "Булки", main: "Начинки", sauce: "Соусы"}
    return (
    <section>
      <div className={style.tab_name}>
      <p className="text text_type_main-medium">{names[props.name]}</p>
      </div>
      <div className={style.two_column}>
      {props.data.map((item, index) => (<IngredientCard key={index} data={item} count={item.count}/>))}
      </div>
    </section>
    )
}

IngredientTab.propTypes = {
  props: PropTypes.arrayOf(
    PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number,
    image: PropTypes.string
  }))
}

export default IngredientTab