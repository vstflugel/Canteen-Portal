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
import { Navigate, useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
//import Food from "../../../../backend/models/Food";

const Item_list = (props) => {
    const vendor_id_local = localStorage.getItem("vendor_id");
    const email_id = localStorage.getItem("email");
    const [food, setFood] = useState([]);
    //const [id, setFood_id] = useState("");
    const [vendor_id, setVendor_id] = useState("");
    const [item_name, setItem_name] = useState("");
    const [price, setPrice] = useState("");
    const [rating, setRating] = useState("");
    const [veg, setVeg] = useState("");
    const [add_on, setAdd_on] = useState("");
    const [tags, setTags] = useState("");
    let navigate = useNavigate();


    useEffect(() => {
        if (vendor_id_local == null) {
            navigate("/login");
        }
        if (email_id == null) {
            navigate("/login");
        }
        axios
            .get("http://localhost:4000/food")
            .then((response) => {
                setFood(response.data);

            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

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

    const onDeleteItem = (id) => {
        axios
            .delete("http://localhost:4000/food/delete/" + id)
            .then(response => {
                console.log(response.data)
            });

        setFood(food.filter(el => el._id !== id))
    }

    const onUpdate = (id) => {
        navigate("/profile/edit/" + id)
    }
    return (
        <Grid container align={"center"} spacing={2}>
            <h1>Food Menu</h1>
            <Grid item xs={12} md={9} lg={9}>
                <Paper>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Item Name</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Type</TableCell>
                                <TableCell>Tags</TableCell>
                                <TableCell>Add ons</TableCell>
                                <TableCell>Rating</TableCell>
                                <TableCell>Delete</TableCell>
                                <TableCell>Update</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {food.map((food, ind) => (
                                <TableRow key={ind}>
                                    {food.vendor_id == vendor_id_local && <>

                                        <TableCell>{food.item_name}</TableCell>
                                        <TableCell>{food.price}</TableCell>
                                        <TableCell>{food.veg}</TableCell>
                                        <TableCell>{food.add_on.map((current_object, i) => {
                                            return <li key={i}>{current_object.food_add_on}, price:{current_object.price}</li>
                                        })}</TableCell>
                                        <TableCell>{food.tags.map((current_tag, i) => {
                                            return <li key={i}>{current_tag}</li>
                                        })}</TableCell>
                                        <TableCell>{food.rating}</TableCell>

                                        <TableCell>
                                            <Grid item xs={12}>
                                                <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => { onDeleteItem(food._id) }}>
                                                    Delete
                                                </Button>
                                            </Grid>
                                        </TableCell>
                                        <TableCell>
                                            <Grid item xs={12}>
                                                <Button variant="contained" onClick={() => { onUpdate(food._id) }}>
                                                    Update
                                                </Button>
                                            </Grid></TableCell>
                                    </>}
                                </TableRow>
                            ))}
                        </TableBody>

                    </Table>
                </Paper>
            </Grid>
        </Grid>
    )
}
export default Item_list;