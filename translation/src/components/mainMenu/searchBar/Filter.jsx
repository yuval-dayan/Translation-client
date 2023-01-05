import React, { useState, useEffect } from "react";
import '../../../components/MainRow.css'
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { changeDataByContainerName } from "../../../Helpers/DbHelper";


const Filter = ({ data, setData, setPageNumber, containerName }) => {
    const [filterBy, setFilterBy] = useState('None');

    useEffect(() => {
        setFilterBy('None')
    }, [containerName]);
    const changeChoosenFilter = (event) => {
        setFilterBy(event.target.value)
        setPageNumber(1);
        switch (event.target.value) {
            case 'None':
                changeDataByContainerName(containerName,setData)
                break;
            case '':
                changeDataByContainerName(containerName,setData)
                break;
            case 'Flag':
                setData(data.filter(word => word.flagged == true))
                break;
            case 'Not Translated':
                setData(data.filter(word => word.translated == false))
                break;
                case 'Translated':
                    setData(data.filter(word => word.translated == true))
                    break;
        }

    }
    return (
        <div className="sort-by-wrapper">
            <div style={{ margin: 13 }}>
                <div className="sort-by-icon">    <div className="sort-by-icon-wrapper">    <FilterAltIcon /> </div>Filter :
                </div>
                <div className="sort-by">
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <Select
                            value={filterBy}
                            onChange={changeChoosenFilter}
                            inputProps={{ 'aria-label': 'Without label' }}
                        >
                            <MenuItem value="None">None</MenuItem>
                            <MenuItem value="Flag">Flag</MenuItem>
                            <MenuItem value="Not Translated">Not Translated </MenuItem>
                            <MenuItem value="Translated">Translated </MenuItem>

                        </Select>
                    </FormControl>
                </div>
            </div>
        </div>

    )
}
export default Filter;