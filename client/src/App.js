import { Fragment } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./components/Main";
import AuthState from "./contexts/auth/AuthState";


function App() {
  return (
    <AuthState>
      <Fragment>
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<Main />}></Route>
          </Routes>
        </BrowserRouter>
      </Fragment>
    </AuthState>
  );
}

export default App;
