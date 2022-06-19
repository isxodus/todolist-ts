import React from "react";
import {Todolists} from "./Todolists/Todolists";

type TodolistsPropsType = {
    demo?: boolean
}

export function Content({demo = false, ...props}: TodolistsPropsType) {
    console.log('content demo', demo)
    return <>
        <Todolists demo={demo}/>
    </>
}