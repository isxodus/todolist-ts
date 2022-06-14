import {v1} from "uuid";
import {DeleteTodolistAC, TodolistDomainType, todolistsReducer} from "./todolists-reducer";

let tdList1: string, tdList2: string, initialState: Array<TodolistDomainType>

beforeEach(() => {
    tdList1 = v1()
    tdList2 = v1()
    initialState = [
        {id: tdList1, title: "What to learn", filter: "active", order: 0, addedDate: ''},
        {id: tdList2, title: "What to buy", filter: "all", order: 0, addedDate: ''},
    ]
});

test('todolist should be created', () => {
    const title = 'New Todolist'
    // const endState = todolistsReducer(initialState, CreateTodolistAC(title))
    // expect(endState.length).toBe(3)
    // expect(JSON.stringify(endState[2])).toBe(`{"tdId":"${endState[2].id}","title":"${title}","filter":"all"}`)
})

test('todolist should be removed', () => {
    const endState = todolistsReducer(initialState, DeleteTodolistAC(tdList1))
    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(tdList2)
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
