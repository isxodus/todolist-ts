import {Dispatch} from "redux";
import {todolistsApi, TodolistType} from "../api/todolistsApi";
//INITIAL STATE
const initialState: Array<TodolistDomainType> = []
//REDUCER
export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'SET-TODOLISTS':
            return action.todolists.map(el => ({...el, filter: 'all'}))
        case 'CREATE-TODOLIST':
            return [{...action.todolist, filter: "all"}, ...state]
        case 'DELETE-TODOLIST':
            return [...state].filter((todolist) => (todolist.id !== action.tdId))
        case 'CHANGE-TODOLIST-TITLE':
            return [...state].map((td) => td.id === action.tdId ? {...td, title: action.title} : td)
        case 'CHANGE-TODOLIST-FILTER':
            return [...state].map((td) => td.id === action.tdId ? {...td, filter: action.filter} : td)
        default:
            return state
        // throw new Error('invalid value in todolistsReducer for action.type')
    }
}


//ACTION CREATORS
export const SetTodolistsAC = (todolists: Array<TodolistType>) => ({type: 'SET-TODOLISTS', todolists: todolists} as const)
export const CreateTodolistAC = (todolist: TodolistType) => ({type: 'CREATE-TODOLIST', todolist: todolist} as const)
export const DeleteTodolistAC = (tdId: string) => ({type: 'DELETE-TODOLIST', tdId: tdId} as const)
export const ChangeTodolistTitleAC = (tdId: string, title: string) => {
    return {type: 'CHANGE-TODOLIST-TITLE', tdId: tdId, title: title} as const
}
export const ChangeTodolistFilterAC = (tdId: string, filter: FilterValueType) => {
    return {type: 'CHANGE-TODOLIST-FILTER', tdId: tdId, filter: filter} as const
}


//THUNKS + todo Dispatch
export const fetchTodolistsTC: any = () => (dispatch: Dispatch<ActionType>) => {
    todolistsApi.getTodolists().then(todolists => dispatch(SetTodolistsAC(todolists)))
}
export const createTodolistTC: any = (todolistTitle: string) => (dispatch: Dispatch<ActionType>) => {
    todolistsApi.createTodolist(todolistTitle).then(response => dispatch(CreateTodolistAC(response.data.item)))
}
export const deleteTodolistTC: any = (tdId: string) => (dispatch: Dispatch<ActionType>) => {
    todolistsApi.deleteTodolist(tdId).then(() => dispatch(DeleteTodolistAC(tdId)))
}
export const changeTodolistTitleTC: any = (tdId: string, todolistTitle: string) => (dispatch: Dispatch<ActionType>) => {
    todolistsApi.updateTodolist(tdId, todolistTitle).then(() => dispatch(ChangeTodolistTitleAC(tdId, todolistTitle)))
}


//ENTITY-STATE TYPES
export type FilterValueType = 'all' | 'completed' | 'active'
export type TodolistDomainType = TodolistType & {
    filter: FilterValueType
}
//FINAL ACTION TYPE
type ActionType =
    | ReturnType<typeof SetTodolistsAC>
    | ReturnType<typeof CreateTodolistAC>
    | ReturnType<typeof DeleteTodolistAC>
    | ReturnType<typeof ChangeTodolistTitleAC>
    | ReturnType<typeof ChangeTodolistFilterAC>
