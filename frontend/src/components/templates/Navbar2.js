import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const Navbar2 = () => {
  const navigate = useNavigate();
  const Occupation = localStorage.getItem("occupation");

  return (
    
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Canteen Portal
          </Typography>
          
          <Box sx={{ flexGrow: 1 }} />
          {/* {Occupation=="customer" &&
          <Button color="inherit" onClick={() => navigate("/profile/userslist")}>
            Dashboard
          </Button>} */}
          <Button color="inherit" onClick={() => navigate("/profile/")}>
            My Profile
          </Button>
          {Occupation=="customer" &&
          <Button color="inherit" onClick={() => navigate("/profile/wallet")}>
            Wallet
          </Button>}
          {Occupation=="vendor" &&
          <Button color="inherit" onClick={() => navigate("/profile/dashboard_vendor")}>
            Vendor Dashboard
          </Button>}
          {Occupation=="vendor" &&
          <Button color="inherit" onClick={() => navigate("/profile/stats")}>
            stats
          </Button>}
          {Occupation=="customer" &&
          <Button color="inherit" onClick={() => navigate("/profile/dashboard_customer")}>
            Customer Dashboard
          </Button>}
          {Occupation=="customer" &&
          <Button color="inherit" onClick={() => navigate("/profile/usermenu")}>
            Menu
          </Button>}
          {Occupation=="vendor" &&
          <Button color="inherit" onClick={() => navigate("/profile/add_item")}>
            Add New Item
          </Button>}
          {Occupation=="vendor" &&
          <Button color="inherit" onClick={() => navigate("/profile/item_list")}>
            Menu
          </Button>}
          <Button color="inherit" onClick={() => navigate("/login")}>
            Logout
          </Button>
          
          
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar2;
