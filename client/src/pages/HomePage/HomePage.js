import React from 'react';

import PropTypes from 'prop-types';
import { Container, Header, Segment, Button } from 'semantic-ui-react';

import GlobalContext from '../../context/global.context';

import ProductItem from '../../components/Product/ProductItem/ProductItem';
import ProductForm from '../../components/Product/ProductForm/ProductForm';
import ButtonC from '../../components/Button/ButtonC/ButtonC';

class HomePage extends React.Component {
    state = {};
    static contextType = GlobalContext;
    static propTypes = { noMeaning: PropTypes.string };
    static defaultProps = { noMeaning: '' };
    componentDidMount () {}

    btnFields = [
        { value: 'button1', className: 'btn' },
        { value: 'button2', className: 'btn' },
        { value: 'button3', className: 'btn' },
        { value: 'button4', className: 'btn' },
        { value: 'button5', className: 'btn' },
        { value: 'button6', className: 'btn' },
        { value: 'button7', className: 'btn' }
    ];
    hanldeOnToggleLang = () => {
        this.props.theme.changeTheme({});

        // this.props.global.setLocales(this.props.global.i18.language === 'en' ? 'zh' : 'en');
        // this.props.global.setLocales((preState) => console.log(preState));
    };
    render () {
        console.log(this.props);
        return (
            <Container>
                <button style={{ color: 'red' }} />

                <Segment textAlign='center'>
                    <Header>{this.props.t('Home')}</Header>
                    <Button onClick={this.hanldeOnToggleLang}>click</Button>
                    <Segment>
                        <ButtonC.Group fields={this.btnFields} />
                    </Segment>

                    <Segment basic>
                        <Button> Sign Up</Button>
                        <Button> SignIn</Button>
                        <Button> Sign Out</Button>
                    </Segment>
                </Segment>

                <Segment>
                    <ProductItem.List />
                    <ProductForm />
                </Segment>
            </Container>
        );
    }
}

export default HomePage;
