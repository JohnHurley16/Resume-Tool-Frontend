import React from 'react';

import { useSignUpStore } from '../states/SignUp.states'

import { signInWithGoogle } from '../utils/firebase'

import { useAuth } from "../contexts/AuthContext"

import clsx from 'clsx'

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
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
    signup: {
        margin: theme.spacing(1, 0, 1)
    },
    createText: {
        marginTop: theme.spacing(2)
    },
    google: {
        backgroundColor: '#4285f4',
        color: 'white',

        hover: {
            backgroundColor: '#357ae8',
            border: 'none'
        }
    }
}));

export default function SignIn() {
    const classes = useStyles();

    const { login } = useAuth();

    const closeModal = useSignUpStore(state => state.setClosed)

    const [password, setPassword] = React.useState(null);
    const [email, setEmail] = React.useState(null);

    const [error, setError] = React.useState('')
    const [loading, setLoading] = React.useState(false)

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError("")
            setLoading(true)
            await login(email, password)
            closeModal()
        } catch (err) {
            setError("Failed to log in")
        }
        setLoading(false)
    }

    async function googleSignIn(e) {
        e.preventDefault();

        try {
            setError("")
            setLoading(true)
            await signInWithGoogle()
            closeModal()
        } catch (err) {
            setError("Failed to log in")
        }
        setLoading(false)
    }

    const setSignUp = useSignUpStore(state => state.setSignUp)
    const setReset = useSignUpStore(state => state.setReset)
    const signerOption = useSignUpStore(state => state.upOrIn)

    const gotoSignUp = (e) => {
        e.preventDefault();
        if (signerOption === "in") {
            setSignUp()
        }
    }

    const gotoReset = (e) => {
        e.preventDefault();
        if (signerOption === "in") {
            setReset()
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5" className={classes.createText}>
                    Sign In
                </Typography>
                {error && <Alert className={classes.alert} variant="filled" severity='error'> {error} </Alert>}
                <form className={classes.form} onSubmit={handleSubmit} >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email"
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

                    <Grid spacing={2} container>
                        <Grid item xs={12} sm={6}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                disabled={loading}
                            >
                                Sign In
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button
                                onClick={googleSignIn}
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={clsx(classes.submit, classes.google)}
                                disabled={loading}
                            > {' '} Sign in with Google {' '}
                            </Button>
                        </Grid>
                    </Grid>

                    <Grid container spacing={0}>
                        <Grid item xs={12} sm={6}>
                            <Button fullWidth onClick={gotoReset} variant="body2">
                                Forgot Password?
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button fullWidth onClick={gotoSignUp} variant="body2">
                                Need an account? Sign Up
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}