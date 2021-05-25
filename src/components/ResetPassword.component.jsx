import React from 'react';

import { useSignUpStore } from '../states/SignUp.states'

import { useAuth } from "../contexts/AuthContext"

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
        marginTop: theme.spacing(0)
    },
    alert: {
        marginTop: theme.spacing(2)
    }
}));

export default function ResetPassword() {
    const classes = useStyles();

    const { resetPassword } = useAuth();

    const [email, setEmail] = React.useState(null);

    const [error, setError] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const [message, setMessage] = React.useState('')

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError("")
            setMessage('')
            setLoading(true)
            await resetPassword(email)
            setMessage("Check your inbox to reset your password")

        } catch (err) {
            setError("Failed to reset password")
        }
        setLoading(false)
    }

    const setSignIn = useSignUpStore(state => state.setSignIn)
    const signerOption = useSignUpStore(state => state.upOrIn)

    const gotoSignIn = (e) => {
        e.preventDefault();
        if (signerOption === "reset") {
            setSignIn()
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5" className={classes.createText}>
                    Reset Password
                </Typography>
                {error && <Alert className={classes.alert} variant="filled" severity='error'> {error} </Alert>}
                {message && <Alert className={classes.alert} variant="filled" severity='success'> {message} </Alert>}
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
                                type="email"
                                autoComplete="email"
                                onInput={e => setEmail(e.target.value)}
                            />
                        </Grid>

                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={loading}
                    >
                        Reset Password
                    </Button>
                    <Grid container >
                        <Grid item xs={12}>
                            <Button fullWidth onClick={gotoSignIn} variant="body">
                                Have an account? Sign In
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}