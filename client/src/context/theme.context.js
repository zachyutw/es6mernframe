import React, { useState } from 'react';
import chroma from 'chroma-js';
// import _ from 'lodash';
const themes = { dark: '#999', light: '#CCC' };

const ThemeContext = React.createContext({ name: 'dark', color: themes['dark'], setValue: () => {} });
export const { Provider, Consumer } = ThemeContext;
export const withTheme = (Component) => (props) => {
    return (
        <Consumer>
            {(value) => {
                console.log(value);
                return <Component {...props} theme={value} />;
            }}
        </Consumer>
    );
};

export const ContextProvider = (props) => {
    const [ darkColor, setDarkColor ] = useState(
        window.getComputedStyle(document.documentElement).getPropertyValue('--dark')
    );
    const [ lightColor, setlightColor ] = useState(
        window.getComputedStyle(document.documentElement).getPropertyValue('--light')
    );
    const [ themeColors, setThemeColors ] = useState(
        chroma.scale([ lightColor.replace(/[#\s]/g, ''), darkColor.replace(/[#\s]/g, '') ]).colors(5)
    );
    const changeTheme = ({ darkColor = '#999999', lightColor = '#FAFAFA' }) => {
        const colors = chroma.scale([ lightColor.replace(/[#\s]/g, ''), darkColor.replace(/[#\s]/g, '') ]).colors(5);
        document.documentElement.style.setProperty('--dark', darkColor);
        document.documentElement.style.setProperty('--light', lightColor);
        colors.map((color, index) => {
            return document.documentElement.style.setProperty('--color-' + index, color);
        });
        setThemeColors(colors);
        setDarkColor(darkColor);
        setlightColor(lightColor);
    };

    return (
        <ThemeContext.Provider value={{ themeColors, changeTheme, theme: darkColor, lightColor }}>
            {' '}
            {props.children}
        </ThemeContext.Provider>
    );
};
export const withConsumer = (Component) => (props) => {
    return <ThemeContext.Consumer>{(value) => <Component {...props} theme={value} />}</ThemeContext.Consumer>;
};

ThemeContext.ContextProvider = React.memo(ContextProvider);
ThemeContext.withConsumer = withConsumer;
export default ThemeContext;
