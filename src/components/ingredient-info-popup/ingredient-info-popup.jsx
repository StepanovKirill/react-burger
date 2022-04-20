import React from "react";
import PropTypes from 'prop-types'
import style from './ingredient-info-popup.module.css'
import Popup from "../../hoc/popup/popup"
import ingredient from "../../utils/types.js";

function IngredientInfoPopup(props) {
  return (
    <>
    <Popup title="Детали ингредиента" close={props.close}>
      <div className={style.image_container}>
        <img src={props.ingredient.image_large} alt={props.ingredient.name}></img>
      </div>
      <div className={style.name_container}>
        <p className="text text_type_main-medium">
          {props.ingredient.name}
        </p>
      </div>
      <div className={style.property_container}>
        <div className={style.property_item}>
          <p className="text text_type_main-default text_color_inactive">
            Калории, ккал
          </p>
          <p className={`text text_type_digits-default ${style.property_value}`}>
            {props.ingredient.calories}
          </p>
        </div>
        <div className={style.property_item}>
          <p className="text text_type_main-default text_color_inactive">
            Белки, г
          </p>
          <p className={`text text_type_digits-default ${style.property_value}`}>
            {props.ingredient.proteins}
          </p>
        </div>
        <div className={style.property_item}>
          <p className="text text_type_main-default text_color_inactive">
            Жиры, г
          </p>
          <p className={`text text_type_digits-default ${style.property_value}`}>
            {props.ingredient.fat}
          </p>
        </div>
        <div className={style.property_item}>
          <p className="text text_type_main-default text_color_inactive">
            Углеводы, г
          </p>
          <p className={`text text_type_digits-default ${style.property_value}`}>
            {props.ingredient.carbohydrates}
          </p>
        </div>
      </div>
    </Popup>
    </>
  )
}

IngredientInfoPopup.propTypes = {
  ingredient: ingredient.isRequired,
  close: PropTypes.func.isRequired
}

export default IngredientInfoPopup
