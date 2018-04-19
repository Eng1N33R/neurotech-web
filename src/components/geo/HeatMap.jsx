import React from 'react';
import ReactDOM from 'react-dom';
import { Map, HeatMap, GoogleApiWrapper } from 'google-maps-react';

class HeatMapImpl extends React.Component {
    mapRef = React.createRef();
    mapStyle = [
        {
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#f5f5f5"
                }
            ]
        },
        {
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#616161"
                }
            ]
        },
        {
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "color": "#f5f5f5"
                }
            ]
        },
        {
            "featureType": "administrative.land_parcel",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#bdbdbd"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#eeeeee"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "labels.text",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#757575"
                }
            ]
        },
        {
            "featureType": "poi.business",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#e5e5e5"
                }
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#9e9e9e"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#ffffff"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#757575"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#dadada"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#616161"
                }
            ]
        },
        {
            "featureType": "road.local",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#9e9e9e"
                }
            ]
        },
        {
            "featureType": "transit",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "transit.line",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#e5e5e5"
                }
            ]
        },
        {
            "featureType": "transit.station",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#eeeeee"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#c9c9c9"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#9e9e9e"
                }
            ]
        }
    ];

    constructor(props) {
        super(props);
        this.state = {
            rawData: [],
            data: []
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props && this.props.google && prevState.rawData !== this.props.data) {
            const { google } = this.props;

            const heatmapPoints = [];
            this.props.data.map((group) => {
                heatmapPoints.push({
                    //location: {lat: group.latitude, lng: group.longitude},
                    location: new google.maps.LatLng(group.latitude, group.longitude),
                    /*lat: group.latitude,
                    lng: group.longitude,*/
                    weight: parseInt(group.count)
                })
            });
            this.heatMap = new google.maps.visualization.HeatmapLayer({
                map: this.mapRef.current.map,
                data: heatmapPoints,
                radius: 20,
                opacity: 0.5
            });
            this.setState({data: heatmapPoints, rawData: this.props.data});
        }
    }

    render() {
        return (
            <Map google={this.props.google}
                containerStyle={{ position: 'relative', maxWidth: '60vw', maxHeight: '60vh', margin: 'auto', width: '100%', height: '100%' }}
                style={{ width: '100%', height: '100%', position: 'relative' }}
                center={{lat: 20, lng: 0}}
                className={'map'}
                zoom={2}
                mapTypeId={'terrain'}
                styles={this.mapStyle}
                ref={this.mapRef} />
        )
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyD9ullukQ7IuDNQjEmF-2D0DdyJnVI5864',
    libraries: ['visualization']
})(HeatMapImpl);