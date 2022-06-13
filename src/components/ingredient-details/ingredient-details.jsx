import {React, useEffect} from "react";
import style from './ingredient-details.module.css'
import {useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'

function IngredientDetails() {
  const params = useParams()
  const {ingredients} = useSelector(store => store.ingredients)
  const currentIngredient = ingredients.find(item => item._id === params.id)
  useEffect(() => {
  }, [ingredients]);

  if (ingredients.length === 0) {
    return null
  }
  return (
    <>
      <div className={style.image_container}>
        <img src={currentIngredient.image_large} alt={currentIngredient.name}></img>
      </div>
      <div className={style.name_container}>
        <p className="text text_type_main-medium">
          {currentIngredient.name}
        </p>
      </div>
      <div className={style.property_container}>
        <div className={style.property_item}>
          <p className="text text_type_main-default text_color_inactive">
            Калории, ккал
          </p>
          <p className={`text text_type_digits-default ${style.property_value}`}>
            {currentIngredient.calories}
          </p>
        </div>
        <div className={style.property_item}>
          <p className="text text_type_main-default text_color_inactive">
            Белки, г
          </p>
          <p className={`text text_type_digits-default ${style.property_value}`}>
            {currentIngredient.proteins}
          </p>
        </div>
        <div className={style.property_item}>
          <p className="text text_type_main-default text_color_inactive">
            Жиры, г
          </p>
          <p className={`text text_type_digits-default ${style.property_value}`}>
            {currentIngredient.fat}
          </p>
        </div>
        <div className={style.property_item}>
          <p className="text text_type_main-default text_color_inactive">
            Углеводы, г
          </p>
          <p className={`text text_type_digits-default ${style.property_value}`}>
            {currentIngredient.carbohydrates}
          </p>
        </div>
      </div>
    </>
  )
}

export default IngredientDetails
