import React, {useCallback} from 'react';
import css from './UniversalList.module.css'
import {Box} from "@mui/material";
import {UniversalCheckbox} from "../UniversalCheckbox/UniversalCheckbox";
import {UniversalEditableSpan} from "../UniversalEditableSpan/UniversalEditableSpan";
import {UniversalButton} from "../UniversalButton/UniversalButton";


// UNIVERSAL TYPE
type UniversalListPropsType = {
    onCheckHandler: (taskId: string) => void
    onEditHandler: (taskId: string, newText: string) => void
    onRemoveHandler: (taskId: string) => void

    showCheckbox?: boolean
    idKey?: string
    titleKey?: string
    checkboxKey?: string
}
type UniversalListPropsArrayType = UniversalListPropsType & { inputArr: Array<any> }
type UniversalListPropsElemType = UniversalListPropsType & { elem: any }


// COMPONENT
export const UniversalList: React.FC<UniversalListPropsArrayType> = React.memo((
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
    console.log('UniversalList was rendered with inputArr:', inputArr)
    const onCheckHandlerCallback = useCallback(onCheckHandler, [onCheckHandler])
    const onEditHandlerCallback = useCallback(onEditHandler, [onEditHandler])
    const onRemoveHandlerCallback = useCallback(onRemoveHandler, [onRemoveHandler])
    return <Box>
        {inputArr?.map((elem) => {
            return <ListElem key={elem[idKey]}
                             elem={elem} onCheckHandler={onCheckHandlerCallback} onEditHandler={onEditHandlerCallback}
                             onRemoveHandler={onRemoveHandlerCallback} showCheckbox={showCheckbox}
                             idKey={idKey} titleKey={titleKey} checkboxKey={checkboxKey}
            />
        })}
    </Box>
})

const ListElem: React.FC<UniversalListPropsElemType> = React.memo((
    {
        elem,
        onCheckHandler,
        onEditHandler,
        onRemoveHandler,
        showCheckbox = true,
        idKey = 'id',
        titleKey = 'title',
        checkboxKey = 'isDone'
    }) => {
    const checkboxHandler = useCallback(() => onCheckHandler(elem[idKey]), [onCheckHandler, elem, idKey])
    const spanHandler = useCallback((newText: string) => onEditHandler(elem[idKey], newText), [onEditHandler, elem, idKey])
    const deleteHandler = useCallback(() => onRemoveHandler(elem[idKey]), [onRemoveHandler, elem, idKey])

    return <Box className={showCheckbox ? css.listItem : css.listItemNoCheckbox} key={elem[idKey]}>
        {showCheckbox && <UniversalCheckbox checked={elem[checkboxKey]} handler={checkboxHandler}/>}
        <UniversalEditableSpan text={elem[titleKey]} onEntityFunction={spanHandler}/>
        <UniversalButton onEntityFunction={deleteHandler} muiIcon={'delete'}/>
    </Box>
})