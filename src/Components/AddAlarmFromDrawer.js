import ListItemIcon from "@mui/material/ListItemIcon";
import AddAlertIcon from "@mui/icons-material/AddAlert";
import ListItemText from "@mui/material/ListItemText";
import {Button, ListItemButton, Modal} from "@mui/material";
import * as React from "react";
import {useState} from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export function AddAlarmFromDrawer() {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return <ListItemButton onClick={() => window.location.replace("#add")}>
        <ListItemIcon>
            <AddAlertIcon/>
        </ListItemIcon>
        <ListItemText primary="Add a new Alarm"/>

        {/* TODO Use Dialog instead, see LoginFromDrawer component for an example. */}
        {/* Modal isn't closing. May because it's nested in the list? */}
        {/*<Modal*/}
        {/*    open={open}*/}
        {/*    onClose={handleClose}*/}
        {/*    aria-labelledby="modal-modal-title"*/}
        {/*    aria-describedby="modal-modal-description"*/}
        {/*>*/}
        {/*    <Box sx={style}>*/}
        {/*        <Typography id="modal-modal-title" variant="h6" component="h2">*/}
        {/*            Text in a modal*/}
        {/*        </Typography>*/}
        {/*        <Typography id="modal-modal-description" sx={{mt: 2}}>*/}
        {/*            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.*/}
        {/*        </Typography>*/}
        {/*    </Box>*/}
        {/*</Modal>*/}

    </ListItemButton>
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
