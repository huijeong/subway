import React, { useState, Component, Fragment, useEffect } from 'react';
import {
  Box,
  Container,
  makeStyles,
  withStyles,
  Typography,
  Card
} from '@material-ui/core';
import Page from '../../../components/Page';
import Toolbar from './Toolbar';
import PropTypes from 'prop-types' 
import { DataGrid } from '@material-ui/data-grid';
import styled from 'styled-components';
import { getUser } from '../../../actions/users'
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.background.dark,
      minHeight: '100%',
      paddingBottom: theme.spacing(3),
      paddingTop: theme.spacing(3)
    }
  }));

const UserListView = (props) =>{
    // const [token, setToken] = useState(0);
    // console.log('-------UserListView-------');
    const classes = useStyles();
    // console.log('UserListView', loading, error, data);
    const reloadUserList = () => {
      // console.log('-------UserListView-------  reloadUserList');
        return props.getUser();
    }
    let data = null;
    let rows = []
    useEffect(()=>{
      // console.log('-------UserListView-------  useEffect');
      // console.log(props);
      props.getUser();
      // console.log(data);
      // if(data) rows = data.users;
    }, []);
    
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'email', headerName: 'E-Mail', width: 300},
        { field: 'nickname', headerName: 'Name', width: 250 },          
        { field: 'password', headerName: 'Password', width: 200},
        { field: 'is_admin', headerName: 'Admin', width: 100},
      ];
          
    // const rows = data;
    const [select, setSelection] = useState([])
    const reloadSelectedRow = () =>{
      // console.log('reloadSelectedRow', select);
      return select;
    }
    // console.log('-------UserListView-------  return', props.getUser);
    return (
        <Page
        className={classes.root}
        title="Users"
        >
        <Container maxWidth={false}>
            <Toolbar reloadUserList={reloadUserList} reloadSelectedRow={reloadSelectedRow} />
            <Box mt={3}>
            <Card>
            
                <div style={{ height: 800, width: '100%' }}>
                    <DataGrid 
                      rows={props.users} 
                      columns={columns} 
                      pageSize={20} 
                      checkboxSelection 
                      disableMultipleSelection={true} 
                      onSelectionChange={(newSelection) => {
                        // console.log('onSelectionChange', newSelection.rowIds);
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
  users: state.users.users,
});

// export default UserListView;
export default connect(mapStateToProps, { getUser })(UserListView);


