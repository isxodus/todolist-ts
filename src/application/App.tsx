import React, {useEffect} from 'react';
import './App.css';
import {MenuToolbar} from "../components/Menu/MenuToolbar";
import {CircularProgress, LinearProgress} from "@mui/material";
import CustomizedSnackbars from "./ErrorSnackbar/ErrorSnackbar";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../state/store";
import {Content} from "../components/Content/Content";
import {InitializeTC} from "../state/application-reducer";
import {Navigate, Route, Routes} from "react-router-dom";
import {Auth} from "./Auth/Auth";

type TodolistsPropsType = {
    demo?: boolean
}

export function App({demo = false, ...props}: TodolistsPropsType) {
    const dispatch = useDispatch()
    const loadingStatus = useSelector<AppRootState, string>(state => state.application.status)
    const isInitialized = useSelector<AppRootState, boolean>(state => state.application.isInitialized)
    const isLoggedIn = useSelector<AppRootState, boolean>(state => state.auth.isLoggedIn)
    useEffect(() => dispatch(InitializeTC()), [])
    const showProgress = loadingStatus === 'loading'


    return <div className="App">
        <CustomizedSnackbars></CustomizedSnackbars>
        <MenuToolbar isAuth={isLoggedIn}/>
        {showProgress && <LinearProgress/>}
        {!isInitialized
            ? <div style={{display: "grid", alignContent: "center", justifyContent: "center"}}>
                <CircularProgress size={"15rem"}/>
                <p>The App is loading...</p>
            </div>
            :
            !isLoggedIn
                ? <Routes>
                    <Route path={"/login"} element={<Auth/>}/>
                    <Route path={"*"} element={<Navigate to="/login" replace={true}/>}/>
                </Routes>
                : <Content demo={demo}/>
        }

    </div>
}
