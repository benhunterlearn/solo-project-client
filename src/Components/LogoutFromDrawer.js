import ListItemIcon from "@mui/material/ListItemIcon";
import LogoutIcon from '@mui/icons-material/Logout';
import {ListItemButton} from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import * as React from "react";

export function LogoutFromDrawer(props) {
    return (
        <ListItemButton onClick={() => props.handleLogout()}>
            <ListItemIcon>
                <LogoutIcon/>
            </ListItemIcon>
            <ListItemText primary="Log out"/>
        </ListItemButton>
    );
}