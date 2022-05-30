import {React, useState} from 'react'
import { Link } from 'react-router-dom';
import style from '../index.module.css'
import {PasswordInput, Input, Button} from '@ya.praktikum/react-developer-burger-ui-components'

export function ResetPasswordPage() {
  const [newPassword, setPassword] = useState('')
  const [code, setCode] = useState(null)

  const onChangePassword = e => {
    setPassword(e.target.value)
  }

  const onChangeCode = e => {
    setCode(e.target.value)
  }


  return (
    <main className={style.wrapper}>
      <div className={style.container}>
        <div className={style.title}>
          <p className='text text_type_main-medium'>Восстановление пароля</p>
        </div>
        <form className={style.form_container}>
          <div className={style.inputs_container}>
            <Input       
              type='password'        
              placeholder={'Введите новый пароль'}
              value={newPassword}
              onChange={onChangePassword}
            />
            <Input       
              placeholder={'Введите код из письма'}
              value={code}
              onChange={onChangeCode}
            />
          </div>
          <Button type="primary" size="medium"> 
            Сохранить
          </Button>
        </form>
        <p className="text text_type_main-default text_color_inactive">
          Вспомнили пароль?  {' '}
          <Link to="/forgot-password" className={style.link}>
            Войти
          </Link>
        </p>
      </div>
    </main>
  )
}