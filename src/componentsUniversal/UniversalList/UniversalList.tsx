import React, {useCallback, useMemo} from 'react';
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
    showDisableProgress?: boolean
    // disableCheckbox?: boolean
    // disableInputArea?: boolean
    // disableButton?: boolean
    // disableStatus?: 'none' | 'checkbox' | 'span' | 'button'

    // customized disabling behavior
    loadingStatusKey?: string
    loadingStatusOriginKey?: string
    disableStatus?: boolean
    disableCheckboxWord?: string
    disableSpanWord?: string
    disableButtonWord?: string
    // customized object
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
        // disableCheckbox = false,
        // disableInputArea = false,
        // disableButton = false,
        // disabling behavior
        showDisableProgress = false,
        loadingStatusKey = 'loadingStatus',
        loadingStatusOriginKey = 'loadingStatusOrigin',
        disableStatus = false,
        disableCheckboxWord = 'checkbox',
        disableSpanWord = 'span',
        disableButtonWord = 'button',
        // object
        idKey = 'id',
        titleKey = 'title',
        checkboxKey = 'status',
        trueInd = true,
        falseInd = false
    }) => {
    //console.log('UniversalList was rendered with inputArr:', disableStatus)
    const onCheckHandlerCallback = useCallback(onCheckHandler, [onCheckHandler])
    const onEditHandlerCallback = useCallback(onEditHandler, [onEditHandler])
    const onRemoveHandlerCallback = useCallback(onRemoveHandler, [onRemoveHandler])


    return <Box>
        {inputArr?.map((elem) => {


            return <ListElem key={elem[idKey]}
                             loadingStatusKey={loadingStatusKey} loadingStatusOriginKey={loadingStatusOriginKey}
                             disableStatus={disableStatus} disableCheckboxWord={disableCheckboxWord}
                             disableSpanWord={disableSpanWord} disableButtonWord={disableButtonWord}
                             idKey={idKey} titleKey={titleKey} checkboxKey={checkboxKey}
                // checkbox
                             elem={elem} onCheckHandler={onCheckHandlerCallback} showCheckbox={showCheckbox}
                             trueInd={trueInd} falseInd={falseInd}
                // inputArea
                             onEditHandler={onEditHandlerCallback}
                             onRemoveHandler={onRemoveHandlerCallback}
                             showDisableProgress={showDisableProgress}
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
        // disabling behavior
        showDisableProgress = false,
        loadingStatusKey = 'loadingStatus',
        loadingStatusOriginKey = 'loadingStatusOrigin',
        disableStatus = false,
        disableCheckboxWord = 'checkbox',
        disableSpanWord = 'span',
        disableButtonWord = 'button',
        // object
        idKey = 'id',
        titleKey = 'title',
        checkboxKey = 'status',
        trueInd = true,
        falseInd = false
    }) => {

    const localDisableStatus = useMemo(() => disableStatus, [disableStatus])
    const checkboxProgressStatus = useMemo(() => elem[loadingStatusOriginKey] === disableCheckboxWord, [elem])
    const checkboxEditableSpanStatus = useMemo(() => elem[loadingStatusOriginKey] === disableSpanWord, [elem])
    const checkboxButtonStatus = useMemo(() => elem[loadingStatusOriginKey] === disableButtonWord, [elem])

    const checkboxHandler = useCallback(() => {
        //in case for UI not boolean values are used
        const oppositeStatus = elem[checkboxKey] === trueInd ? falseInd : trueInd
        // console.log('opposite status is', oppositeStatus)
        onCheckHandler(elem[idKey], oppositeStatus)
    }, [onCheckHandler, elem, idKey])
    const spanHandler = useCallback((newText: string) => onEditHandler(elem[idKey], newText), [onEditHandler, elem, idKey])
    const deleteHandler = useCallback(() => onRemoveHandler(elem[idKey]), [onRemoveHandler, elem, idKey])

    console.log('now', elem[loadingStatusOriginKey], disableSpanWord, checkboxEditableSpanStatus)
    return <Box className={showCheckbox ? css.listItem : css.listItemNoCheckbox} key={elem[idKey]}>
        {showCheckbox && <UniversalCheckbox checked={elem[checkboxKey]} handler={checkboxHandler} trueInd={trueInd}
                                            disableCheckbox={localDisableStatus} showProgress={checkboxProgressStatus}/>}
        <UniversalEditableSpan text={elem[titleKey]} onEntityFunction={spanHandler} disableInputArea={localDisableStatus}
                               showProgress={checkboxEditableSpanStatus}/>
        <UniversalButton onEntityFunction={deleteHandler} muiIcon={'delete'} disabled={localDisableStatus}
                         showProgress={checkboxButtonStatus}/>
    </Box>
})