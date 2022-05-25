import React, {DetailedHTMLProps, InputHTMLAttributes, ReactNode} from 'react';
import {Button, IconButton} from "@mui/material";
import {Add, Delete} from "@mui/icons-material";


// DEFAULT PROPS
type DefaultButtonPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
// LOCAL TYPES


// UNIVERSAL TYPE
export type  UniversalButtonPropsType = DefaultButtonPropsType & {
    onEntityFunction: () => void
    buttonText?: string
    muiVariant?: 'outlined' | 'text' | 'contained'
    muiIcon?: 'add' | 'delete'
}


// COMPONENT
const UniversalButtonHidden: React.FC<UniversalButtonPropsType> = (
    {
        onEntityFunction,
        buttonText = '',
        muiVariant = 'outlined',
        muiIcon
    }) => {
    //SET ICON
    const getIcon = (): ReactNode => {
        switch (muiIcon) {
            case 'add':
                return <Add/>
            case 'delete':
                return <Delete/>
            default:
                if (buttonText) return undefined
                else return <Add/>
        }
    }
    const localIcon = getIcon()


    return <>
        {buttonText
            ? <Button variant={muiVariant} startIcon={localIcon} onClick={onEntityFunction}>{buttonText}</Button>
            : <IconButton onClick={onEntityFunction}>{localIcon}</IconButton>
        }
    </>
}
export const UniversalButton = React.memo(UniversalButtonHidden)