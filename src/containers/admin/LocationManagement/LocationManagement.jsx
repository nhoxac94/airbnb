import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    SearchOutlined, CloseOutlined, EditOutlined
} from "@ant-design/icons";

import { useDispatch, useSelector } from 'react-redux'
import Loader from 'components/Loader/Loader';
import moment from 'moment';
import { ITEM_PER_PAGE } from 'settings/type';
import locationApi from 'apis/locationApi';
import AddLocationModal from './modal/AddLocationModal';
import EditLocationModal from './modal/EditLocationModal';
import { BsImage } from 'react-icons/bs'
import UploadImgModal from './modal/UploadImgModal';

const LocationManagement = () => {
    const [totalLocation, setTotalLocation] = useState({})
    const [locationPagination, setLocationPagination] = useState({})
    const [currentPage, setCurrentPage] = useState(1)
    const [idEditLocation, setIdEditLocation] = useState()
    const [forceUpdate, setForceUpdate] = useState(false)
    const token = useSelector(state => state.airbnbUserReducer.airbnbUser?.token)

    const dispatch = useDispatch()

    useEffect(() => {
        locationApi.fetchLocationsApi()
            .then(res => setTotalLocation(res))
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        locationApi.fetchLocationsApi(currentPage)
            .then(res => setLocationPagination(res))
            .catch(err => console.log(err))
    }, [currentPage, forceUpdate])

    const addLocationModal = useSelector(state => state.modalReducer)
    const editLocationModal = useSelector(state => state.modalReducer)
    const uploadImgModal = useSelector(state => state.modalReducer)

    const totalPages = Math.ceil(totalLocation.data?.length / ITEM_PER_PAGE);
    const handlePagination = totalPages => {
        let renderPagination = [];
        for (let i = 0; i < totalPages; i++) {
            renderPagination.push(i + 1)
        }
        return renderPagination;
    }

    const deleteLocation = (locationId) => {
        locationApi.deleteLocation(locationId, token)
            .then(res => {
                console.log(res)
                alert("Xóa vị trí thành công")
                setForceUpdate(!forceUpdate)
            })
            .catch(err => console.log(err))

    }

    const openModal = (name) => {
        dispatch({ type: "CHANGE_STATUS_MODAL", payload: { name: name, status: true } })
    }

    const handleEditLocation = (locationId) => {
        setIdEditLocation(locationId)
        openModal('editLocationModal')
    }

    const handleUploadImg = (locationId) => {
        setIdEditLocation(locationId)
        openModal('uploadImgModal')

    }
    if (!totalLocation || !locationPagination) return <Loader />

    return (
        <div className="mx-lg-5"  >
            <h3>Quản lí vị trí</h3>
            <ul className="nav mb-1" role="tablist">
                {/* <li className="nav-item" role="presentation">
                    <Link to="/admin/users" className="nav-link active btn btn-light" data-toggle="pill" role="tab" >
                        Quản lý người dùng
                    </Link>
                </li> */}
                <li className="nav-item" role="presentation">
                    <div className="nav-link btn btn btn-light" onClick={() => openModal("addLocationModal")} >
                        Thêm vị trí
                    </div>

                </li>
            </ul>
            <div >
                <div className="mb-2">
                    {/* <form onSubmit={(e) => this.handleFindUser(e)}>
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nhập vào tên hoặc tài khoản"
                            />
                            <div className="input-group-append">
                                <button
                                    className="btn btn-outline-secondary"
                                    type="submit"
                                >
                                    <SearchOutlined className="moviemanager__icon" />
                                </button>
                            </div>
                        </div>
                    </form> */}

                    <div className="table-responsive location-render">
                        <table className="table table-bordered table-striped ">
                            <thead className="thead-dark">
                                <tr>
                                    <th>STT</th>
                                    <th>Name</th>
                                    <th>Hình Ảnh</th>
                                    <th>Tỉnh thành</th>
                                    <th>Quốc gia</th>
                                    <th>Đánh giá</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {locationPagination.data?.map((location, idx) => {
                                    return (
                                        <tr key={idx}>
                                            <td>{ITEM_PER_PAGE * (currentPage - 1) + idx + 1}</td>
                                            <td>{location.name}</td>
                                            <td>
                                                <img src={location.image} alt="" />
                                            </td>
                                            <td>{location.province}</td>
                                            <td>{location.country}</td>
                                            <td>{location.valueate}</td>
                                            <td className="py-2">
                                                <button className="edit__user  btn btn-primary" onClick={() => handleUploadImg(location._id)} ><BsImage /> </button>
                                                <span>&nbsp;</span>
                                                <button className="edit__user  btn btn-success" onClick={() => handleEditLocation(location._id)} ><EditOutlined /> </button>
                                                <span>&nbsp;</span>
                                                <Link to={`/admin/location/${location._id}`}> <button className="edit__user  btn btn-primary" >Rooms </button> </Link>
                                                <span>&nbsp;</span>
                                                <button className="delete__user btn btn-danger" onClick={() => deleteLocation(location._id)}><CloseOutlined /></button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="text-right navigate__user">
                    <ul className="d-block">
                        <button className="btn btn-outline-primary mr-1" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
                        {handlePagination(totalPages).map((page => {
                            return (<li className={`btn btn-outline-dark mr-1 ${currentPage === page && 'active'}`} key={page} onClick={() => setCurrentPage(page)}>{page}</li>)
                        }))}
                        <button className="btn btn-outline-primary" disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>Next</button>

                    </ul>
                </div>
            </div>
            {addLocationModal.name === "addLocationModal" && <AddLocationModal forceUpdate={forceUpdate} setForceUpdate={setForceUpdate} />}
            {editLocationModal.name === "editLocationModal" && <EditLocationModal idEditLocation={idEditLocation} forceUpdate={forceUpdate} setForceUpdate={setForceUpdate} />}
            {uploadImgModal.name === "uploadImgModal" && <UploadImgModal namePlace = "location" idPlace={idEditLocation} forceUpdate={forceUpdate} setForceUpdate={setForceUpdate} />}

        </div>


    )
}

export default LocationManagement;
