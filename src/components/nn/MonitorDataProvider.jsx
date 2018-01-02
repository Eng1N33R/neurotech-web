import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

class MonitorDataProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentDidMount() {
        let self = this;
        axios.get(`http://192.168.1.100:3000/api/stats/${self.props.mode}`, { params: { from: self.props.from, to: self.props.to, resolution: self.props.resolution } }).then(function(res) {
            let data = res.data;
            if (self.props.transform) data = data.map(self.props.transform);
            self.setState({ data });
        });
    }

    render() {
        return React.createElement(this.props.component, { ...this.props, data: this.state.data })
    }
}

MonitorDataProvider.defaultProps = {
    mode: 'abnormal',
};

MonitorDataProvider.propTypes = {
    mode: PropTypes.string.isRequired,
    from: PropTypes.number,
    to: PropTypes.number,
    resolution: PropTypes.string,
    transform: PropTypes.func,
}

export default MonitorDataProvider;