import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

class MonitorGraphStatus extends React.Component {
    render() {
        let settings = { woozy: 4, sick: 7 };
        if (this.props.total === 0) return (<span className="health-status nodata">Нет данных</span>);
        if (this.props.total >= settings.woozy && this.props.total < settings.sick) return (<span className="health-status woozy">Подозрительно</span>);
        if (this.props.total >= settings.sick) return (<span className="health-status sick">Опасно</span>);
        return (<span className="health-status healthy">Безопасно</span>);
    }
}

class MonitorGraph extends React.Component {
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

    render() {
        let total = this.aggregate();
        return (
            <div className="status-inner status-chart">
                <span className="title">Статус сети (1 час)</span>
                <MonitorGraphStatus total={ total } />
                {this.props.data.length === 0 ? (<div className="status-nodata"><span>Нет данных</span></div>) :
                    (<ResponsiveContainer width="95%" height={300}>
                        <LineChart data={this.props.data} margin={{ top: 20, bottom: 30, left: 5, right: 5 }}>
                            <XAxis dataKey="time" />
                            <YAxis />
                            <CartesianGrid strokeDasharray="3 3" />
                            <Tooltip />
                            <Line type="monotone" dataKey="packets" stroke="#43b581" dot={false} activeDot={{ r: 2 }} />
                        </LineChart>
                    </ResponsiveContainer>)
                }
            </div>
        );
    }
}

export default MonitorGraph;