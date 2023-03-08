import React, { FC } from 'react';
import { useDrop, useDrag } from 'react-dnd';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import style from './constructor-ingredient.module.css';
import { TIngredient } from '../../utils/types';

type TConstructorIngredient = {
  item: TIngredient;
  onDelete: (uid: string | undefined) => void;
  onMove: (targetIndex: number, sourceIndex: number) => void;
  index: number;
};

const ConstructorIngredient: FC<TConstructorIngredient> = ({ item, onDelete, onMove, index }) => {
  // ref
  const ref = React.useRef(null);

  // on drag current element
  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: { index },
  });

  // on drop
  const [, dropTarget] = useDrop({
    accept: 'ingredient',
    hover: (hoverItem: { index: number }) => {
      // index - is target index (current hover) of element in source array
      // item.index - is source index (current draggable) of element in source array
      const sourceIndex = hoverItem.index;
      const targetIndex = index;

      if (targetIndex === sourceIndex) return;

      onMove(targetIndex, sourceIndex);

      // after moving reassign target index for current element
      // eslint-disable-next-line no-param-reassign
      hoverItem.index = targetIndex;
    },
  });

  dragRef(dropTarget(ref));

  const onCloseHandler = React.useCallback(() => {
    onDelete(item.uid);
  }, [onDelete, item.uid]);

  return (
    <div className={style.item_container} draggable ref={ref}>
      <DragIcon type="primary" />
      <ConstructorElement
        key={item.uid}
        text={item.name}
        isLocked={false}
        price={item.price}
        thumbnail={item.image}
        handleClose={onCloseHandler}
      />
    </div>
  );
};

export default ConstructorIngredient;
