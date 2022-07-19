import React, { Component, useContext } from "react";
import { Link } from "react-router-dom";



export function AppHeader(props) {

    return (<nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
            MyApp
          </Link>
        <div className="navbar-nav mr-auto">

            {props.currentUser && <li className="nav-item">
                <Link to={"/user"} className="nav-link">
                    User
                </Link>
            </li>}
        </div>

        {props.currentUser ? <div className="navbar-nav ml-auto">
            <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                    {props.currentUser?.username}
                </Link>
            </li>
            <li className="nav-item">
                <a href="/login" className="nav-link" onClick={props.logOut}>
                    LogOut
                </a>
            </li>
        </div> : <div className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link to={"/login"} className="nav-link">
                        Login
                </Link>
                </li>

                <li className="nav-item">
                    <Link to={"/register"} className="nav-link">
                        Sign Up
                </Link>
                </li>
            </div>}
    </nav>);

}