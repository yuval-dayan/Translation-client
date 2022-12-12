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
            <div>
                {rowData && rowData.label}
            </div>
            {rowData && rowData.translation && <DropDown rowData={rowData} setChecked={setChecked} />}
            {checked && <CheckIcon className="checked-icon" />}
        </div>
    )
}
export default SpecificWord;