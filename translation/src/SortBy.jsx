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
            <div>
            <div className="sort-by-icon">            <SortIcon/>
</div>
        <div className="sort-by">
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Sory By</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={sortBy}
          onChange={handleChange}
          label="Sort By"
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

