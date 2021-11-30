import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    SearchOutlined, CloseOutlined, EditOutlined
} from "@ant-design/icons";

import userApi from 'apis/userApi'
import { useDispatch, useSelector } from 'react-redux'
import Loader from 'components/Loader/Loader';
import moment from 'moment';
import { ITEM_PER_PAGE } from 'settings/type';
import locationApi from 'apis/locationApi';
import { useParams } from 'react-router-dom'
import AddRoomModal from './modal/AddRoomModal';
import EditRoomModal from './modal/EditRoomModal';
import { BsImage } from 'react-icons/bs'
import UploadImgModal from './modal/UploadImgModal';




const RoomManagement = (props) => {
    const [totalRoomsInLocation, setTotalRoomsInLocation] = useState({})
    const [roomsPagination, setRoomsPagination] = useState({})
    const [currentPage, setCurrentPage] = useState(1)
    const [idEditRoom, setIdEditRoom] = useState()
    const [forceUpdate, setForceUpdate] = useState(false)
    const dispatch = useDispatch()

    const { idLocation } = useParams()
    useEffect(() => {
        locationApi.fetchRoomsApi(idLocation)
            .then(res => setTotalRoomsInLocation(res))
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        locationApi.fetchRoomsApi(idLocation, currentPage)
            .then(res => setRoomsPagination(res))
            .catch(err => console.log(err))
    }, [currentPage, forceUpdate])


    const addRoomModal = useSelector(state => state.modalReducer)
    const editRoomModal = useSelector(state => state.modalReducer)
    const uploadImgModal = useSelector(state => state.modalReducer)

    const totalPages = Math.ceil(totalRoomsInLocation.data?.length / ITEM_PER_PAGE);
    const handlePagination = totalPages => {
        let renderPagination = [];
        for (let i = 0; i < totalPages; i++) {
            renderPagination.push(i + 1)
        }
        return renderPagination;
    }
    const token = useSelector(state => state.airbnbUserReducer.airbnbUser?.token)

    const deleteRoom = (room) => {
        locationApi.deleteRoomApi(room, token)
            .then(res => {
                alert("Xóa phòng thành công")
                setForceUpdate(!forceUpdate)
            })
            .catch(err => console.log(err))

    }

    const openModal = (name) => {
        dispatch({ type: "CHANGE_STATUS_MODAL", payload: { name: name, status: true } })
    }

    const handleEditRoom = (roomId) => {
        setIdEditRoom(roomId)
        openModal('editRoomModal')
    }

    const handleUploadImg = (roomId) => {
        setIdEditRoom(roomId)
        openModal('uploadImgModal')

    }

    if (!totalRoomsInLocation || !roomsPagination) return <Loader />

    const renderUtils = (room) => {
        let keys = Object.keys(room);
        const utils = []
        for (let key of keys) {
            if (room[key] === true) {
                let keyFirstUpperChar = key.charAt().toUpperCase() + key.slice(1)
                utils.push(keyFirstUpperChar)
            }
        }
        return utils.join(", ");
    }


    return (
        <div className="mx-lg-5"  >
            <h3>Quản lí Phòng</h3>
            <ul className="nav mb-1" role="tablist">
                {/* <li className="nav-item" role="presentation">
                    <Link to="/admin/users" className="nav-link active btn btn-light" data-toggle="pill" role="tab" >
                        Quản lý người dùng
                    </Link>
                </li> */}
                <li className="nav-item" role="presentation">
                    <div className="nav-link btn btn btn-light" onClick={() => openModal("addRoomModal")} >
                        Thêm Phòng
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
                                    <th>Số phòng ngủ</th>
                                    <th>Tiện ích</th>
                                    <th>Giá phòng</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {roomsPagination.data?.map((room, idx) => {
                                    return (
                                        <tr key={idx}>
                                            <td>{ITEM_PER_PAGE * (currentPage - 1) + idx + 1}</td>
                                            <td>{room.name}</td>
                                            <td>
                                                <img src={room.image} alt="" />
                                            </td>
                                            <td>{room.bedRoom}</td>
                                            <td>{renderUtils(room)}</td>
                                            <td>{(room.price).toLocaleString()} VNĐ</td>
                                            <td className="py-2">
                                                <button className="edit__user  btn btn-primary" onClick={() => handleUploadImg(room._id)} ><BsImage /> </button>
                                                <span>&nbsp;</span>
                                                <button className="edit__user  btn btn-success" onClick={() => handleEditRoom(room._id)} ><EditOutlined /> </button>
                                                <span>&nbsp;</span>
                                                <Link to={`/rooms/reviews/${room._id}`}><button className="edit__user  btn btn-primary" >Đánh giá </button></Link>
                                                <span>&nbsp;</span>
                                                <button className="delete__user btn btn-danger" onClick={() => deleteRoom(room._id)}><CloseOutlined /></button>
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
            {addRoomModal.name === "addRoomModal" && <AddRoomModal locationId={props.match.params.idLocation} forceUpdate={forceUpdate} setForceUpdate={setForceUpdate} />}
            {editRoomModal.name === "editRoomModal" && <EditRoomModal idEditRoom={idEditRoom} forceUpdate={forceUpdate} setForceUpdate={setForceUpdate} />}
            {uploadImgModal.name === "uploadImgModal" && <UploadImgModal namePlace = "room" idPlace={idEditRoom} forceUpdate={forceUpdate} setForceUpdate={setForceUpdate} />}

        </div>


    )
}

export default RoomManagement;
