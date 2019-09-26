import React, { useState } from "react"
import ReactDOM from 'react-dom'
import {BrowserRouter as Router,Switch, Route} from 'react-router-dom'
import { AuthContext } from "./context/auth";
import PrivateRoute from './PrivateRoute';
import Login from "./Login";
import Sidebar from './components/sidebar';
import Navbar from './components/navbar';
import Dashboard from './components/dashboard';
import Home from './components/home';
import DeliveryChallan from './components/deliverychallan';
import { ToastProvider, useToasts } from 'react-toast-notifications'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './index.css';



const App = () => {

    const [authTokens, setAuthTokens] = useState();
    const [username, setUserName] = useState();
    
    const setTokens = (data) => {
      localStorage.setItem("tokens", JSON.stringify(data));
      setAuthTokens(data);
      setUserName(localStorage.getItem('username'))
    }

    return (
            <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens  }}>
                    <Router>
                        <div className="d-flex" id="wrapper">
                                { authTokens ? <Sidebar/> : null }

                                <div id="page-content-wrapper">
                                { authTokens ? <Navbar onClick={handleToggle} username={username}/> : null } 
                                    <Switch>
                                        <Route exact path="/login" component={Login} />
                                        <PrivateRoute path="/dashboard" component={Dashboard} />
                                        <PrivateRoute path="/deliverychallan" component={DeliveryChallan}/>
                                        <PrivateRoute path="/outword"/>
                                        <PrivateRoute path="/" component={Home} />
                                    </Switch>
                                </div>
                            </div>    
                    </Router>
            </AuthContext.Provider>
        )
   
       
}

const handleToggle = () => {
    let ele= document.getElementById('wrapper');
    ele.classList.toggle("toggled")
}

ReactDOM.render (
    <Router><ToastProvider><App/></ToastProvider></Router>,
    document.getElementById('app')
)


