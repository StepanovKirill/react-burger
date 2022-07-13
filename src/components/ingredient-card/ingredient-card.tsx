import React, {FC} from 'react'
import { useDrag } from 'react-dnd'
import { TIngredient } from '../../utils/types'
import style from'./ingredient-card.module.css'
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import { useSelector, useDispatch } from '../../services/types/hooks';
import { openModalIngredient } from '../../services/actions/ingredients'
import { useLocation, Link } from 'react-router-dom'

export const IngredientCard: FC<{ingredient: TIngredient}> = ({ingredient}) => {

  // TODO: store typing
  const order: TIngredient[] | null = useSelector(store => store.constructor.ingredientsConstructor)
  
  // TODO: hook typing
  const dispatch = useDispatch()

  const location = useLocation<Location>()
  
  // TODO: hook typing ???
  const [, dragRef] = useDrag({
      type: 'ingredients',
      item: ingredient
  })

  const openIngredientsDetail = (ingredientID: string) => {
    dispatch(openModalIngredient(ingredientID))
  }
  const count = order?.filter((item: TIngredient) => item._id === ingredient._id).length

  return (
    <Link 
      to={{ pathname: `/ingredients/${ingredient._id}`, state: {background: location} }}
      onClick={() => {openIngredientsDetail(ingredient._id)}} 
      className={style.link}
    >
      <div className={style.container} ref={dragRef}>
        <div className={style.image_container}>
          <img src={ingredient.image} alt={ingredient.name} />
          <div className={style.counter}>
            {count > 0 && <Counter count={count} size="default" />}
          </div>
        </div>
        <div className={style.price_container}>
          <div className={style.price_value}>
            <p className="text text_type_digits-default">
              {ingredient.price}
            </p>
          </div>
          <div className={style.icon}>
            <CurrencyIcon type='primary'/>
          </div>
        </div>
        <div className={style.name_container}>
          <p className={`text text_type_main-small ${style.name_text}`}>{ingredient.name}</p>
        </div>
      </div>
    </Link>
  );
}