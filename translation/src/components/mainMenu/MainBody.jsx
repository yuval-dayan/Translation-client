import React, { useState, useEffect } from "react";
import LowerBar from "../upperBarLowerBar/LowerBar";
import SearchBar from "./searchBar/SearchBar";
import SpecificWord from "./SpecificWord";
import SortBy from "./searchBar/SortBy";
import Filter from "./searchBar/Filter";


const MainBody = ({ containerName }) => {

    const setPageNumberFromLocalStorage = () => {
        let appsFromLS = JSON.parse(localStorage.getItem('applicationsStatus'))
        if (appsFromLS && appsFromLS.length > 0) {
            let currentContainer = appsFromLS && appsFromLS.find(app => (app && app.name) == containerName)
            if (currentContainer && currentContainer.pageNumber)
                return currentContainer.pageNumber;
        }
        return 1;
    }

    const appFromLocalStorage = (JSON.parse(localStorage.getItem('applicationsStatus')))
    const WORDS_IN_PAGE = 20;
    const [pageNumber, setPageNumber] = useState(setPageNumberFromLocalStorage() ? setPageNumberFromLocalStorage() : 1);
    const [data, setData] = useState([])
    const [dataToPresent, setDataToPresent] = useState([])
    const [dataLength, setDataLength] = useState(0);
    const [isFilter, setIsFilter] = useState(false);
    const firstLabel = (pageNumber - 1) * WORDS_IN_PAGE;


    const changeDataByContainerName = () => {
        if (containerName) {
            fetch(`http://localhost:7776/words/projectName/${containerName}`)
                .then(response => response.json()).then(data => setData(data)).catch(e => console.error(e))
        }
    }
    const setDataToPresentByWordInPage = () => {
        let dataLengthByWordInPage = data.length < WORDS_IN_PAGE ? data.length : WORDS_IN_PAGE;
        let firstLabel = (pageNumber - 1) * WORDS_IN_PAGE;
        let lastLabel = pageNumber == dataLengthByWordInPage ? (((pageNumber - 1) * WORDS_IN_PAGE) + (data.length % WORDS_IN_PAGE)) : pageNumber * WORDS_IN_PAGE;
        let arr = [];
        for (let i = firstLabel; i < lastLabel; i++) {
            arr[i] = data[i];
        }
        setDataToPresent(arr);
    }
    const changeApplicationsStatusInLS = () => {
        const appIndex = appFromLocalStorage.findIndex(obj => { return obj.name == containerName })
        let appToLocalStorage = appFromLocalStorage;
        appToLocalStorage[appIndex] = { ...appToLocalStorage[appIndex], pageNumber: pageNumber }
        localStorage.setItem('applicationsStatus', JSON.stringify(appToLocalStorage))
    }
    const setDataToPresentFromLS = () => {
        if (pageNumber != setPageNumberFromLocalStorage()) {
            setDataToPresentByWordInPage();
        }
    }
    const dataByDataLength = () => {
        let arr = [];
        if (data.length > 0) {
            const dataAfterSort = data.sort(function (a, b) { return a.id - b.id });
            const lastLabel = pageNumber == dataLength ? (((pageNumber - 1) * WORDS_IN_PAGE) + (data.length % WORDS_IN_PAGE)) : pageNumber * WORDS_IN_PAGE;
            for (let i = firstLabel; i < lastLabel; i++) {
                arr[i] = dataAfterSort[i];
            }
        }
        return arr;
    }
    useEffect(() => {
        changeDataByContainerName()
    }, []);
    useEffect(() => {
        setPageNumber(setPageNumberFromLocalStorage())
        changeDataByContainerName();
        localStorage.setItem('currentContainer', JSON.stringify(containerName))
    }, [containerName]);

    useEffect(() => {
        setDataToPresentByWordInPage();
        setDataLength(Math.ceil(data.length / WORDS_IN_PAGE))
    }, [data]);

    useEffect(() => {
        if (data && data.length > 0) {
            setDataToPresentFromLS()
            changeApplicationsStatusInLS()
        }
        setDataLength(Math.ceil(data.length / WORDS_IN_PAGE))
    }, [pageNumber]);

    useEffect(() => {
        setDataToPresent(dataByDataLength());
    }, [dataLength]);


    return (
        <div className="main-body">
            <div className="search">
                <SearchBar setDataToPresent={setDataToPresent} data={data} setData={setData} isFilter={isFilter} setIsFilter={setIsFilter} changeDataByContainerName={changeDataByContainerName} containerName={containerName} />
                <SortBy data={data} setData={setData} containerName={containerName} />
                <Filter data={data} setData={setData} changeDataByContainerName={changeDataByContainerName} setPageNumber={setPageNumber} containerName={containerName} />
            </div>
            <div className="main-body-title">
                <div >Term</div>
                <div>Translation</div>
            </div>
            <div className="specific-word-wrapper">
                {dataToPresent.map((v, index) =>
                    <SpecificWord key={(v && v.id) ? `specificWordId${v.id}` : `specificWordFromIndex${index}`} rowData={v} />
                )}
            </div>
            <LowerBar pageNumber={pageNumber} setPageNumber={setPageNumber} dataLength={dataLength} containerName={containerName} />
        </div>
    )
}
export default MainBody;