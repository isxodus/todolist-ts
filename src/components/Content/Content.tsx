import React from "react";
import {Todolists} from "./Todolists/Todolists";
import {Navigate, Route, Routes} from "react-router-dom";

type TodolistsPropsType = {
    demo?: boolean
}

export function Content({demo = false, ...props}: TodolistsPropsType) {
    return <Routes>
        <Route path={"/login"} element={<Navigate to="/" replace={true}/>}/>
        <Route path={"/"} element={<Todolists demo={demo}/>}/>
        <Route path="*" element={<h1>404: PAGE NOT FOUND</h1>}/>
    </Routes>

}