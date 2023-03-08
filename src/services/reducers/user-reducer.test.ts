import {
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILED,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
  REGISTRATION_REQUEST,
  REGISTRATION_SUCCESS,
  REGISTRATION_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,
  REFRESH_TOKEN_FAILED,
  REFRESH_TOKEN_REQUEST,
  REFRESH_TOKEN_SUCCESS,
  TUserActions,
} from '../actions/user';
import { userInitialState, userReducer } from './user-reducer';
import { user } from '../../utils/fake_data';

describe('Тест редьюсера пользователя', () => {
  it('возвращение начального состояния', () => {
    expect(userReducer(undefined, {} as TUserActions)).toEqual(userInitialState);
  });
  it('запросы восстановления пароля', () => {
    expect(userReducer(undefined, { type: FORGOT_PASSWORD_REQUEST })).toEqual({
      ...userInitialState,
      forgotPasswordRequest: true,
    });

    expect(
      userReducer({ ...userInitialState, forgotPasswordRequest: true }, { type: FORGOT_PASSWORD_FAILED }),
    ).toEqual({ ...userInitialState, forgotPasswordFailed: true });

    expect(
      userReducer({ ...userInitialState, forgotPasswordRequest: true }, { type: FORGOT_PASSWORD_SUCCESS }),
    ).toEqual(userInitialState);

    expect(userReducer(undefined, { type: RESET_PASSWORD_REQUEST })).toEqual({
      ...userInitialState,
      resetPasswordRequest: true,
    });

    expect(userReducer({ ...userInitialState, resetPasswordFailed: true }, { type: RESET_PASSWORD_FAILED })).toEqual({
      ...userInitialState,
      resetPasswordFailed: true,
    });

    expect(userReducer({ ...userInitialState, resetPasswordRequest: true }, { type: RESET_PASSWORD_SUCCESS })).toEqual(
      userInitialState,
    );
  });

  it('вход в профиль', () => {
    expect(userReducer(undefined, { type: LOGIN_REQUEST })).toEqual({ ...userInitialState, loginRequest: true });

    expect(userReducer({ ...userInitialState, loginRequest: true }, { type: LOGIN_FAILED })).toEqual({
      ...userInitialState,
      loginFailed: true,
    });

    expect(userReducer({ ...userInitialState, loginRequest: true }, { type: LOGIN_SUCCESS, user })).toEqual({
      ...userInitialState,
      isLogged: true,
      user,
    });
  });

  it('регистрация пользователя', () => {
    expect(userReducer(undefined, { type: REGISTRATION_REQUEST })).toEqual({
      ...userInitialState,
      registrationRequest: true,
    });

    expect(userReducer({ ...userInitialState, registrationRequest: true }, { type: REGISTRATION_FAILED })).toEqual({
      ...userInitialState,
      registrationFailed: true,
    });

    expect(
      userReducer({ ...userInitialState, registrationRequest: true }, { type: REGISTRATION_SUCCESS, user }),
    ).toEqual({ ...userInitialState, isLogged: true, user });
  });

  it('logout', () => {
    expect(userReducer(undefined, { type: LOGOUT_REQUEST })).toEqual({ ...userInitialState, logoutRequest: true });

    expect(userReducer({ ...userInitialState, logoutRequest: true }, { type: LOGOUT_FAILED })).toEqual({
      ...userInitialState,
      logoutFailed: true,
    });

    expect(userReducer({ ...userInitialState, logoutRequest: true }, { type: LOGOUT_SUCCESS })).toEqual(
      userInitialState,
    );
  });

  it('получение информации о пользователе', () => {
    expect(userReducer(undefined, { type: GET_USER_REQUEST })).toEqual({ ...userInitialState, getUserRequest: true });

    expect(userReducer({ ...userInitialState, getUserRequest: true }, { type: GET_USER_FAILED })).toEqual({
      ...userInitialState,
      getUserFailed: true,
    });

    expect(userReducer({ ...userInitialState, getUserRequest: true }, { type: GET_USER_SUCCESS, user })).toEqual({
      ...userInitialState,
      user,
      isLogged: true,
    });
  });

  it('обновление токена', () => {
    expect(userReducer(undefined, { type: REFRESH_TOKEN_REQUEST })).toEqual({
      ...userInitialState,
      refreshTokenRequest: true,
    });

    expect(userReducer({ ...userInitialState, refreshTokenRequest: true }, { type: REFRESH_TOKEN_FAILED })).toEqual({
      ...userInitialState,
      refreshTokenFailed: true,
    });

    expect(userReducer({ ...userInitialState, refreshTokenRequest: true }, { type: REFRESH_TOKEN_SUCCESS })).toEqual(
      userInitialState,
    );
  });

  it('обновление информации о пользователе', () => {
    expect(userReducer(undefined, { type: UPDATE_USER_REQUEST })).toEqual({
      ...userInitialState,
      updateUserRequest: true,
    });

    expect(userReducer({ ...userInitialState, updateUserRequest: true }, { type: UPDATE_USER_FAILED })).toEqual({
      ...userInitialState,
      updateUserFailed: true,
    });

    expect(userReducer({ ...userInitialState, updateUserRequest: true }, { type: UPDATE_USER_SUCCESS, user })).toEqual({
      ...userInitialState,
      user,
    });
  });
});
