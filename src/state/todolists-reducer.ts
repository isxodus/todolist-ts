import {Dispatch} from "redux";
import {todolistsApi, TodolistType} from "../api/todolistsApi";
import {
    ActionType as ApplicationActionType,
    ApplicationStatusType,
    LoadingStatusOriginType,
    SetApplicationStatusAC
} from "./application-reducer";
//INITIAL STATE
const initialState: Array<TodolistDomainType> = []
//REDUCER
export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'SET-TODOLISTS':
            return action.todolists.map(el => ({...el, filter: 'all', loadingStatus: 'idle', loadingStatusOrigin: 'none'}))
        case 'SET-TODOLIST-STATUS':
            return [...state].map((td) => td.id === action.tdId
                ? {...td, loadingStatus: action.loadingStatus, loadingStatusOrigin: action.loadingStatusOrigin}
                : td)
        case 'CREATE-TODOLIST':
            return [{...action.todolist, filter: "all", loadingStatus: 'success', loadingStatusOrigin: 'none'}, ...state]
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
export const SetTodolistStatusAC = (tdId: string, loadingStatus: ApplicationStatusType, loadingStatusOrigin: LoadingStatusOriginType) => {
    return {type: 'SET-TODOLIST-STATUS', tdId, loadingStatus: loadingStatus, loadingStatusOrigin: loadingStatusOrigin} as const
}
export const CreateTodolistAC = (todolist: TodolistType) => ({type: 'CREATE-TODOLIST', todolist: todolist} as const)
export const DeleteTodolistAC = (tdId: string) => ({type: 'DELETE-TODOLIST', tdId: tdId} as const)
export const ChangeTodolistTitleAC = (tdId: string, title: string) => {
    return {type: 'CHANGE-TODOLIST-TITLE', tdId: tdId, title: title} as const
}
export const ChangeTodolistFilterAC = (tdId: string, filter: FilterValueType) => {
    return {type: 'CHANGE-TODOLIST-FILTER', tdId: tdId, filter: filter} as const
}


//THUNKS + todo Dispatch + todo error handling
export const fetchTodolistsTC: any = () => (dispatch: Dispatch<ActionType | ApplicationActionType>) => {
    dispatch(SetApplicationStatusAC('loading'))
    todolistsApi.getTodolists().then(todolists => {
        dispatch(SetTodolistsAC(todolists))
        dispatch(SetApplicationStatusAC('success'))
    })
}
export const createTodolistTC: any = (todolistTitle: string) => (dispatch: Dispatch<ActionType | ApplicationActionType>) => {
    dispatch(SetApplicationStatusAC('loading'))
    todolistsApi.createTodolist(todolistTitle).then(response => {
        dispatch(CreateTodolistAC(response.data.item))
        dispatch(SetApplicationStatusAC('success'))
    })
}
export const deleteTodolistTC: any = (tdId: string) => (dispatch: Dispatch<ActionType>) => {
    dispatch(SetTodolistStatusAC(tdId, 'loading', 'processing'))
    todolistsApi.deleteTodolist(tdId)
        .then(() => {
            dispatch(DeleteTodolistAC(tdId))
        })
}
export const changeTodolistTitleTC: any = (tdId: string, todolistTitle: string) => (dispatch: Dispatch<ActionType>) => {
    dispatch(SetTodolistStatusAC(tdId, 'loading', 'title'))
    todolistsApi.updateTodolist(tdId, todolistTitle).then(() => {
        dispatch(ChangeTodolistTitleAC(tdId, todolistTitle))
        dispatch(SetTodolistStatusAC(tdId, 'success', 'none'))
    })
}


//ENTITY-STATE TYPES
export type FilterValueType = 'all' | 'completed' | 'active'
export type TodolistDomainType = TodolistType & {
    filter: FilterValueType
    loadingStatus: ApplicationStatusType
    loadingStatusOrigin: LoadingStatusOriginType
}
//FINAL ACTION TYPE
export type ActionType =
    | ReturnType<typeof SetTodolistsAC>
    | ReturnType<typeof SetTodolistStatusAC>
    | ReturnType<typeof CreateTodolistAC>
    | ReturnType<typeof DeleteTodolistAC>
    | ReturnType<typeof ChangeTodolistTitleAC>
    | ReturnType<typeof ChangeTodolistFilterAC>
