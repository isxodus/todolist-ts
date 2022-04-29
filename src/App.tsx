import React from 'react';
import './App.css';
import {MenuToolbar} from "./components/Menu/Menu";
import {Content} from "./components/Content/Content";


export function App() {
    return <div className="App">
        {/*<div className="mermaid">*/}
        {/*    {`graph TD*/}
        {/*    A[Client] --> B[Load Balancer]*/}
        {/*    B --> C[Server01]*/}
        {/*    B --> D[Server02]`}*/}
        {/*</div>*/}
        <MenuToolbar/>
        <Content/>
    </div>
}