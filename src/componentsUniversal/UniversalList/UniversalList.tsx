import React, {useCallback} from 'react';
import css from './UniversalList.module.css'
import {Box} from "@mui/material";
import {UniversalCheckbox} from "../UniversalCheckbox/UniversalCheckbox";
import {UniversalEditableSpan} from "../UniversalEditableSpan/UniversalEditableSpan";
import {UniversalButton} from "../UniversalButton/UniversalButton";


// UNIVERSAL TYPE
type UniversalListPropsType = {
    onCheckHandler: (taskId: string, status: any) => void
    onEditHandler: (taskId: string, newText: string) => void
    onRemoveHandler: (taskId: string) => void

    showCheckbox?: boolean
    disableCheckbox?: boolean
    disableInputArea?: boolean
    disableButton?: boolean
    /**
     * In case an array consists of objects different from {id:string, title: string, status: string}
     */
    idKey?: string
    /**
     * In case an array consists of objects different from {id:string, title: string, status: string}
     */
    titleKey?: string
    /**
     * In case an array consists of objects different from {id:string, title: string, status: string}
     */
    checkboxKey?: string
    /**
     * In case CHECKED in UI should be shown not for boolean true + use value in a callback
     */
    trueInd?: any
    /**
     * In case CHECKED in UI should be shown not for boolean false + use value in a callback
     */
    falseInd?: any
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
        disableCheckbox = false,
        disableInputArea = false,
        disableButton = false,
        idKey = 'id',
        titleKey = 'title',
        checkboxKey = 'status',
        trueInd = true,
        falseInd = false
    }) => {
    // console.log('UniversalList was rendered with inputArr:', inputArr)
    const onCheckHandlerCallback = useCallback(onCheckHandler, [onCheckHandler])
    const onEditHandlerCallback = useCallback(onEditHandler, [onEditHandler])
    const onRemoveHandlerCallback = useCallback(onRemoveHandler, [onRemoveHandler])
    return <Box>
        {inputArr?.map((elem) => {
            return <ListElem key={elem[idKey]}
                             idKey={idKey} titleKey={titleKey} checkboxKey={checkboxKey}
                // checkbox
                             elem={elem} onCheckHandler={onCheckHandlerCallback} showCheckbox={showCheckbox}
                             trueInd={trueInd} falseInd={falseInd} disableCheckbox={disableCheckbox}
                // inputArea
                             onEditHandler={onEditHandlerCallback}
                             onRemoveHandler={onRemoveHandlerCallback}
                             disableInputArea={disableInputArea}
                             disableButton={disableButton}
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
        disableCheckbox = false,
        disableInputArea = false,
        disableButton = false,
        idKey = 'id',
        titleKey = 'title',
        checkboxKey = 'status',
        trueInd = true,
        falseInd = false
    }) => {

    const checkboxHandler = useCallback(() => {
        //in case for UI not boolean values are used
        const oppositeStatus = elem[checkboxKey] === trueInd ? falseInd : trueInd
        console.log('opposite status is', oppositeStatus)
        onCheckHandler(elem[idKey], oppositeStatus)
    }, [onCheckHandler, elem, idKey])
    const spanHandler = useCallback((newText: string) => onEditHandler(elem[idKey], newText), [onEditHandler, elem, idKey])
    const deleteHandler = useCallback(() => onRemoveHandler(elem[idKey]), [onRemoveHandler, elem, idKey])
    //console.log('elem: ', elem)
    return <Box className={showCheckbox ? css.listItem : css.listItemNoCheckbox} key={elem[idKey]}>
        {showCheckbox && <UniversalCheckbox checked={elem[checkboxKey]} handler={checkboxHandler} trueInd={trueInd}
                                            disableCheckbox={disableCheckbox}/>}
        <UniversalEditableSpan text={elem[titleKey]} onEntityFunction={spanHandler} disableInputArea={disableInputArea}/>
        <UniversalButton onEntityFunction={deleteHandler} muiIcon={'delete'} disabled={disableButton}/>
    </Box>
})