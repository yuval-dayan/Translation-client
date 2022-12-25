import React, { useState, useEffect } from "react";
import "./SearchBar.css";
import SearchIcon from '@mui/icons-material/Search';
import { Button } from "@mui/material";


function SearchBar({ setDataToPresent,setData, data, setIsFilter, changeDataByContainerName, containerName }) {
  const [wordEntered, setWordEntered] = useState("");
  const [noResultFound, setNoResultFound] = useState("");
  const [cleanSearchDisabled, setCleanSearchDisabled] = useState(true);

  const handleFilter = () => {
    const newFilter = data.filter((value) => {
      return value.label.toLowerCase().includes(wordEntered.toLowerCase());
    });
    if (newFilter.length == 0) {
      setDataToPresent([]);
      setIsFilter(false)
    }
    else
      setData(newFilter);
  };
  const wordEnterOnChange = (event) => {
    setWordEntered(event.target.value)
    if (noResultFound.length != 0) {
      setNoResultFound("")
    }
  }
  useEffect(() => {
    if (wordEntered.length > 0) {
      setIsFilter(true)
      if (cleanSearchDisabled) {
        setCleanSearchDisabled(false)
      }
    }
    else {
      setIsFilter(false)
      if (!cleanSearchDisabled) {
        setCleanSearchDisabled(true)
      }
    }

  }, [wordEntered]);
  useEffect(() => {
    setWordEntered("");
  }, [containerName]);
  const changeDataAndCleanSearch = () => {
    changeDataByContainerName();
    setCleanSearchDisabled(true);
    setWordEntered("");

  }

  return (
    <div className="search-wrapper">
      <div className="searchInputs">
        <input
          type="text"
          placeholder="Search"
          value={wordEntered}
          onClick={wordEnterOnChange}
          onChange={wordEnterOnChange}
        />
        <div className="searchIcon">
          <SearchIcon onClick={handleFilter} />
        </div>
        <Button disabled={cleanSearchDisabled} onClick={() => { changeDataAndCleanSearch() }}>Clear</Button>
      </div>
    </div>
  );
}

export default SearchBar;