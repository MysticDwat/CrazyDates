import {useRef} from "react";
import MenuTitle from "./MenuTitle";

function DateMenu(){
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
                        <option value="beach">Beach</option>
                        <option value="stpete">St.Pete</option>
                        <option value="yborcity">Ybor City</option>
                        <option value="sarasota">Sarasota</option>
                        <option value="tampa">Tampa</option>
                        <option value="lakeland">Lakeland</option>
                        <option value="bradenton">Bradenton</option>
                        <option value="soho">SoHo</option>
                        <option value="brandon">Brandon</option>
                        <option value="clearwater">Clearwater</option>
                        <option value="plantcity">Plant City</option>
                        <option value="hillscounty">Hills County</option>
                    </select>
                </div>

                <div className="Row Center">
                    {/*Event Select*/}
                    <label htmlFor="event">Event</label>
                    <select name="event" id="event" ref={eventSelect} defaultValue="any">
                        <option value="any">Any</option>
                        <option value="picnic">Picnic</option>
                        <option value="comedy">Comedy</option>
                        <option value="movie">Movie</option>
                        <option value="museum">Museum</option>
                        <option value="play">Play</option>
                        <option value="music">Music</option>
                        <option value="art">Art</option>
                        <option value="historytour">History Tour</option>
                        <option value="roadtrip">Road Trip</option>
                        <option value="scavengerhunt">Scavenger Hunt</option>
                        <option value="dayhike">Day Hike</option>
                    </select>
                </div>

                <div className="Row Center">
                    {/*Food Select*/}
                    <label htmlFor="food">Food</label>
                    <select name="food" id="food" ref={foodSelect} defaultValue="any">
                        <option value="any">Any</option>
                        <option value="beer">Beer</option>
                        <option value="latin">Latin</option>
                        <option value="mexican">Mexican</option>
                        <option value="african">African</option>
                        <option value="european">European</option>
                        <option value="american">American</option>
                        <option value="asian">Asian</option>
                        <option value="indian">Indian</option>
                        <option value="foodtruck">Food Truck</option>
                        <option value="middleeasten">Middle Eastern</option>
                        <option value="bistro">Bistro</option>
                        <option value="seafood">Seafood</option>
                        <option value="foreign">Foreign</option>
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