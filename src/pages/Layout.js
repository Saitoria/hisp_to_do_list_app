import React from "react";
import Drawer from "@material-ui/core/Drawer";
import  Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import AddIcon from '@material-ui/icons/Add';
import SystemUpdateAltOutlinedIcon from '@material-ui/icons/SystemUpdateAltOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/DeleteOutline';
import { useHistory, useLocation } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Avatar from "@material-ui/core/Avatar";




const drawerWidth = 280;
const useStyles = makeStyles((theme) => {
return {
    page: {
        background: '#f9f9f9',
        width: '100%',
        padding: theme.spacing(3),
    },
    navbarHeader:{
        marginTop: 10,
    },
    drawer: {
        width: drawerWidth,
        elevation: 8,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    root: {
        display: 'flex',
    },
    menuIcons:{
        color: 'black',
    },
    menuIconsActive:{
        color: 'white',
    },
    notActive:{
        '&:hover':{
            background: '#d3d3d3',
        },
    },
    active: {
        background: '#47c1f0',
        color:'white',
        '&:hover':{
            background: '#5a5a5a',
        },
    },
    appbar: {
        //width: `calc(100% - ${drawerWidth}px)`,
        width: `calc(100%)`,
        background: 'white',
    },
    drawerList:{
        marginTop: 0,
    },
    titleDate:{
        color: 'black',
        //flexGrow:1,
        fontFamily: 'Montserrat',
    },
    titlestuff:{
        flexGrow:1,
        alignItems:'center',
        justifyContent:'center',
    },
    titleUname:{
        color: 'black',
        fontFamily: 'Montserrat',
    },
    toolbar: theme.mixins.toolbar,
    avatar:{
        marginLeft: theme.spacing(2),
    }
};
});

const Layout = ({ children }) => {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();

    const menuItems = [
        {
            text:'Home',
            icon: <HomeOutlinedIcon fontSize="medium" />,
            path: '/home'
        },
        {
            text:'Add',
            icon: <AddIcon fontSize="medium" />,
            path: '/add'  
        },
        {
            text:'Update',
            icon: <SystemUpdateAltOutlinedIcon fontSize="medium" />,
            path: '/update'  
        },
        {
            text:'Delete',
            icon: <SettingsOutlinedIcon fontSize="medium" />,
            path: '/delete'
        },
    ]
    return ( 
        <div className={classes.root}>
        {/*App bar*/}
        <AppBar
        className={classes.appbar}
        elevation={1}
        >
            <Toolbar  className={classes.titlestuff}>
            <Avatar src="/logo.png" className={classes.avatar}/>
                <Typography
                    className={classes.titleDate}>
                    HISP Tz To-do list { /*format(new Date(), 'do MMMM Y') */}
                </Typography>

            </Toolbar>
        </AppBar>

        
        {/*nav bar*/}
        {/* <Drawer
            className={classes.drawer}
            variant="permanent"
            anchor="left"
            classes={{ paper: classes.drawerPaper}}
            PaperProps ={{
                elevation:1,
            }}
            >
            
            <div className={classes.navbarHeader}>
                <div className="navbar-logo"></div>
            </div>

            <List className={classes.drawerList}>
                {menuItems.map(item => (
                    <ListItem
                    button
                     key={item.text}
                     onClick={() => {
                        history.push(item.path);
                    }}
                     className={location.pathname === item.path ? classes.active : classes.notActive}
                     >
                        <ListItemIcon className={location.pathname === item.path ? classes.menuIconsActive : classes.menuIcons}>{item.icon}</ListItemIcon>
                        <ListItemText className={classes.drawerTxt}>
                            <Typography style={{ fontFamily:'Montserrat',}}>
                            {item.text}
                            </Typography>
                            </ListItemText>
                    </ListItem>
                ))}
            </List>
        </Drawer> */}

        <div className={classes.page}>
            <div className={classes.toolbar}>{/* This div was specifically made to create space for the app bar */}</div>
            {children}
        </div>
        </div>
     );
}
 
export default Layout;