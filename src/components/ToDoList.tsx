import React from "react";
import {FilterValueType} from "../App";
import css from "./ToDoList.module.css"
import {UniversalInputArea} from "../componentsUniversal/UniversalInputArea/UniversalInputArea";
import {UniversalEditableSpan} from "../componentsUniversal/UniversalEditableSpan/UniversalEditableSpan";
import {Box, Button, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type CardType = {
    id: string
    title: string
    tasks: Array<TaskType>
    addTask: (id: string, title: string) => void
    removeTask: (id: string, taskId: string) => void
    changeFilter: (id: string, value: FilterValueType) => void
    filter: FilterValueType
    removeTodolist: (id: string) => void
    editTask: (listId: string, taskId: string, title: string) => void
}

export function ToDoList(props: CardType) {
    //filters
    const onAllClickHandler = () => {
        props.changeFilter(props.id, "all")
    }
    const onActiveClickHandler = () => {
        props.changeFilter(props.id, "active")
    }
    const onCompletedClickHandler = () => {
        props.changeFilter(props.id, "completed")
    }
    //show list


    const createNewTask = (text: string) => {
        props.addTask(props.id, text)
    }


    return <div>

        <div className={css.cardType}>
            <div><span><b>{props.title}</b></span> <IconButton onClick={() => props.removeTodolist(props.id)}><Delete/></IconButton></div>

            <UniversalInputArea type={"input"} onEntityFunction={createNewTask} placeholders={["create new task", "add smth", "maybe add smth"]}/>
            {/*<UniversalInputArea type={"input"} onEntityFunction={createNewTask}*/}
            {/*                    forbidEmptyInput={true} showErrorMessage={true}*/}
            {/*                    placeholders={["create new task", "add smth", "maybe add smth"]}/>*/}

            {/*<UniversalInputArea type={"input"} onEntityFunction={createNewTask} showCancelButton/>*/}
            {/*<UniversalInputArea type={"textarea"} onEntityFunction={createNewTask} showCancelButton/>*/}


            {/*<UniversalInputArea type={"textarea"} onEntityFunction={createNewTask}*/}
            {/*                    showCancelButton={true}*/}
            {/*                    forbidEmptyInput={true} showErrorMessage={true}*/}
            {/*                    placeholders={["create new task", "add smth", "maybe add smth"]}/>*/}


            <div>
                <Button variant={props.filter === 'all' ? 'outlined' : undefined} onClick={onAllClickHandler}>All</Button>
                <Button variant={props.filter === 'active' ? 'outlined' : undefined} onClick={onActiveClickHandler}>Active</Button>
                <Button variant={props.filter === 'completed' ? 'outlined' : undefined} onClick={onCompletedClickHandler}>Completed</Button>
            </div>
            <div>
                {
                    props.tasks.map((task) => {
                        const onSpanEditTaskFunction = (text: string) => {
                            props.editTask(props.id, task.id, text)
                        }
                        const onRemoveTaskHandler = () => props.removeTask(props.id, task.id)
                        return <div key={task.id} className={task.isDone ? css.doneTask : ''}>
                            <Box className={css.liItems}>
                                <Checkbox checked={task.isDone}/>
                                <UniversalEditableSpan text={task.title} onEntityFunction={onSpanEditTaskFunction}/>
                                <Button onClick={onRemoveTaskHandler}>x</Button>
                            </Box>
                        </div>
                    })
                }
            </div>

        </div>
    </div>
}

