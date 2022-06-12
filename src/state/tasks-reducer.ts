import {CreateTodolistAT, RemoveTodolistAT, SetTodolistsAT} from "./todolists-reducer";
import {TaskType, todolistsApi} from "../api/todolistsApi";
import {Dispatch} from "redux";

//ENTITY TYPES
export type TaskArrayType = {
    [key: string]: Array<TaskType>
}


//ACTION TYPES
type AddTaskAT = {
    type: 'ADD-TASK'
    task: TaskType
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
type SetTasksAT = {
    type: 'SET-TASKS'
    tdId: string
    tasks: Array<TaskType>
}
//FINAL ACTION TYPE
type ActionType =
    SetTodolistsAT
    | CreateTodolistAT
    | RemoveTodolistAT
    | AddTaskAT
    | ChangeTaskTitleAT
    | ChangeTaskStatusAT
    | RemoveTaskAT
    | SetTasksAT


//INITIAL STATE
const initialState: TaskArrayType = {
    // ['1']: [
    //     {
    //         id: v1(), title: "HTML", status: TaskStatuses.Completed, completed: true, todoListId: '1',
    //         priority: TaskPriorities.Middle, order: 0, description: 'AAA',
    //         addedDate: '', startDate: '', deadline: ''
    //     },
    //     {
    //         id: v1(), title: "CSS", status: TaskStatuses.Completed, completed: true, todoListId: '1',
    //         priority: TaskPriorities.Middle, order: 0, description: 'AAA',
    //         addedDate: '', startDate: '', deadline: ''
    //     },
    //     {
    //         id: v1(), title: "JavaScript", status: TaskStatuses.Completed, completed: true, todoListId: '1',
    //         priority: TaskPriorities.Middle, order: 0, description: 'AAA',
    //         addedDate: '', startDate: '', deadline: ''
    //     },
    //     {
    //         id: v1(), title: "React", status: TaskStatuses.New, completed: false, todoListId: '1',
    //         priority: TaskPriorities.Middle, order: 0, description: 'AAA',
    //         addedDate: '', startDate: '', deadline: ''
    //     },
    //     {
    //         id: v1(), title: "Redux", status: TaskStatuses.New, completed: false, todoListId: '1',
    //         priority: TaskPriorities.Middle, order: 0, description: 'AAA',
    //         addedDate: '', startDate: '', deadline: ''
    //     }
    // ],
    // ['2']: [
    //     {
    //         id: v1(), title: "milk", status: TaskStatuses.Completed, completed: true, todoListId: '2',
    //         priority: TaskPriorities.Middle, order: 0, description: 'AAA',
    //         addedDate: '', startDate: '', deadline: ''
    //     },
    //     {
    //         id: v1(), title: "bread", status: TaskStatuses.Completed, completed: true, todoListId: '2',
    //         priority: TaskPriorities.Middle, order: 0, description: 'AAA',
    //         addedDate: '', startDate: '', deadline: ''
    //     },
    //     {
    //         id: v1(), title: "cheese", status: TaskStatuses.Completed, completed: true, todoListId: '2',
    //         priority: TaskPriorities.Middle, order: 0, description: 'AAA',
    //         addedDate: '', startDate: '', deadline: ''
    //     },
    //     {
    //         id: v1(), title: "cake", status: TaskStatuses.New, completed: false, todoListId: '2',
    //         priority: TaskPriorities.Middle, order: 0, description: 'AAA',
    //         addedDate: '', startDate: '', deadline: ''
    //     },
    //     {
    //         id: v1(), title: "towel", status: TaskStatuses.New, completed: false, todoListId: '2',
    //         priority: TaskPriorities.Middle, order: 0, description: 'AAA',
    //         addedDate: '', startDate: '', deadline: ''
    //     }
    // ]
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
        //TASKS RELATED
        case 'ADD-TASK':
            return {...state, [action.task.todoListId]: [...state[action.task.todoListId], action.task]}
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
                ? {...task, completed: !task.completed}
                : task
            )
            return changeTaskStatusCopy
        case 'REMOVE-TASK':
            const removeTaskCopy = {...state}
            removeTaskCopy[action.tdId] = state[action.tdId].filter((task) => (task.id !== action.taskId))
            return removeTaskCopy
        case 'SET-TODOLISTS':
            const newTasksIds = {...state}
            action.todolists.forEach(el => newTasksIds[el.id] = [])
            return newTasksIds
        case 'SET-TASKS':
            const newTasks = {...state}
            newTasks[action.tdId] = action.tasks
            return newTasks
        default:
            return state
        //throw new Error('invalid value in todolistsReducer fro action.type')
    }
}


//ACTION CREATORS
export const AddTaskAC = (task: TaskType): AddTaskAT => {
    return {type: 'ADD-TASK', task: task}
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
export const SetTasksAC = (tdId: string, tasks: Array<TaskType>): SetTasksAT => {
    return {type: 'SET-TASKS', tdId: tdId, tasks: tasks}
}


//THUNKS
export const fetchTasksTC: any = (tdId: string) => {
    return (dispatch: Dispatch) => {
        todolistsApi.getTasks(tdId).then(tasks => dispatch(SetTasksAC(tdId, tasks.items)))
    }
}
export const createTaskTC: any = (tdId: string, taskTitle: string) => {
    return (dispatch: Dispatch) => {
        todolistsApi.createTask(tdId, taskTitle).then(response => dispatch(AddTaskAC(response.data.item)))
    }
}
export const deleteTaskTC: any = (tdId: string, taskId: string) => {
    return (dispatch: Dispatch) => {
        todolistsApi.deleteTask(tdId, taskId).then(() => dispatch(RemoveTaskAC(tdId, taskId)))
    }
}