import React from "react";
import css from "./TodolistCard.module.css"
import {Box} from "@mui/material";
import {useDispatch} from "react-redux";
import {ChangeTodolistFilterAC, ChangeTodolistTitleAC, RemoveTodolistAC, FilterValueType,} from "../../../../state/todolists-reducer";
import {AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC, TaskType} from "../../../../state/tasks-reducer";
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
    const funnyPlaceholders = ["create new task", "type something", "type something cool"]

    //TODOLIST HANDLERS
    const onChangeTodolistTitleHandler = (tdId: string, title: string) => dispatch(ChangeTodolistTitleAC(tdId, title))
    const filterValueArr = ['all', 'active', 'completed']
    const onChangeFilter = (filterValue: FilterValueType) => dispatch(ChangeTodolistFilterAC(props.tdId, filterValue))
    const onRemoveTodolistHandler = (tdId: string) => dispatch(RemoveTodolistAC(tdId))
    ///TASK HANDLERS
    const onCreateTaskHandler = (title: string) => dispatch(AddTaskAC(props.tdId, title))
    const onChangeTaskTitleHandler = (taskId: string, title: string) => dispatch(ChangeTaskTitleAC(props.tdId, taskId, title))
    const onChangeTaskStatusHandler = (taskId: string) => dispatch(ChangeTaskStatusAC(props.tdId, taskId))
    const onRemoveTaskHandler = (taskId: string) => dispatch(RemoveTaskAC(props.tdId, taskId))


    return <Box className={css.cardType}>
        {/*TODOLIST TITLE*/}
        <UniversalList inputArr={[{id: props.tdId, title: props.title}]} showCheckbox={false}
                       onCheckHandler={() => true} onEditHandler={onChangeTodolistTitleHandler}
                       onRemoveHandler={onRemoveTodolistHandler}/>
        {/*Instead of one below, I tried to use a UniversalList with one item */}
        {/*<Grid className={css.inputArea}>*/}
        {/*    <UniversalEditableSpan text={props.title} onEntityFunction={onChangeTodolistTitleHandler}/>*/}
        {/*    <IconButton onClick={() => props.removeTodolist(props.tdId)}><Delete/></IconButton>*/}
        {/*</Grid>*/}
        {/*CREATE NEW TASK*/}
        <UniversalInputArea type={"input"} onEntityFunction={onCreateTaskHandler} placeholders={funnyPlaceholders}/>
        {/*FILTERS*/}
        <UniversalButtonSet buttonArray={filterValueArr} onEntityFunction={onChangeFilter} defaultFilter={props.defaultFilterValue}/>
        {/*TASK LIST*/}
        <UniversalList inputArr={props.tasks}
                       onCheckHandler={onChangeTaskStatusHandler} onEditHandler={onChangeTaskTitleHandler}
                       onRemoveHandler={onRemoveTaskHandler}/>
    </Box>
}
export const TodolistCard = React.memo(TodolistCardHidden)
