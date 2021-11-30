import React, { useEffect, useState } from 'react';
import {
    SearchOutlined, CloseOutlined, EditOutlined
} from "@ant-design/icons";

import userApi from 'apis/userApi'
import { useDispatch, useSelector } from 'react-redux'
import Loader from 'components/Loader/Loader';
import moment from 'moment';
import { ITEM_PER_PAGE } from 'settings/type';
import AddUserModal from './modal/AddUserModal';
import EditUserModal from './modal/EditUserModal';



const UserManagement = () => {
    const [totalUser, setTotalUser] = useState({})
    const [userPagination, setUserPagination] = useState({})
    const [currentPage, setCurrentPage] = useState(1)
    const [idEditUser, setIdEditUser] = useState()
    const [forceUpdate, setForceUpdate] = useState(false)
    const token = useSelector(state => state.airbnbUserReducer.airbnbUser?.token)

    const dispatch = useDispatch()
    
    useEffect(() => {
        userApi.fetchUserApi()
            .then(res => setTotalUser(res))
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        userApi.fetchUserApi(currentPage)
            .then(res => setUserPagination(res))
            .catch(err => console.log(err))
    }, [currentPage, forceUpdate])

    const addUserModal = useSelector(state => state.modalReducer)    
    const totalPages = Math.ceil(totalUser.data?.length / ITEM_PER_PAGE);
    const handlePagination = totalPages => {
        let renderPagination = [];
        for (let i = 0; i < totalPages; i++) {
            renderPagination.push(i + 1)
        }
        return renderPagination;
    }

    const deleteUser = (user) => {
        userApi.deleteUserApi(user, token)
            .then(res => { 
                alert("Xóa người dùng thành công")
                setForceUpdate(!forceUpdate)
            })
            .catch(err => console.log(err))

    }

    const openModal = (name) => {
        dispatch({type : "CHANGE_STATUS_MODAL", payload : {name : name, status: true}})
    }

    const handleEditUse = (userId) => {
        setIdEditUser(userId)
        openModal('editUserModal')
    }

    if (!totalUser || !userPagination) return <Loader />

    return (
        <div className="mx-lg-5"  >
            <h3>Quản lí người dùng</h3>
            <ul className="nav mb-1" role="tablist">              
                <li className="nav-item" role="presentation">
                    <div className="nav-link btn btn btn-light ml-2" onClick={() => openModal("addUserModal")} >
                        Thêm người dùng
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

                    <div className="table-responsive">
                        <table className="table table-bordered table-striped ">
                            <thead className="thead-dark">
                                <tr>
                                    <th>STT</th>
                                    <th>Email</th>
                                    <th>Họ tên</th>
                                    <th>Năm sinh</th>
                                    <th>Giới tính</th>
                                    <th>Số Điện Thoại</th>
                                    <th>Loại người dùng</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userPagination.data?.map((user, idx) => {
                                    return (
                                        <tr key={idx}>
                                            <td>{ITEM_PER_PAGE * (currentPage - 1) + idx + 1}</td>
                                            <td>{user.email}</td>
                                            <td>{user.name}</td>
                                            <td>{moment(user.birthday).format("YYYY/MM/DD")}</td>
                                            <td>{user.gender ? "Nam" : "Nữ"}</td>
                                            <td>{user.phone}</td>
                                            <td>{user.type}</td>
                                            <td className="py-2">
                                                <button className="edit__user  btn btn-success" onClick = {() => handleEditUse(user._id)} ><EditOutlined /> </button>
                                                <span>&nbsp;</span>
                                                <button className="delete__user btn btn-danger" onClick = {() => deleteUser(user._id)}><CloseOutlined /></button>
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
            {addUserModal.name === "addUserModal" && <AddUserModal forceUpdate = {forceUpdate} setForceUpdate = {setForceUpdate}/>}
            {addUserModal.name === "editUserModal" && <EditUserModal idUser = {idEditUser} forceUpdate = {forceUpdate} setForceUpdate = {setForceUpdate}/>}
        </div> 
            

    )
}

export default UserManagement;
