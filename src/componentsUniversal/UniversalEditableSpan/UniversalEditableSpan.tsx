import React, {useState} from "react";
import css from './UniversalEditableSpan.module.css'
import {UniversalInputArea} from "../UniversalInputArea/UniversalInputArea";
import {Box, TextField} from "@mui/material";


//
// // DEFAULT PROPS FOR INPUT AND TEXTAREA
// type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLSpanElement>, HTMLInputElement>
// type DefaultTextAreaPropsType = DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>
// // TYPES
// type UniversalInputAreaTypeType = 'textarea' | 'input'
// type KeyInputType = 'both' | 'ctrlEnter' | 'enter'


type UniversalEditableSpanPropsType = {
    text: string
    onEntityFunction: (newText: string) => void
}

export function UniversalEditableSpan(props: UniversalEditableSpanPropsType) {
    const [editMode, setEditMode] = useState(false)
    const activateEditMode = () => setEditMode(!editMode)

    //main callback
    const onEntityFunctionHandler = (text: string) => props.onEntityFunction(text)
    //onblur callback
    const onBlurHandler = () => activateEditMode()

    return editMode
        ? <UniversalInputArea type={'input'} initText={props.text} onEntityFunction={onEntityFunctionHandler}
                              autoFocus={true} onBlurFunction={onBlurHandler}/>
        : <TextField variant="standard" disabled defaultValue={props.text} onDoubleClick={activateEditMode}
                     InputProps={{disableUnderline: true, color: 'primary'}}
                     sx={{"& .MuiInputBase-input.Mui-disabled": {WebkitTextFillColor: "black",},}}/>
}