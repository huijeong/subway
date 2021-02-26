import React, {useState} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  makeStyles,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  DialogActions,
  Grid,
  Typography,
  Select,
  MenuItem,

} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import styled from 'styled-components';
import {addTodo,editTodo, deleteTodo, getTodo} from '../../../actions/todos'
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  }
}));

const AddButton = styled.button`
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
    margin: 0.5rem;
    padding: 0.5rem;
    color: #fff;
    border: 1px solid transparent;
    background: #002984;
    border-radius: 4px;
    font-size: 0.8rem;
    cursor: pointer;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
`;

const EditButton = styled.button`
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
    margin: 0.5rem;
    padding: 0.5rem;
    color: #fff;
    border: 1px solid transparent;
    background: #00746A;
    border-radius: 4px;
    font-size: 0.8rem;
    cursor: pointer;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
`;


const DeleteButton = styled.button`
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
    margin: 0.5rem;
    padding: 0.5rem;
    color: #fff;
    border: 1px solid transparent;
    background: #ba000d;
    border-radius: 4px;
    font-size: 0.8rem;
    cursor: pointer;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
`;

const Toolbar = (props) => {
  
  const classes = useStyles();
  const [addTodoDialogOpen, setAddTodoDialogOpen] = useState(false);
  const [editTodoDialogOpen, setEditTodoDialogOpen] = useState(false);
  const [deleteTodoDialogOpen, setDeleteTodoDialogOpen] = useState(false);
  const [idText, setIdText] = useState(0);
  const [titleText, setTitleText] = useState("");
  const [descriptionText, setDescriptionText] = useState("");
  const [select, setSelect] = useState([])
  

  const closeAddTodoDialog = () =>{
    setAddTodoDialogOpen(false)
  }

  const closeEditTodoDialog = () =>{
    setEditTodoDialogOpen(false)
  }

  const closeDeleteTodoDialog = () =>{
    setDeleteTodoDialogOpen(false)
  }

  const changeTitle = (e) =>{
    setTitleText(e.target.value)
  }

  const changeDescription = (e) => {
    setDescriptionText(e.target.value)
  }

  const addTodoOk = (e) => {
    console.log('addTodoOk', titleText, descriptionText);
    const todo = {title: titleText, description: descriptionText}
    props.addTodo(todo);
    props.reloadTodoList()
    setAddTodoDialogOpen(false)
  }

  const editTodoOk = (e) => {
    console.log('editTodOk', idText, titleText, descriptionText);
    const todo = {id: idText, title: titleText, description: descriptionText}
    props.editTodo(idText, todo);
    // props.reloadTodoList();
    setEditTodoDialogOpen(false);
    setTimeout(()=>{
      props.reloadTodoList();
    },500)
    
  }

  const openAddTodoDialog = () =>{
    setAddTodoDialogOpen(true);
  }

  const openEditTodoDialog =() =>{
    setSelect(props.reloadSelectedRow());
    const rows = props.reloadSelectedRow();
    // console.log('openEditTodoDialog', 'rows',rows);
    const ids = rows.map((val)=>val);
    // console.log('openEditTodoDialog', 'ids',ids);
    props.getTodo(ids[0]);
    // console.log('openEditTodoDialog', 'data',data);
    
    console.log('openEditTodoDialog', 'props.todo', props.todo);
    if(props.todo) {
      setIdText(props.todo.id);
      setTitleText(props.todo.title);
      setDescriptionText(props.todo.description);      
    }
    setEditTodoDialogOpen(true);
    
    
  }
  let selectedRows = [];
  const openDeleteTodoDialog = () =>{
    setSelect(props.reloadSelectedRow())
    setDeleteTodoDialogOpen(true);
  }

  
  const deleteTodoOk = () =>{
    const deleteIds = select.map((val)=>val);
    console.log('deleteTodoOk', 'deletedIds', deleteIds[0]);
    if(deleteIds.length > 0){
      props.deleteTodo(deleteIds[0]);
    }
    setTimeout(()=>{
      props.reloadTodoList();
    },500)
    
    setDeleteTodoDialogOpen(false);
  }

  const deleteTodoClose = () => {
    setDeleteTodoDialogOpen(false);
  }

  return (
    <div
      className={clsx(classes.root, props.className)}
      {...props.rest}
    >
      <Box
        display="flex"
        justifyContent="flex-end"
      >        
        <DeleteButton
          variant="contained"
          onClick={openDeleteTodoDialog}
        >
          Delete Todo
        </DeleteButton>
        <AddButton
          variant="contained"
          onClick={openAddTodoDialog}
        >
          Add Todo
        </AddButton>
        <EditButton
          variant="contained"
          onClick={openEditTodoDialog}
        >
          Edit Todo
        </EditButton>
      </Box>
      
      <Dialog maxWidth={"md"} open={addTodoDialogOpen} onClose={closeAddTodoDialog} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title"><Typography variant="h1">Register Todo</Typography></DialogTitle>
        <DialogContent>
            <Grid container spacing={3}>
              <Grid item xs={4}>
                  <Typography variant="h6">Title</Typography>
              </Grid>
              <Grid item xs={8}>
                    <TextField
                      onChange={changeTitle}
                      margin="dense"
                      id="title"
                      label="Title"
                      type="text"     
                      fullWidth                 
                      variant="filled"
                      autoFocus
                  />
              </Grid>

              <Grid item xs={4}>
                  <Typography variant="h6">Description</Typography>
              </Grid>
              <Grid item xs={8}>
                    <TextField
                      onChange={changeDescription}
                      margin="dense"
                      id="description"
                      label="Description"
                      type="text"    
                      fullWidth                  
                      variant="filled"
                      autoFocus
                  />
              </Grid>
            </Grid>            
        </DialogContent>
        <DialogActions>
            <Button onClick={addTodoOk}>
                Ok
            </Button>
            <Button onClick={closeAddTodoDialog}>
                Cancel
            </Button>
        </DialogActions>
    </Dialog>

    <Dialog maxWidth={"md"} open={editTodoDialogOpen} onClose={closeEditTodoDialog} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title"><Typography variant="h1">Edit Todo</Typography></DialogTitle>
        <DialogContent>
            <Grid container spacing={3}>
              <Grid item xs={4}>
                  <Typography variant="h6">Title</Typography>
              </Grid>
              <Grid item xs={8}>
                    <TextField
                      onChange={changeTitle}
                      margin="dense"
                      id="title"
                      label="Title"
                      type="text"     
                      fullWidth                 
                      variant="filled"
                      value={titleText}
                      autoFocus
                  />
              </Grid>

              <Grid item xs={4}>
                  <Typography variant="h6">Description</Typography>
              </Grid>
              <Grid item xs={8}>
                    <TextField
                      onChange={changeDescription}
                      margin="dense"
                      id="description"
                      label="Description"
                      type="text"    
                      fullWidth                  
                      variant="filled"
                      value={descriptionText}
                      autoFocus
                  />
              </Grid>
            </Grid>            
        </DialogContent>
        <DialogActions>
            <Button onClick={editTodoOk}>
                Ok
            </Button>
            <Button onClick={closeEditTodoDialog}>
                Cancel
            </Button>
        </DialogActions>
    </Dialog>

    <Dialog maxWidth={"md"} open={deleteTodoDialogOpen} onClose={closeDeleteTodoDialog} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title"><Typography variant="h1">Delete Todo</Typography></DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={12}>
              <Typography variant="h5">{select.map((val)=>val)}을(를) 삭제하시겠습니까?</Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={deleteTodoOk}>
            Ok
        </Button>
        <Button onClick={deleteTodoClose}>
            Cancel
        </Button>
      </DialogActions>
    </Dialog>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

const mapStateToProps = (state) => ({
  todo: state.todos.todo,
});


// export default Toolbar;
export default connect(mapStateToProps, {addTodo, editTodo, getTodo, deleteTodo })(Toolbar);

