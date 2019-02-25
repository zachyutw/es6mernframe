import React from 'react';
import PropTypes from 'prop-types';

import { Grid, Icon, Button, Segment, Container, Menu, Dropdown } from 'semantic-ui-react';

const styles = {
    borderLess: {
        border: 'none',
        boxShadow: 'none'
    },
    navbarGrid: {
        fontSize: '1.2em',
        paddingTop: '0',
        paddingBottom: '0'
    },
    languageBtn: {
        marginLeft: '1em',
        marginRight: '1em'
    }
};

const NavApppbarLogo = ({ t }) => {
    return (
        <Button basic style={styles.borderLess}>
            <Icon name='react' size='big' />
            {t('Home')}
        </Button>
    );
};
const NavApppbarLinks = ({ t }) => {
    return (
        <Menu style={styles.borderLess}>
            <Menu.Item>{t('Demo')}</Menu.Item>
            <Menu.Item>{t('Features')}</Menu.Item>
        </Menu>
    );
};

const NavApppbarAuth = ({ t }) => {
    return (
        <Button.Group>
            <Button basic>{t('Sign In')}</Button>
            <Button basic>{t('Sign Up')}</Button>
        </Button.Group>
    );
};

const NavApppbarLang = ({ onChange, t }) => {
    const handleOnClickEnglish = () => {
        onChange('en');
    };
    const handleOnClickZH = () => {
        onChange('zh');
    };
    return (
        <Dropdown text={t('language')} pointing style={styles.languageBtn}>
            <Dropdown.Menu>
                <Dropdown.Item onClick={handleOnClickEnglish}>English</Dropdown.Item>
                <Dropdown.Item onClick={handleOnClickZH}>中文</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};
const NavAppbar = (props) => {
    const hanldeOnToggleLang = (language) => {
        props.global.setLocales(language);
        // this.props.global.setLocales((preState) => console.log(preState));
    };

    return (
        <Segment style={props.style}>
            <Container>
                <Grid style={styles.navbarGrid} verticalAlign='middle'>
                    <Grid.Column width='3' verticalAlign='middle'>
                        <NavApppbarLogo t={props.t} />
                    </Grid.Column>
                    <Grid.Column width='7'>
                        <NavApppbarLinks t={props.t} />
                    </Grid.Column>
                    <Grid.Column width='6'>
                        <NavApppbarAuth t={props.t} />
                        <Button basic>
                            <Icon name='cart' />
                            1
                        </Button>
                        <NavApppbarLang onChange={hanldeOnToggleLang} t={props.t} />
                    </Grid.Column>
                </Grid>
            </Container>
        </Segment>
    );
};
NavAppbar.defaultProps = {
    classes: {}
};
NavAppbar.propTypes = {
    classes: PropTypes.object.isRequired
};

export default NavAppbar;
