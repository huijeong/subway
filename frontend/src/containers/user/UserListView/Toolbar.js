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
import {addUser,deleteUser} from '../../../actions/users'
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
  // const Toolbar = (props, {className, reloadUserList, reloadSelectedRow, ...rest }) => {
  const classes = useStyles();
  const [addUserDialogOpen, setAddUserDialogOpen] = useState(false);
  const [deleteUserDialogOpen, setDeleteUserDialogOpen] = useState(false);
  const [userNameText, setUserNameText] = useState("");
  const [emailText, setEmailText] = useState("");
  const [passwordText, setPaswordText] = useState("");
  const [roleText, setRoleText] = useState("ADMIN");
  const [select, setSelect] = useState([])
  

  const closeAddUserDialog = () =>{
    setAddUserDialogOpen(false)
  }

  const changeUserName = (e) =>{
    setUserNameText(e.target.value)
  }

  const changeEmail = (e) => {
    setEmailText(e.target.value)
  }

  const changePassword = (e) =>{
    setPaswordText(e.target.value)
  }

  const changeRole = (e) => {
    setRoleText(e.target.value)
  }
  const addUserOk = (e) => {
    console.log('addUserOk', userNameText, emailText, passwordText, props.reloadUserList);
    // graphql mutation 
    // signUp({ variables: { username: userNameText, email: emailText, password: passwordText, role: roleText } });
    // console.log('addUserOk', className, reloadUserList);
    const user = {nickname: userNameText, email: emailText, password: passwordText, is_admin: roleText == 'ADMIN'?true:false}
    props.addUser(user);
    props.reloadUserList()
    setAddUserDialogOpen(false)
  }

  const openAddUserDialog = () =>{
    setAddUserDialogOpen(true);
  }
  let selectedRows = [];
  const openDeleteUserDialog = () =>{
    // selectedRows = props.reloadSelectedRow();
    setSelect(props.reloadSelectedRow())
    console.log('openDeleteUserDialog', select);
    setDeleteUserDialogOpen(true);
  }

  
  const deleteUserOk = () =>{
    // console.log('openDeleteOk', selectedRows);
    const deleteIds = select.map((val)=>val);
    console.log('openDeleteOk', 'deletedIds', deleteIds[0]);
    if(deleteIds.length > 0){
      props.deleteUser(deleteIds[0]);
    }
    setTimeout(()=>{
      props.reloadUserList();
    },500)
    
    setDeleteUserDialogOpen(false);
  }

  const deleteUserClose = () => {
    setDeleteUserDialogOpen(false);
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
        {/* <Button className={classes.importButton}>
          Import
        </Button>
        <Button className={classes.exportButton}>
          Export
        </Button> */}
        <DeleteButton
          variant="contained"
          onClick={openDeleteUserDialog}
        >
          Delete User
        </DeleteButton>
        <AddButton
          variant="contained"
          onClick={openAddUserDialog}
        >
          Add User
        </AddButton>
      </Box>
      {/* <Box mt={3}>
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
      </Box> */}
      <Dialog maxWidth={"md"} open={addUserDialogOpen} onClose={closeAddUserDialog} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title"><Typography variant="h1">사용자 등록</Typography></DialogTitle>
        <DialogContent>
            <Grid container spacing={3}>
              <Grid item xs={4}>
                  <Typography variant="h6">닉네임</Typography>
              </Grid>
              <Grid item xs={8}>
                    <TextField
                      onChange={changeUserName}
                      margin="dense"
                      id="username"
                      label="Name"
                      type="text"     
                      fullWidth                 
                      variant="filled"
                      autoFocus
                  />
              </Grid>

              <Grid item xs={4}>
                  <Typography variant="h6">이메일</Typography>
              </Grid>
              <Grid item xs={8}>
                    <TextField
                      onChange={changeEmail}
                      margin="dense"
                      id="email"
                      label="E-Mail"
                      type="text"    
                      fullWidth                  
                      variant="filled"
                      autoFocus
                  />
              </Grid>

              <Grid item xs={4}>
                  <Typography variant="h6">비밀번호</Typography>
              </Grid>
              <Grid item xs={8}>
                    <TextField
                      onChange={changePassword}
                      margin="dense"
                      id="password"
                      label="Password"
                      type="password"
                      fullWidth
                      variant="filled"
                      autoFocus
                  />
              </Grid>

              <Grid item xs={4}>
                  <Typography variant="h6">역할</Typography>
              </Grid>
              <Grid item xs={8}>
                <Select
                  label="role"
                  id="role"
                  value={roleText}
                  onChange={changeRole}
                >
                  <MenuItem value={"ADMIN"}>Admin</MenuItem>
                  <MenuItem value={"USER"}>User</MenuItem>                  
                </Select>
              </Grid>

            </Grid>
            
        </DialogContent>
        <DialogActions>
            <Button onClick={addUserOk}>
                Ok
            </Button>
            <Button onClick={closeAddUserDialog}>
                Cancel
            </Button>
        </DialogActions>
    </Dialog >

    <Dialog maxWidth={"md"} open={deleteUserDialogOpen} onClose={closeAddUserDialog} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title"><Typography variant="h1">사용자 삭제</Typography></DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={12}>
              <Typography variant="h5">{select.map((val)=>val)}을(를) 삭제하시겠습니까?</Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={deleteUserOk}>
            Ok
        </Button>
        <Button onClick={deleteUserClose}>
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

// export default Toolbar;
export default connect(null, {addUser, deleteUser})(Toolbar);

