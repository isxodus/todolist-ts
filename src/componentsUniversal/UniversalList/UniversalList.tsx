import React from 'react';
import css from './UniversalList.module.css'
import {Box} from "@mui/material";
import {UniversalCheckbox} from "../UniversalCheckbox/UniversalCheckbox";
import {UniversalEditableSpan} from "../UniversalEditableSpan/UniversalEditableSpan";
import {UniversalButton} from "../UniversalButton/UniversalButton";


// DEFAULT PROPS

// LOCAL TYPES


// UNIVERSAL TYPE
export type  UniversalListPropsType = {
    inputArr: Array<any>
    onCheckHandler: (taskId: string) => void
    onEditHandler: (taskId: string, newText: string) => void
    onRemoveHandler: (taskId: string) => void

    showCheckbox?: boolean
    idKey?: string
    titleKey?: string
    checkboxKey?: string
}


// COMPONENT
export const UniversalList: React.FC<UniversalListPropsType> = (
    {
        inputArr,
        onCheckHandler,
        onEditHandler,
        onRemoveHandler,
        showCheckbox = true,
        idKey = 'id',
        titleKey = 'title',
        checkboxKey = 'isDone'
    }) => {
    return <Box>
        {inputArr?.map((elem) => {
            const checkboxHandler = () => onCheckHandler(elem[idKey])
            const spanHandler = (newText: string) => onEditHandler(elem[idKey], newText)
            const deleteHandler = () => onRemoveHandler(elem[idKey])

            return <Box className={showCheckbox ? css.listItem : css.listItemNoCheckbox} key={elem[idKey]}>
                {showCheckbox && <UniversalCheckbox checked={elem[checkboxKey]} handler={checkboxHandler}/>}
                <UniversalEditableSpan text={elem[titleKey]} onEntityFunction={spanHandler}/>
                <UniversalButton onEntityFunction={deleteHandler} muiIcon={'delete'}/>
            </Box>
        })}
    </Box>
}