import { Button } from "@mui/material";
import React, { useState, useEffect } from "react";

const UpperBar = ({containerName,saveChangesToWordsFile,disabled}) => {

    return (
        <div className="upper-bar">
            <span className="container-name-upper-bar">{containerName}</span>
         <div className='save-button'>
        <Button disabled={disabled} onClick={() => { saveChangesToWordsFile() }}>SAVE</Button>
        </div>

        </div>
    )
}
export default UpperBar;