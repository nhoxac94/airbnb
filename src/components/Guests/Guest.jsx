import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BiMinus, BiPlus } from 'react-icons/bi'


const Guest = () => {
    const dispatch = useDispatch()
    const numberGuest = useSelector(state => state.guestReducer)
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

        dispatch({ type: "SET_NUMBER_GUESTS", payload: {...newNumberGuest} })

    }
    return (
        <div>
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
    );
}

export default Guest