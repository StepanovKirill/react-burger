import React, {FC} from "react";
import { useDrop, useDrag } from 'react-dnd';
import style from './constructor-ingredient.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { TIngredient } from "../../utils/types";

type TConstructorIngredient = {
  item: TIngredient;
  onDelete: (uid: number | undefined) => void;
  onMove: (targetIndex: number, sourceIndex: number) => void;
  index: number;
};

export const ConstructorIngredient: FC<TConstructorIngredient> = ({item, onDelete, onMove, index}) => {
  
  // ref
  const ref = React.useRef(null);
  
  // TODO: useDrag typing???? 
  // on drag current element
  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: {index}
  });

  // TODO: useDrop typing???
  // on drop
  const [, dropTarget] = useDrop({
    accept: "ingredient",
    hover: (item: {index: number}) => {
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
      <DragIcon type="primary"/>
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
};