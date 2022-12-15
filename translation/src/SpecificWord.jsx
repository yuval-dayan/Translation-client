import React, { useState } from "react";
import './MainRow.css'
import DropDown from "./DropDown";
import CheckIcon from '@mui/icons-material/Check';

const SpecificWord = ({ rowData }) => {

    const [checked, setChecked] = useState(false);
    return (
        <div className="specificRow">
            {checked && <div className="checked-icon" > <CheckIcon /> </div>}
            <div className="label">
                {rowData && rowData.label}
            </div >
            {rowData && rowData.translation && <div className="dropDown-wrapper" > <DropDown rowData={rowData} setChecked={setChecked} /></div>}
        </div>
    )
}
export default SpecificWord;