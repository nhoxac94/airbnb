import Footer from 'components/Footer/Footer'
import Header from 'components/Header/Header'
import withLayout from 'HOCs/withLayout'
import React from 'react'

function ClientLayout(props) {
    return (
        <div className="clientLayout">
            <Header />
            {props.children}
            <Footer />
        </div>
    )
}

export default withLayout(ClientLayout) 
