import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Navbar2 from "../templates/Navbar2";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";


const Profile = (props) => {

  const [id, setId] = useState("");
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
  const [wallet, setWallet]= useState("");
  const [date, setDate] = useState(null);

  const onChangeId = (event) => {
    setId(event.target.value);
  };
  const onChangeWallet = (event) => {
    setWallet(event.target.value);
  };
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


  const email_id = localStorage.getItem("email");
  const Occupation = localStorage.getItem("occupation");
  let navigate = useNavigate();

  const onSubmitUser = (event) =>{
    event.preventDefault();

    const User = {
      name: name,
      email: email,
      password: password,
      contact_no: contact_no,
      age: age,
      batch: batch,
      date: Date.now(),
      wallet: wallet,
      occupation: "customer",
    };
    axios
      .post("http://localhost:4000/user/update/" + id, User)
      .then((response) => {
        alert("Updated\t" + response.data.name);
        console.log(response.data);
      })
      .catch(err => {
        alert("Please try another email id");
        console.log(err);
      })

  } 

  const onSubmitVendor = (event) => {
    event.preventDefault();

    const Vendor = {
      name: name,
      email: email,
      password: password,
      contact_no: contact_no,
      manager: manager,
      opening_time: opening_time,
      closing_time: closing_time,
      date: Date.now(),
      occupation: "vendor",
    };

    axios
      .post("http://localhost:4000/vendor/update/" + id, Vendor)
      .then((response) => {
        alert("Updated\t" + response.data.name);
        console.log(response.data);
      })
      .catch(err => {
        alert("Please try another email id");
        console.log(err);
      })

    

    
  };


  useEffect(()=>
  {
    if (email_id == null)
    {
      navigate("/login")
    };

    const Email =
  {
    email: email_id,
  }

  if(Occupation == "customer")
  {
    axios
    .post("http://localhost:4000/user/profile", Email)
    .then((response) => {
      //alert("Created\t" + response.data.name);
      console.log(response.data);
      setId(response.data._id);
      setName(response.data.name);
      setEmail(response.data.email);
      setContact(response.data.contact_no);
      setPassword(response.data.password);
      setBatch(response.data.batch);
      setWallet(response.data.wallet);
      setAge(response.data.age);
      console.log(id)
    })
    .catch(err => {console.log(err);})
  }
  if(Occupation == "vendor")
  {
    axios
    .post("http://localhost:4000/vendor/profile", Email)
    .then((response) => {
      //alert("Created\t" + response.data.name);
      console.log(response.data);
      setId(response.data._id);
      setName(response.data.name);
      setEmail(response.data.email);
      setContact(response.data.contact_no);
      setPassword(response.data.password);
      setManager(response.data.manager);
      setOpen(response.data.opening_time);
      setClose(response.data.closing_time);
    })
    .catch(err => {console.log(err);})
  }
  
  },[]);
  const Buyer_page = () => {
    return(
      <div>
        <Grid container align={"center"} spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Amount"
              variant="outlined"
              value={wallet}
              onChange={onChangeWallet}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" onClick={onSubmitUser}>
              Update
            </Button>
          </Grid>
          </Grid>
          
        
      </div>
    )
  }
  const Vendor_page = () =>{
    return(
      <div>
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
              label="shop_name"
              variant="outlined"
              value={manager}
              onChange={onChangeManager}
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
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Contact_number"
              variant="outlined"
              value={contact_no}
              onChange={onChangeContact}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="canteen_opening_time"
              variant="outlined"
              value={opening_time}
              onChange={onChangeOpen}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="canteen_closing_time"
              variant="outlined"
              value={closing_time}
              onChange={onChangeClose}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" onClick={onSubmitVendor}>
              Update
            </Button>
          </Grid>
        </Grid>
        <br />
      </div>
    )
  }
  return (
    <div>
      <br />
      <h3>Information -- </h3>

      {Occupation == "customer" &&
      <Buyer_page />}

      {Occupation == "vendor" &&
      <Vendor_page />}

    </div>
  )
  }
 
export default Profile;
