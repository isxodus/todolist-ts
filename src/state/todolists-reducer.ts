import {v1} from "uuid";
//ENTITY TYPES
export type FilterValueType = 'all' | 'completed' | 'active'
export type TodolistType = {
    id: string
    title: string
    filter: FilterValueType
}

//ACTION TYPES
type CreateTodolistAT = {
    type: 'CREATE-TODOLIST'
    title: string
}
type RemoveTodolistAT = {
    type: 'REMOVE-TODOLIST'
    id: string
}
type ChangeTodolistFilterAT = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValueType
}
type ChangeTodolistTitleAT = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}
//FINAL ACTION TYPE
type ActionType = CreateTodolistAT | RemoveTodolistAT | ChangeTodolistFilterAT | ChangeTodolistTitleAT


//REDUCER
export const todolistsReducer = (state: Array<TodolistType>, action: ActionType): Array<TodolistType> => {
    debugger
    switch (action.type) {
        case 'CREATE-TODOLIST':
            return [...state, {id: v1(), title: action.title, filter: "all"},]
        case 'REMOVE-TODOLIST':
            return state.filter((todolist) => (todolist.id !== action.id))
        case 'CHANGE-TODOLIST-FILTER':
            return state.map((todolist) => {
                if (todolist.id === action.id) todolist.filter = action.filter
                return todolist
            })
        case 'CHANGE-TODOLIST-TITLE':
            return state.map((todolist) => {
                if (todolist.id === action.id) todolist.title = action.title
                return todolist
            })
        default:
            throw new Error('invalid value in todolistsReducer fro action.type')
    }
}


//ACTION CREATORS
export const CreateTodolistAC = (title: string): CreateTodolistAT => {
    return {type: 'CREATE-TODOLIST', title: title}
}
export const RemoveTodolistAC = (id: string): RemoveTodolistAT => {
    return {type: 'REMOVE-TODOLIST', id: id}
}
export const ChangeTodolistFilterAC = (id: string, filter: FilterValueType): ChangeTodolistFilterAT => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter}
}
export const ChangeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleAT => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title}
}
