import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Title from "./Title";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import * as React from "react";
import TextField from '@mui/material/TextField';
import Box from "@mui/material/Box";
import {Button} from "@mui/material";
import {useState} from "react";

export function AddAlarmForm(props) {

    const defaultAlarm = {
        name: 'My Alarm',
        target: '',
        action: 'HTTP',
        interval: 1,  // minutes
        webhook: '',  // Discord Webhook
    }

    const [newAlarm, setNewAlarm] = useState({...defaultAlarm});

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Add alarm onSubmit");
        // TODO implement API call to create alarm on back end.
    };

    return <Container sx={{mt: 4, mb: 4}}>
        <Grid>
            <Paper>
                <Title>
                    Add a new Alarm
                </Title>

                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': {m: 1, width: '25ch'},
                    }}
                    noValidate
                    autoComplete="off"
                >

                    <form onSubmit={(event) => handleSubmit(event)}>

                        <div>

                            <TextField
                                required
                                id="outlined-required"
                                label="Name"
                                defaultValue="My Alarm"
                            />

                            <TextField
                                required
                                id="outlined-required"
                                label="Target"
                                defaultValue="http://www.google.com"
                            />
                            <TextField
                                disabled
                                id="outlined-required"
                                label="Action"
                                defaultValue="HTTP"
                            />
                            <TextField
                                disabled
                                id="outlined-required"
                                label="Interval (minutes)"
                                defaultValue="1"
                            />

                            <TextField
                                required
                                id="webhook"
                                label="Discord Webhook"
                                defaultValue="webhook"
                            />

                        </div>

                        <div>

                            <Button
                                type="submit"
                                variant="contained"
                                sx={{my: 3}}
                                onClick={(event) => handleSubmit(event)}
                            >
                                Add Alarm
                            </Button>

                        </div>

                    </form>

                </Box>
            </Paper>
        </Grid>
    </Container>
}