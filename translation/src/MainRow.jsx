import React from "react";
import { useState, useEffect } from "react";
import SpecificWord from "./SpecificWord";

const MainRow = () => {
    const [data, setData] = useState([])
    const [dataExample, setDataExample] = useState([]) //will be remove
    useEffect(() => {
        fetch('http://localhost:7779/words')
            .then(response => response.json()).then(data => setData(data)).catch(e => console.error(e))

    }, []);
    //will be removed
    useEffect(() => {
        let arr = [];
        for (let i = 0; i < 500; i++) {
            arr[i] = data[i];
        }
        console.log(arr[0])
        setDataExample(arr);

    }, [data]);
    //will be removed
    return ( //dataExample will change to data
        dataExample.map((v,index) =>
            <SpecificWord key={ (v && v.id)?`specificWordId${v.id}`:`specificWordFromIndex${index}`} className="mainRow" rowData={v} />
        )
    )
}
export default MainRow;