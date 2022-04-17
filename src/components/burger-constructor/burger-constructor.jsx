import React from 'react';
import style from'./burger-constructor.module.css'

function BurgerConstructor() {
  return (
    <section className={style.container}>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%',}}>
      <h1>Здесь будет конструктор бургеров</h1>
      </div>
      
    </section>
  );
}

export default BurgerConstructor;
