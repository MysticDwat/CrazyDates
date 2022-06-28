import {useState, useEffect, useCallback, memo} from 'react';
import {GoogleMap, useJsApiLoader} from '@react-google-maps/api';

const libraries = [
    'places'
]

const containerStyle = {
    width: '400px',
    height: '400px'
};

function DateMap(props) {
    const {isLoaded} = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'AIzaSyA-0ar_qDjV074wD7LAy1eB5p_aKrI-GOs',
        libraries: libraries
    });

    const [hasCenter, setHasCenter] = useState(false);

    const onLoad = useCallback((map) => {
        map.setZoom(15);
        props.setMap(map);
    },[]);

    useEffect(() => {
        setHasCenter(true);

        if(hasCenter){
            navigator.geolocation.getCurrentPosition((pos) => {
                props.setCenter({lat: pos.coords.latitude, lng: pos.coords.longitude});
            })
        }
    },[hasCenter]);

    return isLoaded ? (
        <div id="DateMap">
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={props.center}
                zoom={15}
                onLoad={onLoad}
            >
                {props.markers}
            </GoogleMap>
        </div>
    ) : <></>
}

export default memo(DateMap);