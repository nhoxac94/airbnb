
import React, { useState } from 'react';
import moment from 'moment';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Modal, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import locationApi from 'apis/locationApi';
import { useEffect } from 'react';


const UploadImgModal = (props) => {
    const dispatch = useDispatch()
    const [reviewImg, setReviewImg] = useState(null)
    const uploadImdModal = useSelector(state => state.modalReducer)
    const closeModal = (name) => {
        dispatch({ type: "CHANGE_STATUS_MODAL", payload: { name: name, status: false } })
    }
    const token = useSelector(state => state.airbnbUserReducer.airbnbUser?.token)
    const handleUploadImg = (e) => {
        let file = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = e => {
            setReviewImg(e.target.result)
        }
        return file;
    }


    useEffect(() => {
        if (props.namePlace === "location") {
            locationApi.fetchLocationDetails(props.idPlace)
                .then(res => {
                    setReviewImg(res.data.image)
                })
                .catch(err => console.log(err))
        } else if (props.namePlace === "room") {
            locationApi.fetchRoomDetailsApi(props.idPlace)
                .then(res => {
                    setReviewImg(res.data.image)
                })
                .catch(err => console.log(err))
        }

    }, [])

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            img: "",

        },

        onSubmit: values => {
            console.log(values)
            let formData = new FormData();
            formData.append(props.namePlace, values.img, values.img.name)
            let nameApi = ""
            if ( props.namePlace === 'location') {
                nameApi =  `${props.namePlace}s/upload-images`
            } else if (props.namePlace === 'room') {
                nameApi =  `${props.namePlace}s/upload-image`

            }
            locationApi.uploadImg(nameApi, props.idPlace, formData, token)
                .then(res => {
                    alert("Upload thành công")
                    props.setForceUpdate(!props.forceUpdate)
                    closeModal("uploadImgModal")
                }
                )
                .catch(err => console.log(err))
        },

    })


    const { setFieldValue } = formik
    return (
        <Modal
            title="Upload Hình Anh"
            centered
            visible={uploadImdModal.status}
            onCancel={() => closeModal("uploadImdModal")}
            footer={null}
            width={800}
        >
            <div className="mx-lg-5">
                <form onSubmit={formik.handleSubmit}>
                    <input type="file" accept="image/*"
                        name="img"
                        onChange={(e) => setFieldValue("img", handleUploadImg(e))}
                    />
                    <br />
                    <div style={{ width: 100, height: 100 }} className="border ">
                        <img src={reviewImg} alt="..." width="100%" />
                    </div>
                    <div className="btn-addUser">
                        <button className=" btn btn-danger" onClick={() => closeModal("uploadImdModal")}>Hủy bỏ</button>
                        <button className="btn btn-primary" type="submit" >Upload</button>
                    </div>

                </form>
            </div>
        </Modal >

    );

}

export default UploadImgModal;





