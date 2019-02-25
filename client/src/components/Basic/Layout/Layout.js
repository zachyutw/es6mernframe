import React from 'react';
import PropTypes from 'prop-types';

import searchParse from '../../../lib/searchParse';
import NavAppbar from '../../Nav/NavAppbar/NavAppbar';
import { Segment } from 'semantic-ui-react';
class Layout extends React.Component {
    state = {};
    static propTypes = { noMeaning: PropTypes.string };
    static defaultProps = { noMeaning: '' };
    componentDidMount () {
        const search = searchParse.parse(this.props.location.search);
        this.props.global.setQuery(search);

        // this.props.setParams(search);
    }

    render () {
        return (
            <Segment>
                <NavAppbar {...this.props} />
                {this.props.children}
            </Segment>
        );
    }
}

export default Layout;
