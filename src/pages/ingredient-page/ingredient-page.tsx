import React from 'react'
import style from './ingredient-page.module.css'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { IngredientDetails } from '../../components/ingredient-details/ingredient-details'
import { TIngredient } from '../../utils/types'

export const IngredientPage = () => {
  const params = useParams<{id: string}>()
  const ingredients = useSelector<any, TIngredient[]>(store => store.ingredients.ingredients)

  const currentIngredient = ingredients.find((item: TIngredient) => params.id === item._id)
  return (
    <main className={style.wrapper}>
      <h2 className='text text_type_main-large'>Детали ингредиента</h2>
      {currentIngredient && <IngredientDetails />}
    </main>
  )
}