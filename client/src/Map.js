import {useEffect, useRef, useState} from "react";

function Map (props){
    const ref = useRef(null);
    const [map, setMap] = useState();

    useEffect(() => {
        if (ref.current && !map){
            setMap(new window.google.maps.Map(ref.current, {}));
        }
    }, [ref, map]);

    return(
        <div ref={ref} />
        );

}

export default Map;
