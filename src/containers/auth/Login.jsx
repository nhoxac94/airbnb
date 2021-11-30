import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from "yup"
import loginApi from 'apis/loginApi';
import { useDispatch, useSelector } from 'react-redux';

const Login = (props) => {

    if (localStorage.getItem("AIRBNB_USER")) {
        props.history.push("/")
    }
    const dispatch = useDispatch()
    const idRoom = useSelector(state => state.idRoomSelectedReducer.idRoomSelected)
    const [errorLogin, setErrorLogin] = useState("")
    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: Yup.object({
            email: Yup.string().required('Please input your email').email('Email is valid!!!'),
            password: Yup.string().required('Please input your password')
        })
        ,
        onSubmit: values => {
            loginApi.fetchLoginApi(values)
                .then(res => {
                    localStorage.setItem("AIRBNB_USER", JSON.stringify(res.data))
                    dispatch({ type: "LOGIN", payload: res.data })
                    setErrorLogin("")
                    if (res.data.user.type === "ADMIN") {
                        props.history.push("/admin/user")
                    }
                    else if (idRoom) {
                        props.history.push(`/rooms/${idRoom}`)
                    } else {
                        props.history.push("/")
                    }
                    alert(res.data.message)
                }
                )
                .catch(err =>
                    setErrorLogin("Tài khoản hoặc mật khẩu không đúng"))
        }
    })

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <div className="sign-in-htm">
                    <div className="group my-3">
                        <label htmlFor="user" className="label">Email</label>
                        <input id="email" type="text" name="email" className="input"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                        />
                        {formik.errors.email && formik.touched.email && (<small className="text-danger">{formik.errors.email}</small>)}
                    </div>
                    <div className="group my-5">
                        <label htmlFor="password" className="label">Password</label>
                        <input id="password" type="password" name="password" className="input"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                            datatype="password" />
                        {formik.errors.password && formik.touched.password && (<small className="text-danger">{formik.errors.password}</small>)}
                        {errorLogin && <div className="text-danger mt-3">{errorLogin}</div>}

                    </div>

                    <div className="group mt-3">
                        <input type="submit" className="button" defaultValue="Sign In" />
                    </div>
                    <hr />
                    <div className="hr" />

                </div>
            </form>
        </>
    );
}

export default Login;
