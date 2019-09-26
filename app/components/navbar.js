import React, { useState,useEffect } from 'react';
import { FaBars} from 'react-icons/fa'
import {Link} from 'react-router-dom';
import { useAuth } from "../context/auth";
import Weighbridge from './weighbridge';

const Navbar = (props) => {

  const divStyle = {
    fontWeight:'normal',
    marginLeft:'10px',
    marginTop:'8px'
  };
  
  const { setAuthTokens } = useAuth();

  const logOut = () => {
      setAuthTokens();
     // localStorage.removeItem("username");
  }

  return ( 

        <React.Fragment>
          
            <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
                <button className="btn btn-default" id="menu-toggle" onClick={props.onClick}>
                <FaBars size={20} color={'#000'} />
                </button>
                  <h5 className="sidebar-heading" style={divStyle}>Weighbridge System | SONA FEEDS</h5>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                    <li className="nav-item active">
                    <Link className="nav-link" to="/dashboard">Home <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" to="" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                   {props.username}
                </Link>
              <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                <Link className="dropdown-item" to="#">Help</Link>
                <button className="dropdown-item" onClick={logOut}>Log out</button>
              </div>
            </li>
                </ul>
                </div>
             </nav>
        </React.Fragment>

     );
}
 
export default Navbar;