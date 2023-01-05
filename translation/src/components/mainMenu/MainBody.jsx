import React, { useState, useEffect } from "react";
import LowerBar from "../upperBarLowerBar/LowerBar";
import SearchBar from "./searchBar/SearchBar";
import SpecificWord from "./SpecificWord";
import SortBy from "./searchBar/SortBy";
import Filter from "./searchBar/Filter";
import '../mainMenu/style/mainMenu.css';
import { changeDataByContainerName } from "../../Helpers/DbHelper";
import { getApplicationStatusFromLS,setCurrentContainerToLS,setApplicationsStatus } from "../../Helpers/LocalStorageHelper";


const MainBody = ({ containerName,updateStatus }) => {
    const appFromLocalStorage = getApplicationStatusFromLS()

    const setPageNumberFromLocalStorage = () => {
        if (appFromLocalStorage && appFromLocalStorage.length > 0) {
            let currentContainer = appFromLocalStorage && appFromLocalStorage.find(app => (app && app.name) == containerName)
            if (currentContainer && currentContainer.pageNumber)
                return currentContainer.pageNumber;
        }
        return 1;
    }

    const WORDS_IN_PAGE = 20;
    const [pageNumber, setPageNumber] = useState(setPageNumberFromLocalStorage() ? setPageNumberFromLocalStorage() : 1);
    const [data, setData] = useState([])
    const [dataToPresent, setDataToPresent] = useState([])
    const [dataLength, setDataLength] = useState(0);
    const [isFilter, setIsFilter] = useState(false);
    const firstLabel = (pageNumber - 1) * WORDS_IN_PAGE;

    


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
        setApplicationsStatus(appToLocalStorage)
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
        changeDataByContainerName(containerName,setData)
    }, []);
    
    useEffect(() => {
        changeDataByContainerName(containerName,setData)
    }, [updateStatus]);
    useEffect(() => {
        setPageNumber(setPageNumberFromLocalStorage())
        changeDataByContainerName(containerName,setData);
        setCurrentContainerToLS(containerName)
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
                <SearchBar setDataToPresent={setDataToPresent} data={data} setData={setData} isFilter={isFilter} setIsFilter={setIsFilter} containerName={containerName} />
                <SortBy data={data} setData={setData} containerName={containerName} />
                <Filter data={data} setData={setData} setPageNumber={setPageNumber} containerName={containerName} />
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