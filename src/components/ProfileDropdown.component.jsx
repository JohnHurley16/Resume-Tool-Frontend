import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';

import { useProfileMenuStore } from '../states/ProfileMenu.states'

import { useAuth } from '../contexts/AuthContext'

const ProfileMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

const ProfileMenuItem = withStyles((theme) => ({
    root: {

    },
}))(MenuItem);

export default function CustomizedMenus() {
    const menuIsOpen = useProfileMenuStore(state => state.isOpen)
    const closeMenu = useProfileMenuStore(state => state.setClosed)
    const anchorEl = useProfileMenuStore(state => state.targetEl)


    const { currentUser, logout } = useAuth()

    const handleClose = () => {
        closeMenu()
    };

    const signOut = () => {
        logout()
        closeMenu()
    }

    return (
        <div>
            <ProfileMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={menuIsOpen}
                onClose={handleClose}
            >
                <ProfileMenuItem >
                    <ListItemIcon>
                        <InboxIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={currentUser && currentUser.email} />
                </ProfileMenuItem>
                <ProfileMenuItem>
                    <ListItemIcon>
                        <InboxIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Sign Out" onClick={signOut} />
                </ProfileMenuItem>
            </ProfileMenu>
        </div >
    );
}