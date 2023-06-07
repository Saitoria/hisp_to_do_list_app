import React, {useState,useEffect} from 'react';
import axios from 'axios';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Avatar from "@material-ui/core/Avatar";
import  Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import AddIcon from '@material-ui/icons/Add';
import Checkbox from '@material-ui/core/Checkbox';
import AddForm from '../components/AddForm';
import UpdateTodoForm from '../components/UpdateTodoForm';

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
        root: {
            display: 'flex',
        },
        appbar: {
            //width: `calc(100% - ${drawerWidth}px)`,
            width: `calc(100%)`,
            background: 'white',
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

const Home = () => {
    const [todos,setTodos] = useState([]);
    const [updateTodo,setUpdateTodo] = useState([]);
    const [open, setOpen] = useState(false);
    const classes = useStyles();
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [open1, setOpen1] = useState(false);
    const handleClose1 = () => setOpen1(false);

    const handleOpen1 = (todo) => {
        setUpdateTodo(todo)
        setOpen1(true);
    }

    //----------------------------------------------------Function to fecth the to-do list--------------------------------------------------------------
    const fetchTodoList = async () => {
        try {
          const response = await axios.get(
            `https://dev.hisptz.com/dhis2/api/dataStore/saroni_saitoria?fields=.`,
            {
              auth: {
                username: "admin",
                password: "district",
              },
            }
          );
          
          const todoList = response.data.entries;
          setTodos(todoList.map((entry) => entry.value));
          //console.log(todoList);

        } catch (error) {
            // This helps us to view and handle errors
          console.log('Error fetching to-do list:', error);
          
        }
      };
  


    //----------------------------------------------------Function to delete a to-do list--------------------------------------------------------------
    const deleteTodo = async (id) => {
        try {
          await axios.delete(
            `https://dev.hisptz.com/dhis2/api/dataStore/saroni_saitoria/${id}`,
            {
              auth: {
                username: "admin",
                password: "district",
              },
            }
          );
          setTodos(todos.filter((todo) => todo.id !== id));
        } catch (error) {
          console.error("Failed to delete todo:", error);
        }
      };


      //----------------------------------------------------Function to change status of a to-do list--------------------------------------------------------------
      const changeTodoStatus = async (todo) => {
        const todostatus = {
            id:todo.id,
            title:todo.title,
            description:todo.description,
            completed: !todo.completed,
            created: todo.created,
            lastUpdated: new Date().toISOString(),
            scheduledfor:todo.selectedDate,
        }
        console.log(todo);
        try
        {
            await axios.put(
                `https://dev.hisptz.com/dhis2/api/dataStore/saroni_saitoria/${todo.id}`,
                todostatus,
                {
                  auth: {
                    username: "admin",
                    password: "district",
                  },
                }
              );
        }
        catch (error) {
            // This helps us to view and handle errors
          console.log('Error adding to-do list:', error);
          
        }
        fetchTodoList();
      }





      //This runs the fetchTodoList when the page is reloaded/ rendered
      useEffect(() => {
        fetchTodoList();
      }, []);

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

        <div style={styles.mainContainer}>

            <div style={styles.bodyContainer}>
            <p style={styles.headerTxt}>Welcome! <br/> Below are your Todo lists</p>

            <div style={styles.createContainer}>
               <div style={styles.addHeaderStyle}><p>What do you have planned?</p></div>
            <Button 
             variant="outlined"
             startIcon={<AddIcon />}
              style={styles.addBtnStyle}
              onClick={handleOpen}
              >
                Add
            </Button>
            <AddForm open={open} handleClose={handleClose} fetchTodoList={fetchTodoList}/>
            <UpdateTodoForm open={open1} handleClose={handleClose1} fetchTodoList={fetchTodoList} todo={updateTodo}/>
            </div>


             {todos.map((todo)=> (
                
                <div style={styles.todoContainer} key={todo.id}>
                    
                <div style={styles.todoSubContainer1}>
                    <Checkbox 
                    style={styles.checkboxStyle}
                     checked={todo.completed}
                     onChange={() => changeTodoStatus(todo)}
                     />
                    </div>

                    <div style={styles.todoSubContainer2}> 
                        <h2 style={styles.header2Txt}>{todo.title}</h2> 
                        <p style={styles.regularTxt}>Scheduled for: {todo.scheduledfor}</p>
                     </div>

                    <div style={styles.todoSubContainer3}>
                    <Button variant="outlined" startIcon={<EditOutlinedIcon />} style={styles.btnStyle} onClick={() => handleOpen1(todo)}>
                        Edit
                    </Button>
                    
                    <Button variant="outlined" startIcon={<DeleteOutlineIcon />} style={styles.btnStyle} onClick={() => deleteTodo(todo.id)}>
                        Delete
                    </Button>
                    </div>
                </div>
            ))} 
            </div>

        </div>

        </div>
     );
}
 
export default Home;
const styles = {
    mainContainer:{
        width:'100vw',
        flex: 1,
        //height:'100vh',
        justifyContent:'center',
        alignItems:'center',
        background: 'url(/background1.jpg) no-repeat center center fixed',
        backgroundSize: 'cover',
        backgroundAttachment: 'scroll',
    },
    bodyContainer:{
        width:'50vw',
        flex: 1,
        //height:'80vh',
        display: 'block',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'rgba(0,0,0,0.5)',
        borderRadius:10,
        marginTop:'10vh',
        marginLeft:'25vw',
        paddingBottom:20,
    },
    createContainer:{
        //backgroundColor:'cyan',
        width:'100%',
        height:'10vh',
        display:'flex',
        justifyContent:'space-around',
        alignItems:'center',
    },
    todoContainer:{
        display:'flex',
        width:'80%',
        height:'10vh',
        backgroundColor:'rgba(0,0,0,0.7)',
        borderRadius:10,
        marginLeft:'10%',
        boxShadow: '0 0 5px rgba(255,255,255,0.4)',
        marginTop:20,
        marginBottom:20,
    },
    todoSubContainer1:{
        //backgroundColor:'red',
        width:'10%',
        display:'flex',
        justifyContent:'space-around',
        alignItems:'center',
    },
    todoSubContainer2:{
        //backgroundColor:'blue',
        display:'block',
        width:'55%',
        //height:'80%',
        justifyContent:'center',
        alignItems:'center',
        //marginBottom:100,
    },
    todoSubContainer3:{
        //backgroundColor:'green',
        width:'35%',
        display:'flex',
        justifyContent:'space-around',
        alignItems:'center',
    },
    regularTxt:{
        fontFamily:'Montserrat',
        fontSize:15,
        paddingLeft:15,
        color:'white',
        paddingBottom:10,
        marginBottom:200,
    },
    headerTxt:{
        fontFamily:'Montserrat',
        fontSize:30,
        paddingLeft:15,
        color:'white',
        paddingTop:15,
    },
    header2Txt:{
        fontFamily:'Montserrat',
        fontSize:20,
        paddingLeft:15,
        color:'white',
        //paddingTop:15,
    },
    btnStyle:{
        color:'white',
        border: '1px solid white',
        fontFamily:'Montserrat',
    },
    checkboxStyle:{
        color:'white',
        //border: '1px solid white',
    },
    addBtnStyle:{
        color:'white',
        border: '1px solid white',
        marginLeft:20,
        fontFamily:'Montserrat',
    },
    addHeaderStyle:{
        width:'80%',
        height:50,
        color:'white',
        marginLeft:15,
        border: '1px solid white',
        borderRadius:10,
        paddingLeft:10,
        fontFamily:'Montserrat',
        justifyContent:'center',
        alignItems:'center',
    },
}