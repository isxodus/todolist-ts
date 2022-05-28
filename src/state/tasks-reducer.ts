import {v1} from "uuid";
import {CreateTodolistAT, RemoveTodolistAT} from "./todolists-reducer";

//ENTITY TYPES
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TaskArrayType = {
    [key: string]: Array<TaskType>
}


//ACTION TYPES
type AddTaskAT = {
    type: 'ADD-TASK'
    tdId: string
    title: string
}
type ChangeTaskTitleAT = {
    type: 'CHANGE-TASK-TITLE'
    tdId: string
    taskId: string
    title: string
}
type ChangeTaskStatusAT = {
    type: 'CHANGE-TASK-FILTER'
    tdId: string
    taskId: string
}
type RemoveTaskAT = {
    type: 'REMOVE-TASK'
    tdId: string
    taskId: string
}
//FINAL ACTION TYPE
type ActionType =
    CreateTodolistAT
    | RemoveTodolistAT
    | AddTaskAT
    | ChangeTaskTitleAT
    | ChangeTaskStatusAT
    | RemoveTaskAT


//INITIAL STATE
const initialState: TaskArrayType = {
    ['1']: [
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "JavaScript", isDone: true},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "Redux", isDone: false}
    ],
    ['2']: [
        {id: v1(), title: "milk", isDone: true},
        {id: v1(), title: "bread", isDone: true},
        {id: v1(), title: "cheese", isDone: true},
        {id: v1(), title: "cake", isDone: false},
        {id: v1(), title: "towel", isDone: false}
    ]
}
//REDUCER
export const tasksReducer = (state: TaskArrayType = initialState, action: ActionType): TaskArrayType => {
    switch (action.type) {
        case 'CREATE-TODOLIST':
            return {...state, [action.tdId]: []}
        case 'REMOVE-TODOLIST':
            const removeCopy = {...state}
            delete removeCopy[action.tdId]
            return removeCopy
        case 'ADD-TASK':
            return {...state, [action.tdId]: [...state[action.tdId], {id: v1(), title: action.title, isDone: false}]}
        case 'CHANGE-TASK-TITLE':
            const changeTaskTitleCopy = {...state}
            changeTaskTitleCopy[action.tdId] = changeTaskTitleCopy[action.tdId].map(task => task.id === action.taskId
                ? {...task, title: action.title}
                : task
            )
            return changeTaskTitleCopy
        case 'CHANGE-TASK-FILTER':
            const changeTaskStatusCopy = {...state}
            changeTaskStatusCopy[action.tdId] = changeTaskStatusCopy[action.tdId].map(task => task.id === action.taskId
                ? {...task, isDone: !task.isDone}
                : task
            )
            return changeTaskStatusCopy
        case 'REMOVE-TASK':
            const removeTaskCopy = {...state}
            removeTaskCopy[action.tdId] = state[action.tdId].filter((task) => (task.id !== action.taskId))
            return removeTaskCopy
        default:
            return state
        //throw new Error('invalid value in todolistsReducer fro action.type')
    }
}


//ACTION CREATORS
export const AddTaskAC = (tdId: string, title: string): AddTaskAT => {
    return {type: 'ADD-TASK', tdId: tdId, title: title}
}
export const ChangeTaskTitleAC = (tdId: string, taskId: string, title: string): ChangeTaskTitleAT => {
    return {type: 'CHANGE-TASK-TITLE', tdId: tdId, taskId: taskId, title: title}
}
export const ChangeTaskStatusAC = (tdId: string, taskId: string): ChangeTaskStatusAT => {
    return {type: 'CHANGE-TASK-FILTER', tdId: tdId, taskId: taskId}
}
export const RemoveTaskAC = (tdId: string, taskId: string): RemoveTaskAT => {
    return {type: 'REMOVE-TASK', tdId: tdId, taskId: taskId}
}
