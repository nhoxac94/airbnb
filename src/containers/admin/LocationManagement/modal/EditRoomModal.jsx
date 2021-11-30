
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Modal, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import locationApi from 'apis/locationApi';


const EditRoomModal = (props) => {
    const dispatch = useDispatch()
    const editRoomModal = useSelector(state => state.modalReducer)
    const closeModal = (name) => {
        dispatch({ type: "CHANGE_STATUS_MODAL", payload: { name: name, status: false } })
    }
    const token = useSelector(state => state.airbnbUserReducer.airbnbUser?.token)
    const [roomDetails, setRoomDetails] = useState()
    console.log(roomDetails)
    useEffect (() => {
        locationApi.fetchRoomDetailsApi(props.idEditRoom)
        .then (res => setRoomDetails(res.data))
        .catch (err => console.log(err))
    }, [])
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: roomDetails?.name,
            guests: roomDetails?.guests,
            bedRoom: roomDetails?.bedRoom,
            bath: roomDetails?.bedRoom,
            description: roomDetails?.description,
            price: roomDetails?.price,
            elevator: roomDetails?.elevator,
            hotTub: roomDetails?.hotTub,
            pool: roomDetails?.pool,
            indoorFireplace: roomDetails?.indoorFireplace,
            dryer: roomDetails?.dryer,
            gym: roomDetails?.gym,
            kitchen: roomDetails?.kitchen,
            wifi: roomDetails?.wifi,
            heating: roomDetails?.heating,
            cableTV: roomDetails?.cableTV,
            locationId: roomDetails?._id,
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Please input Room name'),
            guests: Yup.number().typeError('Input a number').required('Please input').min(0, 'Min value 0.'),
            bedRoom: Yup.number().typeError('Input a number').required('Please input BedRoom').min(0, 'Min value 0.'),
            bath: Yup.number().typeError('Input a number').required('Please input BathRoom').min(0, 'Min value 0.'),
            description: Yup.string().required('Please input Description'),
            price: Yup.number().typeError('Input a number').required('Please input BathRoom').min(0, 'Min value 0.'),

        }),
        onSubmit: values => {
            locationApi.editRoomApi(roomDetails?._id, values, token)
                .then(res => {
                    alert("Cập nhật phòng thành công")
                    props.setForceUpdate(!props.forceUpdate)
                    closeModal("editRoomModal")
                })
                .catch(err => console.log(err))
        },

    })

    const { errors, touched } = formik

    return (
        <Modal
            title="Thêm địa điểm"
            centered
            visible={editRoomModal.status}
            onCancel={() => closeModal("editRoomModal")}
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
                            <label >Số khách </label>
                            <input type="text" className="form-control" name="guests"
                                value={formik.values.guests}
                                onChange={formik.handleChange} />

                        </div>
                        <small className="text-danger">{(errors.guests && touched.guests) ? errors.guests : ""}</small>
                        <div className="form-group col-12">
                            <label >Số phòng ngủ </label>
                            <input type="text" className="form-control" name="bedRoom"
                                value={formik.values.bedRoom}
                                onChange={formik.handleChange} />
                        </div>
                        <small className="text-danger">{(errors.bedRoom && touched.bedRoom) ? errors.bedRoom : ""}</small>
                        <div className="form-group col-12">
                            <label >Số phòng tắm </label>
                            <input type="text" className="form-control" name="bath"
                                value={formik.values.bath}
                                onChange={formik.handleChange} />

                        </div>
                        <small className="text-danger">{(errors.bath && touched.bath) ? errors.bath : ""}</small>
                        <div className="form-group col-12">
                            <label >Mô tả</label>
                            <input type="text" className="form-control" name="description"
                                value={formik.values.description}
                                onChange={formik.handleChange} />
                        </div>
                        <small className="text-danger">{(errors.description && touched.description) ? errors.description : ""}</small>
                        <div className="form-group col-12">
                            <label >Giá tiền </label>
                            <input type="text" className="form-control" name="price"
                                value={formik.values.price}
                                onChange={formik.handleChange} />
                        </div>
                        <small className="text-danger w-100">{(errors.price && touched.price) ? errors.price : ""}</small>
                        <div className="form-group col-6 mb-3 ">
                            <label >Elevator </label>
                            <select className="form-control small-input" name="elevator"
                                onChange={formik.handleChange}
                                value={formik.values.elevator} >
                                <option value="true">Có</option>
                                <option value="false">Không</option>
                            </select>
                        </div>
                        <div className="form-group col-6 mb-3 ">
                            <label >HotTub </label>
                            <select className="form-control small-input" name="hotTub"
                                onChange={formik.handleChange}
                                value={formik.values.hotTub} >
                                <option value="true">Có</option>
                                <option value="false">Không</option>
                            </select>
                        </div>
                        <div className="form-group col-6 mb-3 ">
                            <label >Pool </label>
                            <select className="form-control small-input" name="pool"
                                onChange={formik.handleChange}
                                value={formik.values.pool} >
                                <option value="true">Có</option>
                                <option value="false">Không</option>
                            </select>
                        </div>
                        <div className="form-group col-6 mb-3 ">
                            <label >IndoorFireplace </label>
                            <select className="form-control small-input" name="indoorFireplace"
                                onChange={formik.handleChange}
                                value={formik.values.indoorFireplace} >
                                <option value="true">Có</option>
                                <option value="false">Không</option>
                            </select>
                        </div>
                        <div className="form-group col-6 mb-3 ">
                            <label >Dryer </label>
                            <select className="form-control small-input" name="dryer"
                                onChange={formik.handleChange}
                                value={formik.values.dryer} >
                                <option value="true">Có</option>
                                <option value="false">Không</option>
                            </select>
                        </div>
                        <div className="form-group col-6 mb-3 ">
                            <label >Gym </label>
                            <select className="form-control small-input" name="gym"
                                onChange={formik.handleChange}
                                value={formik.values.gym} >
                                <option value="true">Có</option>
                                <option value="false">Không</option>
                            </select>
                        </div>
                        <div className="form-group col-6 mb-3 ">
                            <label >Kitchen </label>
                            <select className="form-control small-input" name="kitchen"
                                onChange={formik.handleChange}
                                value={formik.values.kitchen} >
                                <option value="true">Có</option>
                                <option value="false">Không</option>
                            </select>
                        </div>
                        <div className="form-group col-6 mb-3 ">
                            <label >Wifi </label>
                            <select className="form-control small-input" name="wifi"
                                onChange={formik.handleChange}
                                value={formik.values.wifi} >
                                <option value="true">Có</option>
                                <option value="false">Không</option>
                            </select>
                        </div>
                        <div className="form-group col-6 mb-3 ">
                            <label >Heating </label>
                            <select className="form-control small-input" name="heating"
                                onChange={formik.handleChange}
                                value={formik.values.heating} >
                                <option value="true">Có</option>
                                <option value="false">Không</option>
                            </select>
                        </div>
                        <div className="form-group col-6 mb-3 ">
                            <label >CableTV </label>
                            <select className="form-control small-input" name="cableTV"
                                onChange={formik.handleChange}
                                value={formik.values.cableTV} >
                                <option value="true">Có</option>
                                <option value="false">Không</option>
                            </select>
                        </div>
                    </div>
                    <div className="btn-addUser">
                        <button className=" btn btn-danger" onClick={() => closeModal("editRoomModal")}>Hủy bỏ</button>
                        <button className="btn btn-primary" type="submit" >Áp dụng</button>
                    </div>

                </form>
            </div>
        </Modal >

    );

}

export default EditRoomModal;





