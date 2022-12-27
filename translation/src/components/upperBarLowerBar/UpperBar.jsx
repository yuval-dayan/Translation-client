import { Button } from "@mui/material";
import React,{useState,useEffect} from "react";
import SaveIcon from '@mui/icons-material/Save';
import GetAppIcon from '@mui/icons-material/GetApp';
import FileUploadIcon from '@mui/icons-material/FileUpload';
const UpperBar = ({ containerName, saveChangesToWordsFile, disabled }) => {
    const [saveColor,setSaveColor] = useState("black")
    useEffect(() => {
        if(disabled)
        {
            setSaveColor("grey")
        }
        else 
        {
            setSaveColor("black")
        }
    }, [disabled]);
    return (
        <div className="upper-bar">
            <span className="container-name-upper-bar">{containerName}</span>
            <div className="icons-wrapper">
            <div className='save-button'>
                <GetAppIcon sx={{color:"black"}}/>
            </div>
            <div className='save-button'>
                <FileUploadIcon sx={{color:"black"}} />
            </div>
            <div className='save-button' disabled={disabled} onClick={() => { saveChangesToWordsFile() }}>
                <SaveIcon sx={{color: saveColor}}/>
            </div>
            </div>
        </div>
    )
}
export default UpperBar;