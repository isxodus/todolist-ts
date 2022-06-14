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
    todolist: TodolistType
}
export type RemoveTodolistAT = {
    type: 'DELETE-TODOLIST'
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
        case 'CREATE-TODOLIST': {
            const todolistDomain: TodolistDomainType = {...action.todolist, filter: "all"}
            return [todolistDomain, ...state]
        }
        case 'DELETE-TODOLIST':
            return [...state].filter((todolist) => (todolist.id !== action.tdId))
        case 'CHANGE-TODOLIST-FILTER':
            return state.map((todolist) => {
                if (todolist.id === action.tdId) todolist.filter = action.filter
                return todolist
            })
        case 'CHANGE-TODOLIST-TITLE': {
            return [...state].map((todolist) => {
                if (todolist.id === action.tdId) todolist.title = action.title
                return todolist
            })
        }
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
export const CreateTodolistAC = (todolist: TodolistType): CreateTodolistAT => {
    return {type: 'CREATE-TODOLIST', todolist: todolist}
}
export const DeleteTodolistAC = (tdId: string): RemoveTodolistAT => {
    return {type: 'DELETE-TODOLIST', tdId: tdId}
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

//todo :any need to use types for useDispatch
export const fetchTodolistsTC: any = () => {
    return (dispatch: Dispatch) => {
        todolistsApi.getTodolists().then(todolists => {
            console.log(todolists)
            dispatch(SetTodolistsAC(todolists))
        })
    }
}
export const createTodolistTC: any = (todolistTitle: string) => {
    return (dispatch: Dispatch) => {
        todolistsApi.createTodolist(todolistTitle).then(response => dispatch(CreateTodolistAC(response.data.item)))
    }
}
export const deleteTodolistTC: any = (tdId: string) => {
    return (dispatch: Dispatch) => {
        todolistsApi.deleteTodolist(tdId).then(() => dispatch(DeleteTodolistAC(tdId)))
    }
}
export const changeTodolistTitleTC: any = (tdId: string, todolistTitle: string) => {
    return (dispatch: Dispatch) => {
        todolistsApi.updateTodolist(tdId, todolistTitle).then(() => dispatch(ChangeTodolistTitleAC(tdId, todolistTitle)))
    }
}