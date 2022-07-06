import { useState, useEffect } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import Autocomplete from "@mui/material/Autocomplete";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";

import SearchIcon from "@mui/icons-material/Search";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useNavigate } from "react-router-dom";

const Stats = (props) => {

    let navigate = useNavigate();
    const vendor_id_local = localStorage.getItem("vendor_id");
    const [order, setOrder] = useState([]);

    useEffect(() => {

        if (vendor_id_local == null) {
            navigate("/login");
        }

        const Vendor = {
            vendor_id: vendor_id_local,
        };

        axios
            .get("http://localhost:4000/order/vendor/" + vendor_id_local)

            .then((response) => {
                console.log(response.data);
                setOrder(response.data);
            })

            .catch((err) => { console.log(err); });
    }, []);

    {/*------------1st part-------------*/ }

    var counter = new Map();

    order.map(order => {
        counter.set(order.item_name, 0);
    })

    order.map(order => {
        counter.set(order.item_name, counter.get(order.item_name) + order.quantity);
    })

    // The following function sorts the data in reverse
    const reverse_sorted = new Map([...counter.entries()].sort((a, b) => b[1] - a[1]));

    let array_of_names = [];
    for (const item_name of reverse_sorted.keys()) {
        array_of_names.push(item_name);
    }

    let top_five_names = []
    for (var i = 0; i < 5 && i < array_of_names.length; i++) {
        top_five_names.push(array_of_names[i]);
    }

    {/*------------2nd part-------------*/ }

    var orders_placed = 0;
    var orders_placed_by_quantity = 0;
    order.map(order => {
        if (order.current_status == "PLACED") {
            orders_placed += 1;
            orders_placed_by_quantity += order.quantity;
        }
    });

    {/*------------3rd part-------------*/ }

    var orders_pending = 0;
    var orders_pending_by_quantity = 0;
    order.map(order => {
        if (order.current_status == "ACCEPTED" || order.current_status == "COOKING") {
            orders_pending += 1;
            orders_pending_by_quantity += order.quantity;
        }
    });

    {/*------------4th part-------------*/ }

    var orders_rejected = 0;
    var orders_rejected_by_quantity = 0;
    order.map(order => {
        if (order.current_status == "REJECTED") {
            orders_rejected += 1;
            orders_rejected_by_quantity += order.quantity;
        }
    });

    return (
        <div>
            <br />
            <br />
            <Grid container>
                <Paper>
                    <Table size="large"><Grid item xs={12}>
                        <TableHead>
                            <TableRow>
                                <TableCell>TOP FIVE ORDERS:</TableCell>
                                <TableCell>ORDERS PLACED</TableCell>
                                <TableCell>ORDERS PLACED BY QUANTITY</TableCell>
                                <TableCell>ORDERS PENDING (ACCEPTED OR COOKING)</TableCell>
                                <TableCell>ORDERS PENDING BY QUANTITY (ACCEPTED OR COOKING)</TableCell>
                                <TableCell>ORDERS REJECTED</TableCell>
                                <TableCell>ORDERS REJECTED BY QUANTITY</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell><Grid item xs={12}>
                                    <div align="left">
                                        <Grid container align={"center"} spacing={2}>
                                            <Grid item xs={12}>
                                                {top_five_names.map(name => <li>{name}</li>)}
                                            </Grid>
                                        </Grid>
                                    </div>
                                </Grid></TableCell>
                                <TableCell>{orders_placed}</TableCell>
                                <TableCell>{orders_placed_by_quantity}</TableCell>
                                <TableCell>{orders_pending}</TableCell>
                                <TableCell>{orders_pending_by_quantity}</TableCell>
                                <TableCell>{orders_rejected}</TableCell>
                                <TableCell>{orders_rejected_by_quantity}</TableCell>

                            </TableRow>
                        </TableBody>
                    </Grid>
                    </Table></Paper>

            </Grid>
        </div>
    );

};

export default Stats;