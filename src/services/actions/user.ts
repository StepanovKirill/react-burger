import {
  registrationUserRequest,
  forgotPasswordRequest,
  resetPasswordRequest,
  loginRequest,
  logoutRequest,
  getUserRequest,
  refreshTokenRequest,
  updateUserRequest,
} from '../../utils/fetch_api';

/* eslint import/no-cycle: 0 */
import { AppDispatch, AppThunk } from '../types';
import { setCookie, deleteCookie } from '../../utils/cookie_handlers';
import { TUser } from '../../utils/types';

// регистрация нового пользователя
export const REGISTRATION_REQUEST = 'REGISTRATION_REQUEST' as const;
export const REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS' as const;
export const REGISTRATION_FAILED = 'REGISTRATION_FAILED' as const;

// вход
export const LOGIN_REQUEST = 'LOGIN_REQUEST' as const;
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS' as const;
export const LOGIN_FAILED = 'LOGIN_FAILED' as const;

// выход
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST' as const;
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS' as const;
export const LOGOUT_FAILED = 'LOGOUT_FAILED' as const;

// отправка емейла для восстановления пароля
export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST' as const;
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS' as const;
export const FORGOT_PASSWORD_FAILED = 'FORGOT_PASSWORD_FAILED' as const;

// сброс и восстановление пароля
export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST' as const;
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS' as const;
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED' as const;

// обновление данных о пользователе
export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST' as const;
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS' as const;
export const UPDATE_USER_FAILED = 'UPDATE_USER_FAILED' as const;

// получение данных о юзере
export const GET_USER_REQUEST = 'GET_USER_REQUEST' as const;
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS' as const;
export const GET_USER_FAILED = 'GET_USER_FAILED' as const;

// обновление токена
export const REFRESH_TOKEN_REQUEST = 'REFRESH_TOKEN_REQUEST' as const;
export const REFRESH_TOKEN_SUCCESS = 'REFRESH_TOKEN_SUCCESS' as const;
export const REFRESH_TOKEN_FAILED = 'REFRESH_TOKEN_FAILED' as const;

export interface IRegistrationRequest {
  readonly type: typeof REGISTRATION_REQUEST;
}

export interface IRegistrationSuccess {
  readonly type: typeof REGISTRATION_SUCCESS;
  readonly user: TUser;
}

export interface IRegistrationFailed {
  readonly type: typeof REGISTRATION_FAILED;
}

export interface ILoginRequest {
  readonly type: typeof LOGIN_REQUEST;
}

export interface ILoginSuccess {
  readonly type: typeof LOGIN_SUCCESS;
  readonly user: TUser;
}

export interface ILoginFailed {
  readonly type: typeof LOGIN_FAILED;
}

export interface IForgotPasswordRequest {
  readonly type: typeof FORGOT_PASSWORD_REQUEST;
}

export interface IForgotPasswordSuccess {
  readonly type: typeof FORGOT_PASSWORD_SUCCESS;
}

export interface IForgotPasswordFailed {
  readonly type: typeof FORGOT_PASSWORD_FAILED;
}

export interface IResetPasswordRequest {
  readonly type: typeof RESET_PASSWORD_REQUEST;
}

export interface IResetPasswordSuccess {
  readonly type: typeof RESET_PASSWORD_SUCCESS;
}

export interface IResetPasswordFailed {
  readonly type: typeof RESET_PASSWORD_FAILED;
}

export interface ILogoutRequest {
  readonly type: typeof LOGOUT_REQUEST;
}

export interface ILogoutSuccess {
  readonly type: typeof LOGOUT_SUCCESS;
}

export interface ILogoutFailed {
  readonly type: typeof LOGOUT_FAILED;
}

export interface IRefreshTokenRequest {
  readonly type: typeof REFRESH_TOKEN_REQUEST;
}

export interface IRefreshTokenSuccess {
  readonly type: typeof REFRESH_TOKEN_SUCCESS;
}

export interface IRefreshTokenFailed {
  readonly type: typeof REFRESH_TOKEN_FAILED;
}

export interface IUpdateUserRequest {
  readonly type: typeof UPDATE_USER_REQUEST;
}

export interface IUpdateUserSuccess {
  readonly type: typeof UPDATE_USER_SUCCESS;
  readonly user: TUser;
}

export interface IUpdateUserFailed {
  readonly type: typeof UPDATE_USER_FAILED;
}

export interface IGetUserRequest {
  readonly type: typeof GET_USER_REQUEST;
}

export interface IGetUserSuccess {
  readonly type: typeof GET_USER_SUCCESS;
  readonly user: TUser;
}

export interface IGetUserFailed {
  readonly type: typeof GET_USER_FAILED;
}

