import React from 'react';

import variables from '!!sass-variable-loader!assets/scss/general.scss';
import MonitorStatus from './MonitorStatus';

class MonitorTimeline extends React.Component {
    status = [];
    totalWoozy = 0;
    totalSick = 0;
    overall = 'nodata';

    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props.data);
        this.props.data.forEach((point, i) => {
            this.status[i] = 'healthy'
            if (point === undefined || (point.healthy + point.abnormal) === 0) this.status[i] = 'nodata';
            console.log(i + "," + point.ratio);
            if ((point.healthy + point.abnormal) > 0 && this.overall === 'nodata') this.overall = 'healthy';
            if (point.ratio >= this.props.settings.woozy && point.ratio < this.props.settings.sick) {
                this.status[i] = 'woozy';
                this.totalWoozy++;
            }
            if (point.ratio > this.props.settings.sick) {
                this.status[i] = 'sick';
                this.totalSick++;
            }
        });

        if (this.totalWoozy > 1 || this.totalSick > 1) this.overall = 'woozy';
        if (this.totalWoozy > 3 || this.totalSick > 2) this.overall = 'sick';
        
        return (
            <div className="inner status-timeline">
                <span className="title">Временная линия</span>
                <MonitorStatus status={this.overall} />
                <svg preserveAspectRatio="none" height="34" viewBox="0 0 448 34">
                    {[...Array(7)].map((x, i) => {
                        let color = variables.statusNodata;
                        if (this.status[i] === 'healthy') color = variables.statusHealthy;
                        if (this.status[i] === 'woozy') color = variables.statusWoozy;
                        if (this.status[i] === 'sick') color = variables.statusSick;
                        return (<rect key={i} height="34" width="60" x={i * 64} y="0" fill={color} />);
                    })}
                </svg>
                <span className="overall">Общий статус сети за 7 дней</span>
            </div>
        );
    }
}

export default MonitorTimeline;