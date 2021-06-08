import React from 'react';

import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SubjectOutlinedIcon from '@material-ui/icons/SubjectOutlined';
import AssignmentIndOutlinedIcon from '@material-ui/icons/AssignmentIndOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';

import { useAppDrawerStore } from '../states/AppDrawer.states'
import { useAuth } from '../contexts/AuthContext'
import CustomToolbar from './Toolbar.component'


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

    const drawerState = useAppDrawerStore(state => state.open)
    const setDrawerClosed = useAppDrawerStore(state => state.setClosed)

    const handleDrawerClose = () => {
        setDrawerClosed();
    };

    const handleSelectedChange = (e) => {
        props.setSelected(e.target.id)
        console.log(e.target)
    }

    //TODO: Split this mess up into smaller components 
    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: drawerState,
                })}
            >
                <CustomToolbar />
            </AppBar>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: drawerState,
                    [classes.drawerClose]: !drawerState,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: drawerState,
                        [classes.drawerClose]: !drawerState,
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

                            <ListItemIcon onClick={handleSelectedChange} id={text}>{index % 2 === 0 ? <SubjectOutlinedIcon onClick={handleSelectedChange} id={text} /> : <AssignmentIndOutlinedIcon onClick={handleSelectedChange} id={text} />}</ListItemIcon>
                            <ListItemText onClick={handleSelectedChange} primary={text} id={text} />

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
                <div>
                    {props.children}
                    {currentUser && JSON.stringify(currentUser.email)}
                </div>
            </main>
        </div>
    );
}
