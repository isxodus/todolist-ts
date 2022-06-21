import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        "API-KEY": "48169160-cec4-4970-9d28-0ecb4c6641d9"
    }
})
export const todolistsApi = {
    getTodolists() {
        return instance.get<Array<TodolistType>>('todo-lists').then(response => response.data)
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>('todo-lists', {title: title}).then(response => response.data)
    },
    deleteTodolist(id: string) {
        return instance.delete<ResponseType>(`todo-lists/${id}`).then(response => response.data)
    },
    updateTodolist(id: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${id}`, {title: title}).then(response => response.data)
    },
    getTasks(tdId: string) {
        return instance.get<TaskResponseType>(`todo-lists/${tdId}/tasks`).then(response => response.data)
    },
    createTask(tdId: string, taskTitle: string) {
        return instance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${tdId}/tasks`, {title: taskTitle})
            .then(response => response.data)
    },
    deleteTask(tdId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${tdId}/tasks/${taskId}`).then(response => response.data)
    },
    updateTask(tdId: string, taskId: string, model: UpdateTaskType) {
        return instance.put<ResponseType>(`todo-lists/${tdId}/tasks/${taskId}`, model).then(response => response.data)
    }
}


//TYPES
export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

export enum TaskStatuses {
    New,
    InProgress,
    Completed,
    Draft
}

export enum TaskPriorities {
    Low,
    Middle,
    High,
    Urgent,
    Later
}

export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type UpdateTaskType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}
export type UpdateModelTaskType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
export type ResponseType<I = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: I
}
export type TaskResponseType = {
    totalCount: number
    error: string | null
    items: Array<TaskType>
}


