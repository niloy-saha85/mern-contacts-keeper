import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import './Login.css';

const Login = () => {
  const auth = useAuth();
  const { doLogin, isAuthenticated, loginError, loginErrorMsg } = auth;
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({});

  useEffect(() => {
    console.log('isAuthenticated: ', isAuthenticated);
    if (isAuthenticated) navigate("/", { replace: true });
    // eslint-disable-next-line
  }, [isAuthenticated]);

  const onSubmit = (e) => {
    e.preventDefault();
    try {
      doLogin(inputs);
    } catch (error) {
      console.error(error);
    }
  }

  const onChange = ({ target: { name, value } }) => {
    setInputs((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <div className="text-center">
      <form className="form-signin" onSubmit={onSubmit}>
        <h1 className="h3 mb-3 font-weight-normal">Contacts Keeper</h1>
        {loginError && <div className="alert alert-danger" role="alert">
          {loginErrorMsg}
        </div>}
        <label htmlFor="email" className="sr-only">Email address</label>
        <input type="email" name="email" className="form-control mb-2" placeholder="Email address" required="" autoFocus onChange={onChange} autoComplete="off" />
        <label htmlFor="password" className="sr-only">Password</label>
        <input type="password" name="password" className="form-control" placeholder="Password" required="" onChange={onChange} autoComplete="off" />
        <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
        {/* <p className="mt-5 mb-3 text-muted">© 2017-2018</p> */}
      </form>
    </div>
  )
}

export default Login;