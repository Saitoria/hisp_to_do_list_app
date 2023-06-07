import React from "react";
import Modal from '@material-ui/core/Modal';
import  Typography from "@material-ui/core/Typography";

const ViewTodo = (props) => {
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
                Todo item:
              </Typography>
    
              <Typography variant="h6" component="h2" style={styles.headerTxt2}>
                    Title: {props.todo.title}
                </Typography>

                <Typography variant="h6" component="h2" style={styles.headerTxt2}>
                    Description: {props.todo.description}
                </Typography>

                <Typography variant="h6" component="h2" style={styles.headerTxt2}>
                    Scheduled for: {props.todo.scheduledfor}
                </Typography>

                <Typography variant="h6" component="h2" style={styles.headerTxt2}>
                    Completed: {props.todo.completed ? "Completed" : "Not completed"}
                </Typography>

                <div style={{width:'100%',paddingLeft:15,marginTop:40}}>
                  <button style={styles.btnStyle}>CLOSE</button>
                </div>
    
    
    
            </div>
          </Modal>
            </div>
    );
}
 
export default ViewTodo;
const styles = {
    modalContainer:{
        width:'40vw',
        flex: 1,
        height:'40vh',
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