import React from 'react';

import { useImageStore } from '../states/ImageStore.states'
import { useSignUpStore } from '../states/SignUp.states'
import { useProfileMenuStore } from '../states/ProfileMenu.states'

import { useAuth } from '../contexts/AuthContext'

import MuiModal from './MuiModal.components'
import CustomizedMenus from './ProfileDropdown.component'

import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar'
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SubjectOutlinedIcon from '@material-ui/icons/SubjectOutlined';
import AssignmentIndOutlinedIcon from '@material-ui/icons/AssignmentIndOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import AccountBoxOutlinedIcon from '@material-ui/icons/AccountBoxOutlined';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    signerModal: {
        marginLeft: 'auto'
    },
    settingsButton: {
        marginTop: 'auto'
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

export default function MiniDrawer(props) {
    const classes = useStyles();
    const theme = useTheme();

    const { currentUser } = useAuth()

    const [drawerOpen, setDrawerOpen] = React.useState(false)

    const profileImage = useImageStore(state => state.image)

    const signerOpen = useSignUpStore(state => state.open)
    const setSignerOpen = useSignUpStore(state => state.setOpen)
    const setSignerClosed = useSignUpStore(state => state.setClosed)

    const openMenu = useProfileMenuStore(state => state.setOpen)
    const setMenuTarget = useProfileMenuStore(state => state.setTarget)

    const handleDrawerOpen = () => {
        setDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setDrawerOpen(false);
    };

    const handleSelectedChange = (e) => {
        props.setSelected(e.target.id)
    }

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
    //TODO: Split this mess up into smaller components 
    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: drawerOpen,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: drawerOpen,
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
            </AppBar>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: drawerOpen,
                    [classes.drawerClose]: !drawerOpen,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: drawerOpen,
                        [classes.drawerClose]: !drawerOpen,
                    }),
                }}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {['Home', 'View CV', 'Edit CV', 'Create Resume'].map((text, index) => (
                        <ListItem button onClick={handleSelectedChange} key={text} id={text}>
                            <ListItemIcon id={text}>{index % 2 === 0 ? <SubjectOutlinedIcon id={text} /> : <AssignmentIndOutlinedIcon id={text} />}</ListItemIcon>
                            <ListItemText primary={text} id={text} />
                        </ListItem>
                    ))}
                </List>
                <List className={classes.settingsButton}>
                    <ListItem button >
                        <ListItemIcon> <SettingsOutlinedIcon /> </ListItemIcon>
                        <ListItemText primary='Settings' />
                    </ListItem>
                </List>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                {currentUser ? <CustomizedMenus /> : <MuiModal />}
                <div>
                    {props.children}
                    {currentUser && JSON.stringify(currentUser.email)}
                </div>
            </main>
        </div >
    );
}
