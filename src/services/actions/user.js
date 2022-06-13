import {
  registrationUserRequest,
  forgotPasswordRequest,
  resetPasswordRequest,
  loginRequest,
  logoutRequest,
  getUserRequest,
  refreshTokenRequest,
  updateUserRequest
} from '../../utils/fetch_api'

import {setCookie, deleteCookie, getCookie} from '../../utils/cookie_handlers'

// регистрация нового пользователя
export const REGISTRATION_REQUEST = 'REGISTRATION_REQUEST'
export const REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS'
export const REGISTRATION_FAILED = 'REGISTRATION_FAILED'

// вход
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILED = 'LOGIN_FAILED'

// выход
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILED = 'LOGOUT_FAILED'

// отправка емейла для восстановления пароля
export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST'
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS'
export const FORGOT_PASSWORD_FAILED = 'FORGOT_PASSWORD_FAILED'

// сброс и восстановление пароля
export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST'
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS'
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED'

// обновление данных о пользователе
export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST'
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS'
export const UPDATE_USER_FAILED = 'UPDATE_USER_FAILED'

// получение данных о юзере
export const GET_USER_REQUEST = 'GET_USER_REQUEST'
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS'
export const GET_USER_FAILED = 'GET_USER_FAILED'

// обновление токена
export const REFRESH_TOKEN_REQUEST = 'REFRESH_TOKEN_REQUEST'
export const REFRESH_TOKEN_SUCCESS = 'REFRESH_TOKEN_SUCCESS'
export const REFRESH_TOKEN_FAILED = 'REFRESH_TOKEN_FAILED'


export const registrationUser = (email, password, name) => {
  return function(dispatch) {
    dispatch({type: REGISTRATION_REQUEST})
    
    registrationUserRequest(email, password, name).then(resp => {
      if (resp.success) {
        setCookie('token', resp.accessToken)
        localStorage.setItem('refreshToken', resp.refreshToken)
        dispatch(
          {
            type: REGISTRATION_SUCCESS,
            user: resp.user
          }
        )
      }
    }).catch(error => {
      console.error(error);
      dispatch({
          type: REGISTRATION_FAILED
      })
    })
  }
}

export const forgotPassword = email => {
  return function (dispatch) {
    dispatch({
      type: FORGOT_PASSWORD_REQUEST
    })

    forgotPasswordRequest(email).then(resp => {
      if (resp.success) {
        dispatch({
          type: FORGOT_PASSWORD_SUCCESS
        })
      }
    }).catch(error => {
      console.error(error)
      dispatch({
        type: FORGOT_PASSWORD_FAILED
      })
    })
  }
}

export const resetPassword = (newPassword, code) => {
  return function (dispatch) {
    dispatch({
      type: RESET_PASSWORD_REQUEST
    })

    resetPasswordRequest(newPassword, code).then(resp => {
      if (resp.success) {
        dispatch({
          type: RESET_PASSWORD_SUCCESS
        })
      }
    }).catch(error => {
      console.error(error)
      dispatch({
        type: RESET_PASSWORD_FAILED
      })
    })
  }
}

export const login = (email, password) => {
  return function(dispatch) {

    dispatch({
      type: LOGIN_REQUEST
    })

    loginRequest(email, password).then(resp => {
      if (resp.success) {
        setCookie('token', resp.accessToken)
        localStorage.setItem('refreshToken', resp.refreshToken)

        dispatch({
          type: LOGIN_SUCCESS,
          user: resp.user
        })
      }
    })
    .catch(error => {
      console.error(error)

      dispatch({
        type: LOGIN_FAILED
      })
    })
  }
}

export const logout = () => {
  return function(dispatch) {
    dispatch({
      type: LOGOUT_REQUEST
    })

    logoutRequest()
    .then(resp => {
      if (resp.success) {
        localStorage.removeItem('refreshToken')
        deleteCookie('token')
        dispatch({
          type: LOGOUT_SUCCESS
        })
      }
    })
    .catch(error => {
      console.error(error)

      dispatch({
        type: LOGOUT_FAILED
      })
    })
  }
}

export const updateToken = () => {
  return function(dispatch) {
    dispatch({
      type: REFRESH_TOKEN_REQUEST
    })
    refreshTokenRequest().then((resp) => {
      if (resp.success) {
        setCookie('token', resp.accessToken)
        localStorage.setItem('refreshToken', resp.refreshToken)
        dispatch({
          type: REFRESH_TOKEN_SUCCESS,
        })
      }
    }).catch(error => {
      console.error(error)
      dispatch({
        type: REFRESH_TOKEN_FAILED
      })
    })
  }
}

export const getUser = () => {
  return function(dispatch) {
    dispatch({
      type: GET_USER_REQUEST
    })

    getUserRequest().then(resp => {
      if (resp.success) {
        dispatch({
          type: GET_USER_SUCCESS,
          user: resp.user
        })
        dispatch({
          type: LOGIN_SUCCESS,
          user: resp.user
        })
      }
    }).catch((error) => {
      if (localStorage.getItem('refreshToken')) {
        dispatch(updateToken())
      } 
      else {
        dispatch({
          type: GET_USER_FAILED
        })
      }
    })
  }
}

export const updateUser = (email, name) => {
  return function(dispatch) {
    dispatch({
      type: UPDATE_USER_REQUEST
    });
    updateUserRequest(email, name).then(resp => {
      if (resp.success) {
        dispatch({
          type: UPDATE_USER_SUCCESS,
          user: resp.user
        });
      }
    }).catch(error => {
      console.error(error);
      if (localStorage.getItem('refreshToken')) {
        dispatch(updateToken())
        dispatch(updateUser(email, name))
      } else {
        dispatch({
          type: UPDATE_USER_FAILED
        })
      }
    })
  }
}