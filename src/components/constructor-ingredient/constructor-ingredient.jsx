import React from "react"
import PropTypes from 'prop-types'
import {useDrop, useDrag} from 'react-dnd'
import style from './constructor-ingredient.module.css'
import ingredient from "../../utils/types"
import {ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components'

const ConstructorIngredient = ({item, onDelete, onMove, index}) => {
  // ref
  const ref = React.useRef(null);
  
  // on drag current element
  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: {index}
  });

  // on drop
  const [, dropTarget] = useDrop({
    accept: "ingredient",
    hover: (item) => {
      // index - is target index (current hover) of element in source array
      // item.index - is source index (current draggable) of element in source array
      const sourceIndex = item.index;
      const targetIndex = index;
      
      if (targetIndex === sourceIndex) return;
      onMove(targetIndex, sourceIndex);
      
      // after moving reassign target index for current element
      item.index = targetIndex;
    }
  });

dragRef(dropTarget(ref));

  return (
    <div 
      className={style.item_container}
      draggable
      ref={ref}
    >
      <DragIcon/>
      <ConstructorElement
        key={item.uid}
        text={item.name}
        isLocked={false}
        price={item.price}
        thumbnail={item.image}
        handleClose={() => {
          onDelete(item.uid)}}
      />
    </div>
  )
}

ConstructorIngredient.propTypes = {
  item: ingredient.isRequired,
  onMove: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired
}

export default ConstructorIngredient