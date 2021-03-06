import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Navigation from 'components/Navigation';
import Home from 'components/Home';
import MonitorContainer from 'components/nn/MonitorContainer';
import StatisticsContainer from 'components/nn/StatisticsContainer';
import GeoContainer from 'components/geo/GeoContainer';
import Settings from 'components/nn/Settings';

class App extends React.Component {
    render() {
        return (
            <div id="app">
                <Navigation location={this.props.location} />
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route path='/monitor' component={MonitorContainer} />
                    <Route path='/statistics' component={StatisticsContainer} />
                    <Route path='/geodata' component={GeoContainer} />
                </Switch>
            </div>
        )
    }
}

export default App;