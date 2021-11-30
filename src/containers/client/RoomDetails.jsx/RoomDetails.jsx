import React, { useState, useEffect, useRef } from 'react'
import locationApi from 'apis/locationApi';
import Loader from 'components/Loader/Loader';
import ReviewRoom from './ReviewRoom/ReviewRoom';
import './RoomDetails.scss'
import { AiFillStar } from 'react-icons/ai'
import { useParams } from 'react-router';
import DatePicker from 'components/DatePicker/DatePicker'
import Guest from 'components/Guests/Guest';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

function RoomDetails(props) {
    let param = useParams();
    const [roomDetails, setRoomDetails] = useState();
    const [roomReviews, setRoomReviews] = useState();
    const [notification, setNotification] = useState("");


    const dispatch = useDispatch()
    const datePicker = useSelector(state => state.datePickerReducer)
    const numberGuest = useSelector(state => state.guestReducer)
    const token = useSelector(state => state.airbnbUserReducer.airbnbUser?.token)

    const [activeForm, setActiveForm] = useState()
    const formRef = useRef()
    const airbnbUser = useSelector(state => state.airbnbUserReducer.airbnbUser)

    useEffect(() => {
       dispatch({type : "SELECT_ROOM_ID", payload : param.idRoom})
    }, [])

    useEffect(() => {
        locationApi.fetchRoomDetailsApi(param.idRoom)
            .then(res => setRoomDetails(res.data))
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        locationApi.fetchRoomReviewsApi(param.idRoom)
            .then(res => setRoomReviews(res.data))
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        dispatch({ type: "BG_HEADER", payload: true })
    }, [])

    useEffect(() => {
        const handleClickOutSide = e => {
            if (activeForm && formRef && !formRef.current?.contains(e.target)) {
                setActiveForm("")
            }
        }
        document.addEventListener("mousedown", handleClickOutSide)
        return () => { document.removeEventListener("mousedown", handleClickOutSide) }
    }, [activeForm])

    const handleBooking = (e) => {
        e.preventDefault()
        if (!datePicker.startDate || !datePicker.endDate) {
            return setActiveForm("datePicker")
        }
        if (!numberGuest.adults) {
           return setActiveForm("numberGuest")
        }
        if ((numberGuest.adults + numberGuest.children) > roomDetails.guests) {
            return setNotification(`Phòng chứa tối đa ${roomDetails.guests} khách`)
        }
        if (!airbnbUser) {
            return props.history.push("/login")
        }
        locationApi.bookingRoomApi({
            roomId : param.idRoom,
            checkIn : datePicker.startDate,
            checkOut : datePicker.endDate
        }, token)
        .then (res => {
            alert("Đặt phòng thành công")
            props.history.push("/")
        })
        .catch (err => console.log(err))
       
    }

    if (!roomDetails || !roomReviews) return <Loader />
    let keys = Object.keys(roomDetails);
    const utils = []
    for (let key of keys) {
        if (roomDetails[key] === true) {
            let keyFirstUpperChar = key.charAt().toUpperCase() + key.slice(1)
            utils.push(keyFirstUpperChar)
        }
    }

    const totalDateBooking = (datePicker.endDate && datePicker.startDate) && datePicker.endDate.diff(datePicker.startDate, 'days')

    return (
        <div className="roomDetails">
            <h3>{roomDetails.name}</h3>
            <div>
                <div className="reviewRoom">
                    <AiFillStar style={{ color: "red" }} /> {roomDetails.locationId.valueate}
                </div>
                <div className="locationRoom">
                    - {roomDetails?.locationId.name}, {roomDetails?.locationId.province}, {roomDetails?.locationId.country.toUpperCase()}
                </div>
            </div>
            <div className="roomImg">
                <div className="bigImg">
                    <img src={roomDetails.image} alt="" />
                </div>
                <div className="gridImg">
                    <img src={roomDetails.image} alt="" />
                    <img src={roomDetails.image} alt="" />
                    <img src={roomDetails.image} alt="" />
                    <img src={roomDetails.image} alt="" />

                </div>
            </div>
            <div className="roomUtils">
                <div className="roomInformation">
                    <div className="roomInformation--details">
                        <h5>{roomDetails.name}</h5>
                        <p>{roomDetails.guests} khách - {roomDetails.bedRoom} phòng ngủ - {roomDetails.bath} phòng tắm</p>
                        <u>Description:</u>
                        <span>
                            {` ${roomDetails.description}`}</span>
                    </div>

                    <div className="utils">
                        <h5>Tiện ích: </h5>
                        {utils.map((util, index) => {
                            return (
                                <div key={index}>. {util}</div>
                            )
                        })}
                    </div>
                </div>
                <div className="roomBooking">
                    <div className="roomBooking-wrap">
                        <form ref={formRef} >
                            <div className="roomBooking-header">
                                <p>{roomDetails.name}</p>
                                <p><AiFillStar style={{ color: "red" }} />{roomDetails.locationId.valueate}  ({roomReviews.length} đánh giá)</p>

                            </div>
                            <div className="roomBooking-require">
                                <div className="roomBooking-datePicker">
                                    <div className="checkIn" onClick={() => setActiveForm("datePicker")}>
                                        <p>Nhận phòng</p>
                                        {!datePicker.startDate ? <p>Thêm ngày</p> : <p>{datePicker.startDate.format("DD/MM/YYYY")}</p>}
                                    </div>
                                    <div className="checkOut" onClick={() => setActiveForm("datePicker")}>
                                        <p>Trả phòng</p>
                                        {!datePicker.endDate ? <p>Thêm ngày</p> : <p>{datePicker.endDate.format("DD/MM/YYYY")}</p>}
                                    </div>
                                    <div className={`datePicker-modal ${activeForm === 'datePicker' && 'active'} `} >
                                        <DatePicker />
                                    </div>
                                </div>
                                <div className="guests" onClick={() => {setActiveForm("numberGuest"); setNotification("") }}>
                                    <p>Khách</p>
                                    {numberGuest.adults ?
                                        <p>{`${numberGuest.adults + numberGuest.children} khách 
                                            ${numberGuest.infants ? `,${numberGuest.infants} em bé ` : ""}`}</p> :
                                        <p>Thêm khách</p>
                                    }
                                    <div className={`numberGuest-modal ${activeForm === 'numberGuest' && 'active'}`} >
                                        <Guest />
                                    </div>
                                    {notification && <div className = "text-danger">{notification}</div>}
                                </div>

                            </div>
                            <div className="feeBooking">
                                <div className="feeBooking--item">
                                    <p>Giá phòng :</p>
                                    <p>{roomDetails.price.toLocaleString()} VNĐ / đêm</p>
                                </div>
                                <div className="feeBooking--item">
                                    <p>Số đêm:</p>
                                    <p>{totalDateBooking} đêm</p>
                                </div>
                                <div className="feeBooking--item totalFee">
                                    <p>Tổng:</p>
                                    <p>{(roomDetails.price * totalDateBooking).toLocaleString()} VNĐ</p>
                                </div>
                            </div>
                            <button className="ButtonBooking" onClick={(e) => handleBooking(e)}>
                                Đặt phòng
                            </button>
                        </form>
                    </div>

                </div>
            </div>
            <div className="reviewRoom">
                <div className="reviewRoom--header">
                    <p><AiFillStar style={{ color: "red" }} />{roomDetails.locationId.valueate}  ({roomReviews.length} đánh giá)</p>
                </div>
                <div className="reviewRoom--content">
                    {roomReviews.map((review, idx) => {
                        return <ReviewRoom key={idx} review={review} />
                    })}
                </div>
            </div>
        </div >
    )
}

export default RoomDetails;