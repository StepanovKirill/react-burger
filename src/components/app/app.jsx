import {useState, React} from 'react';
import style from'./app.module.css'
import AppHeader from '../app-header/app-header.jsx'
import BurgerConstructor from '../burger-constructor/burger-constructor.jsx'
import BurgerIngredients from '../burger-ingredients/burger-ingredients.jsx'
import data from '../../utils/data.js'

function App() {
  // стейт для ингредиентов
  const [ingredients, setIngredients] = useState(data.map(item => {return {...item, count: 1}}))
  // стейт для собранного бургера
  const [composition, setComposition] = useState([ingredients[0], ingredients[1],ingredients[2],ingredients[3], ingredients[4], ingredients[5], ingredients[6], ingredients[7], ingredients[8]])
  return (
    <div className={style.app}>
      <AppHeader />
      <main className={style.main}>
        <div className={style.container}>
          <BurgerIngredients ingredients={ingredients} />
          <BurgerConstructor composition={composition}/>
        </div>
      </main>
    </div>
  );
}

export default App;
