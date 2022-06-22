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
import {ActionType as ApplicationActionType, ApplicationStatusType, LoadingStatusOriginType} from "./application-reducer";
import {handleAppError, handleAppFetchError, handleNetworkError} from "../application/utilsErrorHandling/utilsErrorHandling";
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
        case 'SET-TASKS': {
            const actionTasks: Array<TaskDomainType> = action.tasks.map(task => ({
                ...task,
                loadingStatus: 'idle',
                loadingStatusOrigin: 'none'
            }))
            return {...state, [action.tdId]: actionTasks}
        }
        case 'SET-TASK-STATUS': {
            return {
                ...state, [action.tdId]: state[action.tdId].map(task => task.id === action.taskId
                    ? {...task, loadingStatus: action.loadingStatus, loadingStatusOrigin: action.loadingStatusOrigin}
                    : task)
            }
        }
        case 'CREATE-TASK':
            return {
                ...state,
                [action.task.todoListId]: [{
                    ...action.task,
                    loadingStatus: 'idle',
                    loadingStatusOrigin: 'none'
                }, ...state[action.task.todoListId]]
            }
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
export const SetTaskStatusAC = (tdId: string, taskId: string, loadingStatus: ApplicationStatusType, loadingStatusOrigin: LoadingStatusOriginType) => {
    return {
        type: 'SET-TASK-STATUS',
        tdId,
        taskId,
        loadingStatus: loadingStatus,
        loadingStatusOrigin: loadingStatusOrigin
    } as const
}
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
            if (!tasks.error) {
                dispatch(SetTasksAC(tdId, tasks.items))
                dispatch(SetTodolistStatusAC(tdId, 'success', 'none'))
            } else handleAppFetchError(tasks, dispatch)
        })
        .catch(error => handleNetworkError(error, dispatch))
}
export const createTaskTC: any = (tdId: string, taskTitle: string) => (dispatch: Dispatch<ActionType | ApplicationActionType>) => {
    todolistsApi.createTask(tdId, taskTitle)
        .then(response => {
            if (response.resultCode === 0) dispatch(CreateTaskAC(response.data.item))
            else handleAppError(response, dispatch)
        })
        .catch(error => handleNetworkError(error, dispatch))
}
export const deleteTaskTC: any = (tdId: string, taskId: string) => (dispatch: Dispatch<ActionType>) => {
    dispatch(SetTaskStatusAC(tdId, taskId, 'loading', 'processing'))
    todolistsApi.deleteTask(tdId, taskId)
        .then((response) => {
            if (response.resultCode === 0) {
                dispatch(DeleteTaskAC(tdId, taskId))
                dispatch(SetTaskStatusAC(tdId, taskId, 'success', 'none'))
            } else handleAppError(response, dispatch)
        })
        .catch(error => handleNetworkError(error, dispatch))
}
export const updateTaskTC: any = (tdId: string, taskId: string, reducerModel: UpdateModelTaskType
    , loadingStatus: ApplicationStatusType, loadingStatusOrigin: LoadingStatusOriginType) => {
    return (dispatch: Dispatch<ActionType>, getState: () => AppRootState) => {
        dispatch(SetTaskStatusAC(tdId, taskId, loadingStatus, loadingStatusOrigin))
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
        todolistsApi.updateTask(tdId, taskId, apiModel)
            .then((response) => {
                if (response.resultCode === 0) {
                    dispatch(UpdateTaskAC(tdId, taskId, apiModel))
                    dispatch(SetTaskStatusAC(tdId, taskId, 'success', 'none'))
                } else handleAppError(response, dispatch)
            })
            .catch(error => handleNetworkError(error, dispatch))
    }
}
export const updateTaskTitleTC: any = (tdId: string, taskId: string, reducerModel: UpdateModelTaskType) => {
    return (dispatch: Dispatch<ActionType>) => dispatch(updateTaskTC(tdId, taskId, reducerModel, 'loading', 'title'))
}
export const updateTaskStatusTC: any = (tdId: string, taskId: string, reducerModel: UpdateModelTaskType) => {
    return (dispatch: Dispatch<ActionType>) => dispatch(updateTaskTC(tdId, taskId, reducerModel, 'loading', 'status'))
}


//ENTITY-STATE TYPES
export type TaskArrayType = {
    [key: string]: Array<TaskDomainType>
}
export type TaskDomainType = TaskType & {
    loadingStatus: ApplicationStatusType
    loadingStatusOrigin: LoadingStatusOriginType
}
//FINAL ACTION TYPE
export type ActionType =
    | TodolistActionType
    | ReturnType<typeof SetTodolistsAC>
    | ReturnType<typeof SetTaskStatusAC>
    | ReturnType<typeof CreateTodolistAC>
    | ReturnType<typeof DeleteTodolistAC>
    | ReturnType<typeof SetTasksAC>
    | ReturnType<typeof CreateTaskAC>
    | ReturnType<typeof DeleteTaskAC>
    | ReturnType<typeof UpdateTaskAC>