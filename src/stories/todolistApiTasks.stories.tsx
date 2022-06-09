import React, {useState} from 'react'
import {TaskPriorities, TaskStatuses, todolistsApi} from "../api/todolistsApi";

export default {
    title: 'API/Tasks'
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, settTodolistId] = useState<string>('')
    const createTask = () => {
        todolistsApi.getTasks(todolistId).then(data => setState(data))
    }

    return <div>
        <input type="text" placeholder={"todolist id"} value={todolistId}
               onChange={(e) => settTodolistId(e.currentTarget.value)}/>
        <button onClick={createTask}>Get</button>
        <div>{JSON.stringify(state)}</div>
    </div>
}


export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>('')
    const [todolistId, settTodolistId] = useState<string>('')
    // let myId = 'asdasdaqwed312ed2'
    // useEffect(() => {
    //     todolistsApi.getTasks(myId).then(data => setState(data))
    // }, [])
    const createTask = () => {
        todolistsApi.createTask(todolistId, title).then(data => setState(data))
    }

    return <div>
        <input type="text" placeholder={"todolist id"} value={todolistId}
               onChange={(e) => settTodolistId(e.currentTarget.value)}/>
        <input type="text" placeholder={"title"} value={title} onChange={(e) => setTitle(e.currentTarget.value)}/>
        <button onClick={createTask}>Add</button>
        <div>{JSON.stringify(state)}</div>
    </div>
}


export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskId, setTaskId] = useState<string>('')
    const [todolistId, settTodolistId] = useState<string>('')
    const deleteTask = () => {
        todolistsApi.deleteTask(todolistId, taskId).then(data => setState(data))
    }

    return <div>
        <input type="text" placeholder={"todolist id"} value={todolistId}
               onChange={(e) => settTodolistId(e.currentTarget.value)}/>
        <input type="text" placeholder={"task id"} value={taskId} onChange={(e) => setTaskId(e.currentTarget.value)}/>
        <button onClick={deleteTask}>Add</button>
        <div>{JSON.stringify(state)}</div>
    </div>
}


export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, settTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [completed, setCompleted] = useState<boolean>(false)
    const [status, setStatus] = useState<number>(TaskStatuses.New)
    const [priority, setPriority] = useState<number>(TaskPriorities.Middle)
    const [startDate, setStartDate] = useState<string>('')
    const [deadline, setDeadline] = useState<string>('')
    const updateTask = () => {
        todolistsApi.updateTask(todolistId, taskId,
            {
                title: title, description: description, completed: completed, status: status, priority: priority
                , startDate: startDate, deadline: deadline
            }).then(data => setState(data))
    }


    return <div>
        <input type="text" placeholder={"todolist id"} value={todolistId}
               onChange={(e) => settTodolistId(e.currentTarget.value)}/>
        <input type="text" placeholder={"task id"} value={taskId} onChange={(e) => setTaskId(e.currentTarget.value)}/>
        <input type="text" placeholder={"title"} value={title} onChange={(e) => setTitle(e.currentTarget.value)}/>
        <input type="text" placeholder={"description"} value={description}
               onChange={(e) => setDescription(e.currentTarget.value)}/>
        <input type="checkbox" checked={completed}
               onChange={(e) => setCompleted(!!e.currentTarget.value)}/>
        <input type="text" placeholder={"status"} value={status} onChange={(e) => setStatus(+e.currentTarget.value)}/>
        <input type="text" placeholder={"priority"} value={priority}
               onChange={(e) => setPriority(+e.currentTarget.value)}/>
        <input type="text" placeholder={"startDate"} value={startDate}
               onChange={(e) => setStartDate(e.currentTarget.value)}/>
        <input type="text" placeholder={"deadline"} value={deadline}
               onChange={(e) => setDeadline(e.currentTarget.value)}/>
        <button onClick={updateTask}>Add</button>
        <div>{JSON.stringify(state)}</div>
    </div>
}