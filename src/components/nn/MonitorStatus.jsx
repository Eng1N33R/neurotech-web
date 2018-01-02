import React from 'react';

class MonitorStatus extends React.Component {
    render() {
        switch (this.props.status) {
            case "sick":
                return (<span className="health-status sick">Высокая вероятность атаки</span>);
            case "woozy":
                return (<span className="health-status woozy">Замечена подозрительная активность</span>);
            case "healthy":
                return (<span className="health-status healthy">Проблем не обнаружено</span>);
            default:
                return (<span className="health-status nodata">Нет данных</span>);
        }
    }
}

export default MonitorStatus;