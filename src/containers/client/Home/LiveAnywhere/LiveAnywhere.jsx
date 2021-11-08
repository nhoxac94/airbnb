import React from 'react'
import './LiveAnywhere.scss'

export default function LiveAnywhere() {
    return (
        <div className="liveAnywhere" style={{ maxWidth: 1600, margin: "auto" }}>
            <h3>Ở bất cứ đâu</h3>
            <div className="liveAnywhere__wrap">
                <div className="liveAnywhere__content">
                    <img src="https://a0.muscache.com/im/pictures/2f13349d-879d-43c6-83e3-8e5679291d53.jpg?im_w=720" alt="" />
                    <p>Nơi nghỉ dưỡng ngoài trời</p>
                </div>
                <div className="liveAnywhere__content">
                    <img src="https://a0.muscache.com/im/pictures/36f53e61-db8d-403c-9122-5b761c0e4264.jpg?im_w=720" alt="" />
                    <p>Chổ ở độc đáo</p>
                </div>
                <div className="liveAnywhere__content">
                    <img src="https://a0.muscache.com/im/pictures/7d82ca14-56e5-4465-8218-dcfa7d69b6ac.jpg?im_w=720" alt="" />
                    <p>Toàn bộ nhà</p>
                </div>
                <div className="liveAnywhere__content">
                    <img src="https://a0.muscache.com/im/pictures/10a638e1-6aff-4313-8033-1275cec83987.jpg?im_w=720" alt="" />
                    <p>Cho phép mang theo thú cưng</p>
                </div>
            </div>
        </div>
    )
}
