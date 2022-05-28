import React from 'react';
import {Checkbox} from "@mui/material";


// DEFAULT PROPS

// LOCAL TYPES


// UNIVERSAL TYPE
export type  UniversalCheckboxPropsType = {
    checked: boolean
    handler: () => void
}


// COMPONENT
export const UniversalCheckbox: React.FC<UniversalCheckboxPropsType> = React.memo((
    {
        checked,
        handler
    }) => {
    console.log('UniversalCheckbox was rendered')
    return <Checkbox checked={checked} onChange={handler}/>
})