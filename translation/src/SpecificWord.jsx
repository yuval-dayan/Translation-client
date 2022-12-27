import React, { useState } from "react";
import './MainRow.css'
import DropDown from "./DropDown";
import CheckIcon from '@mui/icons-material/Check';

const SpecificWord = ({ rowData }) => {

    const [checked, setChecked] = useState(rowData && rowData.translated ? rowData.translated : false);
    return (
        <div>{rowData && rowData.id && <div className="specificRow">
        {checked && <div className="checked-icon" > <CheckIcon sx={{color:'#00c853'}}/> </div>}
        <div className="label">
            {rowData && (rowData.englishWord || rowData.label)}
        </div >
        {rowData && rowData.translation && <div className="dropDown-wrapper" > <DropDown rowData={rowData} setChecked={setChecked} /></div>}
    </div>}
        </div>
    )
}
export default SpecificWord;