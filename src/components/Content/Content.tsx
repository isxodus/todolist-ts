import React from "react";
import {Todolists} from "./Todolists/Todolists";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Auth} from "../../application/Auth/Auth";

type TodolistsPropsType = {
    demo?: boolean
}

export function Content({demo = false, ...props}: TodolistsPropsType) {
    return <BrowserRouter>
        <Routes>
            <Route path={"/"} element={<Todolists demo={demo}/>}/>
            <Route path={"/login"} element={<Auth/>}/>
            <Route path="*" element={<h1>404: PAGE NOT FOUND</h1>}/>
        </Routes>

    </BrowserRouter>
}