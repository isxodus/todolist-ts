import React from 'react';
import {Provider} from "react-redux";
import {AppRootState} from "../state/store";
import {combineReducers, createStore} from "redux";
import {todolistsReducer} from "../state/todolists-reducer";
import {tasksReducer} from "../state/tasks-reducer";
import {v1} from "uuid";


const rootReducer = combineReducers({
        todolists: todolistsReducer,
        tasks: tasksReducer
    }
)


//INITIAL STATE
const initialStorybookState = {
    todolists: [
        {tdId: '1', title: "What to learn", filter: "active"},
        {tdId: '2', title: "What to buy", filter: "all"},
    ],
    tasks: {
        ['1']: [
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "JavaScript", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Redux", isDone: false}
        ],
        ['2']: [
            {id: v1(), title: "milk", isDone: true},
            {id: v1(), title: "bread", isDone: true},
            {id: v1(), title: "cheese", isDone: true},
            {id: v1(), title: "cake", isDone: false},
            {id: v1(), title: "towel", isDone: false}
        ]
    }
}
export const storybookStore = createStore(rootReducer, initialStorybookState as AppRootState)

export const ReduxStoreProviderDecorator = (Story: any) => {
    return <Provider store={storybookStore}>
        <Story/>
    </Provider>
}