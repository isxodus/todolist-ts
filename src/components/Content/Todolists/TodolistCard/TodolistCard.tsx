import React, {useCallback, useMemo} from "react";
import css from "./TodolistCard.module.css"
import {Box} from "@mui/material";
import {useDispatch} from "react-redux";
import {
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    FilterValueType,
    RemoveTodolistAC,
} from "../../../../state/todolists-reducer";
import {
    AddTaskAC,
    ChangeTaskStatusAC,
    ChangeTaskTitleAC,
    RemoveTaskAC,
    TaskType
} from "../../../../state/tasks-reducer";
import {UniversalInputArea} from "../../../../componentsUniversal/UniversalInputArea/UniversalInputArea";
import {UniversalList} from "../../../../componentsUniversal/UniversalList/UniversalList";
import {UniversalButtonSet} from "../../../../componentsUniversal/UniversalButtonSet/UniversalButtonSet";

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

    const OnCreateTaskHandler = useCallback((title: string) => dispatch(AddTaskAC(props.tdId, title)), [dispatch, props.tdId])
    const onChangeTaskTitleHandler = useCallback((taskId: string, title: string) => dispatch(ChangeTaskTitleAC(props.tdId, taskId, title)), [dispatch, props.tdId])
    const onChangeTaskStatusHandler = useCallback((taskId: string) => dispatch(ChangeTaskStatusAC(props.tdId, taskId)), [dispatch, props.tdId])
    const onRemoveTaskHandler = useCallback((taskId: string) => dispatch(RemoveTaskAC(props.tdId, taskId)), [dispatch, props.tdId])

    //HEADER || TODOLIST HANDLERS
    const inputForHeader = useMemo(() => [{id: props.tdId, title: props.title}], [])
    const todolistPlaceholderHandler = useCallback(() => true, [])
    const onChangeTodolistTitleHandler = useCallback((tdId: string, title: string) => dispatch(ChangeTodolistTitleAC(tdId, title)), [dispatch])
    const onRemoveTodolistHandler = useCallback((tdId: string) => dispatch(RemoveTodolistAC(tdId)), [dispatch])


    return <Box className={css.cardType}>
        {/*HEADER || TODOLIST TITLE*/}
        <UniversalList inputArr={inputForHeader} showCheckbox={false}
                       onCheckHandler={todolistPlaceholderHandler}
                       onEditHandler={onChangeTodolistTitleHandler}
                       onRemoveHandler={onRemoveTodolistHandler}/>
        {/*Instead of one below, I tried to use a UniversalList with one item */}
        {/*<Grid className={css.inputArea}>*/}
        {/*    <UniversalEditableSpan text={props.title} onEntityFunction={onChangeTodolistTitleHandler}/>*/}
        {/*    <IconButton onClick={() => props.removeTodolist(props.tdId)}><Delete/></IconButton>*/}
        {/*</Grid>*/}
        {/*CREATE NEW TASK*/}
        <UniversalInputArea type={"input"} onEntityFunction={OnCreateTaskHandler} placeholders={funnyPlaceholders}/>
        {/*FILTERS*/}
        <UniversalButtonSet buttonArray={filterValueArr} onEntityFunction={onChangeFilter}
                            defaultFilter={props.defaultFilterValue}/>
        {/*TASK LIST*/}
        <UniversalList inputArr={props.tasks}
                       onCheckHandler={onChangeTaskStatusHandler} onEditHandler={onChangeTaskTitleHandler}
                       onRemoveHandler={onRemoveTaskHandler}/>
    </Box>
}

export const TodolistCard = React.memo(TodolistCardHidden)
