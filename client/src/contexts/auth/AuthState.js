import axios from 'axios';
import { useReducer } from 'react';
import { LOGIN_ERROR, LOGIN_USER, LOGOUT_USER } from '../types';
import AuthContext from './authContext';
import authReducer from './authReducer';

const AuthState = ({ children }) => {
  const initialState = {
    token: null,
    isAuthenticated: false,
    loginError: false,
    loginErrorMsg: ''
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  const doLogin = async (inputs) => {
    try {
      const resp = await axios.post('/auth', inputs);
      console.log(resp);
      dispatch({ type: LOGIN_USER, payload: resp.data.token });
    } catch (error) {
      console.error('LOGIN ERROR: ', error.response.data);
      return dispatch({type: LOGIN_ERROR, payload: error.response.data || 'Internal Server Error'})
    }
  }

  const doLogout = () => {
    console.log('in logout state');
    dispatch({ type: LOGOUT_USER, payload: initialState });
  }

  return <AuthContext.Provider value={{
    ...state,
    doLogin,
    doLogout
  }}>
    {children}
  </AuthContext.Provider>
}

export default AuthState;