import React from 'react';

import PropTypes from 'prop-types';
import { Container, Header, Segment, Button } from 'semantic-ui-react';

import GlobalContext from '../../context/global.context';

import ProductItem from '../../components/Product/ProductItem/ProductItem';
import ProductForm from '../../components/Product/ProductForm/ProductForm';
import ButtonC from '../../components/Button/ButtonC/ButtonC';
import InputAll from '../../components/Input/InputAll/InputAll';

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
    hanldeOnChange = (event, data) => {
        console.log(data);
    };
    render () {
        return (
            <Container>
                <button style={{ color: 'red' }} />

                <Segment textAlign='center'>
                    <Header>{this.props.t('Home')}</Header>
                    <Button onClick={this.hanldeOnToggleLang}>click</Button>
                    <Segment>
                        <ButtonC.Group fields={this.btnFields} />
                    </Segment>
                    <Segment>
                        {/* <InputAll.Normal onChange={this.hanldeOnChange} placeholder='Home' t={this.props.t} /> */}
                        <InputAll.Selection
                            name='test'
                            placeholder='Home'
                            options={[
                                { text: 'Default', value: null },
                                { text: 'Home', value: 1 },
                                { text: 'Website', value: 2 },
                                { text: 'User', value: 3 },
                                { text: 'Home', value: 4 }
                            ]}
                            onChange={this.hanldeOnChange}
                            defaultValue={2}
                            t={this.props.t}
                        />
                    </Segment>
                </Segment>
            </Container>
        );
    }
}

export default HomePage;
