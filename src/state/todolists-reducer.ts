import {v1} from "uuid";
//ENTITY TYPES
export type FilterValueType = 'all' | 'completed' | 'active'
export type TodolistType = {
    tdId: string
    title: string
    filter: FilterValueType
}

//ACTION TYPES
export type CreateTodolistAT = {
    type: 'CREATE-TODOLIST'
    tdId: string
    title: string
}
export type RemoveTodolistAT = {
    type: 'REMOVE-TODOLIST'
    tdId: string
}
type ChangeTodolistFilterAT = {
    type: 'CHANGE-TODOLIST-FILTER'
    tdId: string
    filter: FilterValueType
}
type ChangeTodolistTitleAT = {
    type: 'CHANGE-TODOLIST-TITLE'
    tdId: string
    title: string
}
//FINAL ACTION TYPE
type ActionType = CreateTodolistAT | RemoveTodolistAT | ChangeTodolistFilterAT | ChangeTodolistTitleAT


//INITIAL STATE
const initialState: Array<TodolistType> = [
    {tdId: '1', title: "What to learn", filter: "active"},
    {tdId: '2', title: "What to buy", filter: "all"},
]
//REDUCER
export const todolistsReducer = (state: Array<TodolistType> = initialState, action: ActionType): Array<TodolistType> => {
    switch (action.type) {
        case 'CREATE-TODOLIST':
            return [...state, {tdId: action.tdId, title: action.title, filter: "all"},]
        case 'REMOVE-TODOLIST':
            return [...state].filter((todolist) => (todolist.tdId !== action.tdId))
        case 'CHANGE-TODOLIST-FILTER':
            return state.map((todolist) => {
                if (todolist.tdId === action.tdId) todolist.filter = action.filter
                return todolist
            })
        case 'CHANGE-TODOLIST-TITLE':
            return state.map((todolist) => {
                if (todolist.tdId === action.tdId) todolist.title = action.title
                return todolist
            })
        default:
            return state
        // throw new Error('invalid value in todolistsReducer fro action.type')
    }
}


//ACTION CREATORS
export const CreateTodolistAC = (title: string): CreateTodolistAT => {
    return {type: 'CREATE-TODOLIST', tdId: v1(), title: title}
}
export const RemoveTodolistAC = (tdId: string): RemoveTodolistAT => {
    return {type: 'REMOVE-TODOLIST', tdId: tdId}
}
export const ChangeTodolistFilterAC = (tdId: string, filter: FilterValueType): ChangeTodolistFilterAT => {
    return {type: 'CHANGE-TODOLIST-FILTER', tdId: tdId, filter: filter}
}
export const ChangeTodolistTitleAC = (tdId: string, title: string): ChangeTodolistTitleAT => {
    return {type: 'CHANGE-TODOLIST-TITLE', tdId: tdId, title: title}
}
