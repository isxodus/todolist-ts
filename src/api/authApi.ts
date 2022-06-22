import {instance} from "./apiInstance";


export const authApi = {
    authMe() {
        return instance.get<OperationResult<{ id: number, email: string, login: string }>>('auth/me')
            .then(response => response.data)
    },
    login(data: ApiParamsType) {
        return instance.post<OperationResult<{ userId?: number }>>('auth/login', data)
            .then(response => response.data)
    },
}

export type ApiParamsType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}
export type OperationResult<I = {}> = {
    resultCode: number
    messages: Array<string>
    data: I
}