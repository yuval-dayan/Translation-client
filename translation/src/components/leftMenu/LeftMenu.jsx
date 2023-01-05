import { Button } from "@mui/material";
import React from "react";
import { useState,useEffect } from "react";
import '../leftMenu/style/leftMenu.css'
import ProgressBar from "./ProgressBar";
import { updateStatusFromDb } from "../../Helpers/DbHelper";

const LeftMenu = ({updateStatus, setContainerName, containerName,setPresentPopUp }) => {
    const [appStatus,setAppStatus] = useState([]);

    useEffect(() => {
        updateStatusFromDb(setAppStatus);
      }, []);

      useEffect(() => {
        updateStatusFromDb(setAppStatus);
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