import {v1} from "uuid";
import {CreateTodolistAC, RemoveTodolistAC, todolistsReducer, TodolistType} from "./todolists-reducer";

let tdList1: string, tdList2: string, initialState: Array<TodolistType>

beforeEach(() => {
    tdList1 = v1()
    tdList2 = v1()
    initialState = [
        {tdId: tdList1, title: "What to learn", filter: "active"},
        {tdId: tdList2, title: "What to buy", filter: "all"},
    ]
});

test('todolist should be created', () => {
    const title = 'New Todolist'
    const endState = todolistsReducer(initialState, CreateTodolistAC(title))
    expect(endState.length).toBe(3)
    expect(JSON.stringify(endState[2])).toBe(`{"tdId":"${endState[2].tdId}","title":"${title}","filter":"all"}`)
})

test('todolist should be removed', () => {
    const endState = todolistsReducer(initialState, RemoveTodolistAC(tdList1))
    expect(endState.length).toBe(1)
    expect(endState[0].tdId).toBe(tdList2)
    expect(JSON.stringify(endState[0])).toBe(`{"tdId":"${tdList2}","title":"What to buy","filter":"all"}`)
})


// test('task array should be created', () => {
//     const endState = tasksReducer(initialState, CreateTaskArrayAC(tdList3))
//     console.log(endState)
//     expect(Object.keys(endState).length).toBe(3)
// })
//
// test('task array should be removed', () => {
//     const endState = tasksReducer(initialState, RemoveTaskArrayAC(tdList1))
//     expect(Object.keys(endState).length).toBe(1)
// })
