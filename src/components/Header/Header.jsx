import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import './Header.scss'
import { FiGlobe, FiSearch } from 'react-icons/fi'
import { VscListFlat } from 'react-icons/vsc'
import { FaAirbnb, FaUserCircle } from 'react-icons/fa'
import { BiMinus, BiPlus } from 'react-icons/bi'
import { MdLocationOn } from 'react-icons/md'
import locationApi from 'apis/locationApi'
import { DayPickerRangeController } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment'



export default function Header() {
    const [activeNavForm, setActiveNavForm] = useState("")
    const [informationBooking, setInformationBooking] = useState({
        location: "",
        checkIn: "",
        checkOut: "",
        guest: "",
    })
    const [searchLocation, setSearchLocation] = useState('')
    const [resultSearchLocation, setResultSearchLocation] = useState([])
    const [location, setLocation] = useState("")
    const handleChooseLocation = (location) => {
        setLocation(location.name)
        setActiveNavForm("checkIn")
        setInformationBooking({...informationBooking, location : location})
    }

    const formRef = useRef(null)

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

    // handle daterange picker
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [focusedInput, setFocusedInput] = useState('startDate')
    const handleOnDatesChange = (startDate, endDate) => {
        setStartDate(startDate)
        setEndDate(endDate)

    }
    const handleFocusChange = focusedInput => {
        setFocusedInput(focusedInput || 'endDate')
    }

    const isBeforeDay = (a, b) => {
        if (!moment.isMoment(a) || !moment.isMoment(b)) return false;
        const aYear = a.year();
        const aMonth = a.month();
        const bYear = b.year();
        const bMonth = b.month();
        const isSameYear = aYear === bYear;
        const isSameMonth = aMonth === bMonth;
        if (isSameYear && isSameMonth) return a.date() < b.date();
        if (isSameYear) return aMonth < bMonth;
        return aYear < bYear;
    }
    const isInclusivelyAfterDay = (a, b) => {
        if (!moment.isMoment(a) || !moment.isMoment(b)) return false;
        return !isBeforeDay(a, b);
    }

    const handleSearch = (e) => {
        setSearchLocation(e.target.value);
        setLocation(e.target.value)
    }

    const handleNavForm = activeNav => {
        setActiveNavForm(activeNav)
    }


    // handle pick number guest

    const [numberGuest, setNumberGuest] = useState({
        adults: 0,
        children: 0,
        infants: 0
    })

    const handleNumberGuest = (type, people) => {
        const newNumberGuest = { ...numberGuest }
        if (type === 'plus') {
            if (people !== "adults" && newNumberGuest.adults === 0) {
                newNumberGuest[people] += 1
                newNumberGuest.adults += 1
            } else {
                newNumberGuest[people] += 1
            }
        } else if (type === "minus") {
            if (newNumberGuest[people] > 0) {
                newNumberGuest[people] -= 1
            }
        }
        setNumberGuest(newNumberGuest)

    }

    const handleSubmitForm = () => {
       setActiveNavForm("")
       console.log(123);
    }

    console.log("activeNavForm",activeNavForm)
    return (
        <div className="header">
            <div className="navbar" style={{ minWidth: 1600 }}>
                <div className="navbar__brand">
                    <FaAirbnb />
                    <span>airbnb</span>
                </div>
                <div className="navbar__content">
                    {/* <div className="navbar__navigate">
                        <ul>
                            <li>Nơi ở</li>
                            <li>Trải nghiệm</li>
                            <li>Trải nghiệm trực tuyến</li>
                        </ul>
                    </div> */}
                    <div className="navbar__input">
                        <form ref={formRef} >
                            <div className="navbar__input-content">
                                <div className={`navbar__input-item ${activeNavForm === "location" && "active"} `} onClick={() => handleNavForm("location")} >
                                    <label htmlFor="locationNav">Địa điểm</label>
                                    <input type="text" id="locationNav" placeholder="Bạn sắp đi đâu?" value={location} onChange={handleSearch} />
                                </div>
                                <div className={`navbar__input-item ${activeNavForm === "checkIn" && "active"} `} onClick={() => handleNavForm("checkIn")} >
                                    <h5>Nhận phòng</h5>
                                    {!startDate ? <p>Thêm ngày</p> : <p>{startDate.format("DD/MM/YYYY")}</p>}


                                </div>
                                <div className={`navbar__input-item ${activeNavForm === "checkOut" && "active"} `} onClick={() => handleNavForm("checkOut")} >
                                    <h5>Trả phòng</h5>
                                    {!endDate ? <p>Thêm ngày</p> : <p>{endDate.format("DD/MM/YYYY")}</p>}
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
                                    <div className="searchIcon" onClick={handleSubmitForm}> 
                                    <Link to = {`/location/${informationBooking.location._id}`}><FiSearch /></Link></div>
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
                                        <DayPickerRangeController
                                            startDate={startDate} // momentPropTypes.momentObj or null,
                                            endDate={endDate} // momentPropTypes.momentObj or null,
                                            onDatesChange={({ startDate, endDate }) => handleOnDatesChange(startDate, endDate)} // PropTypes.func.isRequired,
                                            focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                                            onFocusChange={focusedInput => handleFocusChange(focusedInput)} // PropTypes.func.isRequired,
                                            initialVisibleMonth={() => moment().add(0, "M")} // PropTypes.func or null,
                                            numberOfMonths={2}
                                            isOutsideRange={day => !isInclusivelyAfterDay(day, moment())}
                                            hideKeyboardShortcutsPanel={true}
                                        />
                                    </div>
                                </div>
                                <div className={`showAddPeople ${activeNavForm === "guest" && "active"}`}>
                                    <div className="showAddPeople__item">
                                        <div className="showAddPeople__item--content">
                                            <h5>Người lớn</h5>
                                            <p>Từ 13 tuổi trở lên</p>
                                        </div>
                                        <div className="showAddPeople__item--count">
                                            <BiMinus className={`showAddPeople--icon ${!numberGuest.adults && "disable"}`} onClick={() => handleNumberGuest("minus", "adults")} />
                                            <span className="showAddPeople--number"> {numberGuest.adults} </span>
                                            <BiPlus className="showAddPeople--icon" onClick={() => handleNumberGuest("plus", "adults")} />
                                        </div>
                                    </div>
                                    <div className="showAddPeople__item">
                                        <div className="showAddPeople__item--content">
                                            <h5>Trẻ em</h5>
                                            <p>Độ tuổi 2 - 12</p>
                                        </div>
                                        <div className="showAddPeople__item--count">
                                            <BiMinus className={`showAddPeople--icon ${!numberGuest.children && "disable"}`} onClick={() => handleNumberGuest("minus", "children")} />
                                            <span className="showAddPeople--number"> {numberGuest.children} </span>
                                            <BiPlus className="showAddPeople--icon" onClick={() => handleNumberGuest("plus", "children")} />
                                        </div>
                                    </div>
                                    <div className="showAddPeople__item">
                                        <div className="showAddPeople__item--content">
                                            <h5>Em bé</h5>
                                            <p>Dưới 2 tuổi</p>
                                        </div>
                                        <div className="showAddPeople__item--count">
                                            <BiMinus className={`showAddPeople--icon ${!numberGuest.infants && "disable"}`} onClick={() => handleNumberGuest("minus", "infants")} />
                                            <span className="showAddPeople--number"> {numberGuest.infants} </span>
                                            <BiPlus className="showAddPeople--icon" onClick={() => handleNumberGuest("plus", "infants")} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="navbar__setting">
                    <span>Trở thành chủ nhà</span>
                    <FiGlobe className="navbar__setting--languages" />
                    <div className="navbar__setting--user">
                        <VscListFlat className="navbar--settingBar" />
                        <FaUserCircle className="navbar--userIcon" />
                    </div>
                </div>
            </div>

        </div>

    )
}
