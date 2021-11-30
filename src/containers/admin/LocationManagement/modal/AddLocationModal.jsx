
import React from 'react';
import moment from 'moment';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Modal, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import locationApi from 'apis/locationApi';


const AddLocationModal = (props) => {

    const dispatch = useDispatch()
    const addLocationModal = useSelector(state => state.modalReducer)
    const closeModal = (name) => {
        dispatch({ type: "CHANGE_STATUS_MODAL", payload: { name: name, status: false } })
    }
    const token = useSelector(state => state.airbnbUserReducer.airbnbUser?.token)

    const formik = useFormik({
        initialValues: {
            name: "",
            province: "",
            country: "",
            valueate: null
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Please input location name'),
            province: Yup.string().required('Please input Province!'),
            country: Yup.string().required('Please input Country!'),
            valueate: Yup.number()
            .typeError('Input a number')
            .required('Please input valuate')
            .min(0, 'Min value 0.')
            .max(10, 'Max value 10.'),


        }),
        onSubmit: values => {
            locationApi.createLocationApi(values, token)
            .then (res => {
                alert("Tạo địa điểm thành công")
                props.setForceUpdate(!props.forceUpdate)
                closeModal("addLocationModal")
            })
            .catch (err => console.log(err))
        },

    })

    const { errors, touched } = formik

    return (
        <Modal
            title="Thêm địa điểm"
            centered
            visible={addLocationModal.status}
            onCancel={() => closeModal("addLocationModal")}
            footer={null}
            width={800}
        >
            <div className="mx-lg-5">
                <form onSubmit={formik.handleSubmit}>
                    <div className="row addUser">
                        <div className="form-group col-12">
                            <label >Tên địa điểm</label>
                            <input type="text" className="form-control" name="name"
                                value={formik.values.name}
                                onChange={formik.handleChange} />
                        </div>
                        <small className="text-danger">{(errors.name && touched.name) ? errors.name : ""}</small>
                        <div className="form-group col-12">
                            <label >Province</label>
                            <input type="text" className="form-control" name="province"
                                value={formik.values.province}
                                onChange={formik.handleChange}
                            />
                        </div>
                        <small className="text-danger">{(errors.province && touched.province) ? errors.province : ""}</small>
                        <div className="form-group col-12">
                            <label >Country</label>
                            <input type="text" className="form-control" name="country"
                                onChange={formik.handleChange}
                                value={formik.values.country}
                            />
                        </div>
                        <small className="text-danger">{(errors.country && touched.country) ? errors.country : ""}</small>
                        <div className="form-group col-12">
                            <label >Đánh giá </label>
                            <input type="text" className="form-control" name="valueate"
                                value={formik.values.valueate}
                                onChange={formik.handleChange} />

                        </div>
                        <small className="text-danger">{(errors.valueate && touched.valueate) ? errors.valueate : ""}</small>

                    </div>
                    <div className="btn-addUser">
                        <button className=" btn btn-danger" onClick={() => closeModal("addLocationModal")}>Hủy bỏ</button>
                        <button className="btn btn-primary" type="submit" >Thêm</button>
                    </div>

                </form>
            </div>
        </Modal >

    );

}

export default AddLocationModal;





