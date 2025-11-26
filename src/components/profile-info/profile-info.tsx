import React, { ChangeEvent } from 'react';
import { PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import style from './profile-info.module.css';
import { useSelector, useDispatch } from '../../services/types/hooks';
import { updateUser } from '../../services/actions/user';

export default function ProfileInfo(): JSX.Element {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);

  const [name, setName] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [isChange, setIsChange] = React.useState<boolean>(false);

  const onChangeName = React.useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setIsChange(true);
    setName(e.target.value);
  }, []);

  const onChangePassword = React.useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setIsChange(true);
    setPassword(e.target.value);
  }, []);

  const onChangeEmail = React.useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setIsChange(true);
    setEmail(e.target.value);
  }, []);

  const resetUserInfo = React.useCallback(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setIsChange(false);
    }
  }, [user]);

  const updateUserInfo = React.useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      dispatch(updateUser(email, name));
    },
    [dispatch, email, name],
  );

  React.useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  return (
    <>
      <form className={style.form_container} onSubmit={updateUserInfo}>
        <div className={style.inputs_container}>
          <Input
            type="text"
            placeholder="Имя"
            onChange={onChangeName}
            value={name}
            error={false}
            errorText="Ошибка"
            icon="EditIcon"
          />
          <Input
            type="email"
            placeholder="E-mail"
            onChange={onChangeEmail}
            value={email}
            error={false}
            errorText="Ошибка"
            icon="EditIcon"
          />
          <PasswordInput value={password} onChange={onChangePassword} name="" />
        </div>
        <Button htmlType="submit" type="primary" size="medium" disabled={!isChange}>
          Сохранить
        </Button>
      </form>
      <Button htmlType="reset" type="secondary" size="medium" disabled={!isChange} onClick={resetUserInfo}>
        Отмена
      </Button>
    </>
  );
}
