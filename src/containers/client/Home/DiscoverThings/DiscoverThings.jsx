import React from 'react'
import './DiscoverThings.scss'

export default function DiscoverThings() {
    return (
        <div className="discoverThings" style={{ maxWidth: 1600, margin: "auto" }}>
            <h3>Khám phá những điều nên trải nghiệm</h3>
            <div className="discoverThings__wrap">
                <div className="discoverThings__content">
                    <img src="https://a0.muscache.com/im/pictures/ad109d56-2421-40cd-98e6-e114160dc85b.jpg?im_w=720" alt="" />
                    <h5>Trải nghiệm</h5>
                    <p>Tìm các hoạt động khó quên gần bạn</p>
                </div>
                <div className="discoverThings__content">
                    <img src="https://a0.muscache.com/im/pictures/0ce799cb-7553-4369-be9e-d0011e0ef636.jpg?im_w=720" alt="" />
                    <h5>Trải nghiệm trực tuyến</h5>
                    <p>Các hoạt động tương tác, truyền trực tiếp dưới sự dẫn dắt của người tổ chức</p>
                </div>
                <div className="discoverThings__content">
                    <img src="https://a0.muscache.com/im/pictures/247a1ea3-946d-4eb8-a6ab-e8b9a66846f4.jpg?im_w=720" alt="" />
                    <h5>Bộ sưu tập nổi bật: Phiêu du</h5>
                    <p>Du lịch tại nhà với trải nghiệm trực tuyến</p>
                </div>

            </div>
        </div>
    )
}
