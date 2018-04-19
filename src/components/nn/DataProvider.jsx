import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import moment from 'moment-timezone';
moment.locale('ru-RU');

class DataProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentDidMount() {
        let self = this;
        axios.get(`https://nt.engi.io/api/stats/${self.props.mode}`, { params: { from: self.props.from, to: self.props.to, resolution: self.props.resolution } }).then(function(res) {
            let data = res.data.map((x) => ({ time: moment(x.time).tz('Europe/Moscow').format(), ...x }));
            if (self.props.transform) data = data.map(self.props.transform);
            self.setState({ data });
        });
    }

    render() {
        return React.createElement(this.props.component, { ...this.props, data: this.state.data })
    }
}

DataProvider.defaultProps = {
    mode: 'abnormal',
};

DataProvider.propTypes = {
    mode: PropTypes.string.isRequired,
    from: PropTypes.number,
    to: PropTypes.number,
    resolution: PropTypes.string,
    transform: PropTypes.func,
}

export default DataProvider;