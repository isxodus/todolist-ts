import React, {useCallback, useEffect, useMemo} from "react";
import {Box, LinearProgress} from "@mui/material";
import {useDispatch} from "react-redux";
import {
    ChangeTodolistFilterAC,
    changeTodolistTitleTC,
    deleteTodolistTC,
    FilterValueType,
    TodolistDomainType,
} from "../../../../state/todolists-reducer";
import {createTaskTC, deleteTaskTC, fetchTasksTC, TaskDomainType, updateTaskTC,} from "../../../../state/tasks-reducer";
import {UniversalInputArea} from "../../../../componentsUniversal/UniversalInputArea/UniversalInputArea";
import {UniversalList} from "../../../../componentsUniversal/UniversalList/UniversalList";
import {UniversalButtonSet} from "../../../../componentsUniversal/UniversalButtonSet/UniversalButtonSet";
import {TaskStatuses} from "../../../../api/todolistsApi";
import css from "./TodolistCard.module.css"

export type TodolistCardPropsType = {
    todolist: TodolistDomainType
    tasks: Array<TaskDomainType>
}

export const TodolistCard = React.memo(function TodolistCardHidden(props: TodolistCardPropsType) {
    const dispatch = useDispatch()
    const funnyPlaceholders = useMemo(() => ["create new task", "type something", "type something cool"], [])
    const isTodolistLoading = useMemo(() => props.todolist.loadingStatus === "loading", [props.todolist.loadingStatus])
    const todolistLoadingStatus = useMemo(() => {
        //debugger
        if (props.todolist.loadingStatusOrigin === "title") return 'span'
        if (props.todolist.loadingStatusOrigin === "processing") return 'button'
        return 'none'
    }, [props.todolist.loadingStatusOrigin])

    //FILTER COMPONENT
    const filterValueArr = useMemo(() => ['all', 'active', 'done'], [])
    const onChangeFilter = useCallback((filterValue: FilterValueType) => dispatch(ChangeTodolistFilterAC(props.todolist.id, filterValue)), [dispatch, props.todolist.id])

    ///TASK HANDLERS

    const onCreateTaskHandler = useCallback((title: string) => dispatch(createTaskTC(props.todolist.id, title)), [dispatch, props.todolist.id])
    const onChangeTaskTitleHandler = useCallback((taskId: string, title: string) => dispatch(updateTaskTC(props.todolist.id, taskId, {title: title})), [dispatch, props.todolist.id])
    const onChangeTaskStatusHandler = useCallback((taskId: string, status: TaskStatuses) => dispatch(updateTaskTC(props.todolist.id, taskId, {status: status})), [dispatch, props.todolist.id])
    const onRemoveTaskHandler = useCallback((taskId: string) => dispatch(deleteTaskTC(props.todolist.id, taskId)), [dispatch, props.todolist.id])

    //HEADER || TODOLIST HANDLERS
    const inputForHeader = useMemo(() => {
        return [{
            id: props.todolist.id, title: props.todolist.title
            , loadingStatus: props.todolist.loadingStatus, loadingStatusOrigin: props.todolist.loadingStatusOrigin
        }]
    }, [props.todolist.id, props.todolist.title, props.todolist.loadingStatus, props.todolist.loadingStatusOrigin])
    const todolistPlaceholderHandler = useCallback(() => true, [])
    const onChangeTodolistTitleHandler = useCallback((tdId: string, todolistTitle: string) => dispatch(changeTodolistTitleTC(tdId, todolistTitle)), [dispatch])
    const onDeleteTodolistHandler = useCallback((tdId: string) => dispatch(deleteTodolistTC(tdId)), [dispatch])

    useEffect(() => {
        dispatch(fetchTasksTC(props.todolist.id))
    }, [])

    console.log(inputForHeader)
    return <Box>
        {/*HEADER || TODOLIST TITLE*/}
        <div className={css.progress}>{isTodolistLoading && todolistLoadingStatus === 'none' && <LinearProgress/>}</div>
        <UniversalList inputArr={inputForHeader} showCheckbox={false}
                       onCheckHandler={todolistPlaceholderHandler}
                       onEditHandler={onChangeTodolistTitleHandler}
                       onRemoveHandler={onDeleteTodolistHandler}
                       disableStatus={isTodolistLoading}
                       disableCheckboxWord={'status'} disableSpanWord={'title'} disableButtonWord={'processing'}
        />
        {/*Instead of one below, I tried to use a UniversalList with one item, purely for an interest*/}
        {/*<Grid className={css.inputArea}>*/}
        {/*    <UniversalEditableSpan text={props.title} onEntityFunction={onChangeTodolistTitleHandler}/>*/}
        {/*    <IconButton onClick={() => props.removeTodolist(props.todolist.id)}><Delete/></IconButton>*/}
        {/*</Grid>*/}
        {/*CREATE NEW TASK*/}
        <UniversalInputArea type={"input"} onEntityFunction={onCreateTaskHandler} placeholders={funnyPlaceholders}
                            disableButton={isTodolistLoading}/>
        {/*FILTERS*/}
        <UniversalButtonSet buttonArray={filterValueArr} onEntityFunction={onChangeFilter}
                            defaultFilter={props.todolist.filter}/>
        {/*TASK LIST*/}
        <UniversalList inputArr={props.tasks}
                       onCheckHandler={onChangeTaskStatusHandler}
                       trueInd={TaskStatuses.Completed} falseInd={TaskStatuses.New}
                       onEditHandler={onChangeTaskTitleHandler}
                       onRemoveHandler={onRemoveTaskHandler}
                       disableStatus={isTodolistLoading}
                       disableCheckboxWord={'status'} disableSpanWord={'title'} disableButtonWord={'processing'}
        />
    </Box>
})
