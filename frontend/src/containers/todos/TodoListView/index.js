import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  makeStyles,
  Card
} from '@material-ui/core';
import Page from '../../../components/Page';
import Toolbar from './Toolbar';
import { DataGrid } from '@material-ui/data-grid';
import { getTodos } from '../../../actions/todos'
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.background.dark,
      minHeight: '100%',
      paddingBottom: theme.spacing(3),
      paddingTop: theme.spacing(3)
    }
  }));

const TodoListView = (props) =>{
    const classes = useStyles();
    const reloadTodoList = () => {
        return props.getTodos();
    }
    let data = null;
    let rows = []
    useEffect(()=>{
      props.getTodos();
      // console.log('TodoListView', props.todos);
      // if(data) rows = props.todos;
    }, []);
    
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'title', headerName: 'Title', width: 300},
        { field: 'description', headerName: 'Description', width: 300 },
        { field: 'completed', headerName: 'Completed', width: 50 }     
      ];
          
    const [select, setSelection] = useState([])
    const reloadSelectedRow = () =>{
      return select;
    }
    return (
        <Page
        className={classes.root}
        title="Todos"
        >
        <Container maxWidth={false}>
            <Toolbar reloadTodoList={reloadTodoList} reloadSelectedRow={reloadSelectedRow} />
            <Box mt={3}>
            <Card>
            
                <div style={{ height: 800, width: '100%' }}>
                    <DataGrid 
                      rows={props.todos} 
                      columns={columns} 
                      pageSize={20} 
                      checkboxSelection 
                      disableMultipleSelection={true} 
                      onSelectionChange={(newSelection) => {
                        setSelection(newSelection.rowIds);
                      }}
                      />
                </div>
                
            </Card>
            </Box>
        </Container>
        </Page>
    )
}

const mapStateToProps = (state) => ({
  todos: state.todos.todos,
});

export default connect(mapStateToProps, { getTodos })(TodoListView);


