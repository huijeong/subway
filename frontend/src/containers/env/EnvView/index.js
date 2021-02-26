import React, { useState, Component, Fragment, useEffect } from 'react';
import {
  Box,
  Container,
  makeStyles,
  Typography,
  Card
} from '@material-ui/core';
import Page from '../../../components/Page';
import Toolbar from './Toolbar';
import { gql, useQuery } from '@apollo/client';
import { DataGrid } from '@material-ui/data-grid';
import styled from 'styled-components';

const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.background.dark,
      minHeight: '100%',
      paddingBottom: theme.spacing(3),
      paddingTop: theme.spacing(3)
    }
  }));


const EnvView = (props) =>{
    // const [token, setToken] = useState(0);
    const classes = useStyles();
    // const { loading, error, data, refetch } = useQuery(USER_LIST_QUERY);
    console.log('UserListView', loading, error, data);
    const reload = () => {
        
        setTimeout(()=>{
            console.log('reload called');
            refetch()
        },1000)        
    }
    
    useEffect(()=>{
    });
    
    if(loading){
        return (
        <Page
            className={classes.root}
            title="Users"
            >
            <Container maxWidth={false}>
                <Toolbar reloadUserList={reloadUserList} />
                <Box mt={3}>
                <Card>
                    <Typography vairant={"h2"}>Now Loading...</Typography>                    
                </Card>
                </Box>
            </Container>
        </Page>
        );
    }
    if(error){
        return (
            <Page
            className={classes.root}
            title="Users"
            >
            <Container maxWidth={false}>
                <Toolbar reloadUserList={reloadUserList} />
                <Box mt={3}>
                <Card>
                    <Typography vairant={"h2"}>Error occured...</Typography>                    
                </Card>
                </Box>
            </Container>
        </Page>
        )
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'username', headerName: 'Name', width: 250 },        
        { field: 'email', headerName: 'E-Mail', width: 300},
        { field: 'token', headerName: 'Token', width: 400},
      ];
          
    const rows = data.users;

    
    return (
        <Page
        className={classes.root}
        title="Users"
        >
        <Container maxWidth={false}>
            <Toolbar reloadUserList={reloadUserList} />
            <Box mt={3}>
            <Card>
            
                <div style={{ height: 800, width: '100%' }}>
                    <DataGrid rows={rows} columns={columns} pageSize={20} checkboxSelection />
                </div>
                
            </Card>
            </Box>
        </Container>
        </Page>
    )
}
const USER_LIST_QUERY = gql`
    query UserListQuery {
        users {
            id,
            username,
            email,
            token
        }
    }
`
export default EnvView;


