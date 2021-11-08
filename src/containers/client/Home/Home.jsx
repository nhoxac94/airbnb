import React from 'react'
import DiscoverThings from './DiscoverThings/DiscoverThings'
import ExploreNearby from './ExploreNearby/ExploreNearby'
import LiveAnywhere from './LiveAnywhere/LiveAnywhere'

export default function Home() {
    return (
        <div >
            <div className="carousel">
                <img src="https://a0.muscache.com/im/pictures/57b9f708-bb12-498c-bc33-769f8fc43e63.jpg?im_w=2560" alt="" style={{ width: "100%" }} />

            </div>
            <ExploreNearby/>
            <LiveAnywhere/>
            <DiscoverThings/>
        </div>
    )
}
