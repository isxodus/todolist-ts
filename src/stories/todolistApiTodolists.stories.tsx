import React, {useEffect, useState} from 'react'
import {todolistsApi} from "../api/todolistsApi";

export default {
    title: 'API/Todolists'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsApi.getTodolists().then(data => setState(data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    let myTitle = 'qwerty'
    useEffect(() => {
        todolistsApi.createTodolist(myTitle).then(data => setState(data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, settTodolistId] = useState<string>('')
    const deleteTask = () => {
        todolistsApi.deleteTodolist(todolistId).then(data => setState(data))
    }


    return <><input type="text" placeholder={"todolist id"} value={todolistId}
                    onChange={(e) => settTodolistId(e.currentTarget.value)}/>
        <button onClick={deleteTask}>Add</button>
        <div>{JSON.stringify(state)}</div>
    </>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    let myTitle = 'asdasdasdas'
    let myId = 'bc871784-ec51-470b-8e27-f44aaac25201'
    useEffect(() => {

        todolistsApi.updateTodolist(myId, myTitle).then(data => setState(data))

    }, [])

    return <div> {JSON.stringify(state)}</div>
}


