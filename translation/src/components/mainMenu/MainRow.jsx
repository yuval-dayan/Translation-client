import React from "react";
import { useState, useEffect } from "react";
import SpecificWord from "./SpecificWord";
import { setDataFromDb } from "../../Helpers/DbHelper";

const MainRow = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        setDataFromDb(setData)

    }, []);

    return (
        data.map((v, index) =>
            <SpecificWord key={(v && v.id) ? `specificWordId${v.id}` : `specificWordFromIndex${index}`} className="mainRow" rowData={v} />
        )
    )
}
export default MainRow;