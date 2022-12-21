import React from "react";
import TextField from '@mui/material/TextField';

const SearchBar = () => {
    return (
        <div className="search-bar-wrapper" >
            <input className="search-bar-input" type="text" value="Search Specific Word"/>
        </div>
    )
}
export default SearchBar;