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


    const [editMode, setEditMode] = useState(false)
    const activateEditMode = () => setEditMode(!editMode)
    //const [localText, setLocalText] = useState(props.text)
    // useEffect(() => (setLocalText(props.text)), [props.text])

    //main callback
    const onEntityFunctionHandler = (text: string) => props.onEntityFunction(text)
    //onblur callback
    const onBlurHandler = () => activateEditMode()


    // console.log('UniversalEditableSpan was rendered:', props.text)
    return editMode
        ? <UniversalInputArea type={'input'} initText={props.text} onEntityFunction={onEntityFunctionHandler}
                              autoFocus={true} onBlurFunction={onBlurHandler}/>
        : <TextField variant="standard" disabled value={props.text} onDoubleClick={activateEditMode}
                     InputProps={{disableUnderline: true, color: 'primary'}}
                     sx={{"& .MuiInputBase-input.Mui-disabled": {WebkitTextFillColor: "black",},}}/>
}

export const UniversalEditableSpan = React.memo(UniversalEditableSpanHidden)