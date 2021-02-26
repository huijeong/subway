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
import { gql, useMutation } from '@apollo/client';

const SIGN_UP = gql`
  mutation signUp($username: String!, $email: String!, $password: String!, $role: String!) {
    signUp(username: $username, email: $email, password: $password, role: $role) {
      id
      username,
      email,
      role,
      token      
    }
  }
`;

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

const Toolbar = ({ className, reloadUserList, ...rest }) => {
  const classes = useStyles();



  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box
        display="flex"
        justifyContent="flex-end"
      >       
        <DeleteButton
          variant="contained"
        >
          Delete File
        </DeleteButton>
        <AddButton
          variant="contained"
        >
          Add File
        </AddButton>
      </Box>
      <Box mt={3}>
        <Card>
          <CardContent>
            <Box maxWidth={500}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon
                        fontSize="small"
                        color="action"
                      >
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                placeholder="Search User"
                variant="outlined"
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
      
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
