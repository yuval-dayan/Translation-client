import { Button } from "@mui/material";
import React from "react";
import '../../components/MainRow.css'
import ProgressBar from "./ProgressBar";

const LeftMenu = ({ applicationsStatus, setContainerName, containerName }) => {

    const changeApp = (event) => {
        setContainerName(event.target.value)
    }
    return (
        <div className="left-menu">
            {applicationsStatus.length && applicationsStatus.map((app,index) =>
                <React.Fragment key={`${app.name} ${index}`}>
                    <div className="wrapper-seprator">
                        <div className="seprator left-div"></div>
                        <div className="seperator right-div"></div>
                    </div>
                    <div className={app.name == containerName ? 'left-menu-options choosen-app ' : 'left-menu-options'} key={(app && app.name)}>
                        <Button style={{ width: 300 ,color:"black"}} value={app.name} onClick={changeApp} color={app.nonTranslatedWords > 0 ? 'warning' : 'info'}> {app.name}</Button>
                        <ProgressBar app={app} containerName={containerName}/>
                    </div></React.Fragment>
            )}

        </div>

    )
}
export default LeftMenu;