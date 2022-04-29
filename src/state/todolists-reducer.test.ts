import {v1} from "uuid";
import {ChangeTodolistFilterAC, ChangeTodolistTitleAC, todolistsReducer, TodolistType} from "./todolists-reducer";

let tdList1: string, tdList2: string, initialState: Array<TodolistType>

beforeEach(() => {
    tdList1 = v1()
    tdList2 = v1()
    initialState = [
        {tdId: tdList1, title: "What to learn", filter: "active"},
        {tdId: tdList2, title: "What to buy", filter: "all"},
    ]
});

test('todolist should change Filter', () => {
    const filter = 'completed'
    const endState = todolistsReducer(initialState, ChangeTodolistFilterAC(tdList1, filter))
    expect(endState.length).toBe(2)
    expect(endState[0].tdId).toBe(tdList1)
    expect(JSON.stringify(endState[0])).toBe(`{"id":"${tdList1}","title":"What to learn","filter":"completed"}`)
})

test('todolist should change Title', () => {
    const title = 'New Todolist'
    const endState = todolistsReducer(initialState, ChangeTodolistTitleAC(tdList1, title))
    expect(endState.length).toBe(2)
    expect(endState[0].tdId).toBe(tdList1)
    expect(JSON.stringify(endState[0])).toBe(`{"id":"${tdList1}","title":"${title}","filter":"active"}`)
})