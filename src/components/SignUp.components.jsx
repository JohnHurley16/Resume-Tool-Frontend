import React from 'react';

import axios from 'axios'

import ImageUploadIcon from './ImageUpload.component'

import { useSignUpStore } from '../states/SignUp.states'

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(2),
        backgroundColor: theme.palette.secondary.main,
        width: theme.spacing(15),
        height: theme.spacing(15)
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    topInput: {
        marginTop: theme.spacing(2)
    }
}));


export default function SignUp() {
    const classes = useStyles();

    const closeModal = useSignUpStore(state => state.setClosed)

    const setSignIn = useSignUpStore(state => state.setSignIn)
    const signerOption = useSignUpStore(state => state.upOrIn)

    const [fname, setFname] = React.useState(null);
    const [lname, setLname] = React.useState(null);
    const [email, setEmail] = React.useState(null);
    const [password, setPassword] = React.useState(null);
    const [username, setUsername] = React.useState(null);

    const openSignIn = () => {
        if (signerOption === 'up') {
            setSignIn()
        }
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(`Email: ${email}`)
        const payload = {
            fname: fname,
            lname: lname,
            email: email,
            password: password,
            username: username
        }

        const hostname = '127.0.0.1'
        const port = 4000

        const request_url = `http://${hostname}:${port}/user/create`

        console.log(request_url)

        axios.post(request_url, payload)
            .then(res => {
                console.log(res);
                console.log(res.data);
            })

        closeModal()
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <ImageUploadIcon />
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid />
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="username"
                                name="userName"
                                variant="outlined"
                                required
                                fullWidth
                                onInput={e => setUsername(e.target.value)}
                                id="userName"
                                label="Username"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                onInput={e => setFname(e.target.value)}
                                id="firstName"
                                label="First Name"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="lname"
                                onInput={e => setLname(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                onInput={e => setEmail(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onInput={e => setPassword(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button onClick={openSignIn} variant="body2">
                                Already have an account? Sign in
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}