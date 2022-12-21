import React, { useState, useEffect } from "react";
import PrevNextWord from "./PrevNextWords";
import SpecificWord from "./SpecificWord";


const MainBody = ({ containerName }) => {
    const [pageNumber, setPageNumber] = useState(1);
    const [data, setData] = useState([])
    const [dataToPresent, setDataToPresent] = useState([])
    const [dataLength, setDataLength] = useState(0);
    useEffect(() => {
        fetch('http://localhost:7779/words')
            .then(response => response.json()).then(data => setData(data)).catch(e => console.error(e))

    }, []);
    useEffect(() => {
        setPageNumber(setPageNumberFromLocalStorage)
        //TODO -- change the data acording to the conatiner name


    }, [containerName]);
    useEffect(() => {
        if (data && data.length > 0) {
            let arr = [];
            for (let i = 0; i < 10; i++) {
                arr[i] = data[i];
            }
            setDataToPresent(arr);
            setDataLength(Math.ceil(data.length / 10))
        }

    }, [data]);
    const setPageNumberFromLocalStorage = () => {
        let appsFromLS = JSON.parse(localStorage.getItem('applicationsStatus'))
        if (appsFromLS && appsFromLS.length > 0) {
            let currentContainer = appsFromLS && appsFromLS.find(app => (app && app.name) == containerName)
            if (currentContainer && currentContainer.pageNumber)
                return currentContainer.pageNumber;
        }
        return 1;
    }
    useEffect(() => {
        let arr = [];
        if (data.length > 0) {
            let dataAfterSort = data.sort(function (a, b) { return a.id - b.id });
            let firstLabel = (pageNumber - 1) * 10;
            let lastLabel = pageNumber == dataLength ? (((pageNumber - 1) * 10) + (data.length % 10)) : pageNumber * 10;
            for (let i = firstLabel; i < lastLabel; i++) {
                arr[i] = dataAfterSort[i];
            }
            setDataToPresent(arr);
        }

    }, [data, pageNumber]);
    return (
        <div className="main-body">
            <div className="main-body-title">
                <div >Label</div>
                <div>Translation</div>
            </div>
            {dataToPresent.map((v, index) =>
                <SpecificWord key={(v && v.id) ? `specificWordId${v.id}` : `specificWordFromIndex${index}`} rowData={v} />
            )}
            <PrevNextWord pageNumber={pageNumber} setPageNumber={setPageNumber} dataLength={dataLength} containerName={containerName} />
        </div>

    )
}
export default MainBody;