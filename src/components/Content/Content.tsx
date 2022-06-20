import React from "react";
import {Todolists} from "./Todolists/Todolists";

type TodolistsPropsType = {
    demo?: boolean
}

export function Content({demo = false, ...props}: TodolistsPropsType) {
    return <>
        <Todolists demo={demo}/>
    </>
}