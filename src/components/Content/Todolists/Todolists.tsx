import React, {useCallback} from 'react';
import {Container, Grid, Paper} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../../../state/store";
import {CreateTodolistAC, TodolistType,} from "../../../state/todolists-reducer";
import {TaskArrayType} from "../../../state/tasks-reducer";
import {UniversalInputArea} from "../../../componentsUniversal/UniversalInputArea/UniversalInputArea";
import {TodolistCard} from "./TodolistCard/TodolistCard";


export function Todolists() {
    //TODO make more components
    const dispatch = useDispatch()
    const todolists = useSelector<AppRootState, Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<AppRootState, TaskArrayType>(state => state.tasks)

    const createTodolistHandler = useCallback((title: string) => dispatch(CreateTodolistAC(title)),[])


    return <Container>
        {/*CREATE NEW TODOLIST ZONE*/}
        <Grid container>
            <UniversalInputArea type={"input"} onEntityFunction={createTodolistHandler} initText={''}/>
        </Grid>
        {/*TODOLIST CARDS*/}
        <Grid container spacing={3}>
            {todolists.map(todolist => {
                let tasksForToDoList = tasks[todolist.tdId]
                //TODO перенести в компоненту
                if (todolist.filter === 'completed') tasksForToDoList = tasks[todolist.tdId].filter(t => t.isDone)
                if (todolist.filter === 'active') tasksForToDoList = tasks[todolist.tdId].filter(t => !t.isDone)

                return <Grid item key={todolist.tdId}>
                    <Paper elevation={4} style={{padding: "10px"}}>
                        <TodolistCard tdId={todolist.tdId} title={todolist.title} tasks={tasksForToDoList} defaultFilterValue={todolist.filter}/>
                    </Paper>
                </Grid>
            })}
        </Grid>
    </Container>
}