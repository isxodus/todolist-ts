import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, KeyboardEvent, TextareaHTMLAttributes, useEffect, useState} from 'react';
import css from './UniversalInputArea.module.css'
import {Box, TextField} from "@mui/material";
import {UniversalButton} from "../UniversalButton/UniversalButton";


// DEFAULT PROPS
type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
type DefaultTextAreaPropsType = DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>
// LOCAL TYPES
type UniversalInputAreaTypeType = 'textarea' | 'input'
type KeyInputType = 'both' | 'ctrlEnter' | 'enter'


// UNIVERSAL TYPE
export type  UniversalInputAreaPropsType = DefaultInputPropsType & DefaultTextAreaPropsType & {
    type: UniversalInputAreaTypeType
    onEntityFunction: (newText: string) => void
    onCancelFunction?: () => void
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
        onCancelFunction,
        //optional input area
        placeholders,
        placeholder,
        initText = '',
        autoFocus = false,
        forbidEmptyInput = true,
        minRows = 3,
        maxRows = 4,
        //optional buttons
        onBlurFunction,
        addButtonText = "",
        showCancelButton = false,
        cancelButtonText = "",
        keyPressMode,
        //optional error message
        showErrorMessage = true,
    }) => {
    //todo muiVariant? + button muiVariant
    //todo muiColor
    console.log('universalInput was rendered:',initText)

    //SET CONST INPUT BEHAVIOUR
    const [localPlaceholder] = useState(placeholders ? placeholders[Math.floor(Math.random() * placeholders.length)] : placeholder)
    //SET CONST BUTTONS
    //string just for storybook params
    const StorybookString = "\"function () {\\n        return fn.apply(this, arguments);\\n      }\""
    if (JSON.stringify(onCancelFunction?.toString()) === StorybookString) onCancelFunction = undefined
    if (JSON.stringify(onBlurFunction?.toString()) === StorybookString) onBlurFunction = undefined
    const localShowAddButton = onBlurFunction === undefined
    const localKeyPressMode = keyPressMode ? keyPressMode : (type === 'textarea' ? 'ctrlEnter' : 'both')
    //SET STYLES
    const numberOfButtons = [localShowAddButton, showCancelButton].filter(Boolean).length
    const inputAreaStyle = `${css.inputArea} ${css['btn' + (numberOfButtons > 1 ? numberOfButtons + type : numberOfButtons)]} ${showErrorMessage ? css.inputAreaShowError : ''}`
    const buttonAreaStyle = numberOfButtons === 2 && type === 'textarea' ? css.buttonAreaBtn2textarea : css.buttonArea
    const cancelButtonStyle = css.cancelButton

    //TEXT STATE
    const [text, setText] = useState(initText)
    useEffect(() => (setText(initText)), [initText])
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
        if (e.key === 'Escape') onCancelHandler()
    }

    //OTHER CALLBACKS
    const onCancelHandler = () => onCancelFunction ? onCancelFunction() : setText(initText)
    const onBlurHandler = () => onBlurFunction ? mainEntityFunctionHandler() : true


    return <Box className={inputAreaStyle}>
        {type === 'input' &&
            <TextField variant={"standard"}
                       value={text}
                       autoFocus={autoFocus}
                       placeholder={localPlaceholder}
                       error={!!errorText}
                       helperText={errorText}
                       onChange={editTextHandler}
                       onKeyUp={onKeyPressHandler}
                       onBlur={onBlurHandler}/>}
        {type === 'textarea' &&
            <TextField variant={"standard"}
                       value={text}
                       autoFocus={autoFocus}
                       placeholder={localPlaceholder}
                       error={!!errorText}
                       helperText={errorText}
                       onChange={editTextHandler}
                       onKeyUp={onKeyPressHandler}
                       onBlur={onBlurHandler}
                       multiline
                       minRows={minRows}
                       maxRows={maxRows}/>}
        {/*for buttons*/}
        <Box className={buttonAreaStyle}>
            {localShowAddButton && <UniversalButton onEntityFunction={mainEntityFunctionHandler} muiIcon={'add'} buttonText={addButtonText}/>}
            {showCancelButton &&
                <div className={cancelButtonStyle}>
                    <UniversalButton onEntityFunction={onCancelHandler} muiIcon={'delete'} buttonText={cancelButtonText}/></div>}
        </Box>
    </Box>
}