import React from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useFormik} from "formik";
import {loginTC} from "./auth-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../../state/store";
import {Navigate} from "react-router-dom";

export const Auth = () => {
    const dispatch = useDispatch()
    const isLoggedIn = useSelector<AppRootState, boolean>(state => state.auth.isLoggedIn)
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: isLoggedIn
        },
        onSubmit: (values) => {
            dispatch(loginTC(values))
        },
        validate: (values) => {
            if (!values.email) return {email: "Please fill your email"}
            if (!values.password) return {email: "Password is required"}
        }
    })

    debugger
    if (isLoggedIn) return <Navigate to={"/"}/>
    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormLabel>
                        <p>To log in get registered
                            <a href={'https://social-network.samuraijs.com/'}
                               target={'_blank'}> here
                            </a>
                        </p>
                        <p>or use common test account credentials:</p>
                        <p>Email: free@samuraijs.com</p>
                        <p>Password: free</p>
                    </FormLabel>
                    <FormGroup>
                        <TextField label="Email" margin="normal" {...formik.getFieldProps("email")}/>
                        <TextField type="password" label="Password"
                                   margin="normal" {...formik.getFieldProps("password")}
                        />
                        <FormControlLabel label={'Remember me'} control={
                            <Checkbox checked={formik.values.rememberMe} {...formik.getFieldProps("rememberMe")}/>}
                        />
                        <Button type={'submit'} variant={'contained'} color={'primary'}>
                            Login
                        </Button>
                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    </Grid>
}
