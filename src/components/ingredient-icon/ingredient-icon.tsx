import React from 'react';

import style from './ingredient-icon.module.css';

const IngredientIcon: React.FC<{ imageURL: string; last?: boolean; count?: number }> = ({ imageURL, last, count }) => {
  const iconStyle: React.CSSProperties = React.useMemo(
    () => ({
      boxSizing: 'border-box',
      width: '100%',
      height: '56px',
      backgroundImage: `url(${imageURL})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
    }),
    [imageURL],
  );

  return (
    <div className={style.container}>
      <div className={style.counter}>{count && `+${count}`}</div>
      <div style={iconStyle} className={`${last && style.last}`} />
    </div>
  );
};

IngredientIcon.defaultProps = {
  last: undefined,
  count: undefined,
};

export default IngredientIcon;
