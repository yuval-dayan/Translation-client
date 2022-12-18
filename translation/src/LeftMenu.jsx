import { Button } from "@mui/material";
import React from "react";
import './MainRow.css'

const LeftMenu = ({ applicationsStatus, setContainerName, containerName }) => {
    const changeApp = (event) => {
        setContainerName(event.target.value)
    }

    return (
        <div className="left-menu">
            {applicationsStatus.length && applicationsStatus.map((app) =>
                <div className={app.name == containerName ? 'left-menu-options choosen-app' : 'left-menu-options'} key={(app && app.name)}>
                    <Button style={{ width: 400 }}value={app.name} onClick={changeApp}> {app.name}</Button>
                </div>
            )}

        </div>

    )
}
export default LeftMenu;