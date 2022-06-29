import {useRef, useEffect, useState} from "react";
import {Marker, InfoWindow} from '@react-google-maps/api';
import categories from "../jsons/categories.json";
import scavengerCards from "../jsons/scavengerHuntItems.json";
import MenuTitle from "./MenuTitle";
import DateMap from "./DateMap";

//the event's query to be loaded into place search
const eventQueries = {
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

//defines special rules for certain events
const specialRules = {
    "roadtrip" : "Drive for 1 hour. Roll a die for every intersection: 1-2 > Left. 3-4> Straight. 5-6 > Right. Stop at all scenic sites.",
    "scavengerhunt" : "Find and take a selfie with"
}

function DateMenu(){
    //date form states
    const [hasMounted, setHasMounted] = useState(false);
    const [eventOptions, setEventOptions] = useState(categories.events);
    const [foodOptions, setFoodOptions] = useState(categories.food);
    const [specialRule, setSpecialRule] = useState(null);

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

    //function to get the markers for all searched event places
    const getEventMarkers = () => {
        //create places api service
        let service = new window.google.maps.places.PlacesService(map);

        //generate request
        //get query from eventQueries
        let request = {
            ...eventQueries[eventSelect.current.value],
            location: new window.google.maps.LatLng(center.lat, center.lng),
            radius: '500'
        }

        //do text search of nearby places
        service.textSearch(request, (results, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                //empty array for markers
                let markers = [];

                //for each result, create marker
                for (let i = 0; i < results.length; i++) {
                    let place = results[i];
                    let lat = place.geometry.location.lat();
                    let lng = place.geometry.location.lng();

                    markers.push(
                        <Marker
                            position={{lat: lat, lng: lng}}
                            key={"food" + place.place_id}
                            icon={"http://maps.google.com/mapfiles/ms/icons/blue-dot.png"}
                            onClick={() => handleInfoWindow(place)}
                        />
                    );
                }

                //save markers
                setEventMarkers(markers);
            }
        });
    }

    //function to get the markers for all searched food places
    const getFoodMarkers = () => {
        //create places api service
        let service = new window.google.maps.places.PlacesService(map);

        //generate request
        let request = {
            location: new window.google.maps.LatLng(center.lat, center.lng),
            radius: '500',
            query: foodSelect.current.selectedOptions[0].innerText,
            type: "restaurant"
        }

        //do text search of nearby places
        service.textSearch(request, (results, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                //empty array for markers
                let markers = [];

                //for each result, create marker
                for (let i = 0; i < results.length; i++) {
                    let place = results[i];
                    let lat = place.geometry.location.lat();
                    let lng = place.geometry.location.lng();

                    markers.push(
                        <Marker
                            position={{lat: lat, lng: lng}}
                            key={"event" + place.place_id}
                            icon={"http://maps.google.com/mapfiles/ms/icons/red-dot.png"}
                            onClick={() => handleInfoWindow(place)}
                        />
                    );
                }

                //save markers
                setFoodMarkers(markers);
            }
        });
    }

    //function to load info window of selected markers
    const handleInfoWindow = (place) => {
        //create info window if marker selected, else return null
        setInfoWindow(place !== null ? (
            <InfoWindow
                position={{lat: place.geometry.location.lat(), lng: place.geometry.location.lng()}}
                onCloseClick={() => setInfoWindow(null)}
            >
                <div className="InfoWindow">
                    <p className="Name">{place.name}</p>
                    <p>Rating: {place.rating}/5</p>
                    <p>{place.formatted_address}</p>
                </div>
            </InfoWindow>
            ) : null);
    }

    //function to handle special rules
    const handleSpecialRules = () => {
        //get event and rules
        let event = eventSelect.current.selectedOptions[0].innerText;
        let rules = specialRules[eventSelect.current.value];

        //if scavenger hunt, generate items to take pics with
        if(event === "Scavenger Hunt"){
            let indexes = [];

            //generates 4 unique indices
            while(indexes.length < 4){
                let index = Math.floor(Math.random() * scavengerCards.length);
                if(indexes.indexOf(index) === -1) indexes.push(index);
            }

            while(indexes.length > 1){
                rules = `${rules} a ${scavengerCards[indexes.pop()]}, `;
            }

            rules = `${rules} and a ${scavengerCards[indexes.pop()]}.`;
        }

        //load special rule
        setSpecialRule(
            <div className="SpecialRules">
                <p className="Center">Special Rules: {event}</p>
                <p className="Center">{rules}</p>
            </div>
        );
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
                    <select name="event" id="event" ref={eventSelect}>
                        {eventOptions}
                    </select>
                </div>

                <div className="Row Center">
                    {/*Food Select*/}
                    <label htmlFor="food">Food</label>
                    <select name="food" id="food" ref={foodSelect}>
                        {foodOptions}
                    </select>
                </div>

                <div className="Row SpaceEven">
                    {/*Submit, Random, and Reset Buttons*/}
                    <input type="button" value="Submit" onClick={() => {
                        if(!Object.keys(specialRules).includes(eventSelect.current.value)){
                            getEventMarkers();
                            setSpecialRule(null);
                        } else{
                            setEventMarkers([]);
                            handleSpecialRules();
                        }
                        getFoodMarkers();
                    }}/>
                    <input type="button" value="Random" onClick={() => {
                        selectRandom();
                    }}/>
                    <input type="reset" value="Reset"/>
                </div>
            </form>

            {/*Special rules for certain events.*/}
            {specialRule}

            {/*Date Map*/}
            <DateMap
                map={map}
                center={center}
                markers={[...new Set([...eventMarkers, ...foodMarkers])]}
                infoWindow={infoWindow}
                setMap={setMap}
                setCenter={setCenter}
                setInfoWindow={setInfoWindow}
            />
        </div>
    );
}

export default DateMenu;