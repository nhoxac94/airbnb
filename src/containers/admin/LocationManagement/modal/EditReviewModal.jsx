
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Modal, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import locationApi from 'apis/locationApi';



const EditReviewModal = (props) => {
    const dispatch = useDispatch()
    const editReviewModal = useSelector(state => state.modalReducer)
    const closeModal = (name) => {
        dispatch({ type: "CHANGE_STATUS_MODAL", payload: { name: name, status: false } })
    }
    const token = useSelector(state => state.airbnbUserReducer.airbnbUser?.token)
    const [reviewDetails, setReviewDetails] = useState()
    useEffect(() => {
        locationApi.fetchReviewDetailApi(props.idReview)
            .then(res => setReviewDetails(res.data))
            .catch(err => console.log(err))
    }, [])
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            content: reviewDetails?.content,
        },
        validationSchema: Yup.object({
            content: Yup.string().required('Please input your review')

        }),
        onSubmit: values => {
            locationApi.editReviewApi(reviewDetails._id, values, token)
                .then(res => {
                    alert("Chỉnh review thành công")
                    closeModal("editReviewModal")
                    props.setForceUpdate(!props.forceUpdate)
                })
                .catch(err => console.log(err))
        },

    })
    const { errors, touched } = formik


    return (
        <Modal
            title="Chỉnh sửa review"
            centered
            visible={editReviewModal.status}
            onCancel={() => closeModal("editReviewModal")}
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
                        <button className="btn btn-danger" onClick={() => closeModal("editReviewModal")}>Hủy bỏ</button>
                        <button className="btn btn-primary" type="submit" >Thêm</button>
                    </div>
                </form>
            </div>
        </Modal >

    );

}

export default EditReviewModal;





