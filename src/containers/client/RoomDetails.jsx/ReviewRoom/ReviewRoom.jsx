import moment from 'moment'
import React from 'react'

export default function ReviewRoom({review}) {
    return (

        <div className="reviewRoom--item" >
            <div className="reviewRoom--item-userInformation">
                <div className="avatar">
                    <img src={review.userId.avatar} alt="" />
                </div>
                <div className="nameUser">
                    <p>{review.userId.name}</p>
                    <p>{moment(review.created_at).format("DD - MM - YYYY")}</p>

                </div>

            </div>
            <div className="reviewRoom--item-content">
                <p>{review.content}</p>
            </div>
        </div>

    )
}
