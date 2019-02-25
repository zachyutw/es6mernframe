import React, { useState, useEffect } from 'react';
import i18next from 'i18next';
import config from '../config';
import layout from '../lib/layout';
import ThemeContext from './theme.context';

const GlobalContext = React.createContext();
export const { Provider, Consumer } = GlobalContext;

export const withConsumer = (Component) => (props) => {
    return (
        <GlobalContext.Consumer>
            {({ query, t = () => {}, mode, routePaths, ...rest }) => {
                return (
                    <ThemeContext.ContextProvider>
                        <ThemeContext.Consumer>
                            {(theme) => {
                                return (
                                    <Component
                                        {...props}
                                        t={t}
                                        query={query}
                                        mode={mode}
                                        global={{ ...rest }}
                                        routePaths={routePaths}
                                        theme={theme}
                                    />
                                );
                            }}
                        </ThemeContext.Consumer>
                    </ThemeContext.ContextProvider>
                );
            }}
        </GlobalContext.Consumer>
    );
};
export const ContextProvider = (props) => {
    const [ t, setT ] = useState();
    const [ i18, setI18 ] = useState({});
    const [ mode, setMode ] = useState(layout.getScreenSize());
    const [ query, setQuery ] = useState({});
    useEffect(() => {
        console.log('effect');

        i18next.init(config.i18next).then((t) => setT(() => t));
        setI18(i18next);
        // console.log(locales.getResource('en', ''));
    }, []);
    const setLocales = (lang) => {
        console.log(lang);
        i18next.changeLanguage(lang).then((t) => setT(() => t));
        // locales.changeLanguage(lang).then((t) => setT(() => t));
    };
    return (
        <GlobalContext.Provider
            value={{ query, i18, t, mode, setMode, setLocales, setQuery, routePaths: config.routePaths }}
        >
            {' '}
            {props.children}
        </GlobalContext.Provider>
    );
};

GlobalContext.withConsumer = withConsumer;
GlobalContext.ContextProvider = React.memo(ContextProvider);

export default GlobalContext;
