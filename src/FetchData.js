import { useEffect } from "react";

function FetchData({ onDataFetched }) {
    useEffect(() => {
        fetch("https://myfakeapi.com/api/cars/")
            .then((response) => response.json())
            .then((data) => {
                onDataFetched(data.cars);
            })
            .catch((error) => console.log("error", error));
    }, [onDataFetched]);

    return null;
}

export default FetchData;
