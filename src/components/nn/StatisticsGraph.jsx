import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, DefaultTooltipContent } from 'recharts';
import MonitorStatus from 'components/nn/MonitorStatus';

import variables from '!!sass-variable-loader!assets/scss/general.scss';

import moment from 'moment-timezone';
moment.locale('ru-RU');

class TimeTick extends React.Component {
    render() {
        const { x, y, payload } = this.props;
        return (
            <g>
                <text x={x} y={y} fill="#5d6571" textAnchor="middle" dy={16}>{moment(payload.value).format('HH:mm')}</text>
            </g>
        )
    }
}


class StatisticsGraph extends React.Component {
    constructor(props) {
        super(props);
    }

    aggregate() {
        let sum = 0;
        this.props.data.forEach(x => {
            sum += x.abnormal;
        });
        return sum;
    }

    getStatus(total) {
        if (total === 0) return "nodata";
        if (total >= this.props.settings.woozy && total < this.props.settings.sick) return "woozy";
        if (total >= this.props.settings.sick) return "sick";
        return "healthy";
    }

    data() {
        let contdata = [];
        let known = {};
        this.props.data.forEach(x => {
            known[x.time] = x;
        });
        [...Array(49)].forEach((x, i) => {
            let time = moment().minutes(0).subtract(49 - i, 'hours');
            let hour = time.format('dd HH:mm');
            contdata.push({
                time: time.toISOString(),
                healthy: known[hour] === undefined ? 0.001 : Math.max(0.001, known[hour].healthy),
                abnormal: known[hour] === undefined ? 0.001 : Math.max(0.001, known[hour].abnormal),
            });
        });
        return contdata;
    }

    render() {
        let data = this.data();
        let status = this.getStatus(this.aggregate());
        let clrHealthy = variables.statusHealthy;
        let clrSick = variables.statusSick;
        return (
            <div className="inner chart">
                <span className="title">Данные о трафике (48 часов)</span>
                <MonitorStatus status={status} />
                {this.props.data.length === 0 ? (<div className="status-nodata"><span>Нет данных</span></div>) :
                    (<ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={data} margin={{ top: 20, bottom: 30, left: 5, right: 5 }}>
                            <XAxis dataKey="time" tick={<TimeTick />} />
                            <YAxis scale="log" domain={[1, 'dataMax']} allowDataOverflow />
                            <CartesianGrid strokeDasharray="3 3" />
                            <Tooltip labelFormatter={label => moment(label).format('LLLL')} formatter={x => Math.floor(x)} />
                            <Area type="monotone" dataKey="healthy" stroke={clrHealthy} fill={clrHealthy} dot={false} activeDot={{ r: 2 }} />
                            <Area type="monotone" dataKey="abnormal" stroke={clrSick} fill={clrSick} dot={false} activeDot={{ r: 2 }} />
                        </AreaChart>
                    </ResponsiveContainer>)
                }
            </div>
        );
    }
}

export default StatisticsGraph;