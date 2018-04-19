import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

class GeoProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentDidMount() {
        const self = this;
        axios.get(`https://nt.engi.io/api/geodata/aggregated`).then(function (res) {
            let data = res.data;
            self.setState({ data });
        });
    }

    render() {
        return React.createElement(this.props.component, { data: this.state.data })
    }
}

export default GeoProvider;