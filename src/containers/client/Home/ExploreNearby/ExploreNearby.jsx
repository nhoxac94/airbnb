import locationApi from 'apis/locationApi'
import Loader from 'components/Loader/Loader'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './ExploreNearby.scss'

export default function ExploreNearby() {

    const [exploreLocation, setExploreLocation] = useState()
    useEffect(() => {
        locationApi.fetchSearchLocationApi("", 8)
            .then(res => setExploreLocation(res.data))
            .catch(err => console.log(err))
    }, [])

    if (!exploreLocation) return <Loader />
    return (
        <div className="exploreNearby" style={{ maxWidth: 1600, margin: "auto" }}>
            <h3>Khám phá những điểm đến gần đây</h3>
            <div className="exploreNearby__content">
                {
                    exploreLocation.map(location => {
                        return (
                            <Link key={location._id} to = {`/location/${location._id}` }>
                                <div  className="cardPlace" >
                                    <div className="cardPlace__img">
                                        <img src={location.image} alt="" />
                                    </div>
                                    <div className="cardPlace__content">
                                        <h5>{location.name}</h5>
                                        <p>Địa điểm nổi bật</p>
                                    </div>
                                </div>
                            </Link>
                        )
                    })
                }
            </div>
        </div>

    )
}
