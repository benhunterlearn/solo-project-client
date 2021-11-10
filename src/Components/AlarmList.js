import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Title from "./Title";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import * as React from "react";
import {Button, FormControlLabel, Switch} from "@mui/material";
import EnableAlarmSwitch from "./EnableAlarmSwitch";


const Alarm = (props) => {
    return (
        // <Paper sx={{mr: 4, mb: 2, p: 2, flexGrow: 1}}>
        <Grid item xs={12} sm={12}>

            <Paper sx={{p: 2}}>

                <Title>
                    {props.alarm.name}
                </Title>

                <Grid container spacing={1}>
                    {/*consider md={6} in addition to xs*/}


                    <Grid item sm={2}>
                        <EnableAlarmSwitch alarm={props.alarm}
                                           toggleAlarmEnabled={props.toggleAlarmEnabled}/>

                    </Grid>

                    <Grid item sx={{textAlign: "left"}} xs={12} sm={8}>
                        <Typography component="p">
                            Target: {props.alarm.target}
                        </Typography>
                        <Typography color="text.secondary" sx={{flex: 1}}>
                            Interval: {props.alarm.intervalSeconds} second(s)
                        </Typography>
                        <Typography color="text.secondary" sx={{flex: 1}}>
                            Action: {props.alarm.action}
                        </Typography>
                    </Grid>

                    <Grid item sx={{textAlign: "left", display: "flex", alignItems: "center"}} xs={12} sm={4} md={1}>
                        <Button variant='outlined'
                                // onClick={() => props.updateAlarm(props.alarm)}
                        >Edit</Button>
                        <Button variant='outlined'
                                onClick={() => props.deleteAlarm(props.alarm)}
                        >Delete</Button>
                    </Grid>

                </Grid>

            </Paper>

        </Grid>
    );
}


export function AlarmList(props) {

    const renderAlarms = () => {
        return props.alarms.map((alarm) => <Alarm alarm={alarm}
                                                  deleteAlarm={props.deleteAlarm}
                                                  toggleAlarmEnabled={props.toggleAlarmEnabled}
        />);
    }

    return (
        <Grid container spacing={2} sx={{mb: 6}}>
            {renderAlarms()}
        </Grid>
    );
}