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
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import {ListItemButton} from "@mui/material";
import {AddAlarmFromDrawer} from "./AddAlarmFromDrawer";
import {AddAlarmForm} from "./AddAlarmForm";
import * as PropTypes from "prop-types";
import {AlarmList} from "./AlarmList";
import {utf8_to_b64} from "./b64Utils";
import {LoginFromDrawer} from "./LoginFromDrawer";
import {LogoutFromDrawer} from "./LogoutFromDrawer";

// const BASIC_AUTH_TOKEN = utf8_to_b64("user:password");

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

    const [basicAuthToken, setBasicAuthToken] = useState(null);

    const loadAlarms = () => {
        // Load alarms from server.
        console.log("Loading alarms. Checking basicAuthToken: " + basicAuthToken);
        if (basicAuthToken === null) {
            console.log("basicAuthToken is null.");
            setAlarms([]);  // Clear the alarms if user is not logged in.
            return;
        }
        console.log("Fetching alarms.")
        fetch('http://localhost:8080/api/alarms', {
                method: "GET",
                headers: {
                    'Authorization': 'Basic ' + basicAuthToken,
                }
            }
        )
            .then(response => {
                console.log("Got a response:");
                console.log(response);
                if (response.status === 401) {
                    console.log("HTTP status 401, Unauthorized.")
                    setAlarms([]);
                    return Promise.reject("Unauthorized request.");
                }
                console.log("Getting the json.");
                return response.json();
            })
            .then(json => {
                setAlarms(json._embedded.alarms);
                console.log(json._embedded.alarms)
            })
            .catch((reason) => console.log(reason))
            .finally(() => console.log("End of loadAlarms()"));
    }

    // Load Alarms from the server.
    useEffect(() => {
        loadAlarms();
    }, [])

    const addAlarm = (newAlarm) => {

        // TODO Add alarm to local state (caching?)
        // setAlarms([...alarms, newAlarm]);

        // API call to create alarm on back end.
        fetch('http://localhost:8080/api/alarms', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + basicAuthToken,
            },
            body: JSON.stringify(newAlarm),
        })
            .then(response => loadAlarms())
    };

    const deleteAlarm = (alarm) => {
        fetch(alarm._links.self.href, {
            method: "DELETE",
            headers: {
                'Authorization': 'Basic ' + basicAuthToken,
            },
        })
            .then(response => loadAlarms())
    }

    function toggleAlarmEnabled(alarm) {
        const newAlarmEnabled = {
            enabled: !alarm.enabled,
        };

        console.log("Toggle alarm: " + alarm.name);
        fetch(alarm._links.self.href, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + basicAuthToken,
            },
            body: JSON.stringify(newAlarmEnabled),
        })
            .then(response => loadAlarms());
    }

    function handleLogin(username, password) {
        const token = utf8_to_b64(username + ":" + password);
        console.log("Auth Token: " + token);

        setBasicAuthToken(token);  // Use the useEffect hook to load the user's alarms after the token is set.

        // TODO test the token here or in <LoginFromDrawer/>?
        // Probably there so the user has a chance to fix their login info.
    }

    function handleLogout() {
        setBasicAuthToken(null);
    }

    // Update the user's alarms when their credentials change.
    useEffect(() => {
        loadAlarms();
    }, [basicAuthToken]);

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
                            <Badge badgeContent={alarms.length} color="secondary">
                                <NotificationsIcon/>
                            </Badge>
                        </IconButton>
                    </Toolbar>
                </AppBar>

                {/* Drawer on left side. */}
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

                        <ListItemButton onClick={() => window.location.replace("#alarms")}>
                            <ListItemIcon>
                                <DashboardIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Alarms"/>
                        </ListItemButton>


                        {basicAuthToken ?
                            <>
                                <AddAlarmFromDrawer/>
                                <LogoutFromDrawer handleLogout={() => handleLogout()}/>
                            </>
                            :
                                <LoginFromDrawer handleLogin={(username, password) => handleLogin(username, password)}/>
                        }

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
                    <Toolbar sx={{mb: 2}} id="alarms"/>

                    <Container>

                        {/* Current alarms */}
                        <AlarmList alarms={alarms}
                                   deleteAlarm={(alarm) => deleteAlarm(alarm)}
                                   toggleAlarmEnabled={(alarm) => toggleAlarmEnabled(alarm)}
                        />

                        <AddAlarmForm
                            addAlarm={(alarm) => addAlarm(alarm)}
                        />

                    </Container>


                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default function Dashboard() {
    return <DashboardContent/>;
}
