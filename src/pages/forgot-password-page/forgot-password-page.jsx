import {React, useState} from 'react'
import { Link } from 'react-router-dom';
import style from '../index.module.css'
import {PasswordInput, Input, Button} from '@ya.praktikum/react-developer-burger-ui-components'

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('')

  const onChangeEmail = e => {
    setEmail(e.target.value)
  }

  return (
    <main className={style.wrapper}>
      <div className={style.container}>
        <div className={style.title}>
          <p className='text text_type_main-medium'>Забыли пароль?</p>
        </div>
        <form className={style.form_container}>
          <div className={style.inputs_container}>
            <Input
              type={'email'}
              placeholder={'Укажите e-mail'}
              onChange={onChangeEmail}
              value={email}
              error={false}
              errorText={'Ошибка'}
            />
          </div>
          <Button type="primary" size="medium">
            Восстановить
          </Button>
        </form>
        <p className="text text_type_main-default text_color_inactive">
          Вспомнили пароль? {' '}
          <Link to="/login" className={style.link}>
            Войти
          </Link>
        </p>
      </div>
    </main>
  )
}