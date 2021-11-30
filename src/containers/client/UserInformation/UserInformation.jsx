import userApi from 'apis/userApi'
import Loader from 'components/Loader/Loader'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import './UserInformation.scss'
import moment from 'moment'

function UserInformation(props) {
    const userInformation = useSelector(state => state.airbnbUserReducer.airbnbUser)
    const [userInformationEdit, setUserInformationEdit] = useState()
    const [ticketUser, setTicketUser] = useState([])
    if (!localStorage.getItem("AIRBNB_USER")) {
        props.history.push("/")
    }

    useEffect(() => {
        return userApi.fetchInformationUser(userInformation.user._id)
            .then(res => {
                setUserInformationEdit(res.data);
                console.log(res.data)
                res.data.tickets.map(ticket => {
                    userApi.fetchTicketDetail(ticket)
                        .then(res => {
                            setTicketUser(arr => [...arr, res])
                        })
                        .catch(err => console.log(err))
                }
                )
            })
            .catch(err => console.log(err))
    }, [])


    if (!userInformationEdit || !ticketUser) return <Loader />
    return (
        <div className="userInformation">
            <div className="row">
                <div className="col-2 ">
                    <div className="informationUser-card">
                        <h5>Thông tin cá Nhân</h5>
                        <img src={userInformationEdit.avatar} alt="" />
                        <p className="my-2">Cập nhật ảnh đại diện</p>
                        <div className="informationItem">
                            <p>Tên:</p>
                            <span>{userInformationEdit.name}</span>
                        </div>
                        <div className="informationItem">
                            <p>Email:</p>
                            <span>{userInformationEdit.email}</span>
                        </div>
                        <div className="informationItem">
                            <p>Phone:</p>
                            <span>{userInformationEdit.phone}</span>
                        </div>
                        <div className="informationItem">
                            <p>Address :</p>
                            <span>{userInformationEdit.address}</span>
                        </div>
                        <button className="btn btn-primary">Chỉnh sửa</button>
                    </div>

                </div>
                <div className="col-8">
                    <div className="row">
                        {ticketUser.map(ticket => {
                            return (
                                <div className="cardTicket col-5">
                                    <div className="cardTicket-item">
                                        <p>Địa điểm:</p>
                                        <span>{ticket.data.roomId.name}(</span>
                                    </div>
                                    <div className="cardTicket-item">
                                        <p>CheckIn:</p>
                                        <span>{moment(ticket.data.checkIn).format("DD/MM/YYYY")}</span>
                                    </div>
                                    <div className="cardTicket-item">
                                        <p>CheckOut: </p>
                                        <span>{moment(ticket.data.checkOut).format("DD/MM/YYYY")}</span>
                                    </div>


                                </div>
                            )

                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserInformation
