import {React, useState, useEffect} from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import style from '../index.module.css'
import {PasswordInput, Input, Button} from '@ya.praktikum/react-developer-burger-ui-components'
import {login} from '../../services/actions/user'

export function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const history = useHistory()
  const from = useLocation().state?.from?.pathname
  const dispatch = useDispatch()
  const isLogged = useSelector(store => store.user.isLogged)
  const loginFailed = useSelector(store => store.user.loginFailed)
  
  const onChangePassword = e => {
    setPassword(e.target.value)
  }
  const onChangeEmail = e => {
    setEmail(e.target.value)
  }

  useEffect(() => {

    if (isLogged) {
      history.push({pathname: from ? from : '/'})
    }
  }, [history, isLogged, from])

  const handleSubmit = (e) => {
    e.preventDefault()

    dispatch(login(email, password))
  }

  return (
    <main className={style.wrapper}>
      <div className={style.container}>
        <div className={style.title}>
          <p className='text text_type_main-medium'>Вход</p>
        </div>
        <form className={style.form_container} onSubmit={handleSubmit}>
          <div className={style.inputs_container}>
            <Input
              type={'email'}
              placeholder={'E-mail'}
              onChange={onChangeEmail}
              value={email}
              error={loginFailed}
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