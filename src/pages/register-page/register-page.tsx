import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import style from '../index.module.css'
import { PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { registrationUser } from '../../services/actions/user'

export function RegisterPage() {
  const [name, setName] = React.useState<string>('')
  const [email, setEmail] = React.useState<string>('')
  const [password, setPassword] = React.useState<string>('')

  // TODO: hook typing ??
  const dispatch = useDispatch()
  
  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }
  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handleSubmit= (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    dispatch(registrationUser(
      email, 
      password, 
      name)
    )
  }

  return (
    <main className={style.wrapper}>
      <div className={style.container}>
        <div className={style.title}>
          <p className='text text_type_main-medium'>Регистрация</p>
        </div>
        <form className={style.form_container} onSubmit={handleSubmit}>
          <div className={style.inputs_container}>
            <Input
              placeholder={'Имя'}
              onChange={onChangeName}
              value={name}
            />
            <Input
              type={'email'}
              placeholder={'E-mail'}
              onChange={onChangeEmail}
              value={email}
              error={false}
              errorText={'Ошибка'}
            />
            <PasswordInput value={password} onChange={onChangePassword} name=''/>
          </div>
          <Button type="primary" size="medium">
            Зарегистрироваться
          </Button>
        </form>
        <p className="text text_type_main-default text_color_inactive">
          Уже зарегистрированы? {' '}
          <Link to="/login" className={style.link}>
            Войти
          </Link>
        </p>
      </div>
    </main>
  )
}