import {getCookie} from '../utils/cookie_handlers'

const URL_API = 'https://norma.nomoreparties.space/api/'
const INGREDIENT_API = URL_API + 'ingredients';
const ORDER_API = URL_API + 'orders'
const REGISTRATION_USER_API = URL_API + 'auth/register'
const FORGOT_PASSWORD_API = URL_API + 'password-reset'
const RESET_PASSWORD_API = URL_API + 'password-reset/reset'
const LOGIN_API = URL_API + 'auth/login'
const LOGOUT_API = URL_API + 'auth/logout'
const GET_USER_API = URL_API + 'auth/user'
const REFRESH_TOKEN_API = URL_API + 'auth/token'
const UPDATE_USER_API = URL_API + 'auth/user'

export const getIngredientsRequest = () => {
  return fetch(INGREDIENT_API).then(checkResponse)
};

export const postOrderRequest = (ingredients) => {
  return fetch(ORDER_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ ingredients: ingredients }),
  }).then(checkResponse)
}

export const registrationUserRequest = (email, password, name) => {
  return fetch(REGISTRATION_USER_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "email": email,
      "password": password,
      "name": name
    }),
  }).then(checkResponse)
}

export const forgotPasswordRequest = email => {
  return fetch(FORGOT_PASSWORD_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "email": email
    }),
  }).then(checkResponse)
}

export const resetPasswordRequest = (password, code) => {
  return fetch(RESET_PASSWORD_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "password": password,
      "token": code
    }),
  }).then(checkResponse)
}

export const loginRequest = (email, password) => {
  return fetch(LOGIN_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "email": email,
      "password": password
    }),
  }).then(checkResponse)
}

export const logoutRequest = () => {
  return fetch(LOGOUT_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body:
      JSON.stringify({"token": localStorage.getItem('refreshToken')
    })
  }).then(checkResponse)
}

export const refreshTokenRequest = () => {
  return fetch(REFRESH_TOKEN_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body:
      JSON.stringify({"token": localStorage.getItem('refreshToken')
    })
  }).then(checkResponse)
}

export const getUserRequest = () => {
  return fetch(GET_USER_API, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: getCookie('token')
    }
  }).then(checkResponse)
}

export const updateUserRequest = (email, name) => {
  return fetch(UPDATE_USER_API, {
    method: "PATCH",
    headers: {
        "Content-Type": "application/json",
        Authorization: getCookie('token'),
    },
    body: JSON.stringify({ email, name }),
})
.then(checkResponse)
}

const checkResponse = (response) => {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(response.status)
}
