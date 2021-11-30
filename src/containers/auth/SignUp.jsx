import React from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';
import * as Yup from 'yup'
import { useFormik } from 'formik';
import loginApi from 'apis/loginApi';
import { useDispatch, useSelector } from 'react-redux';

const SignUp = (props) => {

    if (localStorage.getItem("AIRBNB_USER")) {
        props.history.push("/")
    }
    const dispatch = useDispatch()
    const idRoom = useSelector(state => state.idRoomSelectedReducer.idRoomSelected)
    const dateFormat = "YYYY/MM/DD"
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            phone: "",
            birthday: "",
            gender: true,
            address: ""
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Please input your name').matches("^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
                "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
                "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$", " Your name must contain only letters!!!!"),
            email: Yup.string().required('Please input your email!').email('Email is valid!'),
            password: Yup.string().required('Please input your password!').min(6, "Your password must contain minimum 6 characters ").max(12, "Your password must contain maximum 12 characters"),
            phone: Yup.string().required('Please input phone number!').matches("^[0-9]*$", "Your Phone Number must contain only numbers").max(10, "Your Phone contain more than 10 number"),
            address: Yup.string().required('Please input your address!'),
            birthday: Yup.string().required('Please input your birthday!')

        }),
        onSubmit: values => {
            loginApi.fetchSignUpApi(values)
                .then(res => {
                    const { email, password } = formik.values;
                    loginApi.fetchLoginApi({ email, password })
                        .then(res => {
                            localStorage.setItem("AIRBNB_USER", JSON.stringify(res.data))
                            dispatch({ type: "LOGIN", payload: res.data })
                            if (idRoom) {
                                props.history.push(`/rooms/${idRoom}`)
                            } else {
                                props.history.push("/")
                            }
                            alert("Đăng ký thành công")
                        })
                        .catch(err => console.log(err))
                })
                .catch(err => console.log(err))

        }
    })
    const handleChooseBirthDay = (e) => {
        let birthday = moment(e).format("YYYY/MM/DD")
        formik.setFieldValue("birthday", birthday)
    }
    const { errors, touched } = formik
    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="sign-up-htm">
                <div className="group">
                    <label className="label">Họ Tên</label>
                    <input name="name" type="text" className="input"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                    />
                </div>
                <small className="text-danger">{(errors.name && touched.name) ? errors.name : ""}</small>
                <div className="group" >
                    <label className="label">Giới tính</label>
                    <div className="selectOption" >
                        <select name="gender" type="text" className="input gender"
                            onChange={formik.handleChange}
                            value={formik.values.gender}
                        >
                            <option value="true">Nam</option>
                            <option value="false">Nữ</option>

                        </select>
                    </div>
                </div>
                <small></small>
                <div className="group">
                    <label className="label">Email</label>
                    <input name="email" type="email" className="input"
                        value={formik.values.email}
                        onChange={formik.handleChange} />
                </div>
                <small className="text-danger">{(errors.email && touched.email) ? errors.email : ""}</small>
                <div className="group">
                    <label className="label">Mật khẩu</label>
                    <input name="password" type="password" className="input" data-type="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                    />
                </div>
                <small className="text-danger">{(errors.password && touched.password) ? errors.password : ""}</small>
                <div className="group">
                    <label className="label">Số điện thoại</label>
                    <input name="phone" type="text" className="input"
                        value={formik.values.phone}
                        onChange={formik.handleChange} />
                </div>
                <small className="text-danger">{(errors.phone && touched.phone) ? errors.phone : ""}</small>
                <div className="group">
                    <label className="label">Năm sinh</label>
                    <DatePicker format={dateFormat} className="datePicker"
                        name="birthday"
                        onChange={handleChooseBirthDay}
                    />
                </div>
                <small className="text-danger">{(errors.birthday && touched.birthday) ? errors.birthday : ""}</small>
                <div className="group">
                    <label className="label">Địa chỉ</label>
                    <textarea name="address" type="textArea" className="input"
                        onChange={formik.handleChange}
                        value={formik.values.address}
                    />
                </div>
                <small className="text-danger">{(errors.address && touched.address) ? errors.address : ""}</small>
                <div className="group">
                    <input type="submit" className="button" />
                </div>
                <hr />
                <div className="hr" />
            </div>
        </form>

    );
}

export default SignUp;
