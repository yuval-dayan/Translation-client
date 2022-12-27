import React, {useState} from "react";
import './MainRow.css'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import SortIcon from '@mui/icons-material/Sort';


const SortBy = () => {

    const [sortBy, setSortBy] = useState('');

    const handleChange = (event: SelectChangeEvent) => {
      setSortBy(event.target.value);
    };
  
    return (
        <div className="sort-by-wrapper">
            <div style={    {margin:13}}>
            <div className="sort-by-icon">    <div className="sort-by-icon-wrapper">    <SortIcon/> </div>Sort By :     
</div>
        <div className="sort-by">
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <Select
          value={sortBy}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value="Non Translated">Non Translated</MenuItem>
          <MenuItem value="Translated by me">Translated by me</MenuItem>
          <MenuItem value="Translate by">Translate by </MenuItem>
          <MenuItem value="">
            <em>None</em>  </MenuItem>      </Select>
        </FormControl>
      </div>
      </div>
      </div>

    )
}
export default SortBy;

