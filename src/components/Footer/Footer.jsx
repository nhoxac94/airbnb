import React from 'react'
import { FiGlobe } from 'react-icons/fi'
import { FaFacebookF, FaTwitter } from 'react-icons/fa'
import { ImInstagram } from 'react-icons/im'
import './Footer.scss'

export default function Footer() {
    return (
        <div className="footer" style={{ maxWidth: 1600, margin: "auto" }}>
            <div className="row">
                <div className="col-3">
                    <ul>
                        <h4>GIỚI THIỆU</h4>
                        <li>Phương thức hoạt động của Airbnb</li>
                        <li>Trang tin tức</li>
                        <li>Airbnb 2021</li>
                        <li>Nhà đầu tư</li>
                        <li>Airbnb Plus</li>
                        <li>Airbnb Luxe</li>
                        <li>HotelTonight</li>
                        <li>Airbnb for Work</li>
                        <li>Nhờ có Host, mọi điều đều có thể</li>
                        <li>Cơ hội nghề nghiệp</li>
                        <li>Thư của nhà sáng lập</li>
                    </ul>
                </div>
                <div className="col-3">
                    <ul>
                        <h4>CỘNG ĐỒNG</h4>
                        <li>Sự đa dạng và Cảm giác thân thuộc</li>
                        <li>Tiện nghi phù hợp với người có nhu cầu đặc biệt</li>
                        <li>Đối tác liên kết Airbnb</li>
                        <li>Đón tiếp người tị nạn Afghanistan</li>
                        <li>Lượt giới thiệu của khách</li>
                        <li>Airbnb.org</li>
                    </ul>
                </div>
                <div className="col-3">
                    <ul>
                        <h4>ĐÓN TIẾP KHÁCH</h4>
                        <li>Cho thuê nhà</li>
                        <li>Tổ chức Trải nghiệm trực tuyến</li>
                        <li>Tổ chức trải nghiệm</li>
                        <li>Đón tiếp khách có trách nhiệm</li>
                        <li>Trung tâm tài nguyên</li>
                        <li>Trung tâm cộng đồng</li>
                    </ul>
                </div>
                <div className="col-3">

                    <ul>
                        <h4>HỖ TRỢ</h4>
                        <li>Biện pháp ứng phó với đại dịch COVID-19 của chúng tôi</li>
                        <li>Trung tâm trợ giúp</li>
                        <li>Các tùy chọn hủy</li>
                        <li>Hỗ trợ khu dân cư</li>
                        <li>Tin cậy và an toàn</li>
                    </ul>
                </div>
            </div>
            <div className="copyright ">
                <div className="copyright__nav">
                    <ul>
                        <li>© 2021 Airbnb, Inc.</li>
                        <li>Quyền riêng tư</li>
                        <li>Điều khoản</li>
                        <li>Sơ đồ trang web</li>
                    </ul>
                </div>
                <div className="copyright__social">
                    <ul>
                        <li>
                            <FiGlobe />
                            <u>Tiếng Việt(VN)</u>
                        </li>
                        <li>
                            $
                            <u>USD</u>
                        </li>
                        <li>
                            <FaFacebookF />
                        </li>
                        <li>
                            <FaTwitter />
                        </li>
                        <li>
                            <ImInstagram />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
