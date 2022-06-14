import {React, useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import style from '../index.module.css'
import {Input, Button} from '@ya.praktikum/react-developer-burger-ui-components'
import {useDispatch, useSelector} from 'react-redux'
import {resetPassword} from '../../services/actions/user'

export function ResetPasswordPage() {
  const [newPassword, setPassword] = useState('')
  const [code, setCode] = useState('')
  const dispatch = useDispatch()
  const history = useHistory()
  const prevPage = history.location.state?.from
  const isLogged = useSelector(store => store.user.isLogged)

  const onChangePassword = e => {
    setPassword(e.target.value)
  }

  const onChangeCode = e => {
    setCode(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()

    dispatch(resetPassword(newPassword, code))
    history.push({pathname: '/login'})
  }

  if (!prevPage) {
    history.push({pathname: '/login'})
  }

  if (isLogged) {
    history.push({pathname: '/'})
  }

  return (
    <main className={style.wrapper}>
      <div className={style.container}>
        <div className={style.title}>
          <p className='text text_type_main-medium'>Восстановление пароля</p>
        </div>
        <form className={style.form_container} onSubmit={handleSubmit}>
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
          <Link to="/login" className={style.link}>
            Войти
          </Link>
        </p>
      </div>
    </main>
  )
}