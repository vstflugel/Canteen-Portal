import { useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Stack from '@mui/material/Stack';

import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { FormControl } from "@mui/material";
import { Select } from "@mui/material";

const Login = (props) => 
{
  let navigate = useNavigate();
  localStorage.clear();

    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [occupation, setOccupation] = useState("");

    const onChangeEmail = (event) => {
        setEmail(event.target.value);
      };
      const onChangePassword = (event) => {
        setPassword(event.target.value);
      };
      const onChangeOccupation = (event) => {
        setOccupation(event.target.value);
      };
      const resetInputs = () => {
        setEmail("");
        setPassword("");
        setOccupation("");
     };
     const onSubmitUser = (event) => {
        event.preventDefault();
     
        const User = {
          
          email: email,
          
          password: password,
          //occupation: occupation,
          //date: Date.now(),
        };
    
        axios
          .post("http://localhost:4000/user/Login", User)
          .then((response) => {
            if(response.data != null) {
              alert("success\t");
              localStorage.setItem("email", response.data.email)
              localStorage.setItem("occupation", response.data.occupation)
              localStorage.setItem("vendor_id", response.data._id)
              navigate('/profile');
              console.log(response.data);
            }
            else {
              console.log("Login failed")
            }
          })
          .catch(err => {console.log(err);})  
          
    
        resetInputs();
        
        };
        const onSubmitVendor = (event) => {
          event.preventDefault();
       
          const User = {
            
            email: email,
            
            password: password,
            //occupation: occupation,
            //date: Date.now(),
          };
      
          axios
          .post("http://localhost:4000/vendor/Login", User)
          .then((response) => {
            if(response.data != null) {
              alert("success\t");
              localStorage.setItem("email", response.data.email)
              localStorage.setItem("occupation",response.data.occupation)
              localStorage.setItem("vendor_id", response.data._id)
              navigate('/profile');
              //console.log();
            }
            else {
              console.log("Login failed")
            }
          })
          .catch(err => {console.log(err);}) 
            
            
      
          resetInputs();
          
          };
        return (
             <Grid container align={"center"} spacing={2}>
              
             <div><h1>login</h1></div>
             <Grid item xs={12}>
     
        <div>
        <Grid item xs={12}>
        <Box sx={{ maxWidth: 235 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Occupation</InputLabel>
            <Select
              labelId="Occupation"
              id="Occupation"
              value={occupation}
              label="Occupation"
              onChange={onChangeOccupation}
            >
              <MenuItem value={"customer"}>Customer</MenuItem>
              <MenuItem value={"vendor"}>Vendor</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Grid>
        </div>
        </Grid>
        {occupation==="customer" &&
    <Grid container align={"center"} spacing={2}>
     <Grid item xs={12}>
                <TextField
                  label="Email"
                  variant="outlined"
                  value={email}
                  onChange={onChangeEmail}
                />
              </Grid>
               <Grid item xs={12}>
                 <TextField
                   label="Password"
                   variant="outlined"
                   value={password}
                   onChange={onChangePassword}
                 />
               </Grid>
    <Grid item xs={12}>
  <Button variant="contained" color="secondary" onClick={onSubmitUser}>
    Login Customer
  </Button>
</Grid></Grid>
}
{occupation==="vendor" &&
    <Grid container align={"center"} spacing={2}>
     <Grid item xs={12}>
                <TextField
                  label="Email"
                  variant="outlined"
                  value={email}
                  onChange={onChangeEmail}
                />
              </Grid>
               <Grid item xs={12}>
                 <TextField
                   label="Password"
                   variant="outlined"
                   value={password}
                   onChange={onChangePassword}
                   type="password"
                 />
               </Grid> 
    <Grid item xs={12}>
  <Button variant="contained" color="secondary" onClick={onSubmitVendor}>
     Login Vendor
  </Button>
</Grid></Grid>
}
             </Grid>
          );
      
    
    
}
export default Login;