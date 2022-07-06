import { useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { FormControl } from "@mui/material";
import { Select } from "@mui/material";

const Register = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact_no, setContact] = useState("");
  const [occupation, setOccupation] = useState("");
  const [age, setAge] = useState("");
  const [batch, setBatch] = useState("");
  const [manager, setManager] = useState("");
  const [opening_time, setOpen] = useState("");
  const [closing_time, setClose] = useState("");
  const [password, setPassword] = useState("");
  const [date, setDate] = useState(null);


  const onChangeUsername = (event) => {
    setName(event.target.value);
  };
  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const onChangeOccupation = (event) => {
    setOccupation(event.target.value);
  };
  const onChangeContact = (event) => {
    setContact(event.target.value);
  };
  const onChangeAge = (event) => {
    setAge(event.target.value);
  };
  const onChangeBatch = (event) => {
    setBatch(event.target.value);
  };
  const onChangeManager = (event) => {
    setManager(event.target.value);
  };
  const onChangeOpen = (event) => {
    setOpen(event.target.value);
  };
  const onChangeClose = (event) => {
    setClose(event.target.value);
  };

  const resetInputs = () => {
    setName("");
    setEmail("");
    setPassword("");
    setContact("");
    setOccupation("");
    setClose("");
    setBatch("");
    setAge("");
    setManager("");
    setOpen("");
    setDate(null);
  };

  const onSubmitUser = (event) => {
    event.preventDefault();

    const newUser = {
      name: name,
      email: email,
      password: password,
      contact_no: contact_no,
      age: age,
      batch: batch,
      date: Date.now(),
      occupation: occupation,
    };

    axios
      .post("http://localhost:4000/user/register", newUser)
      .then((response) => {
        alert("Created\t" + response.data.name);
        console.log(response.data);
      });

    resetInputs();
  };
  const onSubmitVendor = (event) => {
    event.preventDefault();

    const newVendor = {
      name: name,
      email: email,
      password: password,
      contact_no: contact_no,
      manager: manager,
      opening_time: opening_time,
      closing_time: closing_time,
      date: Date.now(),
      occupation: occupation,
    };

    axios
      .post("http://localhost:4000/vendor/register", newVendor)
      .then((response) => {
        alert("Created\t" + response.data.name);
        console.log(response.data);
      });

    resetInputs();
  };

  return (
    <Grid container align={"center"} spacing={2}>


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



      {occupation === "customer" &&
        <Grid container align={"center"} spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              variant="outlined"
              value={name}
              onChange={onChangeUsername}
            />
          </Grid>
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
            <TextField
              label="Contact"
              variant="outlined"
              value={contact_no}
              onChange={onChangeContact}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Age"
              variant="outlined"
              value={age}
              onChange={onChangeAge}
            />
          </Grid>
          <Grid item xs={12}>
          <Box sx={{ maxWidth: 235 }}>
            <FormControl fullWidth>
            <InputLabel id="Batch">Batch</InputLabel>
            <Select
              labelId="Batch"
              id="Batch"
              value={batch}
              label="Batch"
              onChange={onChangeBatch}
            >
              <MenuItem value={"UG1"}>UG1</MenuItem>
              <MenuItem value={"UG2"}>UG2</MenuItem>
              <MenuItem value={"UG3"}>UG3</MenuItem>
              <MenuItem value={"UG4"}>UG4</MenuItem>
              <MenuItem value={"UG5"}>UG5</MenuItem>
            </Select>
          </FormControl></Box></Grid>
          <Grid item xs={12}>
            <Button variant="contained" onClick={onSubmitUser}>
              Register User
            </Button>
          </Grid></Grid>
      }

      {occupation === "vendor" &&
        <Grid container align={"center"} spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Shop Name"
              variant="outlined"
              value={name}
              onChange={onChangeUsername}
            />
          </Grid>
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
            <TextField
              label="Contact"
              variant="outlined"
              value={contact_no}
              onChange={onChangeContact}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Manager Name"
              variant="outlined"
              value={manager}
              onChange={onChangeManager}
            />
          </Grid><Grid item xs={12}>
            <TextField
              label="Opening time"
              variant="outlined"
              value={opening_time}
              onChange={onChangeOpen}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Closing time"
              variant="outlined"
              value={closing_time}
              onChange={onChangeClose}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" onClick={onSubmitVendor}>
              RegisterVendor
            </Button>
          </Grid></Grid>
      }
    </Grid>
  );
};

export default Register;
