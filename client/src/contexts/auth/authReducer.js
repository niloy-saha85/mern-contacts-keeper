import { LOGIN_ERROR, LOGIN_USER, LOGOUT_USER, SET_USER } from "../types";

export const authReducer = (state, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload
      };
    case LOGIN_USER:
      return {
        ...state,
        token: action.payload,
        isAuthenticated: true,
        loginError: false,
        loginErrorMsg: ''
      };
    case LOGOUT_USER:
      return {
        ...state,
        ...action.payload
      }
    case LOGIN_ERROR:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loginError: true,
        loginErrorMsg: action.payload
      }
    default:
      return state;
  }
}

export default authReducer;