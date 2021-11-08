import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Title from "./Title";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import * as React from "react";
import * as PropTypes from "prop-types";

const Alarm = (props) => {
    return <Container sx={{mt: 4, mb: 4}}>
        <Grid>
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
            </Paper>
        </Grid>
    </Container>
}

Alarm.propTypes = {alarm: PropTypes.any};

export function AlarmList(props) {

    const renderAlarms = () => {
        return props.alarms.map((alarm) => <Alarm alarm={alarm} />);
    }

    return renderAlarms();
}