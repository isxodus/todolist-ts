import React from "react";
import {ReduxStoreProviderDecorator} from "../../../stories/ReduxStoreProviderDecorator";
import {Todolists} from "./Todolists";


export default {
    title: "Todolist Components/Todolist Card",
    component: Todolists,
    decorators: [ReduxStoreProviderDecorator]
}

export const BasicScenario = () => <Todolists/>