import React, {useState} from 'react';
import './App.css';
import {TaskType, ToDoList} from "./components/ToDoList";
import {v1} from "uuid";
import {UniversalInputArea} from "./componentsUniversal/UniversalInputArea/UniversalInputArea";
import {AppBar, Container, Grid, IconButton, Paper, Toolbar} from "@mui/material";
import {Menu} from "@mui/icons-material";

export type FilterValueType = 'all' | 'completed' | 'active'
export type TodolistType = {
    id: string
    title: string
    filter: FilterValueType
}


function App() {

    let tdList1 = v1()
    let tdList2 = v1()
    let [todolists, setTodolists] = useState<Array<TodolistType>>([
            {id: tdList1, title: "What to learn", filter: "active"},
            {id: tdList2, title: "What to buy", filter: "all"},
        ]
    )

    let [tasks, setTasks] = useState({
        [tdList1]: [
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "JavaScript", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Redux", isDone: false}
        ],
        [tdList2]: [
            {id: v1(), title: "milk", isDone: true},
            {id: v1(), title: "bread", isDone: true},
            {id: v1(), title: "cheese", isDone: true},
            {id: v1(), title: "cake", isDone: false},
            {id: v1(), title: "towel", isDone: false}
        ]

    })

    const createNewTodolist = (todolistName: string) => {
        const id = v1()
        const newTodolist: TodolistType = {id: id, title: todolistName, filter: 'all'}
        setTodolists([newTodolist, ...todolists])
        setTasks({...tasks, [id]: []})
    }


    const changeFilter = (id: string, filter: FilterValueType) => {
        let tempArr: Array<TodolistType> = todolists.map(todolist => {
            if (todolist.id === id) todolist.filter = filter
            return todolist
        })
        setTodolists([...tempArr])
    }

    const removeTask = (id: string, taskId: string) => {
        let tempTasks = {...tasks}
        tempTasks[id] = tasks[id].filter((t) => (t.id !== taskId))
        setTasks({...tempTasks})
    }

    function addTask(id: string, title: string) {
        let tempTasks = {...tasks}
        let newTask: TaskType = {id: v1(), title: title, isDone: false}
        tempTasks[id] = [...tempTasks[id], newTask]
        setTasks({...tempTasks})
    }

    const removeTodolist = (id: string) => {
        let tempTodolists = [...todolists]
        tempTodolists = tempTodolists.filter((t) => (t.id !== id))

        let tempTasks = {...tasks}
        delete tempTasks[id]

        setTodolists(tempTodolists)
        setTasks(tempTasks)
    }

    const editTask = (listId: string, taskId: string, title: string) => {
        let tempTasks = {...tasks}
        tempTasks[listId].filter(el => el.id === taskId)[0].title = title
        setTasks({...tempTasks})
    }


    // console.log(initList)
    return <div className="App">
        <AppBar position={"static"}>
            <Toolbar>
                <IconButton>
                    <Menu/>
                </IconButton>

            </Toolbar>

        </AppBar>
        <Container>
            <Grid container>
                <UniversalInputArea type={"input"} onEntityFunction={createNewTodolist} initText={''}/>
            </Grid>
            <Grid container spacing={3}>
                {todolists.map(todolist => {
                    let tasksForToDoList = tasks[todolist.id]
                    if (todolist.filter === 'completed') {
                        tasksForToDoList = tasks[todolist.id].filter((t: TaskType) => t.isDone)
                    }
                    if (todolist.filter === 'active') {
                        tasksForToDoList = tasks[todolist.id].filter((t: TaskType) => !t.isDone)
                    }
                    return <Grid item>
                        <Paper elevation={4} style={{padding: "10px"}}>
                            <ToDoList key={todolist.id}
                                      id={todolist.id}
                                      title={todolist.title}
                                      tasks={tasksForToDoList}
                                      addTask={addTask}
                                      removeTask={removeTask}
                                      changeFilter={changeFilter}
                                      filter={todolist.filter}
                                      removeTodolist={removeTodolist}
                                      editTask={editTask}
                            />
                        </Paper>
                    </Grid>
                })}
            </Grid>
        </Container>
    </div>
}

export default App;
