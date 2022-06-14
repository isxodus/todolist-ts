import {v1} from "uuid";
import {DeleteTaskAC, TaskArrayType, tasksReducer,} from "./tasks-reducer";
import {TaskPriorities, TaskStatuses} from "../api/todolistsApi";

let tdList1: string, tdList2: string, task1: string, task2: string, task3: string, task4: string, task5: string,
    initialState: TaskArrayType

beforeEach(() => {
    tdList1 = v1()
    tdList2 = v1()
    task1 = v1()
    task2 = v1()
    task3 = v1()
    task4 = v1()
    task5 = v1()
    initialState = {
        [tdList1]: [
            {
                id: v1(), title: "HTML", status: TaskStatuses.Completed, todoListId: tdList1,
                priority: TaskPriorities.Middle, order: 0, description: 'AAA',
                addedDate: '', startDate: '', deadline: ''
            },
            {
                id: v1(), title: "CSS", status: TaskStatuses.Completed, todoListId: tdList1,
                priority: TaskPriorities.Middle, order: 0, description: 'AAA',
                addedDate: '', startDate: '', deadline: ''
            },
            {
                id: v1(), title: "JavaScript", status: TaskStatuses.Completed, todoListId: tdList1,
                priority: TaskPriorities.Middle, order: 0, description: 'AAA',
                addedDate: '', startDate: '', deadline: ''
            },
            {
                id: v1(), title: "React", status: TaskStatuses.New, todoListId: tdList1,
                priority: TaskPriorities.Middle, order: 0, description: 'AAA',
                addedDate: '', startDate: '', deadline: ''
            },
            {
                id: v1(), title: "Redux", status: TaskStatuses.New, todoListId: tdList1,
                priority: TaskPriorities.Middle, order: 0, description: 'AAA',
                addedDate: '', startDate: '', deadline: ''
            }
        ],
        [tdList2]: [
            {
                id: v1(), title: "milk", status: TaskStatuses.Completed, todoListId: tdList2,
                priority: TaskPriorities.Middle, order: 0, description: 'AAA',
                addedDate: '', startDate: '', deadline: ''
            },
            {
                id: v1(), title: "bread", status: TaskStatuses.Completed, todoListId: tdList2,
                priority: TaskPriorities.Middle, order: 0, description: 'AAA',
                addedDate: '', startDate: '', deadline: ''
            },
            {
                id: v1(), title: "cheese", status: TaskStatuses.Completed, todoListId: tdList2,
                priority: TaskPriorities.Middle, order: 0, description: 'AAA',
                addedDate: '', startDate: '', deadline: ''
            },
            {
                id: v1(), title: "cake", status: TaskStatuses.New, todoListId: tdList2,
                priority: TaskPriorities.Middle, order: 0, description: 'AAA',
                addedDate: '', startDate: '', deadline: ''
            },
            {
                id: v1(), title: "towel", status: TaskStatuses.New, todoListId: tdList2,
                priority: TaskPriorities.Middle, order: 0, description: 'AAA',
                addedDate: '', startDate: '', deadline: ''
            }
        ]
    }
});

test('task should be added to task array', () => {
    const title = 'New Task'
    // const endState = tasksReducer(initialState, AddTaskAC(tdList1, title))
    // expect(endState[tdList1].length).toBe(6)
    // expect(endState[tdList1][5].title).toBe(title)
})

test('task title should be changed', () => {
    const title = 'New Task'
    // const endState = tasksReducer(initialState, UpdateTaskAC(tdList1, task1, title))
    // expect(endState[tdList1][0].title).toBe(title)
})

test('task status should be changed', () => {
    // let endState = tasksReducer(initialState, ChangeTaskStatusAC(tdList1, task1))
    // endState = tasksReducer(endState, ChangeTaskStatusAC(tdList1, task2))
    // endState = tasksReducer(endState, ChangeTaskStatusAC(tdList1, task3))
    // endState = tasksReducer(endState, ChangeTaskStatusAC(tdList1, task4))
    // endState = tasksReducer(endState, ChangeTaskStatusAC(tdList1, task5))
    // expect(endState[tdList1][0].completed).toBeFalsy()
    // expect(endState[tdList1][1].completed).toBeFalsy()
    // expect(endState[tdList1][2].completed).toBeFalsy()
    // expect(endState[tdList1][3].completed).toBeTruthy()
    // expect(endState[tdList1][4].completed).toBeTruthy()
})

test('task should be removed', () => {
    const endState = tasksReducer(initialState, DeleteTaskAC(tdList1, task1))
    expect(endState[tdList1].length).toBe(4)
})