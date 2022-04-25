import React, {useState} from "react";
import {UniversalInputArea} from "../UniversalInputArea/UniversalInputArea";
import {Box} from "@mui/material";

type UniversalEditableSpanPropsType = {
    text: string
    onEntityFunction: (newText: string) => void
}

export function UniversalEditableSpan(props: UniversalEditableSpanPropsType) {
    const [editMode, setEditMode] = useState(false)
    const activateEditMode = () => setEditMode(!editMode)

    //main callback
    const onEntityFunctionHandler = (text: string) => {
        props.onEntityFunction(text)
    }
    //onblur callback
    const onBlurHandler = () => {

        activateEditMode()
    }

    return editMode
        ? <UniversalInputArea type={'input'} onEntityFunction={onEntityFunctionHandler} initText={props.text}
                              autoFocus={true} onBlurFunction={onBlurHandler}/>
        //<input onBlur={activateEditMode} autoFocus={true} value={props.text}/>
        : <Box component="div" sx={{ display: 'inline' }} onDoubleClick={activateEditMode}>{props.text}</Box>
}