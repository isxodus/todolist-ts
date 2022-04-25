import React, {useState, KeyboardEvent, DetailedHTMLProps, InputHTMLAttributes, TextareaHTMLAttributes, ChangeEvent} from 'react';
import css from './UniversalInputArea.module.css'
import {Box, Button, IconButton, TextField} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {Add} from '@mui/icons-material';




// DEFAULT PROPS FOR INPUT AND TEXTAREA
type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
type DefaultTextAreaPropsType = DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>
// TYPES
type UniversalInputAreaTypeType = 'textarea' | 'input'
type KeyInputType = 'both' | 'ctrlEnter' | 'enter'


// UNIVERSAL TYPE
export type  UniversalInputAreaPropsType = DefaultInputPropsType & DefaultTextAreaPropsType & {
    type: UniversalInputAreaTypeType
    onEntityFunction: (newText: string) => void
    //optional input area
    placeholders?: Array<string>
    initText?: string
    forbidEmptyInput?: boolean
    minRows?: number
    maxRows?: number
    //optional buttons
    /**
     * Function for an onBlur event. Hides the main button
     */
    onBlurFunction?: () => void
    /**
     * Text for the main button, if it is shown (onBlurFunction). By default: '+'
     */
    addButtonText?: string
    showCancelButton?: boolean
    cancelButtonText?: string
    keyPressMode?: KeyInputType
    //optional error message
    showErrorMessage?: boolean
}


// COMPONENT
export const UniversalInputArea: React.FC<UniversalInputAreaPropsType> = (
    {
        type,
        onEntityFunction,
        //optional input area
        placeholders,
        placeholder,
        initText = '',
        autoFocus = false,
        forbidEmptyInput = true,
        minRows = 2,
        maxRows= 4,
        //optional buttons
        onBlurFunction,
        addButtonText = "",
        showCancelButton = false,
        cancelButtonText = "",
        keyPressMode,
        //optional error message
        showErrorMessage=true,
    }) => {
    //SET CONST INPUT BEHAVIOUR
    const [localPlaceholder] = useState(placeholders ? placeholders[Math.floor(Math.random() * placeholders.length)] : placeholder)
    //SET CONST BUTTONS

    //temp playground for
    // console.log(onBlurFunction?.toString())
    // console.log(onBlurFunction?.toString()  === `ƒ () {
    //     return fn.apply(this, arguments);
    //   }`)
    // console.log(onBlurFunction)
    // console.log(typeof  (onBlurFunction))

    const localShowAddButton = onBlurFunction === undefined
    const localKeyPressMode = keyPressMode ? keyPressMode : (type === 'textarea' ? 'ctrlEnter' : 'both')
    //SET STYLES
    const numberOfButtons = [localShowAddButton, showCancelButton].filter(Boolean).length
    const inputAreaStyle = `${css.inputArea} ${css['btn' + (numberOfButtons > 1 ? numberOfButtons + type : numberOfButtons)]} ${showErrorMessage ? css.inputAreaShowError : ''}`
    const buttonAreaStyle = numberOfButtons === 2 && type === 'textarea' ? css.buttonAreaBtn2textarea : css.buttonArea
    const cancelButtonStyle = css.cancelButton


    //TEXT STATE
    const [text, setText] = useState(initText)
    const editTextHandler = (e: ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLInputElement>) => {
        setErrorText('')
        setText(e.currentTarget.value)
    }

    //ERROR STATE
    const [errorText, setErrorText] = useState('')
    const editErrorTextHandler = (text: string) => setErrorText(text)

    //MAIN ENTITY CALLBACK
    const mainEntityFunctionHandler = () => {
        if (forbidEmptyInput && !text) {

            editErrorTextHandler("No empty values are allowed")
            return
        }
        if (text) onEntityFunction(text)
        onBlurFunction !== undefined ? onBlurFunction() : setText('')
    }

    //KEYPRESS CALLBACK
    const onKeyPressHandler = (e: KeyboardEvent<HTMLDivElement>) => {
        if ((e.key === '\n' && (localKeyPressMode === 'both' || localKeyPressMode === 'ctrlEnter')) ||
            (e.key === 'Enter' && (localKeyPressMode === 'both' || localKeyPressMode === 'enter'))
        ) {
            mainEntityFunctionHandler()
        }
    }

    //OTHER CALLBACKS
    const onCancelHandler = () => setText(initText)
    const onBlurHandler = () => onBlurFunction ? mainEntityFunctionHandler() : true

    //todo variant?
    //todo onCancelFunction
    //todo color

    return <Box className={inputAreaStyle}>
        {type === 'input' &&
            <TextField variant={"standard"}
                    value={text}
                    autoFocus={autoFocus}
                    placeholder={localPlaceholder}
                    error={!!errorText}
                    helperText={errorText}
                    onChange={editTextHandler}
                    onKeyPress={onKeyPressHandler}
                    onBlur={onBlurHandler}/>}
        {type === 'textarea' &&
            <TextField variant={"standard"}
                    value={text}
                    autoFocus={autoFocus}
                    placeholder={localPlaceholder}
                    error={!!errorText}
                    helperText={errorText}
                    onChange={editTextHandler}
                    onKeyPress={onKeyPressHandler}
                    onBlur={onBlurHandler}
                    multiline
                    minRows={minRows}
                    maxRows={maxRows}/>}
        {/*for buttons*/}
        <Box className={buttonAreaStyle}>
            {localShowAddButton &&
                (addButtonText && cancelButtonText
                    ? <Button variant="outlined" startIcon={<Add />} onClick={mainEntityFunctionHandler}>{addButtonText}</Button>
                    : <IconButton aria-label="delete" onClick={mainEntityFunctionHandler}><Add /></IconButton>
                )}

            {showCancelButton &&
                (addButtonText && cancelButtonText
                    ? <Button variant="outlined" startIcon={<Delete />} className={cancelButtonStyle} onClick={onCancelHandler}>{cancelButtonText}</Button>
                    : <IconButton className={cancelButtonStyle} onClick={onCancelHandler}><Delete /></IconButton>
                )}
        </Box>
    </Box>
}