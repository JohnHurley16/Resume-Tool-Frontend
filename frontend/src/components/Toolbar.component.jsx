import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar'
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import AccountBoxOutlinedIcon from '@material-ui/icons/AccountBoxOutlined';
import Toolbar from '@material-ui/core/Toolbar';

import { useSignUpStore } from '../states/SignUp.states'
import { useProfileMenuStore } from '../states/ProfileMenu.states'
import { useImageStore } from '../states/ImageStore.states'
import { useAppDrawerStore } from '../states/AppDrawer.states'

import { useAuth } from '../contexts/AuthContext'


import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    signerModal: {
        marginLeft: 'auto'
    },
}));

const CustomToolbar = () => {
    const classes = useStyles();

    const { currentUser } = useAuth()

    const drawerState = useAppDrawerStore(state => state.open)
    const setDrawerOpen = useAppDrawerStore(state => state.setOpen)

    const signerOpen = useSignUpStore(state => state.open)
    const setSignerOpen = useSignUpStore(state => state.setOpen)
    const setSignerClosed = useSignUpStore(state => state.setClosed)

    const openMenu = useProfileMenuStore(state => state.setOpen)
    const setMenuTarget = useProfileMenuStore(state => state.setTarget)

    const profileImage = useImageStore(state => state.image)

    const handleDrawerOpen = () => {
        setDrawerOpen();
    };

    const handleSignerClick = (e) => {

        if (!signerOpen) {
            if (!currentUser) {
                setSignerOpen()
            } else {
                setMenuTarget(e.currentTarget)
                openMenu()
            }
        } else {
            setSignerClosed()
        }
    }

    return (
        <Toolbar>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, {
                    [classes.hide]: drawerState,
                })}
            >
                <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
                Hurley Resume Builder
                    </Typography>
            <IconButton
                color="inherit"
                className={classes.signerModal}
                onClick={handleSignerClick}
            >
                {profileImage ? <Avatar src={profileImage} /> : <AccountBoxOutlinedIcon />}
            </IconButton>
        </Toolbar>

    );
}

export default CustomToolbar;
