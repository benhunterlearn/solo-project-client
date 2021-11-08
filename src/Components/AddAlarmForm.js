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
        target: 'http://www.google.com',
        action: 'HTTP',
        interval: 1,  // minutes
        webhook: '(discord webhook)',  // Discord Webhook
    }

    const [newAlarm, setNewAlarm] = useState({...defaultAlarm});

    const handleSubmit = (event) => {
        event.preventDefault();

        // TODO input validation.

        props.addAlarm(newAlarm);

        // Reset form to default.
        setNewAlarm({...defaultAlarm});

    };

    const handleChange = (event) => {
        if (event.target.name == 'name') {
            setNewAlarm({...newAlarm, name: event.target.value});
        } else if (event.target.name == 'target') {
            setNewAlarm({...newAlarm, target: event.target.value});
        } else if (event.target.name == 'webhook') {
            setNewAlarm({...newAlarm, webhook: event.target.value});
        }
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

                    <form onSubmit={(event) => handleSubmit(event)}
                          onChange={(event) => handleChange(event)}
                    >

                        <div>

                            <TextField
                                required
                                name="name"
                                label="Name"
                                defaultValue={newAlarm.name}
                            />
                            <TextField
                                required
                                name="target"
                                label="Target"
                                defaultValue={newAlarm.target}
                            />
                            <TextField
                                disabled
                                name="action"
                                label="Action"
                                defaultValue={newAlarm.action}
                            />
                            <TextField
                                disabled
                                name="interval"
                                label="Interval (minutes)"
                                defaultValue={newAlarm.interval}
                            />
                            <TextField
                                required
                                name="webhook"
                                label="Discord Webhook"
                                defaultValue={newAlarm.webhook}
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