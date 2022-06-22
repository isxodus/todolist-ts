//INITIAL STATE
import {Dispatch} from "redux";
import {authApi} from "../api/authApi";
import {handleAppError, handleNetworkError} from "../application/utilsErrorHandling/utilsErrorHandling";
import {ActionType as AuthActionType, setIsLoggedInAC} from "../application/Auth/auth-reducer";

const initialState = {
    status: 'idle' as ApplicationStatusType,
    errorMessage: null as string | null,
    isInitialized: false
}
type InitialStateType = typeof initialState


//REDUCER
export const applicationReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR-MESSAGE':
            return {...state, errorMessage: action.errorMessage}
        case 'APP/SET-INITIALIZED':
            return {...state, isInitialized: action.isInitialized}
        default:
            return state
    }
}


//ACTION CREATORS
export const SetApplicationStatusAC = (status: ApplicationStatusType) => ({type: 'APP/SET-STATUS', status: status} as const)
export const SetApplicationErrorMessageAC = (errorMessage: string | null) => ({
    type: 'APP/SET-ERROR-MESSAGE', errorMessage
} as const)
export const SetIsInitializedAC = (isInitialized: boolean) => ({
    type: 'APP/SET-INITIALIZED',
    isInitialized: isInitialized
} as const)
//THUNKS
export const InitializeTC: any = () => (dispatch: Dispatch<ActionType | AuthActionType>) => {
    authApi.authMe()
        .then(response => {
                if (response.resultCode === 0) {
                    dispatch(setIsLoggedInAC(true))
                } else handleAppError(response, dispatch)
                dispatch(SetIsInitializedAC(true))
            }
        )
        .catch(error => handleNetworkError(error, dispatch))
}


//ENTITY-STATE TYPES
export type ApplicationStatusType = 'idle' | 'loading' | 'success' | 'failed'
export type LoadingStatusOriginType = 'none' | 'status' | 'title' | 'processing'
//FINAL ACTION TYPE
export type ActionType =
    | ReturnType<typeof SetApplicationStatusAC>
    | ReturnType<typeof SetApplicationErrorMessageAC>
    | ReturnType<typeof SetIsInitializedAC>