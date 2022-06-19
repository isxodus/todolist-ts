import React, {useCallback, useEffect} from 'react';
import {Container, Grid, Paper} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../../../state/store";
import {createTodolistTC, fetchTodolistsTC, TodolistDomainType} from "../../../state/todolists-reducer";
import {TaskArrayType} from "../../../state/tasks-reducer";
import {UniversalInputArea} from "../../../componentsUniversal/UniversalInputArea/UniversalInputArea";
import {TodolistCard} from "./TodolistCard/TodolistCard";
import {TaskStatuses} from "../../../api/todolistsApi";


type TodolistsPropsType = {
    demo?: boolean
}

export function Todolists({demo = false, ...props}: TodolistsPropsType) {
    const dispatch = useDispatch()
    const todolists = useSelector<AppRootState, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootState, TaskArrayType>(state => state.tasks)

    const createTodolistHandler = useCallback((title: string) => dispatch(createTodolistTC(title)), [])
    useEffect(() => {
        if (demo) return
        dispatch(fetchTodolistsTC())
    }, [])

    return <Container>
        {/*CREATE NEW TODOLIST ZONE*/}
        <Grid container>
            <UniversalInputArea type={"input"} onEntityFunction={createTodolistHandler} initText={''}/>
        </Grid>
        {/*TODOLIST CARDS*/}
        <Grid container spacing={2}>
            {todolists.map(todolist => {
                let tasksForToDoList = tasks[todolist.id]
                //TODO перенести в компоненту + status
                if (todolist.filter === 'completed') tasksForToDoList = tasks[todolist.id].filter(t => t.status === TaskStatuses.Completed)
                if (todolist.filter === 'active') tasksForToDoList = tasks[todolist.id].filter(t => t.status === TaskStatuses.New)

                return <Grid item key={todolist.id}>
                    <Paper elevation={4}
                           style={{padding: "10px", paddingTop: "4px"}}>
                        <TodolistCard todolist={todolist}
                                      tasks={tasksForToDoList}/>
                    </Paper>
                </Grid>
            })}
        </Grid>
    </Container>
}