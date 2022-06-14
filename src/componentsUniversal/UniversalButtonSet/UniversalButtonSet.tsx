import React, {DetailedHTMLProps, InputHTMLAttributes} from 'react';
import {ButtonGroup} from "@mui/material";
import {UniversalButton} from "../UniversalButton/UniversalButton";


// DEFAULT PROPS
type DefaultButtonPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
// LOCAL TYPES


// UNIVERSAL TYPE
export type  UniversalButtonPropsType = DefaultButtonPropsType & {
    buttonArray: Array<string>
    onEntityFunction: (text: any) => void
    defaultFilter: string
}


// COMPONENT
const UniversalButtonSetHidden: React.FC<UniversalButtonPropsType> = (
    {
        buttonArray,
        onEntityFunction,
        defaultFilter
    }) => {
    // console.log('UniversalButtonSet was rendered')
    return <ButtonGroup variant="outlined" aria-label="outlined button group">
        {buttonArray.map(el => {
            return <UniversalButton key={el} muiVariant={defaultFilter === el ? 'contained' : 'outlined'}
                                    onEntityFunction={() => onEntityFunction(el)}
                                    buttonText={el}/>
        })}
    </ButtonGroup>
}
export const UniversalButtonSet = React.memo(UniversalButtonSetHidden)