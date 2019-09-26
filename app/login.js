import React, { useState } from "react";
import {Redirect } from "react-router-dom";
import axios from 'axios';
import { useAuth } from "./context/auth";
import {useToasts } from 'react-toast-notifications'

const Login = () => {
  const divStyle = {
    marginTop: '80px',
  };

  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState('');
  const [email, setUserName] = useState("jam@jameel.com");
  const [password, setPassword] = useState("123456");
  const { setAuthTokens } = useAuth();
  const { addToast } = useToasts()

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post("http://172.16.1.203:8000/api/login", {
      email,
      password
    }).then(result => {
      if (result.status === 200) 
        setAuthTokens(result.data, email );
        setLoggedIn(true);
    }).catch(e => {
      if(e.message==='Network Error') {
        addToast('Network Error! (back-end service is offline)', { appearance: 'error', autoDismiss: true})
        //setIsError(e.message)
      } else {
        addToast('Invalid username or password', { appearance: 'warning', autoDismiss: true})
        //setIsError('Invalid username or password')
      }
    });
  
  
  }

  if (isLoggedIn) {
    localStorage.setItem("username", email);
    return <Redirect to="/dashboard" /> ;
    } 


  return (
        <React.Fragment>

          <div className="container" style={divStyle}>
              <div className="row">
                <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                  <div className="card card-signin my-5">
                    <div className="card-body">
                      <h1 className="card-title text-center">Weighbridge | SONAFEEDS</h1>
                      <form className="form-signin" onSubmit={handleSubmit}>
                        <div className="form-label-group">
                          <input type="email"
                          value={email}
                          onChange={e => {
                            setUserName(e.target.value);
                          }}
                          className="form-control"
                          placeholder="Email address" 
                          required autoFocus/>
                          <label htmlFor="inputEmail">Email address</label>
                        </div>

                        <div className="form-label-group">
                        <input type="password"
                            value={password}
                            onChange={e => {
                            setPassword(e.target.value);
                            }}
                          className="form-control" placeholder="Password" required />
                          <label htmlFor="inputPassword">Password</label>
                        </div>

                        <div className="custom-control custom-checkbox mb-3">
                          <input type="checkbox" className="custom-control-input" id="customCheck1"/>
                          <label className="custom-control-label" htmlFor="customCheck1">Remember password</label>
                        </div>
                        <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Log in</button>
                        <p>&nbsp;</p>
                        { /*isError ? 
                          <div className="alert alert-danger" role="alert">
                               <FaInfo/> {isError}
                          </div>
                          :
                          null

                        */}
                        <hr className="my-4" />
                      </form>
                    </div>
                  </div>
                </div>
              </div>
          </div>
          
        </React.Fragment>
  );
}

export default Login;