import React from 'react';
import { Route } from 'react-router-dom';
import RouteAuthenticated from './RouteAuthenticated';
const RouteC = ({ component: Component, props: cProps, ...rest }) => (
    <Route {...rest} render={(props) => <Component {...props} {...cProps} />} />
);

RouteC.Authed = RouteAuthenticated;

export default RouteC;
