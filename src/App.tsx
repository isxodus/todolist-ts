import React, {useState} from 'react';
import './App.css';
import {TaskType, ToDoList} from "./components/ToDoList";
import {v1} from "uuid";

export type FilterValueType = 'all' | 'completed' | 'active'

function App() {
    let initList = [
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "JavaScript", isDone: true},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "Redux", isDone: false}
    ]
    // let list2 = [
    //     {id: 1, title: "Terminator", isDone: true},
    //     {id: 2, title: "Star Wars", isDone: true},
    //     {id: 3, title: "Lord of the Rings", isDone: true},
    // ]
    let [tasks, setTasks] = useState<Array<TaskType>>(initList)
    let [filter, setFilter] = useState<FilterValueType>("all")

    function removeTask(id: string) {
        let resultTasks = tasks.filter((t) => (t.id !== id))
        setTasks(resultTasks)
    }
    function addTask(title:string,) {
        let newTask = {id: v1(), title: title, isDone: false}
        setTasks([...tasks,newTask])
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

    console.log(initList)
    return <div className="App">
        <ToDoList title={"What to learn"}
                  tasks={tasksForToDoList}
                  addTask={addTask}
                  removeTask={removeTask}
                  changeFilter={changeFilter}
        />
        {/*<ToDoList title={"Movies to watch"} tasks={list2}/>*/}
        {/*<ToDoList title={"Things to do"}*/}
        {/*          tasks={tasksForToDoList}*/}
        {/*          removeTask={removeTask}*/}
        {/*          changeFilter={changeFilter}*/}
        {/*/>*/}
    </div>
}

export default App;
