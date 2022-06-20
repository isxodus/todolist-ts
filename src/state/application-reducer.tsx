//INITIAL STATE

const initialState = {
    status: 'loading' as ApplicationStatusType,
    errorMessage: null as string | null
}
type InitialStateType = typeof initialState


//REDUCER
export const applicationReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR-MESSAGE':
            return {...state, errorMessage: action.errorMessage}
        default:
            return state
    }
}
//ACTION CREATORS
export const SetApplicationStatusAC = (status: ApplicationStatusType) => ({type: 'APP/SET-STATUS', status: status} as const)
export const SetApplicationErrorMessageAC = (errorMessage: string | null) => ({
    type: 'APP/SET-ERROR-MESSAGE',
    errorMessage
} as const)

//THUNKS

//ENTITY-STATE TYPES
export type ApplicationStatusType = 'idle' | 'loading' | 'success' | 'failed'
export type LoadingStatusOriginType = 'none' | 'status' | 'title' | 'processing'
//FINAL ACTION TYPE
export type ActionType =
    | ReturnType<typeof SetApplicationStatusAC>
    | ReturnType<typeof SetApplicationErrorMessageAC>