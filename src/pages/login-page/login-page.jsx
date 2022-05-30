import {React, useState} from 'react'
import { Link } from 'react-router-dom';
import style from '../index.module.css'
import {PasswordInput, Input, Button} from '@ya.praktikum/react-developer-burger-ui-components'

export function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onChangePassword = e => {
    setPassword(e.target.value)
  }
  const onChangeEmail = e => {
    setEmail(e.target.value)
  }

  return (
    <main className={style.wrapper}>
      <div className={style.container}>
        <div className={style.title}>
          <p className='text text_type_main-medium'>Вход</p>
        </div>
        <form className={style.form_container}>
          <div className={style.inputs_container}>
            <Input
              type={'email'}
              placeholder={'E-mail'}
              onChange={onChangeEmail}
              value={email}
              error={false}
              errorText={'Ошибка'}
            />
            <PasswordInput value={password} onChange={onChangePassword}/>
          </div>
          <Button type="primary" size="medium">
            Войти
          </Button>
        </form>
        <p className="text text_type_main-default text_color_inactive">
          Вы - новый пользователь? {' '}
          <Link to="/register" className={style.link}>
            Зарегистрироваться
          </Link>
        </p>
        <p className="text text_type_main-default text_color_inactive">
          Забыли пароль?  {' '}
          <Link to="/forgot-password" className={style.link}>
            Восстановить пароль
          </Link>
        </p>
      </div>
    </main>
  )
}