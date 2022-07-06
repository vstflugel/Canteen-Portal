import { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { FormControl } from "@mui/material";
import { Select } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

const Add_item = (props) => {
  const vendor_id_local = localStorage.getItem("vendor_id");
  //const email_id = localStorage.getItem("email");
  const [food, setFood] = useState([]);
  //const [food_id, setFood_id] = useState("");
  const [vendor_id, setVendor_id] = useState("");
  const [item_name, setItem_name] = useState("");
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState("");
  const [veg, setVeg] = useState("");
  const [add_on, setAdd_on] = useState("");
  const [tags, setTags] = useState("");
  const [no_of_users, setNo_of_users] = useState("");
  const [temp1, setTemp1] = useState("");
  const [temp2, setTemp2] = useState("");
  const [temp3, setTemp3] = useState("");
  let navigate = useNavigate();
  
  const food_id = useParams();

  useEffect(() => {
    if(vendor_id_local==null){
      navigate("/login");
  }

    const Food = { 
      food_id: food_id.id,
    }

    axios
      .post("http://localhost:4000/food/find", Food)
      .then((response) => {
        console.log(response.data);
        setItem_name(response.data.item_name);
        setPrice(response.data.price);
        setAdd_on(response.data.add_on);
        setTags(response.data.tags);
        setVeg(response.data.veg);

      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  //console.log(food_id)



  const onChangeFood = (event) => {
    setFood(event.target.value);
  };
  const onChangeItem_name = (event) => {
    setItem_name(event.target.value);
  };
  const onChangePrice = (event) => {
    setPrice(event.target.value);
  };
  const onChangeRating = (event) => {
    setRating(event.target.value);
  };
  const onChangeVeg = (event) => {
    setVeg(event.target.value);
  };
  const onChangeAdd_on = (event) => {
    setAdd_on(event.target.value);
  };
  const onChangeTags = (event) => {
    setTags(event.target.value);
  };
  const onChangeTemp1 = (event) => {
    setTemp1(event.target.value);
  };
  const onChangeTemp2 = (event) => {
    setTemp2(event.target.value);
  };
  const onChangeTemp3 = (event) => {
    setTemp3(event.target.value);
  };
  const addAdd_on = () => {
    const temp = {
      food_addon: temp2,
      price: temp3
    }
    add_on.push(temp);
    setTemp2("");
    setTemp3("");
  }
  const addTags = () => {
    tags.push(temp1);
    setTemp1("");
  }
  const resetInputs = () => {
    setItem_name("");
    setPrice("");
    setRating("");
    setVeg("");
    setAdd_on("");
    setTags("");
    setTemp1("");
    setTemp2("");
    setTemp3("");
  };
  const onAdd_item = (event) => {
    event.preventDefault();

    const newFood = {
      vendor_id: vendor_id_local,
      item_name: item_name,
      price: price,
      veg: veg,
      add_on: add_on,
      tags: tags,
      //no_of_user: no_of_user
    };

    axios
      .post("http://localhost:4000/food/update/" + food_id.id,newFood)
      .then((response) => {
        console.log("updated")
      })
      .catch((error) => {
        console.log(error);
      })
    navigate("/profile/item_list");
    window.location.reload();
  };

  
  return (
    <Grid container align={"center"} spacing={2}>
      <h1>Add New Item</h1>
      <Grid item xs={12}>
        <TextField
          label="Item Name"
          variant="outlined"
          value={item_name}
          onChange={onChangeItem_name}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Price"
          variant="outlined"
          value={price}
          onChange={onChangePrice}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Add_on"
          variant="outlined"
          value={temp2}
          onChange={onChangeTemp2}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Add_on_price"
          variant="outlined"
          value={temp3}
          onChange={onChangeTemp3}
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" onClick={addAdd_on}>
          Update Add_on
        </Button>
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Tags"
          variant="outlined"
          value={temp1}
          onChange={onChangeTemp1}
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" onClick={addTags}>
          Add Tags
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Box sx={{ maxWidth: 235 }}>
          <FormControl fullWidth>
            <InputLabel id="Veg/Non-Veg">Veg/Non-Veg</InputLabel>
            <Select
              labelId="Veg/Non-Veg"
              id="Veg/Non-Veg"
              value={veg}
              label="Veg/Non-Veg"
              onChange={onChangeVeg}
            >
              <MenuItem value={"veg"}>Vegetarian</MenuItem>
              <MenuItem value={"non-veg"}>Non-Vegetarian</MenuItem>

            </Select>
          </FormControl></Box></Grid>

      <Grid item xs={12}>
        <Button variant="contained" onClick={onAdd_item}>
          Update Item
        </Button>
      </Grid>
    </Grid>
  )
}
export default Add_item;