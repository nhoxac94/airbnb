import locationApi from 'apis/locationApi';
import Loader from 'components/Loader/Loader';
import React, { useState, useEffect } from 'react'
import ReviewRoom from './ReviewRoom/ReviewRoom';
import './RoomDetails.scss'
import { AiFillStar } from 'react-icons/ai'
import { useParams } from 'react-router';

export default function RoomDetails() {

    let param = useParams();
    const [roomDetails, setRoomDetails] = useState();
    const [roomReviews, setRoomReviews] = useState();

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

    console.log("roomDetails", roomDetails);
    console.log("roomReviews", roomReviews);


    if (!roomDetails || !roomReviews) return <Loader />
    let keys = Object.keys(roomDetails);
    const utils = []
    for (let key of keys) {
        if (roomDetails[key] === true) {
            let keyFirstUpperChar = key.charAt().toUpperCase() + key.slice(1)
            utils.push(keyFirstUpperChar)
        }
    }
    return (
        <div className="roomDetails">
            <h3>{roomDetails.name}</h3>
            <div>
                <div className="reviewRoom">
                    <AiFillStar style={{ color: "red" }} /> ({roomReviews.length} đánh giá)
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
                    <div className="datePicker">
                        <h5>Chọn ngày nhận phòng</h5>
                    </div>
                </div>
                <div className="roomBooking">

                </div>
            </div>
            <div className="reviewRoom">
                <div className="reviewRoom--header">
                    {/* {roomDetails.locationId.valueate} đánh giá */}
                </div>
                <div className="reviewRoom--content">
                    {roomReviews.map(review => {
                        return <ReviewRoom key={review.userId.id} review={review} />
                    })}
                </div>
            </div>

        </div>
    )
}
