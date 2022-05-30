import {React, useState} from "react"
import style from './profile-info.module.css'
import {PasswordInput, Input, Button} from '@ya.praktikum/react-developer-burger-ui-components'

export function ProfileInfo() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isChange, setIsChange] = useState(false)
  
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
    setIsChange(false)

    // TODO добавить редьюсер для сброса формы

  }

  const updateUserInfo = () => {
    // TODO добавить обновление данных о пользователе
  }

  return (
    <form className={style.form_container}>
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