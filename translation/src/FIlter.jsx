import React, { useState } from "react";
import './MainRow.css'
import FilterAltIcon from '@mui/icons-material/FilterAlt';

const Filter = ({data,setData,changeDataByContainerName}) => {
    const [all, setAll] = useState(true)
    const [flag, setFlag] = useState(false)
    const [nonTranslation, setNonTranslation] = useState(false);

    const changeChoosenFilter = (event) => {
        switch (event.target.title) {
            case 'ALL':
                setAll(true)
                setFlag(false)
                setNonTranslation(false)
                changeDataByContainerName()
                break;
            case 'FLAG':
                setAll(false)
                setFlag(true)
                setNonTranslation(false)
                break;
            case 'NON_TRANSLATION':
                setAll(false)
                setFlag(false)
                setNonTranslation(true)
                setData(data.filter(word => word.translated == false))
                break;
        }

    }
    return (
        <div className="filter-wrapper">
            <div className="filter-icon">
                <FilterAltIcon />
                <div>
            <span> Filter: </span><span title="ALL" className={all ? "choosen-filter" : ""} onClick={(e) => { changeChoosenFilter(e) }}>All</span><span> / </span><span className={flag ? "choosen-filter" : ""} onClick={(e) => { changeChoosenFilter(e) }} title="FLAG">Flag</span><span> / </span><span className={nonTranslation ? "choosen-filter" : ""} onClick={(e) => { changeChoosenFilter(e) }} title="NON_TRANSLATION">Not Translated</span>
        </div>
        </div></div>

    )
}
export default Filter;