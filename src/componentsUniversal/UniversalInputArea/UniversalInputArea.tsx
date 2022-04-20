import React, {useState, KeyboardEvent, DetailedHTMLProps, InputHTMLAttributes, TextareaHTMLAttributes, ChangeEvent} from 'react';
import css from './UniversalInputArea.module.css'

// DEFAULT PROPS FOR INPUT AND TEXTAREA
type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
type DefaultTextAreaPropsType = DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>
// TYPES
type UniversalInputAreaTypeType = 'textarea' | 'input'
type KeyInputType = 'both' | 'ctrlEnter' | 'enter'

// UNIVERSAL TYPE
type  UniversalInputAreaPropsType = DefaultInputPropsType & DefaultTextAreaPropsType & {
    type: UniversalInputAreaTypeType
    createNewEntityFunction: (newText: string) => void
    noEmptyInput?: boolean
    needErrorMessage?: boolean
    placeholders?: Array<string>
    buttonText?: string
    keyPressMode?: KeyInputType
}


export const UniversalInputArea: React.FC<UniversalInputAreaPropsType> = (
    {
        type,
        createNewEntityFunction,
        noEmptyInput,
        needErrorMessage,
        placeholders,
        placeholder,
        buttonText,
        keyPressMode
    }) => {
    //set const
    const localNoEmptyInput = noEmptyInput === undefined ? true : noEmptyInput
    const localNeedErrorMessage = needErrorMessage === undefined ? true : needErrorMessage
    const localPlaceholder = placeholders ? placeholders[Math.floor(Math.random() * placeholders.length)] : placeholder
    const localButtonText = buttonText ? buttonText : "+"
    const localKeyPressMode = keyPressMode ? keyPressMode : 'both'

    //text state
    const [inputText, setInputText] = useState('')
    const editInputTextHandler = (e: ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLInputElement>) => {
        setErrorText('')
        setInputText(e.currentTarget.value)
    }
    //error state
    const [errorText, setErrorText] = useState('')
    const editErrorTextHandler = (text: string) => {
        setErrorText(text)
    }


    //add text callback
    const createNewEntityHandler = () => {
        if (localNoEmptyInput && inputText === '') {
            editErrorTextHandler("No empty values are allowed")
            return
        }
        createNewEntityFunction(inputText)
        setInputText('')
    }
    //keyPress callback
    const onKeyPressHandler = (e: KeyboardEvent<HTMLTextAreaElement> | KeyboardEvent<HTMLInputElement>) => {
        if ((e.key === '\n' && (localKeyPressMode === 'both' || localKeyPressMode === 'ctrlEnter')) ||
            (e.key === 'Enter' && (localKeyPressMode === 'both' || localKeyPressMode === 'ctrlEnter'))
        ) {
            createNewEntityHandler()
        }
    }


    return <div className={css.inputArea}>
        {type === 'input' &&
            <input value={inputText} placeholder={localPlaceholder} onChange={editInputTextHandler} onKeyPress={onKeyPressHandler}/>}
        {type === 'textarea' &&
            <textarea value={inputText} placeholder={localPlaceholder} onChange={editInputTextHandler} onKeyPress={onKeyPressHandler}/>}
        <button onClick={createNewEntityHandler}>{localButtonText}</button>
        {localNeedErrorMessage && <span className={css.errorMessage}>{errorText}</span>}
    </div>
}