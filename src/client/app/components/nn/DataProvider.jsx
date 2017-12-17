import React from 'react';
import axios from 'axios';

class DataProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentDidMount() {
        let self = this;
        axios.get('http://localhost:3000/api/data', { params: { group: self.props.group, epoch: self.props.epoch } }).then(function(res) {
            let data = res.data;
            if (self.props.transform) data.map(self.props.transform);
            if (self.props.foreach) data.forEach(self.props.foreach);
            self.setState({ data });
        });
    }

    render() {
        return React.createElement(this.props.component, { ...this.props, data: this.state.data })
    }
}

export default DataProvider;