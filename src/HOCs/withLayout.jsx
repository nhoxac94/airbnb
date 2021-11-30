import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

const withLayout = WrappedComponent => {
    return ({ component: Component, isPrivate, ...restProps }) => {
        const typeUser = useSelector(state => state.airbnbUserReducer.airbnbUser?.user?.type)
        console.log(typeUser)
        const handleRender = () => {
            return (
                <Route
                    {...restProps}
                    render={routeProps => (
                        <WrappedComponent>
                            <Component {...routeProps} />
                        </WrappedComponent>
                    )}
                />
            )
        }
        if (isPrivate) {
            if (typeUser === 'ADMIN') {
                return (handleRender())
            }
            return <Redirect to="/" />
        } else {
            return (handleRender())
        }
    }
}

export default withLayout;