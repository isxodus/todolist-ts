import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValueType} from "../App";
import css from "./ToDoList.module.css"


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type CardType = {
    title: string
    tasks: Array<TaskType>
    addTask: (title: string) => void
    removeTask: (id: string) => void
    changeFilter: (value: FilterValueType) => void
    filter: FilterValueType
}

export function ToDoList(props: CardType) {
    // debugger
    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    //add tasks
    const onChangeNewTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
        setErrorMessage('')
    }
    const onKeyPressNewTaskTitleHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === '\n') {
            props.addTask(newTaskTitle)
            setNewTaskTitle('')
        }
    }
    const addTask = () => {
        debugger
        if (newTaskTitle === '') {
            setErrorMessage('You could not create task with empty title')
            return
        }

        props.addTask(newTaskTitle)
        setNewTaskTitle('')
    }
    //filters
    const onAllClickHandler = () => {
        props.changeFilter("all")
    }
    const onActiveClickHandler = () => {
        props.changeFilter("active")
    }
    const onCompletedClickHandler = () => {
        props.changeFilter("completed")
    }
    //show list


    return <div>
        <div className={css.cardType}>
            <h3>{props.title}</h3>
            <div className={css.inputHandler}>
                <input value={newTaskTitle}
                       onChange={onChangeNewTaskTitleHandler}
                       onKeyPress={onKeyPressNewTaskTitleHandler}
                />
                <button onClick={addTask}>+</button>
                <span className={css.inputHandlerErrorMessage}>{errorMessage}</span>
            </div>
            <div>
                <button className={props.filter === 'all' ? css.activeButton : ''} onClick={onAllClickHandler}>All</button>
                <button className={props.filter === 'active' ? css.activeButton : ''} onClick={onActiveClickHandler}>Active</button>
                <button className={props.filter === 'completed' ? css.activeButton : ''} onClick={onCompletedClickHandler}>Completed</button>
            </div>
            <ul>
                {
                    props.tasks.map((task) => {
                        const onRemoveTaskHandler = () => props.removeTask(task.id)
                        return <li className={task.isDone ? css.doneTask : ''}>
                            <input type={"checkbox"} checked={task.isDone}/> <span>{task.title}</span>
                            <button onClick={onRemoveTaskHandler}>x</button>
                        </li>
                    })
                }
            </ul>

        </div>
    </div>
}