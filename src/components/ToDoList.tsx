import React, {ChangeEvent, KeyboardEvent, MouseEvent, useState} from "react";
import {FilterValueType} from "../App";


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
}

export function ToDoList(props: CardType) {
    // debugger
    const [newTaskTitle, setNewTaskTitle] = useState('')
    //add tasks
    const onChangeNewTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressNewTaskTitleHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === '\n') {
            props.addTask(newTaskTitle)
            setNewTaskTitle('')
        }
    }
    const addTask = (e: MouseEvent<HTMLButtonElement>) => {
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
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={newTaskTitle}
                       onChange={onChangeNewTaskTitleHandler}
                       onKeyPress={onKeyPressNewTaskTitleHandler}
                />
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {
                    props.tasks.map((task) => {
                        const onRemoveTaskHandler = () => props.removeTask(task.id)
                        return <li>
                            <input type={"checkbox"} checked={task.isDone}/> <span>{task.title}</span>
                            <button onClick={onRemoveTaskHandler}>x</button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    </div>
}