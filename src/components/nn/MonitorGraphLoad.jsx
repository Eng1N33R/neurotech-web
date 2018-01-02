import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { curveCardinal } from 'd3-shape';

import variables from '!!sass-variable-loader!assets/scss/general.scss';

import moment from 'moment';
moment.locale('ru-RU');

class MonitorGraphLoad extends React.Component {
    constructor(props) {
        super(props);
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
        let color = variables.statusHealthy;
        return (
            <div className="inner chart">
                <span className="title">Нагрузка сети (1 час)</span>
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

export default MonitorGraphLoad;