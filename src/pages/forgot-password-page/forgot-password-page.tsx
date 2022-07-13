import React, { ChangeEvent } from 'react'
import { useSelector, useDispatch } from '../../services/types/hooks';
import { Link, useHistory } from 'react-router-dom'
import style from '../index.module.css'
import {  Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { forgotPassword } from '../../services/actions/user';

export function ForgotPasswordPage() {
  const [email, setEmail] = React.useState<string>('')
  const history = useHistory<{ from: string }>()

  // TODO: hook's typing
  const dispatch = useDispatch()
  const isLogged = useSelector(store => store.user.isLogged)

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(forgotPassword(email))
    history.push({pathname: '/reset-password', state: {from: history.location.pathname}})
  }

  if (isLogged) {
    history.push({pathname: '/'})
  }

  return (
    <main className={style.wrapper}>
      <div className={style.container}>
        <div className={style.title}>
          <p className='text text_type_main-medium'>Забыли пароль?</p>
        </div>
        <form className={style.form_container} onSubmit={handleSubmit}>
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