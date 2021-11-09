import * as React from 'react';
import {useEffect, useState} from 'react';
import {createTheme, styled, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Title from "./Title";
import ListItemIcon from "@mui/material/ListItemIcon";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ListItemText from "@mui/material/ListItemText";
import {ListItemButton} from "@mui/material";
import {AddAlarmFromDrawer} from "./AddAlarmFromDrawer";
import {AddAlarmForm} from "./AddAlarmForm";
import * as PropTypes from "prop-types";
import {AlarmList} from "./AlarmList";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({theme, open}) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

const mdTheme = createTheme();

AlarmList.propTypes = {alarms: PropTypes.arrayOf(PropTypes.any)};

function DashboardContent() {
    const [open, setOpen] = React.useState(false);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    const [alarms, setAlarms] = useState([]);

    const loadAlarms = () => {
        // Load alarms from server.
        fetch('http://localhost:8080/api/alarms')
            .then(response => response.json())
            .then(json => {
                setAlarms(json._embedded.alarms);
                console.log(json._embedded.alarms)
            });
    }

// Load Alarms from the server.
    useEffect(() => {

        // setAlarms([
        //     {
        //         name: 'Monitor web.benhunter.me',
        //         target: 'http://web.benhunter.me',
        //         action: 'HTTP',
        //         interval: 1,  // minutes
        //         webhook: '(discord webhook)',  // Discord Webhook
        //     },
        //     {
        //         name: 'Monitor home.benhunter.me',
        //         target: 'http://home.benhunter.me',
        //         action: 'HTTP',
        //         interval: 1,  // minutes
        //         webhook: '(discord webhook)',  // Discord Webhook
        //     },
        // ]);

        loadAlarms();

    }, [])

    const addAlarm = (newAlarm) => {

        // Add alarm to local state
        // setAlarms([...alarms, newAlarm]);

        // API call to create alarm on back end.
        console.log("Add alarm.");

        fetch('http://localhost:8080/api/alarms', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newAlarm),
        })
            .then(response => loadAlarms())
    };

    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{display: 'flex'}}>
                <CssBaseline/>
                <AppBar position="absolute" open={open}>

                    {/* Top Toolbar*/}
                    <Toolbar
                        sx={{
                            pr: '24px', // keep right padding when drawer closed
                        }}
                    >
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: '36px',
                                ...(open && {display: 'none'}),
                            }}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{flexGrow: 1}}
                        >
                            @YourService
                        </Typography>
                        <IconButton color="inherit">
                            <Badge badgeContent={4} color="secondary">
                                <NotificationsIcon/>
                            </Badge>
                        </IconButton>
                    </Toolbar>
                </AppBar>

                <Drawer variant="permanent" open={open}>
                    <Toolbar
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            px: [1],
                        }}
                    >
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon/>
                        </IconButton>
                    </Toolbar>
                    <Divider/>

                    <List>

                        <ListItemButton>
                            <ListItemIcon>
                                <DashboardIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Alarms"/>
                        </ListItemButton>
                        <AddAlarmFromDrawer/>

                    </List>

                </Drawer>


                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >

                    {/* Header inside main content. */}
                    {/* Toolbar adds margin for the actual toolbar above the content. */}
                    <Toolbar/>

                    {/* Current alarms */}
                    <AlarmList alarms={alarms}
                    />

                    <AddAlarmForm
                        addAlarm={(alarm) => addAlarm(alarm)}
                    />

                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default function Dashboard() {
    return <DashboardContent/>;
}
