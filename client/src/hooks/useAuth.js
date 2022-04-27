import { useContext } from 'react';
import AuthContext from '../contexts/auth/authContext';

const useAuth = () => {
  return useContext(AuthContext);
}

export default useAuth;