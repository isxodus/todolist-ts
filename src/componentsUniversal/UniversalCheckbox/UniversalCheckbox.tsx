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
const UniversalCheckboxHidden: React.FC<UniversalCheckboxPropsType> = (
    {
        checked,
        handler
    }) => {
    console.log('UniversalCheckbox was rendered')
    return <Checkbox checked={checked} onChange={handler}/>
}
export const UniversalCheckbox = React.memo(UniversalCheckboxHidden)