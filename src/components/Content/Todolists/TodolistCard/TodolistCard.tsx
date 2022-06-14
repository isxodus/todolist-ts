import React, {useCallback, useEffect, useMemo} from "react";
import css from "./TodolistCard.module.css"
import {Box} from "@mui/material";
import {useDispatch} from "react-redux";
import {
    ChangeTodolistFilterAC,
    changeTodolistTitleTC,
    deleteTodolistTC,
    FilterValueType,
} from "../../../../state/todolists-reducer";
import {createTaskTC, deleteTaskTC, fetchTasksTC, updateTaskTC,} from "../../../../state/tasks-reducer";
import {UniversalInputArea} from "../../../../componentsUniversal/UniversalInputArea/UniversalInputArea";
import {UniversalList} from "../../../../componentsUniversal/UniversalList/UniversalList";
import {UniversalButtonSet} from "../../../../componentsUniversal/UniversalButtonSet/UniversalButtonSet";
import {TaskStatuses, TaskType} from "../../../../api/todolistsApi";

export type TodolistCardPropsType = {
    tdId: string
    title: string
    tasks: Array<TaskType>
    defaultFilterValue: FilterValueType
}

function TodolistCardHidden(props: TodolistCardPropsType) {
    const dispatch = useDispatch()
    const funnyPlaceholders = useMemo(() => ["create new task", "type something", "type something cool"], [])


    //FILTER COMPONENT
    const filterValueArr = useMemo(() => ['all', 'active', 'completed'], [])
    const onChangeFilter = useCallback((filterValue: FilterValueType) => dispatch(ChangeTodolistFilterAC(props.tdId, filterValue)), [dispatch, props.tdId])

    ///TASK HANDLERS

    const onCreateTaskHandler = useCallback((title: string) => dispatch(createTaskTC(props.tdId, title)), [dispatch, props.tdId])
    const onChangeTaskTitleHandler = useCallback((taskId: string, title: string) => dispatch(updateTaskTC(props.tdId, taskId, {title: title})), [dispatch, props.tdId])
    const onChangeTaskStatusHandler = useCallback((taskId: string, status: TaskStatuses) => dispatch(updateTaskTC(props.tdId, taskId, {status: status})), [dispatch, props.tdId])
    const onRemoveTaskHandler = useCallback((taskId: string) => dispatch(deleteTaskTC(props.tdId, taskId)), [dispatch, props.tdId])

    //HEADER || TODOLIST HANDLERS
    const inputForHeader = useMemo(() => {
        return [{id: props.tdId, title: props.title}]
    }, [props.title])
    const todolistPlaceholderHandler = useCallback(() => true, [])
    const onChangeTodolistTitleHandler = useCallback((tdId: string, todolistTitle: string) => dispatch(changeTodolistTitleTC(tdId, todolistTitle)), [dispatch])
    const onDeleteTodolistHandler = useCallback((tdId: string) => dispatch(deleteTodolistTC(tdId)), [dispatch])

    useEffect(() => {
        dispatch(fetchTasksTC(props.tdId))
    }, [])

    return <Box className={css.cardType}>
        {/*HEADER || TODOLIST TITLE*/}
        <UniversalList inputArr={inputForHeader} showCheckbox={false}
                       onCheckHandler={todolistPlaceholderHandler}
                       onEditHandler={onChangeTodolistTitleHandler}
                       onRemoveHandler={onDeleteTodolistHandler}/>
        {/*Instead of one below, I tried to use a UniversalList with one item, purely for an interest*/}
        {/*<Grid className={css.inputArea}>*/}
        {/*    <UniversalEditableSpan text={props.title} onEntityFunction={onChangeTodolistTitleHandler}/>*/}
        {/*    <IconButton onClick={() => props.removeTodolist(props.tdId)}><Delete/></IconButton>*/}
        {/*</Grid>*/}
        {/*CREATE NEW TASK*/}
        <UniversalInputArea type={"input"} onEntityFunction={onCreateTaskHandler} placeholders={funnyPlaceholders}/>
        {/*FILTERS*/}
        <UniversalButtonSet buttonArray={filterValueArr} onEntityFunction={onChangeFilter}
                            defaultFilter={props.defaultFilterValue}/>
        {/*TASK LIST*/}
        <UniversalList inputArr={props.tasks}
                       onCheckHandler={onChangeTaskStatusHandler}
                       trueInd={TaskStatuses.Completed}
                       falseInd={TaskStatuses.New}
                       onEditHandler={onChangeTaskTitleHandler}
                       onRemoveHandler={onRemoveTaskHandler}/>
    </Box>
}

export const TodolistCard = React.memo(TodolistCardHidden)
