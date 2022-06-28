import {useState, useEffect} from "react";

function useUserStatus () {
    //trigger flag and status state
    const [hasTriggered, setHasTriggered] = useState(false);
    const [status, setStatus] = useState(null);

    //resets hasTriggered so hook can get user status
    function trigger() {
        setHasTriggered(false);
    }

    useEffect(() => {
        //get user status from server
        async function getStatus() {
            //fetch to server api
            await fetch('/api/user/status', {
                method: "GET"
            })
                .then(async (res) => {
                    //process body json
                    let data = await res.json();
                    setStatus(data);
                })
                //catch any error and return error status
                .catch((err) => {
                    console.log(err);
                    setStatus({logged: false, error: true});
                });
        }

        setHasTriggered(true);

        if(hasTriggered){
            getStatus().catch((err) => console.log(err));
        }
    },[hasTriggered]);

    //return status and trigger
    return [status, trigger];
}

export default useUserStatus;