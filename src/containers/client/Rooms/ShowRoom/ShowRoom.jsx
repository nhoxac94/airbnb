import React from 'react'
import { AiFillStar } from 'react-icons/ai'
import { Link } from 'react-router-dom';

export default function ShowRoom({ room }) {
    let keys = Object.keys(room);
    const utils = []
    for (let key of keys) {
        if (room[key] === true) {
            let keyFirstUpperChar = key.charAt().toUpperCase() + key.slice(1)
            utils.push(keyFirstUpperChar)
        }
    }
    return (
        <Link to={`/rooms/${room._id}`}>
            <div className="showRoom">

                <div className="slider-Img">
                    <img src={room.image} alt="" />
                </div>
                <div className="showRoom-details">
                    <h5>{room.name}</h5>
                    <p className="utilsRoom">{`${room.guests} khách - ${room.bedRoom} phòng ngủ - ${room.bath} phòng tắm `}</p>
                    <p>{utils.join(" - ")}</p>
                    <div className="showRoom-review">
                        <div className="review">
                            <span> <AiFillStar />{`(${room.locationId.valueate} đánh giá)`}</span>
                        </div>
                        <div className="price">
                            {`${(room.price).toLocaleString()} VND/đêm`}

                        </div>
                    </div>
                </div>

            </div>
        </Link>
    )
}
