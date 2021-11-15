import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    ListItemButton,
    TextField
} from "@mui/material";
import ListItemIcon from "@mui/material/ListItemIcon";
import LoginIcon from "@mui/icons-material/Login";
import {useState} from "react";

export function LoginFromDrawer(props) {
    const [open, setOpen] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChangeUsername = (event) => {
        setUsername(event.target.value);
    }

    const handleChangePassword = (event) => {
        setPassword(event.target.value);
    }

    const handleLogin = () => {
        console.log("logging in with: " + username + " " + password);
        // TODO check if credentials are valid.
        props.handleLogin(username, password);
        handleClose();
    }

    return (
        <>
            <ListItemButton onClick={() => handleOpen()}>
                <ListItemIcon>
                    <LoginIcon/>
                </ListItemIcon>
            </ListItemButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Login</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To login to @YourService, please enter your username and password.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Username"
                        type="email"
                        fullWidth
                        variant="standard"
                        value={username}
                        onChange={(event) => handleChangeUsername(event)}
                    />
                    <TextField
                        margin="dense"
                        id="password"
                        label="Password"
                        type="password"
                        fullWidth
                        variant="standard"
                        value={password}
                        onChange={(event) => handleChangePassword(event)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleLogin}>Login</Button>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}