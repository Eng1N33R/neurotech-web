import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { curveCardinal } from 'd3-shape';
import MonitorStatus from 'components/nn/MonitorStatus';

import variables from '!!sass-variable-loader!assets/scss/general.scss';

import moment from 'moment-timezone';
moment.locale('ru-RU');

class MonitorGraphStatus extends React.Component {
    constructor(props) {
        super(props);
    }

    aggregate() {
        let sum = 0;
        this.props.data.forEach(x => {
            sum += x.packets;
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
            known[x.time] = x.packets;
        });
        [...Array(61)].forEach((x, i) => {
            let minute = moment().subtract(60-i, 'minutes').format('HH:mm');
            contdata.push({ time: minute, packets: known[minute] === undefined ? 0 : known[minute] });
        });
        return contdata;
    }

    render() {
        let data = this.data();
        let status = this.getStatus(this.aggregate());
        let color = variables["status" + status[0].toUpperCase() + status.substring(1)];
        return (
            <div className="inner chart">
                <span className="title">Статус сети (1 час)</span>
                <MonitorStatus status={status} />
                {this.props.data.length === 0 ? (<div className="status-nodata"><span>Нет данных</span></div>) :
                    (<ResponsiveContainer width="95%" height={300}>
                        <AreaChart data={data} margin={{ top: 20, bottom: 30, left: 5, right: 5 }}>
                            <XAxis dataKey="time" />
                            <YAxis />
                            <CartesianGrid strokeDasharray="3 3" />
                            <Tooltip />
                            <Area type={curveCardinal.tension(1)} dataKey="packets" stroke={color} fill={color} dot={false} activeDot={{ r: 2 }} />
                        </AreaChart>
                    </ResponsiveContainer>)
                }
            </div>
        );
    }
}

export default MonitorGraphStatus;