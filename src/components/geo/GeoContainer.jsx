import React from 'react';

import GeoProvider from 'components/geo/GeoProvider';
import HeatMap from 'components/geo/HeatMap';

class GeoContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="geodata">
                <GeoProvider component={HeatMap} />
            </div>
        );
    }
}

export default GeoContainer;