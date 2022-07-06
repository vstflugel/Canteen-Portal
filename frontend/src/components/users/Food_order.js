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
import { useNavigate } from "react-router-dom";

const Food_order = (props) => {
    let navigate = useNavigate();
    const email_id = localStorage.getItem("email");
    const vendor_id_local = localStorage.getItem("vendor_id");
    const [order, setOrder] = useState([]);

    useEffect(() => {
        if (email_id == null) {
            navigate("/login")
        }
        if (vendor_id_local == null) {
            navigate("/login")
        }
        const Vendor = {
            vendor_id: vendor_id_local,
        }
        axios
            .get("http://localhost:4000/order/user/" + vendor_id_local)
            .then((response) => {
                setOrder(response.data);
                console.log(response);
    
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    
    const next = ["Placed", "Accepted", "Cooking", "Ready for pickup", "Completed", "Rejected"];
    const onNext = (id,status) => {
        let i = 0;
        while (next[i] != status) {
            i++;
        }
        i++;
        const newStatus = {
            status: next[i]
        }
        axios
            .post("http://localhost:4000/order/vendor/update/" + id, newStatus)
            window.location.reload();
    }
    const onReject = (id,status) => {
        axios
            .post("http://localhost:4000/order/vendor/reject/" + id)
            window.location.reload();
    }

    return (
        <Grid container align={"center"} spacing={2}>
            <h1>Dashboard</h1>
            <Grid item xs={12} md={9} lg={9}>
                <Paper>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Item Name</TableCell>
                                <TableCell>Quantity</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Add Ons</TableCell>
                                <TableCell>Ordered at Time</TableCell>
                                <TableCell>Stage</TableCell>
                                <TableCell>Rating</TableCell>
                                {/* <TableCell>Move to next stage</TableCell> */}
                                {/* <TableCell>Reject</TableCell> */}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {order.map((order, ind) => (
                                <TableRow key={ind}>


                                    <TableCell>{order.item_name}</TableCell>
                                    <TableCell>{order.quantity}</TableCell>
                                    <TableCell>{order.price}</TableCell>
                                    <TableCell>{order.add_on.map((current_object, i) => {
                                        return <li key={i}>{current_object.order_add_on}, price:{current_object.price}</li>
                                    })}</TableCell>
                                    <TableCell>{order.createdAt}</TableCell>
                                    <TableCell>{order.current_status}</TableCell>

                                    {/* <TableCell>
                                        {order.current_status != "Ready for pickup" && order.current_status != "Rejected" && order.current_status != "Cancelled" && order.current_status != "Completed" &&
                                            <Grid item xs={12}>
                                                <Button variant="contained" onClick={() => { onNext(order._id, order.current_status) }}>
                                                    Next Stage
                                                </Button>
                                            </Grid>}
                                    </TableCell> */}
                                    {/* <TableCell>
                                        {order.current_status == "Placed" &&

                                            <Grid item xs={12}>
                                                <Button variant="contained" onClick={() => { onReject(order._id, order.current_status) }}>
                                                    Reject
                                                </Button>
                                            </Grid>}
                                    </TableCell> */}
                                </TableRow>
                            ))}
                        </TableBody>

                    </Table>
                </Paper>
            </Grid>
        </Grid>

    )
}

export default Food_order;