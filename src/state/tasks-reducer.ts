import {CreateTodolistAT, RemoveTodolistAT, SetTodolistsAT} from "./todolists-reducer";
import {TaskType, todolistsApi, UpdateModelTaskType, UpdateTaskType} from "../api/todolistsApi";
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
type UpdateTaskAT = {
    type: 'UPDATE-TASK'
    tdId: string
    taskId: string
    taskModel: UpdateTaskType
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
    | UpdateTaskAT
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
        case 'CREATE-TASK': {
            const stateCopy = {...state}
            const newTasks = [action.task, ...stateCopy[action.task.todoListId]]
            stateCopy[action.task.todoListId] = newTasks
            return stateCopy
        }

        case 'UPDATE-TASK':
            const changeTaskTitleCopy = {...state}
            changeTaskTitleCopy[action.tdId] = changeTaskTitleCopy[action.tdId].map(task => task.id === action.taskId
                ? {...task, ...action.taskModel}
                : task
            )
            return changeTaskTitleCopy
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
export const SetTasksAC = (tdId: string, tasks: Array<TaskType>): SetTasksAT => {
    return {type: 'SET-TASKS', tdId: tdId, tasks: tasks}
}
export const CreateTaskAC = (task: TaskType): AddTaskAT => {
    return {type: 'CREATE-TASK', task: task}
}
export const DeleteTaskAC = (tdId: string, taskId: string): RemoveTaskAT => {
    return {type: 'DELETE-TASK', tdId: tdId, taskId: taskId}
}
export const UpdateTaskAC = (tdId: string, taskId: string, taskModel: UpdateTaskType): UpdateTaskAT => {
    return {type: 'UPDATE-TASK', tdId: tdId, taskId: taskId, taskModel: taskModel}
}
// export const ChangeTaskStatusAC = (tdId: string, taskId: string, taskStatus: TaskStatuses): ChangeTaskStatusAT => {
//     return {type: 'CHANGE-TASK-STATUS', tdId: tdId, taskId: taskId, taskStatus: taskStatus}
// }


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
export const updateTaskTC: any = (tdId: string, taskId: string, reducerModel: UpdateModelTaskType) => {
    return (dispatch: Dispatch, getState: () => AppRootState) => {
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