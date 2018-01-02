import React from 'react';
import Crumb from 'components/Breadcrumb';

import MonitorDataProvider from 'components/nn/MonitorDataProvider';
import StatisticsGraph from 'components/nn/StatisticsGraph';
import StatisticsTable from 'components/nn/StatisticsTable';

import moment from 'moment';
moment.locale('ru-RU');

export default () => (
    <div className="stats">
        <MonitorDataProvider component={StatisticsGraph} settings={{woozy: 200, sick: 400}}
            mode='both' resolution='1 hour' from={moment().subtract(49, 'hours').unix()}
            transform={x => ({ time: moment(x.time).minutes(0).add(3, 'hours').format('dd HH:mm'), healthy: x.healthy, abnormal: x.abnormal })} />

        <MonitorDataProvider component={StatisticsTable} settings={{ woozy: 200, sick: 400 }}
            mode='both' resolution='1 hour' from={moment().subtract(49, 'hours').unix()}
            transform={x => ({ time: moment(x.time).minutes(0).add(3, 'hours').format('LLL'), healthy: x.healthy, abnormal: x.abnormal, ratio: x.abnormal / (x.abnormal+x.healthy) })} />
    </div>
);