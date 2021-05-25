import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import SignUp from './SignUp.components'
import SignIn from './SignIn.components'
import ResetPassword from './ResetPassword.component'

import { useSignUpStore } from '../states/SignUp.states'

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),

    },
}));

export default function MuiModal(props) {
    const classes = useStyles();

    const modalType = useSignUpStore(state => state.upOrIn);
    const modalOpen = useSignUpStore(state => state.open)
    const setSignerOpen = useSignUpStore(state => state.setOpen)
    const setSignerClosed = useSignUpStore(state => state.setClosed)
    const setSignIn = useSignUpStore(state => state.setSignIn)

    const handleSignerClick = (e) => {
        if (!modalOpen) {
            setSignerOpen()
        } else {
            setSignerClosed()
            setTimeout(function () {
                setSignIn()
            }, 500)
        }
    }

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={modalOpen}
                onClose={handleSignerClick}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={modalOpen}>
                    <div className={classes.paper}>
                        {modalType === 'up' && <SignUp />}
                        {modalType === 'in' && <SignIn />}
                        {modalType === 'reset' && <ResetPassword />}
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}