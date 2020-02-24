import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ Component: Component, ...restOfProps }) => {
    return (
        <Route
            {...restOfProps}
            render={() => {
                if (localStorage.getItem('token')) {
                    return <Component />;
                } else {
                    return <Redirect to='/' />
                }
            }}
        />
    )
}

export default PrivateRoute;