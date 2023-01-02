import { Button } from "@mui/material";
import React from "react";
import { useState,useEffect } from "react";
import '../../components/MainRow.css'
import ProgressBar from "./ProgressBar";

const LeftMenu = ({updateStatus, setContainerName, containerName,setPresentPopUp }) => {
    const [appStatus,setAppStatus] = useState([]);
    useEffect(() => {
        fetch('http://localhost:7776/words/status')
          .then(response => response.json()).then(data => setAppStatus(data)).catch(e => console.error(e))
    
      }, []);
      useEffect(() => {
        fetch('http://localhost:7776/words/status')
          .then(response => response.json()).then(data => setAppStatus(data)).catch(e => console.error(e))
    
      }, [updateStatus]);
    const changeApp = (event) => {
        setContainerName(event.target.value);
        setPresentPopUp(true)
       
    }
    return (
        <div className="left-menu">
            {appStatus.length && appStatus.map((app,index) =>
                <React.Fragment key={`${app.name} ${index}`}>
                    <div className="wrapper-seprator">
                    </div>
                    <div className={app.name == containerName ? 'left-menu-options choosen-app ' : 'left-menu-options'} key={(app && app.name)}>
                        <Button style={{ width: 300 ,color:"black"}} value={app.name} onClick={(e)=>{changeApp(e)}} color={app.nonTranslatedWords > 0 ? 'warning' : 'info'}> {app.name}</Button>
                        <ProgressBar app={app} containerName={containerName}/>
                    </div></React.Fragment>
            )}

        </div>

    )
}
export default LeftMenu;