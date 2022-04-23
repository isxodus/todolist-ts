import React, {useState, KeyboardEvent, DetailedHTMLProps, InputHTMLAttributes, TextareaHTMLAttributes, ChangeEvent} from 'react';
import css from './UniversalInputArea.module.css'

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
    //optional buttons
    /**
     * Funct for an onBlur event. Hides the main button
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
        initText,
        autoFocus,
        forbidEmptyInput,
        //optional buttons
        onBlurFunction,
        addButtonText = "+",
        showCancelButton = false,
        cancelButtonText = "X",
        keyPressMode,
        //optional error message
        showErrorMessage=true,
    }) => {
    //SET CONST INPUT BEHAVIOUR
    const [localPlaceholder] = useState(placeholders ? placeholders[Math.floor(Math.random() * placeholders.length)] : placeholder)
    const localInitText = initText ? initText : ''
    const localAutoFocus = autoFocus === undefined ? false : autoFocus
    const localForbidEmptyInput = forbidEmptyInput === undefined ? true : forbidEmptyInput
    //SET CONST BUTTONS
    console.log(onBlurFunction)
    const localShowAddButton = onBlurFunction === undefined
    const localKeyPressMode = keyPressMode ? keyPressMode : (type === 'textarea' ? 'ctrlEnter' : 'both')
    //SET CONST ERROR MESSAGE
    // const localShowErrorMessage = showErrorMessage === undefined ? true : showErrorMessage
    //SET STYLES
    const numberOfButtons = [localShowAddButton, showCancelButton].filter(Boolean).length
    const inputAreaStyle = `${css.inputArea} ${css['btn' + (numberOfButtons > 1 ? numberOfButtons + type : numberOfButtons)]} ${showErrorMessage ? css.inputAreaShowError : ''}`
    const buttonAreaStyle = numberOfButtons === 2 && type === 'textarea' ? css.buttonAreaBtn2textarea : css.buttonArea
    const cancelButtonStyle = css.cancelButton


    //TEXT STATE
    const [text, setText] = useState(localInitText)
    const editTextHandler = (e: ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLInputElement>) => {
        setErrorText('')
        setText(e.currentTarget.value)
    }

    //ERROR STATE
    const [errorText, setErrorText] = useState('')
    const editErrorTextHandler = (text: string) => setErrorText(text)

    //MAIN ENTITY CALLBACK
    const mainEntityFunctionHandler = () => {
        //errors
        if (localForbidEmptyInput && text === '') {
            editErrorTextHandler("No empty values are allowed")
            return
        }
        onEntityFunction(text)
        onBlurFunction !== undefined ? onBlurFunction() : setText('')
    }

    //KEYPRESS CALLBACK
    const onKeyPressHandler = (e: KeyboardEvent<HTMLTextAreaElement> | KeyboardEvent<HTMLInputElement>) => {
        if ((e.key === '\n' && (localKeyPressMode === 'both' || localKeyPressMode === 'ctrlEnter')) ||
            (e.key === 'Enter' && (localKeyPressMode === 'both' || localKeyPressMode === 'enter'))
        ) {
            mainEntityFunctionHandler()
        }
    }

    //OTHER CALLBACKS
    const onCancelHandler = () => setText(localInitText)
    const onBlurHandler = () => onBlurFunction ? mainEntityFunctionHandler() : true

    return <div className={inputAreaStyle}>
        {type === 'input' &&
            <input value={text}
                   autoFocus={localAutoFocus}
                   placeholder={localPlaceholder}
                   onChange={editTextHandler}
                   onKeyPress={onKeyPressHandler}
                   onBlur={onBlurHandler}/>}
        {type === 'textarea' &&
            <textarea value={text}
                      autoFocus={localAutoFocus}
                      placeholder={localPlaceholder}
                      onChange={editTextHandler}
                      onKeyPress={onKeyPressHandler}
                      onBlur={onBlurHandler}/>}
        {/*for buttons*/}
        <div className={buttonAreaStyle}>
            {localShowAddButton && <button onClick={mainEntityFunctionHandler}>{addButtonText}</button>}
            {showCancelButton && <button className={cancelButtonStyle} onClick={onCancelHandler}>{cancelButtonText}</button>}
        </div>

        {showErrorMessage && <span className={css.errorMessage}>{errorText}</span>}
    </div>
}