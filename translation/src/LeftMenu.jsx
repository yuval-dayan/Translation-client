import { Button } from "@mui/material";
import React from "react";
import './MainRow.css'

const LeftMenu = ({ applicationsStatus, setContainerName, containerName }) => {

    const currentApp = applicationsStatus.find(obj => obj.name == containerName)
    const changeApp = (event) => {
        setContainerName(event.target.value)
    }
    return (
        <div className="left-menu">
            {applicationsStatus.length && applicationsStatus.map((app,index) =>
                <React.Fragment key={`${app.name} ${index}`}>
                    <div className="wrapper-seprator">
                        <div className="seprator right-div"></div>
                        <div className="seperator left-div"></div>
                    </div>
                    <div className={app.name == containerName ? 'left-menu-options choosen-app ' : 'left-menu-options'} key={(app && app.name)}>
                        <Button style={{ width: 400 }} value={app.name} onClick={changeApp} color={app.nonTranslatedWords > 0 ? 'warning' : 'info'}> {app.name}</Button>
                        {app.name == containerName && <React.Fragment> <div>The number of words left to translate: {currentApp.nonTranslatedWords}</div> <div>You've already translate {currentApp.translatedWords} words</div></React.Fragment>}
                    </div></React.Fragment>
            )}

        </div>

    )
}
export default LeftMenu;