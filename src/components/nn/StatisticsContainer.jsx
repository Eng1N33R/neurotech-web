import React from 'react';
import { connect } from 'react-redux';

import DataProvider from 'components/nn/DataProvider';
import StatisticsGraph from 'components/nn/StatisticsGraph';
import StatisticsTable from 'components/nn/StatisticsTable';

import moment from 'moment-timezone';
moment.locale('ru-RU');

const mapStateToProps = state => {
    return {
        settings: {
            graph: state.settings.statistics.graph,
            table: state.settings.statistics.table,
        }
    }
}

class StatisticsContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="stats">
                <DataProvider component={StatisticsGraph} settings={this.props.settings.graph}
                    mode='both' resolution='1 hour' from={moment().subtract(49, 'hours').unix()}
                    transform={x => ({ time: moment(x.time).minutes(0).format('dd HH:mm'), healthy: x.healthy, abnormal: x.abnormal })} />

                <DataProvider component={StatisticsTable} settings={this.props.settings.table}
                    mode='both' resolution='1 hour' from={moment().subtract(49, 'hours').unix()}
                    transform={x => ({ time: moment(x.time).minutes(0).format('LLL'), healthy: x.healthy, abnormal: x.abnormal, ratio: x.abnormal / (x.abnormal+x.healthy) })} />
            </div>
        );
    }
}

export default connect(mapStateToProps)(StatisticsContainer);