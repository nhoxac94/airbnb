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
import AddReviewModal from './modal/AddReviewModal';
import EditReviewModal from './modal/EditReviewModal';



const ReviewsManagement = (props) => {
    const [totalReviews, setTotalReviews] = useState({})
    const [reviewsPagination, setReviewsPagination] = useState({})
    const [currentPage, setCurrentPage] = useState(1)
    const [idEditReview, setIdEditReview] = useState()
    const [forceUpdate, setForceUpdate] = useState(false)

    const dispatch = useDispatch()

    const { idRoom } = useParams()
    useEffect(() => {
        locationApi.fetchRoomReviewsApi(idRoom)
            .then(res => setTotalReviews(res))
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        locationApi.fetchRoomReviewsApi(idRoom, currentPage)
            .then(res => setReviewsPagination(res))
            .catch(err => console.log(err))
    }, [currentPage, forceUpdate])


    const addReviewModal = useSelector(state => state.modalReducer)
    const editReviewModal = useSelector(state => state.modalReducer)

    const totalPages = Math.ceil(totalReviews.data?.length / ITEM_PER_PAGE);

    const handlePagination = totalPages => {
        let renderPagination = [];
        for (let i = 0; i < totalPages; i++) {
            renderPagination.push(i + 1)
        }
        return renderPagination;
    }
    const token = useSelector(state => state.airbnbUserReducer.airbnbUser?.token)

    const deleteReview = (review) => {
        locationApi.deleteReviewApi(review, token)
            .then(res => {
                alert('Xóa review thành công')
                setForceUpdate(!forceUpdate)
             })
            .catch(err => console.log(err))

    }

    const openModal = (name) => {
        dispatch({ type: "CHANGE_STATUS_MODAL", payload: { name: name, status: true } })
    }

    const handleEditReview = (reviewId) => {
        setIdEditReview(reviewId)
        openModal('editReviewModal')
    }



    if (!totalReviews || !reviewsPagination) return <Loader />

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
            <h3>{`${totalReviews.data?.[0]?.roomId?.name} reviews`}</h3>
            <ul className="nav mb-1" role="tablist">
                {/* <li className="nav-item" role="presentation">
                    <Link to="/admin/users" className="nav-link active btn btn-light" data-toggle="pill" role="tab" >
                        Quản lý người dùng
                    </Link>
                </li> */}
                <li className="nav-item" role="presentation">
                    <div className="nav-link btn btn btn-light active" onClick={() => openModal("addReviewModal")} >
                        Thêm review
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
                                    <th>Nội dung</th>
                                    <th>Ngày tạo</th>
                                    <th>Ngày update</th>
                                    
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reviewsPagination.data?.map((review, idx) => {
                                    return (
                                        <tr key={idx}>
                                            <td>{ITEM_PER_PAGE * (currentPage - 1) + idx + 1}</td>
                                            <td>{review.userId.name}</td>
                                            <td>
                                                {review.content}
                                            </td>
                                            <td>{moment(review.created_at).format("YYYY/MM/DD")}</td>
                                            <td>{moment(review.updatedAt).format("YYYY/MM/DD")}</td>
                                            
                                            <td className="py-2">
                                                <button className="edit__user  btn btn-success" onClick={() => handleEditReview(review._id)} ><EditOutlined /> </button>
                                                <span>&nbsp;</span>
                                                {/* <Link><button className="edit__user  btn btn-primary" >Đánh giá </button></Link>
                                                <span>&nbsp;</span> */}
                                                <button className="delete__user btn btn-danger" onClick={() => deleteReview(review._id)}><CloseOutlined /></button>
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
            {addReviewModal.name === "addReviewModal" && <AddReviewModal idRoom = {idRoom} forceUpdate = {forceUpdate} setForceUpdate = {setForceUpdate} /> }
            {editReviewModal.name === "editReviewModal" && <EditReviewModal idReview={idEditReview} orceUpdate = {forceUpdate} setForceUpdate = {setForceUpdate} />}
        </div>


    )
}

export default ReviewsManagement;
