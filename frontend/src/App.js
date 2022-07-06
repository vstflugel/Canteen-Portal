import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./App.css";

import UsersList from "./components/users/UsersList";
import Add_item from "./components/users/Add_item";
import Item_list from "./components/users/Item_list";
import Dashboard_vendor from "./components/users/Dashboard_vendor";
import Dashboard_customer from "./components/users/Dashboard_customer";
import Home from "./components/common/Home";
import Register from "./components/common/Register";
import Login from "./components/common/Login";
import Wallet from "./components/common/Wallet";
import Navbar from "./components/templates/Navbar";
import Navbar2 from "./components/templates/Navbar2";
import Profile from "./components/users/Profile";
import Edit_item from "./components/users/Edit_item";
import Stats from "./components/users/Stats";
import Usermenu from "./components/users/Usermenu";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};
const Layout2 = () => {
  return (
    <div>
      <Navbar2 />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          {/* <Route path="users" element={<UsersList />} /> */}
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />}/>
          
        </Route>

        <Route path="/profile/" element={<Layout2 />}>
          <Route path="/profile/" element={<Profile />}/>
          <Route path="/profile/wallet" element={<Wallet />}/>
          {/* <Route path="/profile/userslist" element={<UsersList />}/> */}
          <Route path="/profile/dashboard_vendor" element={<Dashboard_vendor />}/>
          <Route path="/profile/stats" element={<Stats />}/>
          <Route path="/profile/Usermenu" element={<Usermenu />}/>
          <Route path="/profile/dashboard_customer" element={<Dashboard_customer />}/>
          <Route path="/profile/add_item" element={<Add_item />}/>
          <Route path="/profile/item_list" element={<Item_list />}/>
          <Route path="/profile/edit/:id" element={<Edit_item />}/>
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
