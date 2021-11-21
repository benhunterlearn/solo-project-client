import {FormControlLabel, Switch} from "@mui/material";
import {useState} from "react";
import * as React from "react";

function AlarmSwitch(props) {
    return (
        <Switch
            checked={props.checked}
            onChange={props.handleChange}
            inputProps={{'aria-label': 'controlled'}}
        />
    );
}

export default function EnableAlarmSwitch(props) {
    const [checked, setChecked] = useState(props.alarm.enabled);

    const handleChange = (event) => {
        setChecked(event.target.checked);
        props.toggleAlarmEnabled(props.alarm);
    };

    return (
        <FormControlLabel
            control={<AlarmSwitch checked={checked}
                                  handleChange={(event) => handleChange(event)}
            />}
            label={checked ? "On" : "Off"}
            labelPlacement="bottom"
        />
    );
}
