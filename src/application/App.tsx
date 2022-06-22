import React, {useEffect} from 'react';
import './App.css';
import {MenuToolbar} from "../components/Menu/Menu";
import {CircularProgress, LinearProgress} from "@mui/material";
import CustomizedSnackbars from "./ErrorSnackbar/ErrorSnackbar";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../state/store";
import {Content} from "../components/Content/Content";
import {InitializeTC} from "../state/application-reducer";

type TodolistsPropsType = {
    demo?: boolean
}

export function App({demo = false, ...props}: TodolistsPropsType) {
    const dispatch = useDispatch()
    const loadingStatus = useSelector<AppRootState, string>(state => state.application.status)
    const isInitialized = useSelector<AppRootState, boolean>(state => state.application.isInitialized)
    useEffect(() => dispatch(InitializeTC()), [])
    const showProgress = loadingStatus === 'loading'

    console.log('is init"', isInitialized)
    return <div className="App">
        <CustomizedSnackbars></CustomizedSnackbars>
        <MenuToolbar/>
        {showProgress && <LinearProgress/>}
        {!isInitialized
            ? <div style={{display: "grid", alignContent: "center", justifyContent: "center"}}>
                <CircularProgress size={"15rem"}/>
            </div>
            : <Content demo={demo}/>
        }

    </div>
}