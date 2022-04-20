import React from "react";
import {FilterValueType} from "../App";
import css from "./ToDoList.module.css"
import {UniversalInputArea} from "../componentsUniversal/UniversalInputArea/UniversalInputArea";


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
}

export function ToDoList(props: CardType) {
    // debugger
    // const [newTaskTitle, setNewTaskTitle] = useState('')
    // const [errorMessage, setErrorMessage] = useState('')
    // //add tasks
    // const onChangeNewTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    //     setNewTaskTitle(e.currentTarget.value)
    //     setErrorMessage('')
    // }
    // const onKeyPressNewTaskTitleHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    //     if (e.key === '\n') {
    //         props.addTask(props.id, newTaskTitle)
    //         setNewTaskTitle('')
    //     }
    // }
    // const addTask = () => {
    //     // debugger
    //     if (newTaskTitle === '') {
    //         setErrorMessage('You could not create task with empty title')
    //         return
    //     }
    //
    //     props.addTask(props.id, newTaskTitle)
    //     setNewTaskTitle('')
    // }
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
            <div><h3>{props.title}</h3>
                <button onClick={() => props.removeTodolist(props.id)}>X</button>
            </div>

            <UniversalInputArea type={"input"} createNewEntityFunction={createNewTask}
                                noEmptyInput={true} needErrorMessage={true}
                                placeholders={["create new task", "add smth", "maybe add smth"]}/>
            <div>
                <button className={props.filter === 'all' ? css.activeButton : ''} onClick={onAllClickHandler}>All</button>
                <button className={props.filter === 'active' ? css.activeButton : ''} onClick={onActiveClickHandler}>Active</button>
                <button className={props.filter === 'completed' ? css.activeButton : ''} onClick={onCompletedClickHandler}>Completed</button>
            </div>
            <ul>
                {
                    props.tasks.map((task) => {
                        const onRemoveTaskHandler = () => props.removeTask(props.id, task.id)
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