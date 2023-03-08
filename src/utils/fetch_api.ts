import { getCookie } from './cookie_handlers';

const URL_API = 'https://norma.nomoreparties.space/api/';
const INGREDIENT_API = `${URL_API}ingredients`;
const ORDER_API = `${URL_API}orders`;
const REGISTRATION_USER_API = `${URL_API}auth/register`;
const FORGOT_PASSWORD_API = `${URL_API}password-reset`;
const RESET_PASSWORD_API = `${URL_API}password-reset/reset`;
const LOGIN_API = `${URL_API}auth/login`;
const LOGOUT_API = `${URL_API}auth/logout`;
const GET_USER_API = `${URL_API}auth/user`;
const REFRESH_TOKEN_API = `${URL_API}auth/token`;
const UPDATE_USER_API = `${URL_API}auth/user`;

const checkResponse = (response: Response) => {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(response.status);
};

export const getIngredientsRequest = () => fetch(INGREDIENT_API).then(checkResponse);

export const postOrderRequest = (ingredients: { ingredients: string[] }) =>
  fetch(ORDER_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${getCookie('token')}`,
    },
    body: JSON.stringify({ ingredients }),
  }).then(checkResponse);

export const registrationUserRequest = (email: string, password: string, name: string) =>
  fetch(REGISTRATION_USER_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
      name,
    }),
  }).then(checkResponse);

export const forgotPasswordRequest = (email: string) =>
  fetch(FORGOT_PASSWORD_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
    }),
  }).then(checkResponse);

export const resetPasswordRequest = (password: string, code: string) =>
  fetch(RESET_PASSWORD_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      password,
      token: code,
    }),
  }).then(checkResponse);

export const loginRequest = (email: string, password: string) =>
  fetch(LOGIN_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  }).then(checkResponse);

export const logoutRequest = () =>
  fetch(LOGOUT_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
  }).then(checkResponse);

export const refreshTokenRequest = () =>
  fetch(REFRESH_TOKEN_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
  }).then(checkResponse);

export const getUserRequest = () =>
  fetch(GET_USER_API, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: String(getCookie('token')),
    },
  }).then(checkResponse);

export const updateUserRequest = (email: string, name: string) =>
  fetch(UPDATE_USER_API, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: String(getCookie('token')),
    },
    body: JSON.stringify({ email, name }),
  }).then(checkResponse);
