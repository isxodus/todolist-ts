import {TaskArrayType} from "./tasks-reducer";
import {TodolistDomainType} from "./todolists-reducer";


const initialStateTodolists: Array<TodolistDomainType> = [
    {id: '1', title: "What to learn", filter: "active", order: 0, addedDate: ''},
    {id: '2', title: "What to buy", filter: "all", order: 0, addedDate: ''},
]
const initialStateTasks: TaskArrayType = {
    // ['1']: [
    //     {
    //         id: v1(), title: "HTML", status: TaskStatuses.Completed, completed: true, todoListId: '1',
    //         priority: TaskPriorities.Middle, order: 0, description: 'AAA',
    //         addedDate: '', startDate: '', deadline: ''
    //     },
    //     {
    //         id: v1(), title: "CSS", status: TaskStatuses.Completed, completed: true, todoListId: '1',
    //         priority: TaskPriorities.Middle, order: 0, description: 'AAA',
    //         addedDate: '', startDate: '', deadline: ''
    //     },
    //     {
    //         id: v1(), title: "JavaScript", status: TaskStatuses.Completed, completed: true, todoListId: '1',
    //         priority: TaskPriorities.Middle, order: 0, description: 'AAA',
    //         addedDate: '', startDate: '', deadline: ''
    //     },
    //     {
    //         id: v1(), title: "React", status: TaskStatuses.New, completed: false, todoListId: '1',
    //         priority: TaskPriorities.Middle, order: 0, description: 'AAA',
    //         addedDate: '', startDate: '', deadline: ''
    //     },
    //     {
    //         id: v1(), title: "Redux", status: TaskStatuses.New, completed: false, todoListId: '1',
    //         priority: TaskPriorities.Middle, order: 0, description: 'AAA',
    //         addedDate: '', startDate: '', deadline: ''
    //     }
    // ],
    // ['2']: [
    //     {
    //         id: v1(), title: "milk", status: TaskStatuses.Completed, completed: true, todoListId: '2',
    //         priority: TaskPriorities.Middle, order: 0, description: 'AAA',
    //         addedDate: '', startDate: '', deadline: ''
    //     },
    //     {
    //         id: v1(), title: "bread", status: TaskStatuses.Completed, completed: true, todoListId: '2',
    //         priority: TaskPriorities.Middle, order: 0, description: 'AAA',
    //         addedDate: '', startDate: '', deadline: ''
    //     },
    //     {
    //         id: v1(), title: "cheese", status: TaskStatuses.Completed, completed: true, todoListId: '2',
    //         priority: TaskPriorities.Middle, order: 0, description: 'AAA',
    //         addedDate: '', startDate: '', deadline: ''
    //     },
    //     {
    //         id: v1(), title: "cake", status: TaskStatuses.New, completed: false, todoListId: '2',
    //         priority: TaskPriorities.Middle, order: 0, description: 'AAA',
    //         addedDate: '', startDate: '', deadline: ''
    //     },
    //     {
    //         id: v1(), title: "towel", status: TaskStatuses.New, completed: false, todoListId: '2',
    //         priority: TaskPriorities.Middle, order: 0, description: 'AAA',
    //         addedDate: '', startDate: '', deadline: ''
    //     }
    // ]
}