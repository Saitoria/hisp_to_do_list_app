import React,{useState} from "react";
import Modal from '@material-ui/core/Modal';
import  Typography from "@material-ui/core/Typography";
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

const AddForm = (props) => {
    const [title, setTitle] = useState(null);
    const [description, setDescription] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);


    //----------------------------------------------------Function to add a new to-do list--------------------------------------------------------------
    const handleSubmit = async (e) => {
        e.preventDefault();

        const todo = {
            id:Date.now().toString(),
            title:title,
            description:description,
            completed: false,
            created: new Date().toISOString(),
            lastUpdated: new Date().toISOString(),
            scheduledfor:selectedDate,
        }
        try
        {
            await axios.post(
                `https://dev.hisptz.com/dhis2/api/dataStore/saroni_saitoria/${todo.id}`,
                todo,
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
    
        props.handleClose();
        props.fetchTodoList();
        //console.log(todo);
    }

    return ( 
        <div>
    <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div style={styles.modalContainer}>
          <Typography variant="h6" component="h2" style={styles.headerTxt}>
            Add new Todo item
          </Typography>

          <form autoComplete="off" onSubmit={handleSubmit}> 
          <TextField 
            id="createTodo"
             label="Todo item title"
             required
             onChange={(e) => setTitle(e.target.value)}
              variant="outlined"
               style={styles.txtFieldStyle}
               inputProps={{
                style: { outline: 'none',border: 0, boxShadow: 'none',fontFamily:'Montserrat', color:'black'}
              }}
                InputLabelProps={{
                style: { fontFamily:'Montserrat',color:'black' }
              }}
               />
            
            <TextField 
            id="createTodo"
             label="Todo item description"
             required
             onChange={(e) => setDescription(e.target.value)}
              variant="outlined"
              multiline
              rows={4}
               style={styles.txtFieldStyle}
               inputProps={{
                style: { outline: 'none',border: 0, boxShadow: 'none',fontFamily:'Montserrat', color:'black'}
              }}
                InputLabelProps={{
                style: { fontFamily:'Montserrat',color:'black' }
              }}              
               />

            <div style={{marginTop:'10%'}}>
            <Typography variant="h6" component="h2" style={styles.headerTxt2}>
            Scheduled for?
            </Typography>

            <input type="date" 
            required
            style={styles.datepicker}
            onChange={(e)=> setSelectedDate(e.target.value)}
            />

            </div>

            <div style={{width:'100%',paddingLeft:15,marginTop:40}}>
              <button style={styles.btnStyle}>ADD</button>
            </div>

        </form>

        </div>
      </Modal>
        </div>
     );
}
 
export default AddForm;
const styles = {
    modalContainer:{
        width:'50vw',
        flex: 1,
        height:'60vh',
        display: 'block',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'white',
        borderRadius:10,
        marginTop:'10vh',
        marginLeft:'25vw',
        paddingBottom:20,
    },
    headerTxt:{
        fontFamily:'Montserrat',
        fontSize:30,
        marginLeft:20,
        color:'black',
        paddingTop:15,
    },
    headerTxt2:{
        fontFamily:'Montserrat',
        fontSize:15,
        marginLeft:20,
        color:'black',
        paddingTop:15,
    },
    txtFieldStyle:{
        width:'80%',
        height:40,
        color:'white',
        fontSize:40,
        marginLeft:15,
        marginTop:30,
        borderColor:'white',
    },
    datepicker:{
        fontFamily:'Montserrat',
        width:200,
        height:50,
        marginLeft:15,
    },
    btnStyle:{
        width:200,
        height:50,
        fontFamily:'Montserrat',
    }
}