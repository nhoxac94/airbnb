
import React , {useState, useEffect} from 'react';
import moment from 'moment';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Modal, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import locationApi from 'apis/locationApi';


const EditLocationModal = (props) => {
    const dispatch = useDispatch()
    const editLocationModal = useSelector(state => state.modalReducer)
    const closeModal = (name) => {
        dispatch({ type: "CHANGE_STATUS_MODAL", payload: { name: name, status: false } })
    }
    const token = useSelector(state => state.airbnbUserReducer.airbnbUser?.token)
    const [locationDetails, setLocationDetails] = useState()
    useEffect (() => {
        locationApi.fetchLocationDetails(props.idEditLocation)
        .then (res => setLocationDetails(res.data))
        .catch (err => console.log(err))
    }, [])
    console.log(props)
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: locationDetails?.name,
            province: locationDetails?.province,
            country: locationDetails?.country,
            valueate: locationDetails?.valueate
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Please input location name'),
            province: Yup.string().required('Please input Province!'),
            country: Yup.string().required('Please input Country!'),
            valueate: Yup.number()
            .typeError('Input a number')
            .min(0, 'Min value 0.')
            .max(10, 'Max value 10.'),
        }),
        onSubmit: values => {
            locationApi.editLocation(locationDetails._id,values, token)
            .then (res => {
                console.log(res)
                alert("Chỉnh sửa địa điểm thành công")
                props.setForceUpdate(!props.forceUpdate)
                closeModal("editLocationModal")
            })
            .catch (err => console.log(err))
        },

    })

    const { errors, touched } = formik

    return (
        <Modal
            title="Chỉnh sửa địa điểm"
            centered
            visible={editLocationModal.status}
            onCancel={() => closeModal("editLocationModal")}
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
                        <button className=" btn btn-danger" onClick={() => closeModal("editLocationModal")}>Hủy bỏ</button>
                        <button className="btn btn-primary" type="submit" >Áp dụng</button>
                    </div>

                </form>
            </div>
        </Modal >

    );

}

export default EditLocationModal;





