
import React from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Modal, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import userApi from 'apis/userApi'



const AddUserModal = (props) => {

    const dateFormat = "YYYY/MM/DD"
    const dispatch = useDispatch()
    const addUserModal = useSelector(state => state.modalReducer)
    const closeModal = (name) => {
        dispatch({ type: "CHANGE_STATUS_MODAL", payload: { name: name, status: false } })
    }
    const token = useSelector(state => state.airbnbUserReducer.airbnbUser?.token)
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            phone: "",
            birthday: "",
            gender: true,
            type: "CLIENT",
            address: ""
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Please input your name').matches("^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
                "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
                "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$", " Your name must contain only letters!!!!"),
            email: Yup.string().required('Please input your email!').email('Email is valid!'),
            password: Yup.string().required('Please input your password!'),
            phone: Yup.string().required('Please input phone number!').matches("^[0-9]*$", "Your Phone Number must contain only numbers").max(10, "Your Phone contain more than 10 number"),
            address: Yup.string().required('Please input your address!'),
            birthday: Yup.string().required('Please input your birthday!')

        }),
        onSubmit: values => {
            userApi.createUserApi(values, token)
                .then(res => {
                   alert("Tạo user thành công")
                   props.setForceUpdate(!props.forceUpdate)
                   closeModal("addUserModal")
                })
                .catch(err => console.log(err))
        },

    })

    const handleChooseBirthDay = (e) => {
        let birthday = moment(e).format("YYYY/MM/DD")
        formik.setFieldValue("birthday", birthday)
    }
    const { errors, touched } = formik


    return (
        <Modal
            title="Thêm người dùng"
            centered
            visible={addUserModal.status}
            onCancel={() => closeModal("addUserModal")}
            footer={null}
            width={800}
        >
            <div className="mx-lg-5">
                <form onSubmit={formik.handleSubmit}>
                    <div className="row addUser">
                        <div className="form-group col-12">
                            <label >Họ Tên</label>
                            <input type="text" className="form-control" name="name"
                                value={formik.values.name}
                                onChange={formik.handleChange} />
                        </div>
                        <small className="text-danger">{(errors.name && touched.name) ? errors.name : ""}</small>
                        <div className="form-group col-12">
                            <label >Email</label>
                            <input type="email" className="form-control" name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                            />
                        </div>
                        <small className="text-danger">{(errors.email && touched.email) ? errors.email : ""}</small>
                        <div className="form-group col-12">
                            <label >Mật khẩu</label>
                            <input type="text" className="form-control" name="password"
                                onChange={formik.handleChange}
                                value={formik.values.password}
                            />
                        </div>
                        <small className="text-danger">{(errors.password && touched.password) ? errors.password : ""}</small>
                        <div className="form-group col-12">
                            <label >Số điện thoại</label>
                            <input type="text" className="form-control" name="phone"
                                value={formik.values.phone}
                                onChange={formik.handleChange} />

                        </div>
                        <small className="text-danger">{(errors.phone && touched.phone) ? errors.phone : ""}</small>

                        <div className="form-group col-12">
                            <label >Năm sinh</label>
                            <DatePicker format={dateFormat} className="datePicker small-input"
                                name="birthday"
                                onChange={handleChooseBirthDay}
                            />
                        </div>
                        <small className="text-danger">{(errors.birthday && touched.birthday) ? errors.birthday : ""}</small>

                        <div className="form-group col-12 ">
                            <label >Giới tính</label>
                            <select className="form-control small-input" name="gender"
                                onChange={formik.handleChange}
                                value={formik.values.gender} >
                                <option value="true">Nam</option>
                                <option value="false">Nữ</option>
                            </select>
                        </div>
                        <small></small>
                        <div className="form-group col-12">
                            <label >Loại người dùng</label>
                            <select className="form-control small-input" name="type"
                                onChange={formik.handleChange}
                                value={formik.values.type}  >
                                <option value="CLIENT">Khách Hàng</option>
                                <option value="ADMIN">Admin</option>
                            </select>
                        </div>
                        <small></small>
                        <div className="form-group col-12">
                            <label >Địa chỉ</label>
                            <textarea type="text" className="form-control" name="address"
                                onChange={formik.handleChange}
                                value={formik.values.address} />
                        </div>
                        <small className="text-danger">{(errors.address && touched.address) ? errors.address : ""}</small>
                    </div>
                    <div className="btn-addUser">
                        <button className="submit btn btn-danger" onClick={() => closeModal("addUserModal")}>Hủy bỏ</button>
                        <button className="submit btn btn-primary" >Thêm</button>
                    </div>

                </form>
            </div>
        </Modal >

    );

}

export default AddUserModal;





