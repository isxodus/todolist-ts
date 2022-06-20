import React from 'react';
import './App.css';
import {MenuToolbar} from "../components/Menu/Menu";
import {Content} from "../components/Content/Content";
import {LinearProgress} from "@mui/material";
import CustomizedSnackbars from "./ErrorSnackbar/ErrorSnackbar";
import {useSelector} from "react-redux";
import {AppRootState} from "../state/store";

type TodolistsPropsType = {
    demo?: boolean
}

export function App({demo = false, ...props}: TodolistsPropsType) {
    const loadingStatus = useSelector<AppRootState, string>(state => state.application.status)
    const showProgress = loadingStatus === 'loading'
    return <div className="App">
        <CustomizedSnackbars></CustomizedSnackbars>
        <MenuToolbar/>
        {showProgress && <LinearProgress/>}
        <Content demo={demo}/>
    </div>
}