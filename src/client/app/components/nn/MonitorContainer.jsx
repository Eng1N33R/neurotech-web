import React from 'react';

import DataProvider from 'components/nn/DataProvider';
import MonitorGraph from 'components/nn/MonitorGraph';
import MonitorTimeline from 'components/nn/MonitorTimeline';

import moment from 'moment';
moment.locale('ru-RU');

class MonitorContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let aggregate = 0;
        return (
            <div className="status">
                <DataProvider component={ MonitorGraph } group='minute' epoch={ moment().subtract(1, 'hours').unix() }
                    transform={ x => ({time: moment(x.time).format('HH:mm'), packets: x.packets}) } />
                <DataProvider component={ MonitorTimeline } group='day' epoch={ moment().subtract(90, 'days').unix() } />
            </div>
        );
    }
}

export default MonitorContainer;