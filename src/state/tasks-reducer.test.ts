import {v1} from "uuid";
import {
    AddTaskAC,
    ChangeTaskStatusAC,
    ChangeTaskTitleAC,

    RemoveTaskAC,
    TaskArrayType,
    tasksReducer,
} from "./tasks-reducer";

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
            {id: task1, title: "HTML", isDone: true},
            {id: task2, title: "CSS", isDone: true},
            {id: task3, title: "JavaScript", isDone: true},
            {id: task4, title: "React", isDone: false},
            {id: task5, title: "Redux", isDone: false}
        ],
        [tdList2]: [
            {id: v1(), title: "milk", isDone: true},
            {id: v1(), title: "bread", isDone: true},
            {id: v1(), title: "cheese", isDone: true},
            {id: v1(), title: "cake", isDone: false},
            {id: v1(), title: "towel", isDone: false}
        ]
    }
});

test('task should be added to task array', () => {
    const title = 'New Task'
    const endState = tasksReducer(initialState, AddTaskAC(tdList1, title))
    expect(endState[tdList1].length).toBe(6)
    expect(endState[tdList1][5].title).toBe(title)
})

test('task title should be changed', () => {
    const title = 'New Task'
    const endState = tasksReducer(initialState, ChangeTaskTitleAC(tdList1, task1, title))
    expect(endState[tdList1][0].title).toBe(title)
})

test('task status should be changed', () => {
    let endState = tasksReducer(initialState, ChangeTaskStatusAC(tdList1, task1))
    endState = tasksReducer(endState, ChangeTaskStatusAC(tdList1, task2))
    endState = tasksReducer(endState, ChangeTaskStatusAC(tdList1, task3))
    endState = tasksReducer(endState, ChangeTaskStatusAC(tdList1, task4))
    endState = tasksReducer(endState, ChangeTaskStatusAC(tdList1, task5))
    expect(endState[tdList1][0].isDone).toBeFalsy()
    expect(endState[tdList1][1].isDone).toBeFalsy()
    expect(endState[tdList1][2].isDone).toBeFalsy()
    expect(endState[tdList1][3].isDone).toBeTruthy()
    expect(endState[tdList1][4].isDone).toBeTruthy()
})

test('task should be removed', () => {
    const endState = tasksReducer(initialState, RemoveTaskAC(tdList1, task1))
    expect(endState[tdList1].length).toBe(4)
})