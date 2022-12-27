import React, { useState } from "react";
import '../../../components/MainRow.css'
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';


const Filter = ({data,setData,changeDataByContainerName}) => {
    const [filterBy, setFilterBy] = useState('');


    const changeChoosenFilter = (event) => {
        setFilterBy(event.target.value)
        switch (event.target.value) {
            case 'All':
                changeDataByContainerName()
                break;
            case 'Flag':     
                break;
            case 'Not Translated':
                setData(data.filter(word => word.translated == false))
                break;
        }

    }
    return (
        <div className="sort-by-wrapper">
        <div style={    {margin:13}}>
        <div className="sort-by-icon">    <div className="sort-by-icon-wrapper">    <FilterAltIcon/> </div>Filter :     
</div>
            <div className="sort-by">
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <Select
              value={filterBy}
              onChange={changeChoosenFilter}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Flag">Flag</MenuItem>
              <MenuItem value="Not Translated">Not Translated </MenuItem>
              <MenuItem value="">
                <em>None</em>  </MenuItem>      </Select>
            </FormControl>
          </div>
          </div>
          </div>

    )
}
export default Filter;