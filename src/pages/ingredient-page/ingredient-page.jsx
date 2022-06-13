import React from 'react'
import style from './ingredient-page.module.css'
import {useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import IngredientDetails from '../../components/ingredient-details/ingredient-details'

export const IngredientPage = () => {
  const params = useParams()
  const {ingredients} = useSelector(store => store.ingredients)
  const currentIngredient = ingredients.find(item => params.id === item._id)
  return (
    <main className={style.wrapper}>
      <h2 className='text text_type_main-large'>Детали ингредиента</h2>
      {currentIngredient && <IngredientDetails />}
    </main>
  )
}