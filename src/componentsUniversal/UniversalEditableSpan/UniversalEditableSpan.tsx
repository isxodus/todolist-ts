import React, {useState} from "react";
import {TextField} from "@mui/material";
import {UniversalInputArea} from "../UniversalInputArea/UniversalInputArea";


// DEFAULT PROPS

// LOCAL TYPES


// UNIVERSAL TYPE
export type UniversalEditableSpanPropsType = {
    text: string
    onEntityFunction: (newText: string) => void
}


// COMPONENT
function UniversalEditableSpanHidden(props: UniversalEditableSpanPropsType) {
    console.log('UniversalEditableSpan was rendered:',props.text)

    const [editMode, setEditMode] = useState(false)
    const activateEditMode = () => setEditMode(!editMode)
    //const [localText, setLocalText] = useState(props.text)
    // useEffect(() => (setLocalText(props.text)), [props.text])

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
export const UniversalEditableSpan = React.memo(UniversalEditableSpanHidden)