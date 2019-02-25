import React from 'react';
import { Switch } from 'react-router-dom';
import Layout from '../components/Basic/Layout/Layout';
import asyncComponent from './AsyncComponent';
import GlobalContext from '../context/global.context';
import RouteC from './RouteC';

const AsyncApp = asyncComponent(() => import('../App'));
const HomePage = asyncComponent(() => import('../pages/HomePage/HomePage'));
const AuthSignUpPage = asyncComponent(() => import('../pages/AuthSignUpPage/AuthSignUpPage'));
const AuthProfilePage = asyncComponent(() => import('../pages/AuthProfilePage/AuthProfilePage'));
const TestPage = asyncComponent(() => import('../pages/TestPage/TestPage'));
const RootSwich = (props) => {
    const { routePaths } = props;
    return (
        <Switch>
            <Layout {...props}>
                <RouteC exact path={routePaths.index.path} component={AsyncApp} props={props} />
                <RouteC exact path={`${routePaths.home.path}/:main?`} component={HomePage} props={props} />
                <RouteC exact path={`/test/:main?`} component={TestPage} props={props} />
                <RouteC exact path={routePaths.auth.path + '/:main?'} component={AuthSignUpPage} props={props} />
                <RouteC.Authed
                    exact
                    path={routePaths.user.path + '/:main?'}
                    component={AuthProfilePage}
                    props={props}
                />
            </Layout>
        </Switch>
    );
};

let WithGlobal = GlobalContext.withConsumer(RootSwich);

class Routes extends React.Component {
    render () {
        return (
            <GlobalContext.ContextProvider>
                <WithGlobal {...this.props} />
            </GlobalContext.ContextProvider>
        );
    }
}
export default Routes;
