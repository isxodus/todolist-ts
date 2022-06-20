import React, {DetailedHTMLProps, InputHTMLAttributes, ReactNode} from 'react';
import {Button, CircularProgress, IconButton} from "@mui/material";
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
    showProgress?: boolean
}


// COMPONENT
export const UniversalButton: React.FC<UniversalButtonPropsType> = React.memo((
    {
        onEntityFunction,
        buttonText = '',
        muiVariant = 'outlined',
        muiIcon,
        disabled = false,
        showProgress = false
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

    //console.log('UniversalButton was rendered')
    return <>
        {disabled && showProgress
            ? <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <CircularProgress size="1.6em"/></div>
            : buttonText
                ? <Button variant={muiVariant} startIcon={localIcon} onClick={onEntityFunction}
                          disabled={disabled}>{buttonText}</Button>
                : <IconButton onClick={onEntityFunction} disabled={disabled}>{localIcon}</IconButton>
        }
    </>
})