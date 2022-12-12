import React, { useState, useContext, useEffect } from "react";
import './MainRow.css'
import { TranslationContext } from "./context/TranslationContext";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import DropDown from "./DropDown";
import CheckIcon from '@mui/icons-material/Check';

const SpecificWord = ({ rowData }) => {

    const [checked, setChecked] = useState(false);
    return (
        <div className="specificRow">
                        {checked &&<div  className="checked-icon" > <CheckIcon/> </div>}
            <div className="label">
                {rowData && rowData.label}
            </div >
            {rowData && rowData.translation &&<div className="dropDown-wrapper" > <DropDown rowData={rowData} setChecked={setChecked}/></div>}
        </div>
    )
}
export default SpecificWord;