import React from "react";
import {FilterValueType} from "../App";
import css from "./ToDoList.module.css"
import {UniversalInputArea} from "../componentsUniversal/UniversalInputArea/UniversalInputArea";
import {UniversalEditableSpan} from "../componentsUniversal/UniversalEditableSpan/UniversalEditableSpan";


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
            <div><h3>{props.title}</h3>
                <button onClick={() => props.removeTodolist(props.id)}>X</button>
            </div>

            <UniversalInputArea type={"input"} onEntityFunction={createNewTask}
                                forbidEmptyInput={true} showErrorMessage={true}
                                placeholders={["create new task", "add smth", "maybe add smth"]}/>

            <UniversalInputArea type={"input"} onEntityFunction={createNewTask} showCancelButton/>
            <UniversalInputArea type={"textarea"} onEntityFunction={createNewTask} showCancelButton/>


            <UniversalInputArea type={"textarea"} onEntityFunction={createNewTask}
                                showCancelButton={true}
                                forbidEmptyInput={true} showErrorMessage={true}
                                placeholders={["create new task", "add smth", "maybe add smth"]}/>


            <div>
                <button className={props.filter === 'all' ? css.activeButton : ''} onClick={onAllClickHandler}>All</button>
                <button className={props.filter === 'active' ? css.activeButton : ''} onClick={onActiveClickHandler}>Active</button>
                <button className={props.filter === 'completed' ? css.activeButton : ''} onClick={onCompletedClickHandler}>Completed</button>
            </div>
            <ul>
                {
                    props.tasks.map((task) => {
                        const onSpanEditTaskFunction = (text: string) => {
                            props.editTask(props.id, task.id, text)
                        }
                        const onRemoveTaskHandler = () => props.removeTask(props.id, task.id)
                        return <li key={task.id} className={task.isDone ? css.doneTask : ''}>
                            <input type={"checkbox"} checked={task.isDone}/>
                            <UniversalEditableSpan text={task.title} onEntityFunction={onSpanEditTaskFunction}/>
                            <button onClick={onRemoveTaskHandler}>x</button>
                        </li>
                    })
                }
            </ul>

        </div>
    </div>
}

