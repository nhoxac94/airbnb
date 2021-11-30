
import React from 'react';
import moment from 'moment';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Modal, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import locationApi from 'apis/locationApi';



const AddReviewModal = (props) => {

    const dispatch = useDispatch()
    const addReviewModal = useSelector(state => state.modalReducer)
    const closeModal = (name) => {
        dispatch({ type: "CHANGE_STATUS_MODAL", payload: { name: name, status: false } })
    }
    const token = useSelector(state => state.airbnbUserReducer.airbnbUser?.token)

    const formik = useFormik({
        initialValues: {
            content: "",
        },
        validationSchema: Yup.object({
            content: Yup.string().required('Please input your review')

        }),
        onSubmit: values => {
            locationApi.creatReviewApi(props.idRoom, values, token)
                .then(res => {
                    alert("Thêm review thành công")
                    closeModal("addReviewModal")
                    props.setForceUpdate(!props.forceUpdate)
                })
                .catch(err => console.log(err))
        },

    })
    const { errors, touched } = formik


    return (
        <Modal
            title="Thêm review"
            centered
            visible={addReviewModal.status}
            onCancel={() => closeModal("addReviewModal")}
            footer={null}
            width={800}
        >
            <div className="mx-lg-5">
                <form onSubmit={formik.handleSubmit}>
                    <div className="row addUser">
                        <div className="form-group col-12">
                            <label >Content</label>
                            <textarea rows="5" cols="50" type="text" className="form-control" name="content"
                                value={formik.values.content}
                                onChange={formik.handleChange} />
                        </div>
                        <small classcontent="text-danger">{(errors.content && touched.content) ? errors.content : ""}</small>
                    </div>
                    <div className="btn-addUser">
                        <button className="btn btn-danger" onClick={() => closeModal("addReviewModal")}>Hủy bỏ</button>
                        <button className="btn btn-primary" type = "submit" >Thêm</button>
                    </div>
                </form>
            </div>
        </Modal >

    );

}

export default AddReviewModal;





