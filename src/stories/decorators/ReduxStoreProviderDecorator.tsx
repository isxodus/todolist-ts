import React from 'react';
import {Provider} from "react-redux";
import {AppRootState} from "../../state/store";
import {combineReducers, createStore} from "redux";
import {todolistsReducer} from "../../state/todolists-reducer";
import {tasksReducer} from "../../state/tasks-reducer";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../../api/todolistsApi";


const rootReducer = combineReducers({
        todolists: todolistsReducer,
        tasks: tasksReducer
    }
)


//INITIAL STATE
const initialStorybookState = {
    todolists: [
        {id: '1', title: "What to learn", filter: "active", order: 0, addedDate: ''},
        {id: '2', title: "What to buy", filter: "all", order: 0, addedDate: ''},
    ],
    tasks: {
        ['1']: [
            {
                id: v1(), title: "HTML", status: TaskStatuses.Completed, completed: true, todoListId: '1',
                priority: TaskPriorities.Middle, order: 0, description: 'AAA',
                addedDate: '', startDate: '', deadline: ''
            },
            {
                id: v1(), title: "CSS", status: TaskStatuses.Completed, completed: true, todoListId: '1',
                priority: TaskPriorities.Middle, order: 0, description: 'AAA',
                addedDate: '', startDate: '', deadline: ''
            },
            {
                id: v1(), title: "JavaScript", status: TaskStatuses.Completed, completed: true, todoListId: '1',
                priority: TaskPriorities.Middle, order: 0, description: 'AAA',
                addedDate: '', startDate: '', deadline: ''
            },
            {
                id: v1(), title: "React", status: TaskStatuses.New, completed: false, todoListId: '1',
                priority: TaskPriorities.Middle, order: 0, description: 'AAA',
                addedDate: '', startDate: '', deadline: ''
            },
            {
                id: v1(), title: "Redux", status: TaskStatuses.New, completed: false, todoListId: '1',
                priority: TaskPriorities.Middle, order: 0, description: 'AAA',
                addedDate: '', startDate: '', deadline: ''
            }
        ],
        ['2']: [
            {
                id: v1(), title: "milk", status: TaskStatuses.Completed, completed: true, todoListId: '2',
                priority: TaskPriorities.Middle, order: 0, description: 'AAA',
                addedDate: '', startDate: '', deadline: ''
            },
            {
                id: v1(), title: "bread", status: TaskStatuses.Completed, completed: true, todoListId: '2',
                priority: TaskPriorities.Middle, order: 0, description: 'AAA',
                addedDate: '', startDate: '', deadline: ''
            },
            {
                id: v1(), title: "cheese", status: TaskStatuses.Completed, completed: true, todoListId: '2',
                priority: TaskPriorities.Middle, order: 0, description: 'AAA',
                addedDate: '', startDate: '', deadline: ''
            },
            {
                id: v1(), title: "cake", status: TaskStatuses.New, completed: false, todoListId: '2',
                priority: TaskPriorities.Middle, order: 0, description: 'AAA',
                addedDate: '', startDate: '', deadline: ''
            },
            {
                id: v1(), title: "towel", status: TaskStatuses.New, completed: false, todoListId: '2',
                priority: TaskPriorities.Middle, order: 0, description: 'AAA',
                addedDate: '', startDate: '', deadline: ''
            }
        ]
    }
}
export const storybookStore = createStore(rootReducer, initialStorybookState as AppRootState)

export const ReduxStoreProviderDecorator = (Story: any) => {
    return <Provider store={storybookStore}>
        <Story/>
    </Provider>
}