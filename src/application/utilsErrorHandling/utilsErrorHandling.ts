import {Dispatch} from "redux";
import {ResponseType, TaskResponseType} from "../../api/todolistsApi";
import {OperationResult} from "../../api/authApi";
import {
    ActionType as ApplicationActionType,
    SetApplicationErrorMessageAC,
    SetApplicationStatusAC
} from "../../state/application-reducer";
import {ActionType as TaskActionType} from "../../state/tasks-reducer";


export const handleAppError = <D>(response: ResponseType<D> | OperationResult<D>, dispatch: Dispatch<TaskActionType | ApplicationActionType>) => {
    if (response.messages.length > 0) {
        dispatch(SetApplicationErrorMessageAC(response.messages[0]))
    } else {
        dispatch(SetApplicationErrorMessageAC('Unhandled application error has occurred'))
    }
    dispatch(SetApplicationStatusAC('failed'))
}
export const handleAppFetchError = (response: TaskResponseType, dispatch: Dispatch<TaskActionType | ApplicationActionType>) => {
    if (response.error) {
        dispatch(SetApplicationErrorMessageAC(response.error))
    } else {
        dispatch(SetApplicationErrorMessageAC('Unhandled application fetching error has occurred'))
    }
    dispatch(SetApplicationStatusAC('failed'))
}
export const handleNetworkError = (error: { message: string }, dispatch: Dispatch<TaskActionType | ApplicationActionType>) => {
    dispatch(SetApplicationErrorMessageAC(error.message ? error.message : 'Network error has occurred'))
    dispatch(SetApplicationStatusAC('failed'))
}