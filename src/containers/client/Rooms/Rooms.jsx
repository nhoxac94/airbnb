import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import ShowRoom from './ShowRoom/ShowRoom'
import './Rooms.scss'
import locationApi from 'apis/locationApi'
import { useDispatch, useSelector } from 'react-redux'

export default function Rooms() {
    const numberGuest = useSelector(state => state.guestReducer)
    const dispatch = useDispatch()
    let params = useParams()
    const [rooms, setRooms] = useState([])
    useEffect(() => {
        locationApi.fetchRoomsApi(params.idLocation)
            .then(res => {
                let totalGuest = 0;
                if (numberGuest) {
                    totalGuest = numberGuest.adults + numberGuest.children
                }
                const roomFilterGuest = res.data.filter(room => {
                    return room.guests >= totalGuest
                })
                setRooms(roomFilterGuest)
            })
            .catch(err => console.log(err))
    }, [numberGuest])
    
    useEffect(() => {
        dispatch({ type: "BG_HEADER", payload: true })
    }, [])
    return (
        <div className="rooms">
            <div className="wrap-rooms">
                <div className="listRooms">
                    <p>{rooms.length} chỗ ở</p>
                    <h3>Chỗ ở tại khu vực bản đồ đã chọn</h3>
                    {rooms.map(room => {
                        return <ShowRoom key={room.id} room={room} />
                    })}
                </div>
                <div className="map">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6594540.776917716!2d102.42052589969775!3d16.310894222424384!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31157a4d736a1e5f%3A0xb03bb0c9e2fe62be!2sVietnam!5e0!3m2!1sen!2s!4v1636121516810!5m2!1sen!2s" style={{ border: 0 }} allowFullScreen loading="lazy" />
                </div>
            </div>

        </div>
    )
}
