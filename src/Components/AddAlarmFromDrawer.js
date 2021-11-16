import ListItemIcon from "@mui/material/ListItemIcon";
import AddAlertIcon from "@mui/icons-material/AddAlert";
import ListItemText from "@mui/material/ListItemText";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    ListItemButton,
    Modal
} from "@mui/material";
import * as React from "react";
import {useState} from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {AddAlarmForm} from "./AddAlarmForm";
import TextField from "@mui/material/TextField";

export function AddAlarmFromDrawer(props) {

    const defaultAlarm = {
        name: '',
        target: '',
        action: 'HTTP',
        intervalSeconds: 1,
        webhook: '',  // Discord Webhook
    }

    const [newAlarm, setNewAlarm] = useState({...defaultAlarm});

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        console.log("Closing AddAlarmFromDrawer")
        setOpen(false);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        // TODO input validation.

        props.addAlarm(newAlarm);

        // Reset form to default.
        console.log("Resetting form to: " + JSON.stringify(defaultAlarm));
        setNewAlarm({...defaultAlarm});
        handleClose();
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

    return <>
        <ListItemButton onClick={() => handleOpen()}>
            {/*<ListItemButton onClick={() => window.location.replace("#add")}>*/}
            <ListItemIcon>
                <AddAlertIcon/>
            </ListItemIcon>
            <ListItemText primary="Add a new Alarm"/>
        </ListItemButton>
            {/* Prepping to move AddAlarmForm into Dialog. */}
            <Dialog open={open}
                    onClose={() => handleClose()}
                    onChange={(event) => handleChange(event)}
                    onSubmit={(event) => handleSubmit(event)}
            >
                <DialogTitle>Add an Alarm</DialogTitle>
                <DialogContent
                >
                    {/*<DialogContentText>*/}
                    {/*    content text*/}
                    {/*</DialogContentText>*/}
                    <TextField
                        autoFocus
                        margin="dense"
                        fullWidth
                        required
                        name="name"
                        label="Name"
                        placeholder={newAlarm.name}
                        value={newAlarm.name}
                        helperText="Name your new alarm."
                    />
                    <TextField
                        required
                        margin="dense"
                        fullWidth
                        name="target"
                        label="Target"
                        placeholder="http://www.google.com"
                        value={newAlarm.target}
                        helperText="The HTTP address to check."
                    />
                    <TextField
                        disabled
                        margin="dense"
                        name="action"
                        label="Action"
                        defaultValue={newAlarm.action}
                    />
                    <TextField
                        disabled
                        margin="dense"
                        name="interval"
                        label="Interval (seconds)"
                        defaultValue={newAlarm.intervalSeconds}
                        helperText="How often to check the target."
                    />
                    <TextField
                        required
                        margin="dense"
                        fullWidth
                        name="webhook"
                        label="Discord Webhook"
                        value={newAlarm.webhook}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={(event) => handleSubmit(event)}>Add</Button>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>

    </>
}

// const style = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: 400,
//     bgcolor: 'background.paper',
//     border: '2px solid #000',
//     boxShadow: 24,
//     p: 4,
// };
