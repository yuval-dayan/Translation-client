import React from "react";
import './MainRow.css'
import FilterAltIcon from '@mui/icons-material/FilterAlt';

const Filter = () => {


    return (
        <div className="filter-wrapper">
            <div className="filter-icon">
        <FilterAltIcon/></div>
        <span> Filter: </span><span>All</span><span> / </span><span>Flag</span><span> / </span><span>Non Translate</span>
        </div>

    )
}
export default Filter;