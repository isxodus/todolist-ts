import React, {useState} from 'react';
import './App.css';
import {TaskType, ToDoList} from "./components/ToDoList";

export type FilterValueType = 'all' | 'completed' | 'active'

function App() {
    let initList = [
        {id: 1, title: "HTML", isDone: true},
        {id: 2, title: "CSS", isDone: true},
        {id: 3, title: "JavaScript", isDone: true},
        {id: 4, title: "React", isDone: false},
        {id: 5, title: "Redux", isDone: false}
    ]
    // let list2 = [
    //     {id: 1, title: "Terminator", isDone: true},
    //     {id: 2, title: "Star Wars", isDone: true},
    //     {id: 3, title: "Lord of the Rings", isDone: true},
    // ]
    let [tasks, setTasks] = useState<Array<TaskType>>(initList)
    let [filter, setFilter] = useState<FilterValueType>("all")

    function removeTask(id: number) {
        let resultTasks = tasks.filter((t) => (t.id !== id))
        setTasks(resultTasks)
    }
    function changeFilter(value: FilterValueType){
        setFilter(value)
    }

    let tasksForToDoList = tasks
    if (filter==='completed'){
        tasksForToDoList = tasks.filter((t) => t.isDone === true)
    }
    if (filter==='active'){
        tasksForToDoList = tasks.filter((t) => t.isDone === false)
    }


    return <div className="App">
        <ToDoList title={"What to learn"}
                  tasks={tasksForToDoList}
                  removeTask={removeTask}
                  changeFilter={changeFilter}
        />
        {/*<ToDoList title={"Movies to watch"} tasks={list2}/>*/}
        <ToDoList title={"Things to do"}
                  tasks={tasksForToDoList}
                  removeTask={removeTask}
                  changeFilter={changeFilter}
        />
    </div>
}

export default App;
