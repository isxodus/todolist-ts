import {v1} from "uuid";
import {todolistsApi, TodolistType} from "../api/todolistsApi";
import {Dispatch} from "redux";
//ENTITY TYPES
export type FilterValueType = 'all' | 'completed' | 'active'
export type TodolistDomainType = TodolistType & {
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
export type SetTodolistsAT = {
    type: 'SET-TODOLISTS'
    todolists: Array<TodolistType>
}
//FINAL ACTION TYPE
type ActionType = CreateTodolistAT | RemoveTodolistAT | ChangeTodolistFilterAT | ChangeTodolistTitleAT | SetTodolistsAT


//INITIAL STATE
const initialState: Array<TodolistDomainType> = [
    // {id: '1', title: "What to learn", filter: "active", order: 0, addedDate: ''},
    // {id: '2', title: "What to buy", filter: "all", order: 0, addedDate: ''},
]
//REDUCER
export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'CREATE-TODOLIST':
            return [...state, {id: action.tdId, title: action.title, filter: "all", order: 0, addedDate: ''},]
        case 'REMOVE-TODOLIST':
            return [...state].filter((todolist) => (todolist.id !== action.tdId))
        case 'CHANGE-TODOLIST-FILTER':
            return state.map((todolist) => {
                if (todolist.id === action.tdId) todolist.filter = action.filter
                return todolist
            })
        case 'CHANGE-TODOLIST-TITLE':
            return state.map((todolist) => {
                if (todolist.id === action.tdId) todolist.title = action.title
                return todolist
            })
        case 'SET-TODOLISTS':
            return action.todolists.map(el => {
                return {...el, filter: 'all'}
            })
        default:
            return state
        // throw new Error('invalid value in todolistsReducer for action.type')
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
export const SetTodolistsAC = (todolists: Array<TodolistType>): SetTodolistsAT => {
    return {type: 'SET-TODOLISTS', todolists: todolists}
}


export const fetchTodolistsTC: any = () => {
    return (dispatch: Dispatch) => {
        todolistsApi.getTodolists().then(todolists => dispatch(SetTodolistsAC(todolists)))
    }
}