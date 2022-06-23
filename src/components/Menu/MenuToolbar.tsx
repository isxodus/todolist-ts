import React, {useCallback} from "react";
import {AppBar, IconButton, Menu, MenuItem, Toolbar} from "@mui/material";
import {AccountCircle, Menu as MenuIcon} from "@mui/icons-material";
import css from "./MenuToolbar.module.css"
import {logOutTC} from "../../application/Auth/auth-reducer";
import {useDispatch} from "react-redux";

type MenuPropsType = {
    isAuth: boolean
}


export function MenuToolbar(props: MenuPropsType) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const dispatch = useDispatch()

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = useCallback(() => {
        dispatch(logOutTC())
        setAnchorEl(null);
    }, [])
    return <AppBar position={"static"}>
        <Toolbar>
            <IconButton>
                <MenuIcon/>
            </IconButton>
            {props.isAuth && (
                <div className={css.grid}>
                    <IconButton className={css.profileIcon}
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                    >
                        <AccountCircle/>
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}>Log out</MenuItem>
                    </Menu>
                </div>
            )}
        </Toolbar>
    </AppBar>
}