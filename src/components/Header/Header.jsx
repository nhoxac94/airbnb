import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import './Header.scss'
import { FiGlobe, FiSearch } from 'react-icons/fi'
import { VscListFlat } from 'react-icons/vsc'
import { FaAirbnb, FaUserCircle } from 'react-icons/fa'
import { MdLocationOn } from 'react-icons/md'
import locationApi from 'apis/locationApi'
import moment from 'moment'
import DatePicker from 'components/DatePicker/DatePicker'
import Guest from 'components/Guests/Guest'



export default function Header() {

    const [activeNavForm, setActiveNavForm] = useState("")
    const [searchLocation, setSearchLocation] = useState('')
    const [resultSearchLocation, setResultSearchLocation] = useState([])
    const [locationId, setLocationId] = useState("")
    const [location, setLocation] = useState("")
    const [scrolling, setScrolling] = useState(false)

    const formRef = useRef(null)

    const dispatch = useDispatch()
    const handleChooseLocation = (location) => {
        setLocation(location.name)
        setActiveNavForm("checkIn")
        setLocationId(location._id)
    }
    const bgHeader = useSelector(state => state.bgHeaderReducer.bgHeader)
    useEffect(() => {
        setScrolling(bgHeader)
    }, [bgHeader])

    const locationBooking = useSelector(state => state.locationReducer)
    useEffect(() => {
        setLocation(locationBooking.location)
        setLocationId(locationBooking.locationId)
    }, [])

    useEffect(() => {
        const handleClickOutSide = e => {
            if (activeNavForm && formRef && !formRef.current?.contains(e.target)) {
                setActiveNavForm("")
            }
        }
        document.addEventListener("mousedown", handleClickOutSide)
        return () => { document.removeEventListener("mousedown", handleClickOutSide) }
    }, [activeNavForm])


    useEffect(() => {
        locationApi.fetchSearchLocationApi(searchLocation)
            .then(res => setResultSearchLocation(res.data))
            .catch(err => console.log(err))
    }, [searchLocation])

    
    const handleSearch = (e) => {
        setSearchLocation(e.target.value);
        setLocation(e.target.value)
        setLocationId(e.target._id)
    }

    const handleSearchRoom = () => {
        {
            formRef.current.elements.locationNav.focus()
            if (!location) {
                alert("Vui lòng chọn địa điêm")
            } else {
                dispatch({ type: "LOCATION_BOOKING", payload: { location: location, locationId: locationId } })
                setActiveNavForm("")
            }
        }
    }

    const clearReducer = () => {
        dispatch({ type: "CLEAR_REDUX" })

    }

    const handleNavForm = activeNav => {
        setActiveNavForm(activeNav)
    }

    const airbnbUser = useSelector(state => state.airbnbUserReducer.airbnbUser)
    const handleLogout = () => {
        localStorage.setItem("AIRBNB_USER", "")
        dispatch({type : "LOGOUT"})
    }

    
    const datePicker = useSelector(state => state.datePickerReducer)
    const numberGuest = useSelector(state => state.guestReducer)

    return (
        <div className={`header ${scrolling && "bgHeaderScroll"}`}>
            <div className="navbar" >
                <Link to="/" onClick={clearReducer} >
                    <div className="navbar__brand">
                        <FaAirbnb />
                        <span>airbnb</span>
                    </div>
                </Link>
                <div className="navbar__content">
                    <div className="navbar__input">
                        <form ref={formRef} >
                            <div className="navbar__input-content">
                                <div className={`navbar__input-item ${activeNavForm === "location" && "active"} `} onClick={() => handleNavForm("location")} >
                                    <label htmlFor="locationNav">Địa điểm</label>
                                    <input type="text" id="locationNav" placeholder="Bạn sắp đi đâu?" value={location} onChange={handleSearch} />
                                </div>
                                <div className={`navbar__input-item ${activeNavForm === "checkIn" && "active"} `} onClick={() => handleNavForm("checkIn")} >
                                    <h5>Nhận phòng</h5>
                                    {!datePicker.startDate ? <p>Thêm ngày</p> : <p>{datePicker.startDate.format("DD/MM/YYYY")}</p>}
                                </div>
                                <div className={`navbar__input-item ${activeNavForm === "checkOut" && "active"} `} onClick={() => handleNavForm("checkOut")} >
                                    <h5>Trả phòng</h5>
                                    {!datePicker.endDate ? <p>Thêm ngày</p> : <p>{datePicker.endDate.format("DD/MM/YYYY")}</p>}
                                </div>
                                <div className={`navbar__input-item ${activeNavForm === "guest" && "active"} `}  >
                                    <div className="navbar__input--guest" onClick={() => handleNavForm("guest")}>
                                        <h5>Khách</h5>
                                        {numberGuest.adults ?
                                            <span>{`${numberGuest.adults + numberGuest.children} khách 
                                            ${numberGuest.infants ? `,${numberGuest.infants} em bé ` : ""}`}</span> :
                                            <span>Thêm khách</span>
                                        }
                                    </div>
                                    <div className="searchIcon" onClick={handleSearchRoom}>
                                        <Link to={`${location && `/location/${locationId}`}`}><FiSearch /></Link>
                                    </div>
                                </div>
                            </div>
                            <div className="chooseNav">
                                <div className={`showSearch ${(activeNavForm === "location") && "active"}`}>
                                    {!searchLocation && <p>Địa điểm nổi bật</p>}
                                    {resultSearchLocation.map(location => {
                                        return (
                                            <div key={location._id} className="resultLocation" onClick={() => handleChooseLocation(location)}>
                                                <MdLocationOn className="iconLocation" />
                                                <span>{location.name}</span>
                                            </div>
                                        )
                                    })}
                                </div>
                                <div className={`showDatePicker ${(activeNavForm === "checkIn" || activeNavForm === "checkOut") && "active"}`}>
                                    <div className="datePicker__wrap">
                                        <DatePicker />
                                    </div>
                                </div>
                                <div className={`showAddPeople ${activeNavForm === "guest" && "active"}`}>
                                    <Guest />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="navbar__setting">
                    {/* <span>Trở thành chủ nhà</span>
                    <FiGlobe className="navbar__setting--languages" /> */}

                    {airbnbUser ?
                        (<div className="dropdown">
                            <div className="navbar__setting--user" data-toggle="dropdown" >
                                <VscListFlat className="navbar--settingBar" />
                                <FaUserCircle className="navbar--userIcon" style = {{color : "black"}} />
                            </div>

                            <div className="navbar_login dropdown-menu" >
                                <ul>
                                    <li> <Link to="/informationUser">Thông tin</Link> </li>
                                    <li onClick = {handleLogout}>Đăng xuất</li>
                                </ul>
                            </div>
                        </div>)

                        :
                        (<div className="dropdown">
                            <div className="navbar__setting--user" data-toggle="dropdown">
                                <VscListFlat className="navbar--settingBar" />
                                <FaUserCircle className="navbar--userIcon" style = {{opacity : 0.5}}/>
                            </div>
                            <div className="navbar_login dropdown-menu" >
                                <ul>
                                    <li> <Link to="/sign-up">Đăng ký</Link> </li>
                                    <li><Link to="/login">Đăng nhập</Link></li>
                                </ul>
                            </div>
                        </div>
                        )


                    }

                </div>
            </div>

        </div >

    )
}
