import React, { Component } from 'react';

export default class TestPage extends Component {
    componentDidMount () {
        console.log(this.props);
    }
    render () {
        return (
            <div>
                <h1>test page</h1>
            </div>
        );
    }
}
