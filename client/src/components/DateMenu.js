import {useRef, useEffect, useState} from "react";
import MenuTitle from "./MenuTitle";

function DateMenu(){
    //states to get select options
    const [hasMounted, setHasMounted] = useState(false);
    const [locationOptions, setLocationOptions] = useState([]);
    const [eventOptions, setEventOptions] = useState([]);
    const [foodOptions, setFoodOptions] = useState([]);

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

    useEffect(() => {
        //function to get date options
        async function getOptions() {
            //fetch to server api
            await fetch('/api/date/options', {
                method: "GET"
            })
                .then(async (res) => {
                    //process body json
                    let data = await res.json();

                    //empty arrays to store option html
                    let locations = [];
                    let events = [];
                    let foods = [];

                    //generate location html
                    for(let i in data.locations){
                        let location = data.locations[i];
                        let rawLocation = location.replace(' ', '').replace('.', '').toLowerCase();

                        locations.push(<option value={rawLocation} key={rawLocation}>{location}</option>);
                    }

                    //generate event html
                    for(let i in data.events){
                        let event = data.events[i];
                        let rawevent = event.replace(' ', '').replace('.', '').toLowerCase();

                        events.push(<option value={rawevent} key={rawevent}>{event}</option>);
                    }

                    //generate food html
                    for(let i in data.food){
                        let food = data.food[i];
                        let rawfood = food.replace(' ', '').replace('.', '').toLowerCase();

                        foods.push(<option value={rawfood} key={rawfood}>{food}</option>);
                    }

                    //store html arrays in state
                    setLocationOptions(locations);
                    setEventOptions(events);
                    setFoodOptions(foods);
                })
                .catch((err) => console.log(err));
        }

        //set hasMounted to true to indicate element has mounted.
        setHasMounted(true);

        //if hasMounted was true before, get options.
        //this set up guarantees fetch will only be called once.
        if(hasMounted){
            getOptions().catch((err) => console.log(err));
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
                    <input type="submit" value="Submit"/>
                    <input type="button" value="Random" onClick={selectRandom}/>
                    <input type="reset" value="Reset"/>
                </div>
            </form>

            {/*Placeholder for future map*/}
            <div className="MapPlaceholder"></div>
        </div>
    );
}

export default DateMenu;