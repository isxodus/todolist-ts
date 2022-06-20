import React, {useState} from "react";
import {LinearProgress, TextField} from "@mui/material";
import {UniversalInputArea} from "../UniversalInputArea/UniversalInputArea";


// DEFAULT PROPS

// LOCAL TYPES


// UNIVERSAL TYPE
export type UniversalEditableSpanPropsType = {
    text: string
    disableInputArea?: boolean
    onEntityFunction: (newText: string) => void
    showProgress?: boolean
}


// COMPONENT

export const UniversalEditableSpan: React.FC<UniversalEditableSpanPropsType> = React.memo((
        {
            text,
            disableInputArea = false,
            onEntityFunction,
            showProgress = false
        }) => {


        const [editMode, setEditMode] = useState(false)
        const activateEditMode = () => {
            if (!disableInputArea) setEditMode(!editMode)
        }
        //const [localText, setLocalText] = useState(props.text)
        // useEffect(() => (setLocalText(props.text)), [props.text])

        //main callback
        const onEntityFunctionHandler = (text: string) => onEntityFunction(text)
        //onblur callback
        const onBlurHandler = () => activateEditMode()


        console.log('UniversalEditableSpan was rendered:', showProgress)
        return <div>
            {editMode
                ? <UniversalInputArea type={'input'} initText={text} onEntityFunction={onEntityFunctionHandler}
                                      autoFocus={true} onBlurFunction={onBlurHandler}/>
                : <TextField variant="standard" disabled value={text} onDoubleClick={activateEditMode}
                             InputProps={{disableUnderline: true, color: 'primary'}}
                             sx={{"& .MuiInputBase-input.Mui-disabled": {WebkitTextFillColor: "black",},}}/>}
            {showProgress && <LinearProgress/>}
        </div>
    }
)