import {v1} from "uuid";
import {
    TodolistType,
    FilterValueType,
    todolistsReducer,
    ChangeTodolistFilterAC,
    CreateTodolistAC,
    RemoveTodolistAC,
    ChangeTodolistTitleAC
} from "./todolists-reducer";

let tdList1: string, tdList2: string, initialState: Array<TodolistType>

beforeEach(() => {
    tdList1 = v1()
    tdList2 = v1()
    initialState = [
        {id: tdList1, title: "What to learn", filter: "active"},
        {id: tdList2, title: "What to buy", filter: "all"},
    ]
});

test('todolist should be created', () => {
    const title = 'New Todolist'
    const endState = todolistsReducer(initialState, CreateTodolistAC(title))
    expect(endState.length).toBe(3)
    expect(JSON.stringify(endState[2])).toBe(`{"id":"${endState[2].id}","title":"${title}","filter":"all"}`)
})

test('todolist should be removed', () => {
    const endState = todolistsReducer(initialState, RemoveTodolistAC(tdList1))
    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(tdList2)
    expect(JSON.stringify(endState[0])).toBe(`{"id":"${tdList2}","title":"What to buy","filter":"all"}`)
})

test('todolist should change Filter', () => {
    const filter = 'completed'
    const endState = todolistsReducer(initialState, ChangeTodolistFilterAC(tdList1, filter))
    expect(endState.length).toBe(2)
    expect(endState[0].id).toBe(tdList1)
    expect(JSON.stringify(endState[0])).toBe(`{"id":"${tdList1}","title":"What to learn","filter":"completed"}`)
})

test('todolist should change Title', () => {
    const title = 'New Todolist'
    const endState = todolistsReducer(initialState, ChangeTodolistTitleAC(tdList1, title))
    expect(endState.length).toBe(2)
    expect(endState[0].id).toBe(tdList1)
    expect(JSON.stringify(endState[0])).toBe(`{"id":"${tdList1}","title":"${title}","filter":"active"}`)
})