import React from 'react'
import './ExploreNearby.scss'

export default function ExploreNearby() {
    return (
        <div className="exploreNearby" style={{ maxWidth: 1600, margin: "auto" }}>
            <h3>Khám phá những điểm đến gần đây</h3>
            <div className="exploreNearby__content">
                <div className="cardPlace">
                    <div className="cardPlace__img">
                        <img src="https://a0.muscache.com/im/pictures/6b36a0f9-453f-4d11-974e-0cf164b4d18c.jpg?im_q=medq" alt="" />
                    </div>
                    <div className="cardPlace__content">
                        <h5>Thành phố Hồ Chí Minh</h5>
                        <p>15 phút lái xe</p>
                    </div>
                </div>
                <div className="cardPlace">
                    <div className="cardPlace__img">
                        <img src="https://a0.muscache.com/im/pictures/be4d3ba5-08d7-4afe-95a7-f2da6453886a.jpg?im_q=medq" alt="" />
                    </div>
                    <div className="cardPlace__content">
                        <h5>Nha Trang</h5>
                        <p>6.5 giờ lái xe</p>
                    </div>
                </div>
                <div className="cardPlace">
                    <div className="cardPlace__img">
                        <img src="https://a0.muscache.com/im/pictures/7253e011-7c22-48fd-b75d-d0da35372397.jpg?im_q=medq" alt="" />
                    </div>
                    <div className="cardPlace__content">
                        <h5>Vũng Tàu</h5>
                        <p>2 giờ lái xe</p>
                    </div>
                </div>
                <div className="cardPlace">
                    <div className="cardPlace__img">
                        <img src="https://a0.muscache.com/im/pictures/52e8083e-2de2-446d-a860-534eab250541.jpg?im_q=medq" alt="" />
                    </div>
                    <div className="cardPlace__content">
                        <h5>Phú Quốc</h5>
                    </div>
                </div>
                <div className="cardPlace">
                    <div className="cardPlace__img">
                        <img src="https://a0.muscache.com/im/pictures/20e74de0-0eb8-4fca-afb8-b111875acdf5.jpg?im_q=medq" alt="" />
                    </div>
                    <div className="cardPlace__content">
                        <h5>Cần Thơ</h5>
                        <p>3 giờ lái xe</p>
                    </div>
                </div>
                <div className="cardPlace">
                    <div className="cardPlace__img">
                        <img src="https://a0.muscache.com/im/pictures/e639b7ab-aee3-48ee-9743-216684a51319.jpg?im_q=medq" alt="" />
                    </div>
                    <div className="cardPlace__content">
                        <h5>Thành phố Tuy Hòa</h5>
                        <p>7.5 giờ lái xe</p>
                    </div>
                </div>
                <div className="cardPlace">
                    <div className="cardPlace__img">
                        <img src="https://a0.muscache.com/im/pictures/ca3737ef-0faf-46ba-b055-b4a2d99e2cea.jpg?im_q=medq" alt="" />
                    </div>
                    <div className="cardPlace__content">
                        <h5>Thành phố Biên Hòa</h5>
                        <p>45 phút lái xe</p>
                    </div>
                </div>
                <div className="cardPlace">
                    <div className="cardPlace__img">
                        <img src="https://a0.muscache.com/im/pictures/585d1e53-e2e1-4baf-a34e-36301dd1e2da.jpg?im_q=medq" alt="" />
                    </div>
                    <div className="cardPlace__content">
                        <h5>Thành phố Phan Rang - Tháp Chàm</h5>
                        <p>5 giờ lái xe</p>
                    </div>
                </div>
            </div>
        </div>

    )
}
