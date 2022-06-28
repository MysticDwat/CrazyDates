import {useRef, useEffect, useState} from "react";
import {Marker, InfoWindow} from '@react-google-maps/api';
import categories from "../jsons/categories.json"
import MenuTitle from "./MenuTitle";
import DateMap from "./DateMap";

const eventQueries = {
    any : {query : ""},
    picnic : {query : "", type: "park"},
    comedy : {query : "comedy"},
    movie : {query : "", type : "movie_theater"},
    museum : {query : "", type : "museum"},
    play : {query : "performing arts theater"},
    music : {query : "live music"},
    art : {query : "", type : "art_gallery"},
    historytour : {query : "historical places"},
    dayhike : {query : "", type : "park"}
}

function DateMenu(){
    //states to get select options
    const [hasMounted, setHasMounted] = useState(false);
    const [eventOptions, setEventOptions] = useState(categories.events);
    const [foodOptions, setFoodOptions] = useState(categories.food);

    //map states
    const [map, setMap] = useState(null);
    const [center, setCenter] = useState({lat: 27.850582, lng: -82.210923});
    const [infoWindow, setInfoWindow] = useState(null);
    const [eventMarkers, setEventMarkers] = useState([]);
    const [foodMarkers, setFoodMarkers] = useState([]);

    //references to select elements
    const eventSelect = useRef();
    const foodSelect = useRef();

    //function to select random options from select elements use refs
    function selectRandom(){
        eventSelect.current.value = eventSelect.current.options[
        Math.floor(Math.random() * (eventSelect.current.options.length - 1)) + 1
            ].value;
        foodSelect.current.value = foodSelect.current.options[
        Math.floor(Math.random() * (foodSelect.current.options.length - 1)) + 1
            ].value;
    }

    const getFoodMarkers = () => {
        let service = new window.google.maps.places.PlacesService(map);

        let request = {
            location: new window.google.maps.LatLng(center.lat, center.lng),
            radius: '500',
            query: foodSelect.current.value !== "any" ? foodSelect.current.selectedOptions[0].innerText : "",
            type: "restaurant"
        }

        service.textSearch(request, (results, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                let markers = [];

                for (let i = 0; i < results.length; i++) {
                    let place = results[i];
                    let lat = place.geometry.location.lat();
                    let lng = place.geometry.location.lng();

                    markers.push(
                        <Marker
                            position={{lat: lat, lng: lng}}
                            key={place.place_id}
                            icon={"http://maps.google.com/mapfiles/ms/icons/red-dot.png"}
                            onClick={() => handleInfoWindow(place)}
                        />
                    );
                }

                setFoodMarkers(markers);
            }
        });
    }

    const getEventMarkers = () => {
        let service = new window.google.maps.places.PlacesService(map);

        let request = {
            ...eventQueries[eventSelect.current.value],
            location: new window.google.maps.LatLng(center.lat, center.lng),
            radius: '500'
        }

        service.textSearch(request, (results, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                let markers = [];

                for (let i = 0; i < results.length; i++) {
                    let place = results[i];
                    let lat = place.geometry.location.lat();
                    let lng = place.geometry.location.lng();

                    markers.push(
                        <Marker
                            position={{lat: lat, lng: lng}}
                            key={place.place_id}
                            icon={"http://maps.google.com/mapfiles/ms/icons/blue-dot.png"}
                            onClick={() => handleInfoWindow(place)}
                        />
                    );
                }

                setEventMarkers(markers);
            }
        });
    }

    const handleInfoWindow = (place) => {
        setInfoWindow(place !== null ? (
            <InfoWindow
                position={{lat: place.geometry.location.lat(), lng: place.geometry.location.lng()}}
                onCloseClick={() => setInfoWindow(null)}
            >
                <div>
                    <p>{place.name}</p>
                    <p>Rating: {place.rating}/5</p>
                    <p>{place.formatted_address}</p>
                </div>
            </InfoWindow>
            ) : null);
    }

    useEffect(() => {
        //set hasMounted to true to indicate element has mounted.
        setHasMounted(true);

        //if hasMounted was true before, get options.
        //this set up guarantees fetch will only be called once.
        if(hasMounted){
            //empty arrays to store option html
            let events = [];
            let foods = [];

            //generate event html
            for(let i in categories.events){
                let event = categories.events[i];
                let rawevent = event.replace(' ', '').replace('.', '').toLowerCase();

                events.push(<option value={rawevent} key={rawevent}>{event}</option>);
            }

            //generate food html
            for(let i in categories.food){
                let food = categories.food[i];
                let rawfood = food.replace(' ', '').replace('.', '').toLowerCase();

                foods.push(<option value={rawfood} key={rawfood}>{food}</option>);
            }

            //store html arrays in state
            setEventOptions(events);
            setFoodOptions(foods);
        }
    }, [hasMounted]);

    return(
        <div className="DateMenu Menu Center">
            {/*Menu Title*/}
            <MenuTitle title="Date Finder" />

            {/*Date Options Form*/}
            <form className="DateResult Center">
                <div className="Row Center">
                    {/*Event Select*/}
                    <label htmlFor="event">Event</label>
                    <select name="event" id="event" ref={eventSelect} defaultValue="any">
                        <option value="any">Any</option>
                        {eventOptions}
                    </select>
                </div>

                <div className="Row Center">
                    {/*Food Select*/}
                    <label htmlFor="food">Food</label>
                    <select name="food" id="food" ref={foodSelect} defaultValue="any">
                        <option value="any">Any</option>
                        {foodOptions}
                    </select>
                </div>

                <div className="Row SpaceEven">
                    {/*Submit, Random, and Reset Buttons*/}
                    <input type="button" value="Submit" onClick={() => {
                        getEventMarkers();
                        getFoodMarkers();
                    }}/>
                    <input type="button" value="Random" onClick={() => {
                        selectRandom();
                    }}/>
                    <input type="reset" value="Reset"/>
                </div>
            </form>

            {/*Date Map*/}
            <DateMap
                map={map}
                center={center}
                markers={[...eventMarkers, ...foodMarkers]}
                infoWindow={infoWindow}
                setMap={setMap}
                setCenter={setCenter}
                setInfoWindow={setInfoWindow}
            />
        </div>
    );
}

export default DateMenu;