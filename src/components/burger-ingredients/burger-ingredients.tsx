import React, { SyntheticEvent } from 'react';
import style from'./burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientsTab } from '../ingredients-tab/ingredients-tab';
import { useSelector } from '../../services/types/hooks';
import { TIngredient } from '../../utils/types';

export const BurgerIngredients: React.FunctionComponent = () => {

  // TODO: store typing
  const ingredients: TIngredient[] = useSelector(store => store?.ingredients.ingredients)

  // current tab
  const [current, setCurrent] = React.useState<string>('bun')
  
  // ref's
  const refBun = React.useRef<HTMLDivElement | null>(null);
  const refMain = React.useRef<HTMLDivElement | null>(null);
  const refSauces = React.useRef<HTMLDivElement | null>(null); 
  
  // array's of ingredient filtered by type
  const bunIngredients: TIngredient[] = ingredients.filter((item: TIngredient) => item.type === 'bun');
  const sauceIngredients: TIngredient[] = ingredients.filter((item: TIngredient) => item.type === 'sauce');
  const mainIngredients: TIngredient[] = ingredients.filter((item: TIngredient) => item.type === 'main');

  const scrollToTab = (value: string): void => {
    setCurrent(value)
    switch (value) {
      case 'bun': {
        refBun?.current?.scrollIntoView({ behavior: 'smooth' })
        break
      }
      case 'main': {
        refMain?.current?.scrollIntoView({ behavior: 'smooth' })
        break
      }
      case 'sauce': {
        refSauces?.current?.scrollIntoView({ behavior: 'smooth' })
        break
      }
      default: {
        break
      }
    }
  }

  // TODO: check event typing
  const focusCurrentTab = (e: SyntheticEvent) => {
    if ((refBun && refBun?.current?.offsetHeight) && (e?.currentTarget?.scrollTop - refBun.current.offsetHeight <  0)) {
      setCurrent('bun')
    } else if (((refSauces?.current?.offsetHeight) && (refBun?.current?.offsetHeight)) && (e?.currentTarget?.scrollTop - refSauces.current.offsetHeight - refBun.current.offsetHeight < 0)) {
      setCurrent('sauce')
    } else {
      setCurrent('main')
    }
  }

  return (
  <section className={style.container}>
    <div className={style.title_container}>
      <p className={`text text_type_main-large ${style.title_text}`}>???????????????? ????????????</p>
    </div>
    <div className={style.tab}>
      <Tab value="bun" active={current === 'bun'} onClick={scrollToTab}>
        ??????????
      </Tab>
      <Tab value="sauce" active={current === 'sauce'} onClick={scrollToTab}>
        ??????????
      </Tab>
      <Tab value="main" active={current === 'main'} onClick={scrollToTab}>
        ??????????????
      </Tab>
    </div>
    <div className={style.scrolled} onScroll={focusCurrentTab}>
      <IngredientsTab title="??????????" ingredients={bunIngredients} ref={refBun}/>
      <IngredientsTab title="??????????" ingredients={sauceIngredients} ref={refSauces}/>
      <IngredientsTab title="??????????????" ingredients={mainIngredients} ref={refMain}/>
    </div>
  </section>
  );
};