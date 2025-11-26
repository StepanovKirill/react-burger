import React from 'react';
import { Link } from 'react-router-dom';
import { PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import style from '../index.module.css';
import { registrationUser } from '../../services/actions/user';
import { useDispatch } from '../../services/types/hooks';

export default function RegisterPage(): JSX.Element {
  const [name, setName] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');

  const dispatch = useDispatch();

  const onChangeName = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }, []);

  const onChangePassword = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }, []);

  const onChangeEmail = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }, []);

  const handleSubmit = React.useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      dispatch(registrationUser(email, password, name));
    },
    [dispatch, email, password, name],
  );

  return (
    <main className={style.wrapper}>
      <div className={style.container}>
        <div className={style.title}>
          <p className="text text_type_main-medium">Регистрация</p>
        </div>
        <form className={style.form_container} onSubmit={handleSubmit}>
          <div className={style.inputs_container}>
            <Input placeholder="Имя" onChange={onChangeName} value={name} />
            <Input
              type="email"
              placeholder="E-mail"
              onChange={onChangeEmail}
              value={email}
              error={false}
              errorText="Ошибка"
            />
            <PasswordInput value={password} onChange={onChangePassword} name="" />
          </div>
          <Button htmlType="submit" type="primary" size="medium">
            Зарегистрироваться
          </Button>
        </form>
        <p className="text text_type_main-default text_color_inactive">
          Уже зарегистрированы?{' '}
          <Link to="/login" className={style.link}>
            Войти
          </Link>
        </p>
      </div>
    </main>
  );
}
