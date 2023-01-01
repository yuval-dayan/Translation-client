import React, {useState,useEffect} from "react";
import '../../../../src/'
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import SortIcon from '@mui/icons-material/Sort';


const SortBy = ({data, setData,containerName}) => {

    const [sortBy, setSortBy] = useState('');

    
    useEffect(() => {
      setSortBy('')
    }, [containerName]);

    const handleChange = (event: SelectChangeEvent) => {
      setSortBy(event.target.value);
      let arrAtferSort = [...data];
      
      switch (event.target.value) {
        case 'a-z':
            arrAtferSort.sort((a,b)=>a.englishWord > b.englishWord ? 1 :((b.englishWord > a.englishWord) ? -1 :0))
            setData(arrAtferSort);
            break;
            case 'z-a':
            arrAtferSort.sort((a,b)=>a.englishWord > b.englishWord ? -1 :((b.englishWord > a.englishWord) ? 1 :0))
            setData(arrAtferSort);
            break;
        case '':
          if (containerName) {
            fetch(`http://localhost:7776/words/projectName/${containerName}`)
                .then(response => response.json()).then(data => setData(data)).catch(e => console.error(e))
        }
                    break;
    }
    };
  
    return (
        <div className="sort-by-wrapper">
            <div style={    {margin:13}}>
            <div className="sort-by-icon">    <div className="sort-by-icon-wrapper">    <SortIcon/> </div> Sort By :     
</div>
        <div className="sort-by">
        <FormControl   onClick={(e)=>{e.stopPropagation()}}variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <Select
          value={sortBy}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value="a-z">A-Z</MenuItem>
          <MenuItem value="z-a">Z-A</MenuItem>
          <MenuItem value="">
            <em>None</em>  </MenuItem>      </Select>
        </FormControl>
      </div>
      </div>
      </div>

    )
}
export default SortBy;

