//INITIAL STATE
import {ActionType as ApplicationActionType, SetApplicationStatusAC} from "../../state/application-reducer";
import {Dispatch} from "redux";

import {ApiParamsType, authApi} from "../../api/authApi";
import {handleAppError, handleNetworkError} from "../utilsErrorHandling/utilsErrorHandling";

const initialState: InitialStateType = {
    isLoggedIn: false,
}
//REDUCER
export const authReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN': {
            return {...state, isLoggedIn: action.isLoggedIn}
        }
        default:
            return state
    }
}


//ACTION CREATORS
export const setIsLoggedInAC = (isLoggedIn: boolean) => {
    return {type: 'login/SET-IS-LOGGED-IN', isLoggedIn: isLoggedIn} as const
}


//THUNKS
export const logInTC: any = (data: ApiParamsType) => (dispatch: Dispatch<ActionType | ApplicationActionType>) => {
    dispatch(SetApplicationStatusAC('loading'))
    authApi.logIn(data)
        .then(response => {
            if (response.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))
                dispatch(SetApplicationStatusAC('success'))
            } else handleAppError(response, dispatch)
        })
        .catch(error => handleNetworkError(error, dispatch))
}
export const logOutTC: any = () => (dispatch: Dispatch<ActionType | ApplicationActionType>) => {
    dispatch(SetApplicationStatusAC('loading'))
    authApi.logOut()
        .then(response => {
            if (response.resultCode === 0) {
                dispatch(setIsLoggedInAC(false))
                dispatch(SetApplicationStatusAC('success'))
            } else handleAppError(response, dispatch)
        })
        .catch(error => handleNetworkError(error, dispatch))
}


//ENTITY-STATE TYPES
type InitialStateType = {
    isLoggedIn: boolean
}
// //FINAL ACTION TYPE
export type ActionType =
    | ReturnType<typeof setIsLoggedInAC>