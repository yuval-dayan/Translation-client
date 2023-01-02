import React, {useState,useEffect} from "react";
import '../../../../src/'
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import SortIcon from '@mui/icons-material/Sort';


const SortBy = ({data, setData,containerName}) => {

    const [sortBy, setSortBy] = useState('');
    function compareAZ(a,b) {
      let firstArg = a.englishWord.length > 0 ? a.englishWord.toLowerCase () : a.label.toLowerCase();
      let secondArg = b.englishWord.length > 0 ? b.englishWord.toLowerCase () : b.label.toLowerCase();
      if ( firstArg < secondArg ){
        return -1;
      }
      if ( firstArg >secondArg ){
        return 1;
      }
      return 0;
     }
     function compareZA(a,b) {
      let firstArg = a.englishWord.length > 0 ? a.englishWord.toLowerCase() : a.label.toLowerCase();
      let secondArg = b.englishWord.length > 0 ? b.englishWord.toLowerCase() : b.label.toLowerCase();
      if ( firstArg < secondArg ){
        return 1;
      }
      if ( firstArg >secondArg ){
        return -1;
      }
      return 0;
     }
    
    useEffect(() => {
      setSortBy('')
    }, [containerName]);

    const handleChange = (event: SelectChangeEvent) => {
      setSortBy(event.target.value);
      let arrAtferSort = [...data];
      
      switch (event.target.value) {
        case 'a-z':
          arrAtferSort.sort(compareAZ );
            setData(arrAtferSort);
            break;
        case 'z-a':
          arrAtferSort.sort(compareZA)
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
          <MenuItem value="">None </MenuItem>      </Select>
        </FormControl>
      </div>
      </div>
      </div>

    )
}
export default SortBy;

