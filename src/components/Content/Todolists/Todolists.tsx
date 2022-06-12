import React, {useCallback, useEffect} from 'react';
import {Container, Grid, Paper} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../../../state/store";
import {CreateTodolistAC, fetchTodolistsTC, TodolistDomainType} from "../../../state/todolists-reducer";
import {TaskArrayType} from "../../../state/tasks-reducer";
import {UniversalInputArea} from "../../../componentsUniversal/UniversalInputArea/UniversalInputArea";
import {TodolistCard} from "./TodolistCard/TodolistCard";


export function Todolists() {
    //TODO make more components
    const dispatch = useDispatch()
    const todolists = useSelector<AppRootState, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootState, TaskArrayType>(state => state.tasks)

    const createTodolistHandler = useCallback((title: string) => dispatch(CreateTodolistAC(title)), [])
    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [])

    return <Container>
        {/*CREATE NEW TODOLIST ZONE*/}
        <Grid container>
            <UniversalInputArea type={"input"} onEntityFunction={createTodolistHandler} initText={''}/>
        </Grid>
        {/*TODOLIST CARDS*/}
        <Grid container spacing={3}>
            {todolists.map(todolist => {
                let tasksForToDoList = tasks[todolist.id]
                //TODO перенести в компоненту
                if (todolist.filter === 'completed') tasksForToDoList = tasks[todolist.id].filter(t => t.completed)
                if (todolist.filter === 'active') tasksForToDoList = tasks[todolist.id].filter(t => !t.completed)

                return <Grid item key={todolist.id}>
                    <Paper elevation={4} style={{padding: "10px"}}>
                        <TodolistCard tdId={todolist.id} title={todolist.title} tasks={tasksForToDoList}
                                      defaultFilterValue={todolist.filter}/>
                    </Paper>
                </Grid>
            })}
        </Grid>
    </Container>
}