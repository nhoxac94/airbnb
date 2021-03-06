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
            return setNotification(`Ph??ng ch???a t???i ??a ${roomDetails.guests} kh??ch`)
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
            alert("?????t ph??ng th??nh c??ng")
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
                        <p>{roomDetails.guests} kh??ch - {roomDetails.bedRoom} ph??ng ng??? - {roomDetails.bath} ph??ng t???m</p>
                        <u>Description:</u>
                        <span>
                            {` ${roomDetails.description}`}</span>
                    </div>

                    <div className="utils">
                        <h5>Ti???n ??ch: </h5>
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
                                <p><AiFillStar style={{ color: "red" }} />{roomDetails.locationId.valueate}  ({roomReviews.length} ????nh gi??)</p>

                            </div>
                            <div className="roomBooking-require">
                                <div className="roomBooking-datePicker">
                                    <div className="checkIn" onClick={() => setActiveForm("datePicker")}>
                                        <p>Nh???n ph??ng</p>
                                        {!datePicker.startDate ? <p>Th??m ng??y</p> : <p>{datePicker.startDate.format("DD/MM/YYYY")}</p>}
                                    </div>
                                    <div className="checkOut" onClick={() => setActiveForm("datePicker")}>
                                        <p>Tr??? ph??ng</p>
                                        {!datePicker.endDate ? <p>Th??m ng??y</p> : <p>{datePicker.endDate.format("DD/MM/YYYY")}</p>}
                                    </div>
                                    <div className={`datePicker-modal ${activeForm === 'datePicker' && 'active'} `} >
                                        <DatePicker />
                                    </div>
                                </div>
                                <div className="guests" onClick={() => {setActiveForm("numberGuest"); setNotification("") }}>
                                    <p>Kh??ch</p>
                                    {numberGuest.adults ?
                                        <p>{`${numberGuest.adults + numberGuest.children} kh??ch 
                                            ${numberGuest.infants ? `,${numberGuest.infants} em b?? ` : ""}`}</p> :
                                        <p>Th??m kh??ch</p>
                                    }
                                    <div className={`numberGuest-modal ${activeForm === 'numberGuest' && 'active'}`} >
                                        <Guest />
                                    </div>
                                    {notification && <div className = "text-danger">{notification}</div>}
                                </div>

                            </div>
                            <div className="feeBooking">
                                <div className="feeBooking--item">
                                    <p>Gi?? ph??ng :</p>
                                    <p>{roomDetails.price.toLocaleString()} VN?? / ????m</p>
                                </div>
                                <div className="feeBooking--item">
                                    <p>S??? ????m:</p>
                                    <p>{totalDateBooking} ????m</p>
                                </div>
                                <div className="feeBooking--item totalFee">
                                    <p>T???ng:</p>
                                    <p>{(roomDetails.price * totalDateBooking).toLocaleString()} VN??</p>
                                </div>
                            </div>
                            <button className="ButtonBooking" onClick={(e) => handleBooking(e)}>
                                ?????t ph??ng
                            </button>
                        </form>
                    </div>

                </div>
            </div>
            <div className="reviewRoom">
                <div className="reviewRoom--header">
                    <p><AiFillStar style={{ color: "red" }} />{roomDetails.locationId.valueate}  ({roomReviews.length} ????nh gi??)</p>
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