import React, { useState, useEffect } from 'react';
import './LoginLayout.scss'
import { Link } from 'react-router-dom';
import withLayout from 'HOCs/withLayout';
import {useDispatch, useSelector} from 'react-redux'

const LoginLayout = (props) => {
    
    const dispatch = useDispatch()
    const handleActiveLogin = (status) => {
        dispatch({type : "LOGIN_ACTIVE", payload : status})
    }
    const loginActive = useSelector(state => state.loginReducer.loginActive)
   

    return (
        <div className="container-fluid login-airbnb">
            <div className="login-wrap">
                <div className="login-html">
                    <div className="text-center " style={{ fontSize: 25 }}>
                        <Link to="/login" className={`login ${loginActive && "active"}`} name="login" onClick={() => handleActiveLogin(true)} style={{ marginRight: "10px" }}> LOGIN</Link>
                        <Link to="/sign-up" className={`signUp ${!loginActive && "active"}`} name="signUp" onClick={() => handleActiveLogin(false)} > SIGN UP</Link>
                    </div>
                    <div className="login-form">
                        {props.children}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default withLayout(LoginLayout);
