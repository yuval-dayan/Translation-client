import React, { useEffect, useState } from "react";
import './progressBar.css'
import CheckIcon from '@mui/icons-material/Check';
import FlagIcon from '@mui/icons-material/Flag';

const ProgressBar = ({app,containerName}) => {
    const [confirm,setConfirm] = useState(null);
    const [notSuccess,setNotSuccess] = useState(null);
    const [defaultVal,setDefaultVal] = useState(100);
    const totalWords = app.translatedWords + app.nonTranslatedWords;

    useEffect(() => {
      if(app){
        const total = app.translatedWords + app.nonTranslatedWords;
        if(total)
        {
            const appConfirm = Math.ceil((app.translatedWords / total)*100);
            const appTranslationNotFound = Math.ceil((app.nonTranslatedWords / total)*100);
            const appDefault = (100 - appConfirm - appTranslationNotFound) > 0 ? (100 - appConfirm - appTranslationNotFound) : 0
            setConfirm(appConfirm > 0 ? appConfirm : null)
            setNotSuccess(appTranslationNotFound >0 ? appTranslationNotFound :null)
            setDefaultVal(appDefault)
        }
        
      }
      }, []);
      useEffect(() => {
        if(app){
          const total = app.words;
          if(total)
          {
            const appConfirm = Math.ceil((app.translatedWords / total)*100);
            const appTranslationNotFound = Math.ceil((app.nonTranslatedWords / total)*100);
            const appDefault = (100 - appConfirm - appTranslationNotFound) > 0 ? (100 - appConfirm - appTranslationNotFound) : 0
            setConfirm(appConfirm > 0 ? appConfirm : null)
            setNotSuccess(appTranslationNotFound >0 ? appTranslationNotFound :null)
            setDefaultVal(appDefault)
          }
          
        }
        }, [app]);
    return (
        <div>
        <div className="progress-bar">
            <div style={{"width":`${confirm}%` }} className="progress-bar-success"></div>
            <div  style={{"width":`${notSuccess}%` }} className="progress-bar-error"></div>
            <div  style={{"width":`${defaultVal}%` }} className="progress-bar-default"></div>
        </div>
        {app.name == containerName &&  <div><div className="words-info">{app.nonTranslatedWords} / {totalWords} words</div> <div className="words-info confirm"> <CheckIcon sx={{color:'#00c853'}} fontSize="x-small" /> {app.translatedWords} Confirm</div><div className="words-info flag"> <FlagIcon sx={{color:'#ff6d00'}} fontSize="x-small" /> Flag?</div></div>}
        {app.name != containerName &&  <div className="words-info-wrapper"><div className="words-info confirm"> <CheckIcon sx={{color:'#00c853'}} fontSize="x-small" /> {app.translatedWords} Confirm?</div><span className="words-info-seperator"></span><div className="words-info flag"> <FlagIcon sx={{color:'#ff6d00'}} fontSize="x-small" /> Flag?</div></div>}

        </div>

    )
}
export default ProgressBar;