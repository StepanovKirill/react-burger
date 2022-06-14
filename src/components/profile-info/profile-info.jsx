import {React, useState, useEffect} from "react"
import style from './profile-info.module.css'
import {PasswordInput, Input, Button} from '@ya.praktikum/react-developer-burger-ui-components'
import {useDispatch, useSelector} from "react-redux"
import {updateUser} from "../../services/actions/user"

export function ProfileInfo() {
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isChange, setIsChange] = useState(false)
  const {user} = useSelector(store => store.user)
  
  const onChangeName = e => {
    setIsChange(true)
    setName(e.target.value)
  }

  const onChangePassword = e => {
    setIsChange(true)
    setPassword(e.target.value)
  }
  const onChangeEmail = e => {
    setIsChange(true)
    setEmail(e.target.value)
  }

  const resetUserInfo = () => {
    setName(user.name)
    setEmail(user.email)
    setIsChange(false)
  }

  const updateUserInfo = (e) => {
    e.preventDefault()
    dispatch(updateUser(email, name))
  }

  useEffect(() => {
    setName(user.name)
    setEmail(user.email)
  }, [user]);

  return (
    <form className={style.form_container} onSubmit={updateUserInfo}>
      <div className={style.inputs_container}>
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={onChangeName}
          value={name}
          error={false}
          errorText={'Ошибка'}
          icon={'EditIcon'}
        />
        <Input
          type={'email'}
          placeholder={'E-mail'}
          onChange={onChangeEmail}
          value={email}
          error={false}
          errorText={'Ошибка'}
          icon={'EditIcon'}
        />
        <PasswordInput value={password} onChange={onChangePassword}/>
      </div>
        <Button type="secondary" size="medium" disabled={!isChange} onClick={resetUserInfo}>
          Отмена
        </Button>        
        <Button type="primary" size="medium" disabled={!isChange} onClick={updateUserInfo}>
          Сохранить
        </Button> 
      </form>
  )
}