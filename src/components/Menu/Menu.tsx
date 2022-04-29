import React from "react";
import {AppBar, IconButton, Toolbar} from "@mui/material";
import {Menu} from "@mui/icons-material";

export function MenuToolbar() {
    return <AppBar position={"static"}>
        <Toolbar>
            <IconButton>
                <Menu/>
            </IconButton>
        </Toolbar>
    </AppBar>
}