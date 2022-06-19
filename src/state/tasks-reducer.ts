import {Dispatch} from "redux";
import {AppRootState} from "./store";
import {TaskType, todolistsApi, UpdateModelTaskType, UpdateTaskType} from "../api/todolistsApi";
import {
    ActionType as TodolistActionType,
    CreateTodolistAC,
    DeleteTodolistAC,
    SetTodolistsAC,
    SetTodolistStatusAC
} from "./todolists-reducer";
import {ActionType as ApplicationActionType, SetApplicationErrorMessageAC, SetApplicationStatusAC} from "./application-reducer";
//INITIAL STATE
const initialState: TaskArrayType = {}
//REDUCER
export const tasksReducer = (state: TaskArrayType = initialState, action: ActionType): TaskArrayType => {
    switch (action.type) {
        //TODOLIST RELATED
        case 'SET-TODOLISTS': {
            const stateCopy = {...state}
            action.todolists.forEach(el => stateCopy[el.id] = [])
            return stateCopy
        }
        case 'CREATE-TODOLIST':
            return {...state, [action.todolist.id]: []}
        case 'DELETE-TODOLIST': {
            const stateCopy = {...state}
            delete stateCopy[action.tdId]
            return stateCopy
        }
        //TASKS RELATED
        case 'SET-TASKS':
            return {...state, [action.tdId]: action.tasks}
        case 'CREATE-TASK':
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        case 'DELETE-TASK':
            return {...state, [action.tdId]: state[action.tdId].filter((task) => (task.id !== action.taskId))}
        case 'UPDATE-TASK':
            return {
                ...state
                , [action.tdId]: state[action.tdId].map(t => t.id === action.taskId ? {...t, ...action.taskModel} : t)
            }
        default:
            return state
        //throw new Error('invalid value in todolistsReducer fro action.type')
    }
}


//ACTION CREATORS
export const SetTasksAC = (tdId: string, tasks: Array<TaskType>) => ({type: 'SET-TASKS', tdId: tdId, tasks: tasks} as const)
export const CreateTaskAC = (task: TaskType) => ({type: 'CREATE-TASK', task: task} as const)
export const DeleteTaskAC = (tdId: string, taskId: string) => ({type: 'DELETE-TASK', tdId: tdId, taskId: taskId} as const)
export const UpdateTaskAC = (tdId: string, taskId: string, taskModel: UpdateTaskType) => {
    return {type: 'UPDATE-TASK', tdId: tdId, taskId: taskId, taskModel: taskModel} as const
}


//THUNKS
export const fetchTasksTC: any = (tdId: string) => (dispatch: Dispatch<ActionType>) => {
    dispatch(SetTodolistStatusAC(tdId, 'loading', 'none'))
    todolistsApi.getTasks(tdId)
        .then(tasks => {
            dispatch(SetTasksAC(tdId, tasks.items))
            dispatch(SetTodolistStatusAC(tdId, 'success', 'none'))
        })
}
export const createTaskTC: any = (tdId: string, taskTitle: string) => (dispatch: Dispatch<ActionType | ApplicationActionType>) => {
    todolistsApi.createTask(tdId, taskTitle)
        .then(response => {
            console.log(response)
            if (response.resultCode === 0) {
                dispatch(CreateTaskAC(response.data.item))
            } else {
                dispatch(SetApplicationErrorMessageAC(response.messages[0] ? response.messages[0] : 'Cannot create a task'))
            }
        })
        .catch(error => {
            dispatch(SetApplicationErrorMessageAC('Network error has occurred'))
            dispatch(SetApplicationStatusAC('failed'))
        })
}
export const deleteTaskTC: any = (tdId: string, taskId: string) => (dispatch: Dispatch<ActionType>) => {
    todolistsApi.deleteTask(tdId, taskId).then(() => dispatch(DeleteTaskAC(tdId, taskId)))
}
export const updateTaskTC: any = (tdId: string, taskId: string, reducerModel: UpdateModelTaskType) => {
    return (dispatch: Dispatch<ActionType>, getState: () => AppRootState) => {
        const task = getState().tasks[tdId].find(task => task.id === taskId)
        if (!task) {
            console.warn('updateTaskStatusTC warning, no task found')
            return
        }
        const apiModel: UpdateTaskType = {
            deadline: task.deadline, startDate: task.startDate, priority: task.priority,
            title: task.title, description: task.description, status: task.status,
            ...reducerModel
        }
        todolistsApi.updateTask(tdId, taskId, apiModel).then(() => dispatch(UpdateTaskAC(tdId, taskId, apiModel)))
    }
}


//ENTITY-STATE TYPES
export type TaskArrayType = {
    [key: string]: Array<TaskType>
}
//FINAL ACTION TYPE
type ActionType =
    | TodolistActionType
    | ReturnType<typeof SetTodolistsAC>
    | ReturnType<typeof CreateTodolistAC>
    | ReturnType<typeof DeleteTodolistAC>
    | ReturnType<typeof SetTasksAC>
    | ReturnType<typeof CreateTaskAC>
    | ReturnType<typeof DeleteTaskAC>
    | ReturnType<typeof UpdateTaskAC>