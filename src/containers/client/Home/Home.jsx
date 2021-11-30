import React, {useEffect} from 'react'
import DiscoverThings from './DiscoverThings/DiscoverThings'
import ExploreNearby from './ExploreNearby/ExploreNearby'
import LiveAnywhere from './LiveAnywhere/LiveAnywhere'
import { useDispatch } from 'react-redux'

export default function Home() {
    const dispatch = useDispatch()
    useEffect(() => {
        const onScroll = e => {
            dispatch ({type : "BG_HEADER", payload : (e.target.documentElement.scrollTop > 0 )});
            // setScrolling(e.target.documentElement.scrollTop > scrollTop);
        };
        window.addEventListener("scroll", onScroll);

        return () => window.removeEventListener("scroll", onScroll);
    }, [])
    

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
