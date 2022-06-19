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
import {createTaskTC, deleteTaskTC, fetchTasksTC, updateTaskTC,} from "../../../../state/tasks-reducer";
import {UniversalInputArea} from "../../../../componentsUniversal/UniversalInputArea/UniversalInputArea";
import {UniversalList} from "../../../../componentsUniversal/UniversalList/UniversalList";
import {UniversalButtonSet} from "../../../../componentsUniversal/UniversalButtonSet/UniversalButtonSet";
import {TaskStatuses, TaskType} from "../../../../api/todolistsApi";
import css from "./TodolistCard.module.css"

export type TodolistCardPropsType = {
    todolist: TodolistDomainType
    tasks: Array<TaskType>
}

export const TodolistCard = React.memo(function TodolistCardHidden(props: TodolistCardPropsType) {
    const dispatch = useDispatch()
    const funnyPlaceholders = useMemo(() => ["create new task", "type something", "type something cool"], [])
    const isTodolistLoading = useMemo(() => props.todolist.status === "loading", [props.todolist.status])

    //FILTER COMPONENT
    const filterValueArr = useMemo(() => ['all', 'active', 'completed'], [])
    const onChangeFilter = useCallback((filterValue: FilterValueType) => dispatch(ChangeTodolistFilterAC(props.todolist.id, filterValue)), [dispatch, props.todolist.id])

    ///TASK HANDLERS

    const onCreateTaskHandler = useCallback((title: string) => dispatch(createTaskTC(props.todolist.id, title)), [dispatch, props.todolist.id])
    const onChangeTaskTitleHandler = useCallback((taskId: string, title: string) => dispatch(updateTaskTC(props.todolist.id, taskId, {title: title})), [dispatch, props.todolist.id])
    const onChangeTaskStatusHandler = useCallback((taskId: string, status: TaskStatuses) => dispatch(updateTaskTC(props.todolist.id, taskId, {status: status})), [dispatch, props.todolist.id])
    const onRemoveTaskHandler = useCallback((taskId: string) => dispatch(deleteTaskTC(props.todolist.id, taskId)), [dispatch, props.todolist.id])

    //HEADER || TODOLIST HANDLERS
    const inputForHeader = useMemo(() => {
        return [{id: props.todolist.id, title: props.todolist.title}]
    }, [props.todolist.id, props.todolist.title])
    const todolistPlaceholderHandler = useCallback(() => true, [])
    const onChangeTodolistTitleHandler = useCallback((tdId: string, todolistTitle: string) => dispatch(changeTodolistTitleTC(tdId, todolistTitle)), [dispatch])
    const onDeleteTodolistHandler = useCallback((tdId: string) => dispatch(deleteTodolistTC(tdId)), [dispatch])

    useEffect(() => {
        dispatch(fetchTasksTC(props.todolist.id))
    }, [])

    return <Box css={{position: "relative"}}>
        {/*HEADER || TODOLIST TITLE*/}
        <div className={css.progress}>{isTodolistLoading && <LinearProgress/>}</div>
        <UniversalList inputArr={inputForHeader} showCheckbox={false}
                       onCheckHandler={todolistPlaceholderHandler}
                       onEditHandler={onChangeTodolistTitleHandler}
                       onRemoveHandler={onDeleteTodolistHandler}
                       disableInputArea={isTodolistLoading}
                       disableButton={isTodolistLoading}/>
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
                       onCheckHandler={onChangeTaskStatusHandler} disableCheckbox={isTodolistLoading}
                       trueInd={TaskStatuses.Completed} falseInd={TaskStatuses.New}
                       onEditHandler={onChangeTaskTitleHandler}
                       onRemoveHandler={onRemoveTaskHandler}
                       disableInputArea={isTodolistLoading}
                       disableButton={isTodolistLoading}/>
    </Box>
})
