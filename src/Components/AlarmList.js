import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Title from "./Title";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import * as React from "react";
import * as PropTypes from "prop-types";
import {Button} from "@mui/material";
import Box from "@mui/material/Box";

const Alarm = (props) => {
    return (
        // <Container sx={{mt: 4, mb: 4}}>
        <Grid item xs={12}>
            {/*consider md={6} in addition to xs*/}

            <Paper>

                <Title>
                    {props.alarm.name}
                </Title>
                <Typography component="p">
                    Target: {props.alarm.target}
                </Typography>
                <Typography color="text.secondary" sx={{flex: 1}}>
                    Action: {props.alarm.action}
                </Typography>
                <Typography>
                    Interval: {props.alarm.interval} minute
                </Typography>
                <Button variant='outlined'
                        onClick={() => props.deleteAlarm(props.alarm)}
                >Delete</Button>

            </Paper>

        </Grid>

        // </Container>
    );
}

Alarm.propTypes = {alarm: PropTypes.any};

export function AlarmList(props) {

    const renderAlarms = () => {
        return props.alarms.map((alarm) => <Alarm alarm={alarm}
                                                  deleteAlarm={props.deleteAlarm}
        />);
    }

    return (
        <Container>
            <Grid container columnSpacing={4} rowSpacing={2}>
                {renderAlarms()}
            </Grid>
        </Container>
    );
}