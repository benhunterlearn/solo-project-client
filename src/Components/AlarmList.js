import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Title from "./Title";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import * as React from "react";
import {Button} from "@mui/material";

const Alarm = (props) => {
    return (
        <Paper sx={{mr: 4, mb: 2, p: 2, flexGrow: 1}}>

            <Grid container item xs={12}>
                {/*consider md={6} in addition to xs*/}


                <Grid item sx={{textAlign: "left"}} xs={12} sm={6}>
                    <Title>
                        {props.alarm.name}
                    </Title>
                    <Typography component="p">
                        Target: {props.alarm.target}
                    </Typography>
                </Grid>

                <Grid item sx={{textAlign: "left"}} xs={12} sm={6}>

                    <Typography color="text.secondary" sx={{flex: 1}}>
                        Action: {props.alarm.action}
                    </Typography>
                    <Typography>
                        Interval: {props.alarm.interval} minute
                    </Typography>
                    <Button variant='outlined'
                            onClick={() => props.deleteAlarm(props.alarm)}
                    >Delete</Button>

                </Grid>

            </Grid>

        </Paper>
    );
}


export function AlarmList(props) {

    const renderAlarms = () => {
        return props.alarms.map((alarm) => <Alarm alarm={alarm}
                                                  deleteAlarm={props.deleteAlarm}
        />);
    }

    return (
        <Container sx={{mx: 4, my: 4}}>
            <Grid container columnSpacing={4} rowSpacing={2}>
                {renderAlarms()}
            </Grid>
        </Container>
    );
}