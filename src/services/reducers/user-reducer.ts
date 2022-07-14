import { TUser } from '../../utils/types';
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
  TUserActions
} from '../actions/user';

type TUserStateTypes = {
  user: TUser | null;
  registrationRequest: boolean;
  registrationFailed: boolean;
  isLogged: boolean;
  forgotPasswordRequest: boolean;
  forgotPasswordFailed: boolean;
  refreshTokenRequest: boolean;
  refreshTokenFailed: boolean;
  resetPasswordRequest: boolean;
  resetPasswordFailed: boolean;
  loginRequest: boolean;
  loginFailed: boolean;
  logoutRequest: boolean;
  logoutFailed: boolean;
  getUserRequest: boolean;
  getUserFailed: boolean;
  updateUserRequest: boolean;
  updateUserFailed: boolean;
};

const userInitialState: TUserStateTypes = {
  user: null,
  registrationRequest: false,
  registrationFailed: false,
  isLogged: false,
  forgotPasswordRequest: false,
  forgotPasswordFailed: false,
  resetPasswordRequest: false,
  resetPasswordFailed: false,
  refreshTokenFailed: false,
  refreshTokenRequest: false,
  loginRequest: false,
  loginFailed: false,
  logoutRequest: false,
  logoutFailed: false,
  getUserRequest: false,
  getUserFailed: false,
  updateUserRequest: false,
  updateUserFailed: false
};

export const userReducer = (state: TUserStateTypes = userInitialState, action: TUserActions): TUserStateTypes => {
  switch (action.type) {
    case REGISTRATION_REQUEST: {
      return {
        ...state,
        registrationRequest: true,
        registrationFailed: false,
      }
    }
    case REGISTRATION_SUCCESS: {
      return {
        ...state,
        registrationRequest: false,
        registrationFailed: false,
        user: action.user,
        isLogged: true,
      }
    }
    case REGISTRATION_FAILED: {
      return {
        ...state,
        registrationRequest: false,
        registrationFailed: true,     
      }
    }
    case FORGOT_PASSWORD_REQUEST: {
      return {
        ...state,
        forgotPasswordRequest: true,
        forgotPasswordFailed: false,
      }
    }
    case FORGOT_PASSWORD_SUCCESS: {
      return {
        ...state,
        forgotPasswordFailed: false,
        forgotPasswordRequest: false
      }
    }
    case FORGOT_PASSWORD_FAILED: {
      return {
        ...state,
        forgotPasswordFailed: true,
        forgotPasswordRequest: false
      }
    }
    case RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        resetPasswordRequest: true,
        resetPasswordFailed: false
      }
    }
    case RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        resetPasswordRequest: false,
        resetPasswordFailed: false
      }
    }
    case RESET_PASSWORD_FAILED: {
      return {
        ...state,
        resetPasswordRequest: false,
        resetPasswordFailed: true
      }
    }
    case LOGIN_REQUEST: {
      return {
        ...state,
        loginRequest: true,
        loginFailed: false,
      }
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        loginRequest: false,
        loginFailed: false,
        user: action.user,
        isLogged: true
      }
    }
    case LOGIN_FAILED: {
      return {
        ...state,
        loginRequest: false,
        loginFailed: true
      }
    }
    case LOGOUT_REQUEST: {
      return {
        ...state,
        logoutRequest: true,
        logoutFailed: false
      }
    }
    case LOGOUT_SUCCESS: {
      return {
        ...state,
        logoutRequest: false,
        logoutFailed: false,
        isLogged: false,
        user: null
      }
    }
    case LOGOUT_FAILED: {
      return {
        ...state,
        logoutFailed: true,
        logoutRequest: false
      }
    }
    case GET_USER_REQUEST: {
      return {
        ...state,
        getUserRequest: true,
        getUserFailed: false,
        isLogged: false
      }
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        getUserRequest: false,
        getUserFailed: false,
        user: action.user,
        isLogged: true
      }
    }
    case GET_USER_FAILED: {
      return {
        ...state,
        getUserFailed: true,
        getUserRequest: false,
        user: null,
        isLogged: false
      }
    }
    case REFRESH_TOKEN_REQUEST: {
      return {
        ...state,
        refreshTokenRequest: true,
        refreshTokenFailed: false
      }
    }
    case REFRESH_TOKEN_SUCCESS: {
      return {
        ...state,
        refreshTokenRequest: false,
        refreshTokenFailed: false
      }
    }
    case REFRESH_TOKEN_FAILED: {
      return {
        ...state,
        refreshTokenFailed: true,
        refreshTokenRequest: false
      }
    }
    case UPDATE_USER_REQUEST: {
      return {
        ...state, 
        updateUserRequest: true,
        updateUserFailed: false
      }
    }
    case UPDATE_USER_SUCCESS: {
      return {
        ...state, 
        updateUserRequest: false,
        updateUserFailed: false,
        user: action.user
      }
    }
    case UPDATE_USER_FAILED: {
      return {
        ...state, 
        updateUserRequest: false,
        updateUserFailed: true
      }
    }
    default: {
      return state
    }
  }
}