import React from 'react';

import variables from '!!sass-variable-loader!assets/scss/general.scss';

export default props => (
    <div className="status-inner status-timeline">
        <span className="title">Временная линия</span>
        <span className="health-status healthy">Безопасно</span>
        <svg preserveAspectRatio="none" height="34" viewBox="0 0 448 34">
            {[...Array(90)].map((x, i) => {
                let day = 90-(i+1);
                let point = props.data[day];
                if (point === undefined) return (<rect key={i} height="34" width="3" x={i * 5} y="0" fill={variables.statusNodata} />);
                let color = variables.statusHealthy;
                if (point.packets >= props.woozy && point.packets < props.sick) color = variables.statusWoozy;
                if (point.packets > props.sick) color = variables.statusSick;
                return (<rect key={i} height="34" width="3" x={i * 5} y="0" fill={color} />);
            })}
        </svg>
        <span className="overall">99.3% безопасной работы за 90 дней</span>
    </div>
)