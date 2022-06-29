import {useState, useEffect, useCallback, memo} from 'react';
import {GoogleMap, useJsApiLoader} from '@react-google-maps/api';

//google maps libraries
const libraries = [
    'places'
]

//google maps container style
const containerStyle = {
    width: '400px',
    height: '400px'
};

function DateMap(props) {
    //loads google maps api
    const {isLoaded} = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'AIzaSyA-0ar_qDjV074wD7LAy1eB5p_aKrI-GOs',
        libraries: libraries
    });

    //map states
    const [hasCenter, setHasCenter] = useState(false);
    const setMap = props.setMap;
    const setCenter = props.setCenter;

    //sets map zoom on load
    const onLoad = useCallback((map) => {
        map.setZoom(15);
        setMap(map);
    },[setMap]);

    //at component mount, get client's geolocation and make it the center
    useEffect(() => {
        setHasCenter(true);

        if(hasCenter){
            navigator.geolocation.getCurrentPosition((pos) => {
                setCenter({lat: pos.coords.latitude, lng: pos.coords.longitude});
            })
        }
    },[hasCenter,setCenter]);

    //if api is loaded, show map
    return isLoaded ? (
        <div id="DateMap">
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={props.center}
                zoom={15}
                onLoad={onLoad}
                onClick={() => props.setInfoWindow(null)}
            >
                {props.markers}
                {props.infoWindow}
            </GoogleMap>
        </div>
    ) : <p>There was an error with the api.</p>
}

export default memo(DateMap);