import React from "react";
import { useState, useEffect } from "react";
import SpecificWord from "./SpecificWord";

const MainRow = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        fetch('http://localhost:7779/words')
            .then(response => response.json()).then(data => setData(data)).catch(e => console.error(e))

    }, []);

    return (
        data.map((v, index) =>
            <SpecificWord key={(v && v.id) ? `specificWordId${v.id}` : `specificWordFromIndex${index}`} className="mainRow" rowData={v} />
        )
    )
}
export default MainRow;