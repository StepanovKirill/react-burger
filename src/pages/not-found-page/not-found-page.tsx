import React, { FC } from "react"
import style from '../index.module.css'

export const NotFoundPage: FC= () => {
  return (
    <main className={style.wrapper}>
      <div className={style.container}>
        <div className={style.title}>
          <p className='text text_type_main-medium'>Упс... Страница не найдена</p>
        </div>
      </div>
    </main>
  )
}