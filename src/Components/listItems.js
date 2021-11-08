import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AddAlertIcon from '@mui/icons-material/AddAlert';
import {Button, Modal} from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {useState} from "react";


export const mainListItems = (props) => {
    return <div>
        <ListItem button>
            <ListItemIcon>
                <DashboardIcon/>
            </ListItemIcon>
            <ListItemText primary="Alarms"/>
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <AddAlertIcon/>
            </ListItemIcon>
            <ListItemText primary="Add a new Alarm"/>
        </ListItem>
    </div>
};
