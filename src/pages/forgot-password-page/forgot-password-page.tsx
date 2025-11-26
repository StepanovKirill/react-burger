import React, { ChangeEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import { useSelector, useDispatch } from '../../services/types/hooks';
import style from '../index.module.css';
import { forgotPassword } from '../../services/actions/user';

export default function ForgotPasswordPage(): JSX.Element {
  const [email, setEmail] = React.useState<string>('');
  const history = useHistory<{ from: string }>();

  const dispatch = useDispatch();
  const isLogged = useSelector((store) => store.user.isLogged);

  const onChangeEmail = React.useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }, []);

  const handleSubmit = React.useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      dispatch(forgotPassword(email));
      history.push({ pathname: '/reset-password', state: { from: history.location.pathname } });
    },
    [dispatch, history, email],
  );

  if (isLogged) {
    history.push({ pathname: '/' });
  }

  return (
    <main className={style.wrapper}>
      <div className={style.container}>
        <div className={style.title}>
          <p className="text text_type_main-medium">Забыли пароль?</p>
        </div>
        <form className={style.form_container} onSubmit={handleSubmit}>
          <div className={style.inputs_container}>
            <Input
              type="email"
              placeholder="Укажите e-mail"
              onChange={onChangeEmail}
              value={email}
              error={false}
              errorText="Ошибка"
            />
          </div>
          <Button htmlType="submit" type="primary" size="medium">
            Восстановить
          </Button>
        </form>
        <p className="text text_type_main-default text_color_inactive">
          Вспомнили пароль?{' '}
          <Link to="/login" className={style.link}>
            Войти
          </Link>
        </p>
      </div>
    </main>
  );
}
