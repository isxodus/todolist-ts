import {CreateTodolistAT, RemoveTodolistAT, SetTodolistsAT} from "./todolists-reducer";
import {TaskStatuses, TaskType, todolistsApi, UpdateTaskType} from "../api/todolistsApi";
import {Dispatch} from "redux";
import {AppRootState} from "./store";

//ENTITY TYPES
export type TaskArrayType = {
    [key: string]: Array<TaskType>
}


//ACTION TYPES
type AddTaskAT = {
    type: 'CREATE-TASK'
    task: TaskType
}
type ChangeTaskTitleAT = {
    type: 'CHANGE-TASK-TITLE'
    tdId: string
    taskId: string
    title: string
}
type ChangeTaskStatusAT = {
    type: 'CHANGE-TASK-STATUS'
    tdId: string
    taskId: string
    taskStatus: TaskStatuses
}
type RemoveTaskAT = {
    type: 'DELETE-TASK'
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
            return {...state, [action.todolist.id]: []}
        case 'DELETE-TODOLIST':
            const removeCopy = {...state}
            delete removeCopy[action.tdId]
            return removeCopy
        //TASKS RELATED
        case 'CREATE-TASK':
            return {[action.task.todoListId]: [...state[action.task.todoListId], action.task], ...state}
        case 'CHANGE-TASK-TITLE':
            const changeTaskTitleCopy = {...state}
            changeTaskTitleCopy[action.tdId] = changeTaskTitleCopy[action.tdId].map(task => task.id === action.taskId
                ? {...task, title: action.title}
                : task
            )
            return changeTaskTitleCopy
        case 'CHANGE-TASK-STATUS':
            const changeTaskStatusCopy = {...state}
            changeTaskStatusCopy[action.tdId] = changeTaskStatusCopy[action.tdId].map(task => task.id === action.taskId
                ? {...task, status: action.taskStatus}
                : task
            )
            return changeTaskStatusCopy
        case 'DELETE-TASK':
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
export const CreateTaskAC = (task: TaskType): AddTaskAT => {
    return {type: 'CREATE-TASK', task: task}
}
export const ChangeTaskTitleAC = (tdId: string, taskId: string, title: string): ChangeTaskTitleAT => {
    return {type: 'CHANGE-TASK-TITLE', tdId: tdId, taskId: taskId, title: title}
}
export const ChangeTaskStatusAC = (tdId: string, taskId: string, taskStatus: TaskStatuses): ChangeTaskStatusAT => {
    return {type: 'CHANGE-TASK-STATUS', tdId: tdId, taskId: taskId, taskStatus: taskStatus}
}
export const DeleteTaskAC = (tdId: string, taskId: string): RemoveTaskAT => {
    return {type: 'DELETE-TASK', tdId: tdId, taskId: taskId}
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
        todolistsApi.createTask(tdId, taskTitle).then(response => dispatch(CreateTaskAC(response.data.item)))
    }
}
export const deleteTaskTC: any = (tdId: string, taskId: string) => {
    return (dispatch: Dispatch) => {
        todolistsApi.deleteTask(tdId, taskId).then(() => dispatch(DeleteTaskAC(tdId, taskId)))
    }
}
export const updateTaskStatusTC: any = (tdId: string, taskId: string) => {
    return (dispatch: Dispatch, getState: () => AppRootState) => {
        const task = getState().tasks[tdId].find(task => task.id === taskId)
        if (!task) {
            console.warn('updateTaskStatusTC warning, no task found')
            return
        }
        const model: UpdateTaskType = {
            deadline: task.deadline, startDate: task.startDate, priority: task.priority,
            title: task.title, description: task.description,
            status: task.status === 0 ? TaskStatuses.Completed : TaskStatuses.New
        }
        todolistsApi.updateTask(tdId, taskId, model).then(response => dispatch(ChangeTaskStatusAC(tdId, taskId, model.status)))
    }
}