import axios from 'axios';
import { useEffect, useReducer } from 'react';
import { LOGIN_ERROR, LOGIN_USER, LOGOUT_USER, SET_USER } from '../types';
import AuthContext from './authContext';
import authReducer from './authReducer';

const AuthState = ({ children }) => {
  const initialState = {
    token: null,
    isAuthenticated: false,
    user: null,
    loginError: false,
    loginErrorMsg: ''
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    if (state.isAuthenticated && state.user === null) {
      (async () => {
        await getUser();
      })();
    }
    // eslint-disable-next-line
  }, [state.isAuthenticated]);

  const getUser = async () => {
    try {
      const resp = await axios.get('/auth', {
        headers: {
          Authorization: state.token
        }
      });
      dispatch({type: SET_USER, payload: resp.data});
    } catch (error) {
      console.log('ERROR IN GETTING USER INFO');
    }
  };

  const doLogin = async (inputs) => {
    try {
      const resp = await axios.post('/auth', inputs);
      console.log(resp);
      dispatch({ type: LOGIN_USER, payload: resp.data.token });
    } catch (error) {
      console.error('LOGIN ERROR: ', error.response.data);
      return dispatch({ type: LOGIN_ERROR, payload: error.response.data || 'Internal Server Error' })
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