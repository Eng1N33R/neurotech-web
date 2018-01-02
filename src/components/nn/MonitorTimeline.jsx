import React from 'react';

import variables from '!!sass-variable-loader!assets/scss/general.scss';

export default props => (
    <div className="inner status-timeline">
        <span className="title">Временная линия</span>
        <span className="health-status healthy">Безопасно</span>
        <svg preserveAspectRatio="none" height="34" viewBox="0 0 448 34">
            {[...Array(7)].map((x, i) => {
                let point = props.data[i];
                if (point === undefined || point.healthy === 0) return (<rect key={i} height="34" width="60" x={i * 64} y="0" fill={variables.statusNodata} />);
                let color = variables.statusHealthy;
                if (point.ratio >= props.settings.woozy && point.ratio < props.settings.sick) color = variables.statusWoozy;
                if (point.ratio > props.settings.sick) color = variables.statusSick;
                return (<rect key={i} height="34" width="60" x={i * 64} y="0" fill={color} />);
            })}
        </svg>
        <span className="overall">Общий статус сети за 7 дней</span>
    </div>
)