export type TUserActions =
  | IRegistrationRequest
  | IRegistrationSuccess
  | IRegistrationFailed
  | ILoginRequest
  | ILoginSuccess
  | ILoginFailed
  | IForgotPasswordRequest
  | IForgotPasswordSuccess
  | IForgotPasswordFailed
  | IResetPasswordRequest
  | IResetPasswordSuccess
  | IResetPasswordFailed
  | ILogoutRequest
  | ILogoutSuccess
  | ILogoutFailed
  | IRefreshTokenRequest
  | IRefreshTokenSuccess
  | IRefreshTokenFailed
  | IUpdateUserRequest
  | IUpdateUserSuccess
  | IUpdateUserFailed
  | IGetUserRequest
  | IGetUserSuccess
  | IGetUserFailed;

export const registrationUser: AppThunk = (email: string, password: string, name: string) => (
  dispatch: AppDispatch,
) => {
  dispatch({ type: REGISTRATION_REQUEST });

  registrationUserRequest(email, password, name)
    .then((resp) => {
      if (resp.success) {
        setCookie('token', resp.accessToken);
        localStorage.setItem('refreshToken', resp.refreshToken);
        dispatch({
          type: REGISTRATION_SUCCESS,
          user: resp.user,
        });
      }
    })
    .catch((error) => {
      console.error(error);
      dispatch({
        type: REGISTRATION_FAILED,
      });
    });
};

export const forgotPassword: AppThunk = (email: string) => (dispatch: AppDispatch) => {
  dispatch({
    type: FORGOT_PASSWORD_REQUEST,
  });

  forgotPasswordRequest(email)
    .then((resp) => {
      if (resp.success) {
        dispatch({
          type: FORGOT_PASSWORD_SUCCESS,
        });
      }
    })
    .catch((error) => {
      console.error(error);
      dispatch({
        type: FORGOT_PASSWORD_FAILED,
      });
    });
};

export const resetPassword: AppThunk = (newPassword: string, code: string) => (dispatch: AppDispatch) => {
  dispatch({
    type: RESET_PASSWORD_REQUEST,
  });

  resetPasswordRequest(newPassword, code)
    .then((resp) => {
      if (resp.success) {
        dispatch({
          type: RESET_PASSWORD_SUCCESS,
        });
      }
    })
    .catch((error) => {
      console.error(error);
      dispatch({
        type: RESET_PASSWORD_FAILED,
      });
    });
};

export const login: AppThunk = (email: string, password: string) => (dispatch: AppDispatch) => {
  dispatch({
    type: LOGIN_REQUEST,
  });

  loginRequest(email, password)
    .then((resp) => {
      if (resp.success) {
        setCookie('token', resp.accessToken);
        localStorage.setItem('refreshToken', resp.refreshToken);

        dispatch({
          type: LOGIN_SUCCESS,
          user: resp.user,
        });
      }
    })
    .catch((error) => {
      console.error(error);

      dispatch({
        type: LOGIN_FAILED,
      });
    });
};

export const logout: AppThunk = () => (dispatch: AppDispatch) => {
  dispatch({
    type: LOGOUT_REQUEST,
  });

  logoutRequest()
    .then((resp) => {
      if (resp.success) {
        localStorage.removeItem('refreshToken');
        deleteCookie('token');
        dispatch({
          type: LOGOUT_SUCCESS,
        });
      }
    })
    .catch((error) => {
      console.error(error);

      dispatch({
        type: LOGOUT_FAILED,
      });
    });
};

export const updateToken: AppThunk = () => (dispatch: AppThunk) => {
  dispatch({
    type: REFRESH_TOKEN_REQUEST,
  });
  refreshTokenRequest()
    .then((resp) => {
      if (resp.success) {
        setCookie('token', resp.accessToken);
        localStorage.setItem('refreshToken', resp.refreshToken);
        dispatch({
          type: REFRESH_TOKEN_SUCCESS,
        });
      }
    })
    .catch((error) => {
      console.error(error);
      dispatch({
        type: REFRESH_TOKEN_FAILED,
      });
    });
};

export const getUser: AppThunk = () => (dispatch: AppDispatch) => {
  dispatch({
    type: GET_USER_REQUEST,
  });

  getUserRequest()
    .then((resp) => {
      if (resp.success) {
        dispatch({
          type: GET_USER_SUCCESS,
          user: resp.user,
        });
        dispatch({
          type: LOGIN_SUCCESS,
          user: resp.user,
        });
      }
    })
    .catch(() => {
      if (localStorage.getItem('refreshToken')) {
        updateToken();
      } else {
        dispatch({
          type: GET_USER_FAILED,
        });
      }
    });
};

export const updateUser: AppThunk = (email: string, name: string) => (dispatch: AppDispatch): void => {
  dispatch({
    type: UPDATE_USER_REQUEST,
  });
  updateUserRequest(email, name)
    .then((resp) => {
      if (resp.success) {
        dispatch({
          type: UPDATE_USER_SUCCESS,
          user: resp.user,
        });
      }
    })
    .catch((error) => {
      console.error(error);
      if (localStorage.getItem('refreshToken')) {
        updateToken();
        updateUser(email, name);
      } else {
        dispatch({
          type: UPDATE_USER_FAILED,
        });
      }
    });
};
