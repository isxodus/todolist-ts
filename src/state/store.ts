import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {todolistsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";
import {applicationReducer} from "./application-reducer";
import {authReducer} from "../application/Auth/auth-reducer";

const rootReducer = combineReducers({
        todolists: todolistsReducer,
        tasks: tasksReducer,
        application: applicationReducer,
        auth: authReducer
    }
)


export type AppRootState = ReturnType<typeof rootReducer>
export const store = createStore(rootReducer, applyMiddleware(thunk))

//@ts-ignore
window.store = store