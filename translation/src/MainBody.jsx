import React, { useState, useEffect } from "react";
import PrevNextWord from "./PrevNextWords";
import SpecificWord from "./SpecificWord";
import UpperBar from "./UpperBar";

const MainBody = () => {
    const [pageNumber, setPageNumber] = useState(0);
    const [data, setData] = useState([])
    const [dataToPresent, setDataToPresent] = useState([]) 
    const [dataLength,setDataLength] = useState(0);
    useEffect(() => {
        fetch('http://localhost:7779/words')
            .then(response => response.json()).then(data => setData(data)).catch(e => console.error(e))

    }, []);
    useEffect(() => {
        let arr = [];
        for (let i = 0; i < 10; i++) {
            arr[i] = data[i];
        }
        setDataToPresent(arr);
        setDataLength(Math.ceil(data.length/10))
    }, [data]);
    useEffect(() => {
        let arr = [];
        let firstLabel = (pageNumber) * 10;
        let lastLabel = pageNumber == 0 ? 1 : pageNumber * 10 + 10
        for (let i = firstLabel; i < lastLabel; i++) {
            arr[i] = data[i];
        }
        setDataToPresent(arr);
    }, [pageNumber]);
    return (
        <div className="main-body">
            <UpperBar />
            <div className="main-body-title">
                <div >Label</div>
                <div>Translation</div>
            </div>
            {dataToPresent.map((v, index) =>
                <SpecificWord key={(v && v.id) ? `specificWordId${v.id}` : `specificWordFromIndex${index}`} rowData={v} />
            )}
            <PrevNextWord pageNumber={pageNumber} setPageNumber={setPageNumber} dataLength={dataLength}/>
        </div>

    )
}
export default MainBody;