import React from 'react';
import { connect } from 'react-redux';

import DataProvider from 'components/nn/DataProvider';
import MonitorGraphStatus from 'components/nn/MonitorGraphStatus';
import MonitorGraphLoad from 'components/nn/MonitorGraphLoad';
import MonitorTimeline from 'components/nn/MonitorTimeline';

import moment from 'moment';
moment.locale('ru-RU');

const mapStateToProps = state => {
    return {
        settings: {
            graph: state.settings.monitor.graph,
            timeline: state.settings.monitor.timeline,
        }
    }
}

class MonitorContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="status">
                <DataProvider component={MonitorGraphStatus} settings={this.props.settings.graph}
                    mode='abnormal' resolution='1 minute' from={moment().subtract(1, 'hours').unix()}
                    transform={x => ({ time: moment(x.time).add(2, 'hours').format('HH:mm'), packets: x.packets })} />

                <DataProvider component={MonitorGraphLoad}
                    mode='all' resolution='1 minute' from={moment().subtract(1, 'hours').unix()}
                    transform={x => ({ time: moment(x.time).add(2, 'hours').format('HH:mm'), packets: x.packets })} />

                <DataProvider component={MonitorTimeline} settings={this.props.settings.timeline}
                    mode='both' resolution='1 day' from={moment().subtract(7, 'days').unix()}
                    transform={x => ({ time: moment(x.time).minutes(0).add(2, 'hours').format('LLL'), healthy: x.healthy, abnormal: x.abnormal, ratio: x.abnormal / (x.abnormal + x.healthy) })} />
            </div>
        );
    }
}

export default connect(mapStateToProps)(MonitorContainer);