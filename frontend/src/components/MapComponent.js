import { useState, useCallback } from 'react';
import { GOOGLE_MAPS_API_KEY } from '../googleMapApi';
import { GoogleMap, Marker, Polyline, useJsApiLoader } from '@react-google-maps/api';

const center = {
    lat: 1.3521,
    lng: 103.8198
};

export default function MapComponent(props) {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: GOOGLE_MAPS_API_KEY
    })

    const [map, setMap] = useState(null)

    const onLoad = useCallback(function callback(map) {
        // This is just an example of getting and using the map instance!!! don't just blindly copy!
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);

        setMap(map)
    }, [])

    const onUnmount = useCallback(function callback(map) {
        setMap(null)
    }, [])

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={{
                width: '100%',
                height: '100%'
            }}
            center={center}
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            {props.markers && props.markers.map((marker, index) => (
                <Marker
                    key={index}
                    position={marker} />
            ))}
            {props.markers && props.paths.map((path, index) => (
                <Polyline
                    key={index}
                    path={path} />
            ))}
        </GoogleMap>
    ) : <></>
}