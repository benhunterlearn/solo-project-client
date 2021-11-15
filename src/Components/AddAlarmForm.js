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
import Link from "@mui/material/Link";

export function AddAlarmForm(props) {

    const defaultAlarm = {
        name: '',
        target: '',
        action: 'HTTP',
        intervalSeconds: 1,
        webhook: '',  // Discord Webhook
    }

    const [newAlarm, setNewAlarm] = useState({...defaultAlarm});

    const handleSubmit = (event) => {
        event.preventDefault();

        // TODO input validation.

        props.addAlarm(newAlarm);

        // Reset form to default.
        console.log("Resetting form to: " + JSON.stringify(defaultAlarm));
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

    return (
        // <Container sx={{mt: 0, mb: 4}}>
        <Grid container id="AddAlarmForm">
            <Paper sx={{p: 2}}>
                <Title>
                    Add a new Alarm
                </Title>

                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': {m: 1, width: '30ch'},
                    }}
                    noValidate
                    autoComplete="off"
                    onSubmit={(event) => handleSubmit(event)}
                    onChange={(event) => handleChange(event)}
                >

                    <div>

                        <TextField
                            required
                            name="name"
                            label="Name"
                            placeholder={newAlarm.name}
                            value={newAlarm.name}
                            helperText="Name your new alarm."
                        />
                        <TextField
                            required
                            name="target"
                            label="Target"
                            placeholder="http://www.google.com"
                            value={newAlarm.target}
                            helperText="The HTTP address to check."
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
                            label="Interval (seconds)"
                            defaultValue={newAlarm.intervalSeconds}
                            helperText="How often to check the target."
                        />
                        <TextField
                            required
                            name="webhook"
                            label="Discord Webhook"
                            value={newAlarm.webhook}
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
                    <Link href="https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks" underline="hover">
                        {'Help with Discord Webhooks'}
                    </Link>
                </Box>
            </Paper>
        </Grid>
    );
    // </Container>
}