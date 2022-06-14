import React from 'react';
import {Checkbox} from "@mui/material";


// DEFAULT PROPS

// LOCAL TYPES


// UNIVERSAL TYPE
export type  UniversalCheckboxPropsType = {
    checked: boolean
    handler: () => void
    /**
     * In case CHECKED in UI should be shown not for boolean true
     */
    trueInd?: any
}


// COMPONENT
export const UniversalCheckbox: React.FC<UniversalCheckboxPropsType> = React.memo((
    {
        checked,
        handler,
        trueInd = true
    }) => {
    // console.log('UniversalCheckbox was rendered', checked, trueInd)
    const localChecked = checked === trueInd
    return <Checkbox checked={localChecked} onChange={handler}/>
})