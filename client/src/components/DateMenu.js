import {useRef, useEffect, useState} from "react";
import {Marker} from '@react-google-maps/api';
import categories from "../jsons/categories.json"
import MenuTitle from "./MenuTitle";
import DateMap from "./DateMap";

function DateMenu(){
    //states to get select options
    const [hasMounted, setHasMounted] = useState(false);
    const [locationOptions, setLocationOptions] = useState(categories.locations);
    const [eventOptions, setEventOptions] = useState(categories.events);
    const [foodOptions, setFoodOptions] = useState(categories.food);

    //map states
    const [map, setMap] = useState(null);
    const [center, setCenter] = useState({lat: 27.850582, lng: -82.210923});
    const [markers, setMarkers] = useState([]);

    //references to select elements
    const locationSelect = useRef();
    const eventSelect = useRef();
    const foodSelect = useRef();

    //function to select random options from select elements use refs
    function selectRandom(){
        locationSelect.current.value = locationSelect.current.options[
        Math.floor(Math.random() * (locationSelect.current.options.length - 1)) + 1
            ].value;
        eventSelect.current.value = eventSelect.current.options[
        Math.floor(Math.random() * (eventSelect.current.options.length - 1)) + 1
            ].value;
        foodSelect.current.value = foodSelect.current.options[
        Math.floor(Math.random() * (foodSelect.current.options.length - 1)) + 1
            ].value;
    }

    const getMarkers = (query) => {
        let service = new window.google.maps.places.PlacesService(map);

        let request = {
            location: new window.google.maps.LatLng(center.lat, center.lng),
            radius: '500',
            query: query
        }

        service.textSearch(request, (results, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                let markers = [];

                for (let i = 0; i < results.length; i++) {
                    let place = results[i];
                    let lat = place.geometry.location.lat();
                    let lng = place.geometry.location.lng();

                    markers.push(<Marker position={{lat: lat, lng: lng}} key={place.place_id}/>);
                }

                setMarkers(markers);
            }
        });
    }

    useEffect(() => {
        //set hasMounted to true to indicate element has mounted.
        setHasMounted(true);

        //if hasMounted was true before, get options.
        //this set up guarantees fetch will only be called once.
        if(hasMounted){
            //empty arrays to store option html
            let locations = [];
            let events = [];
            let foods = [];

            //generate location html
            for(let i in categories.locations){
                let location = categories.locations[i];
                let rawLocation = location.replace(' ', '').replace('.', '').toLowerCase();

                locations.push(<option value={rawLocation} key={rawLocation}>{location}</option>);
            }

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
            setLocationOptions(locations);
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
                    {/*Location Select*/}
                    <label htmlFor="location">Location</label>
                    <select name="location" id="location" ref={locationSelect} defaultValue="any">
                        <option value="any">Any</option>
                        {locationOptions}
                    </select>
                </div>

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
                        if(foodSelect.current.value !== 'Any'){
                            getMarkers(foodSelect.current.value);
                        }
                    }}/>
                    <input type="button" value="Random" onClick={selectRandom}/>
                    <input type="reset" value="Reset"/>
                </div>
            </form>

            {/*Date Map*/}
            <DateMap
                map={map}
                center={center}
                markers={markers}
                setMap={setMap}
                setCenter={setCenter}
            />
        </div>
    );
}

export default DateMenu;