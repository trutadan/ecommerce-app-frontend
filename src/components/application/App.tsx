import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./Home";
import { AllItems } from "../staff/items/AllItems";
import { DeleteItem } from "../staff/items/DeleteItem";
import ItemDetails from "../staff/items/ItemDetails";
import { AddItem } from "../staff/items/AddItem";
import { MostSoldItems } from "../staff/items/MostSoldItems";
import { AverageCategoryPrice } from "../staff/items/AverageCategoryPrice";
import { EditItem } from "../staff/items/EditItem";
import { UserAllItems } from "../user/items/AllItems";
import { UserItemDetails } from "../user/items/ItemDetails";
import { LoginPage } from "./Login";
import { NavigationSelector } from "./NavigationSelector";
import RegisterPage from "./Register";
import ConfirmRegisterPage from "./ConfirmAccount";
import { ProfilePage } from "./UserProfile";
import MissingPage from "./MissingPage";
import UnauthorizedPage from "./UnauthorizedPage";
import { StaffMenu } from "../staff/StaffMenu";
import { EditUserRole } from "../staff/users/EditUserRole";
import { AllUserRoles } from "../staff/users/AllUserRoles";

function App() {
  return (
    <React.Fragment>
      <Router>
        <Routes>
          {/* public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/items" element={<UserAllItems />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />

          {/* any user */}
          <Route path="/confirm-account" element={<ConfirmRegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />

          {/* staff */}
          <Route path="/navigation" element={<NavigationSelector />} />
          <Route path="/items/:itemID/details" element={<UserItemDetails />} />
          <Route path="/staff/menu" element={<StaffMenu />} />
          <Route path="/staff/items" element={<AllItems />} />
          <Route
            path="/staff/items/:itemID/details"
            element={<ItemDetails />}
          />
          <Route path="/staff/items/:itemID/edit" element={<EditItem />} />
          <Route path="/staff/items/:itemID/delete" element={<DeleteItem />} />
          <Route path="/staff/items/add" element={<AddItem />} />
          <Route path="/staff/items/most-sold" element={<MostSoldItems />} />
          <Route
            path="/staff/item-categories/average-price"
            element={<AverageCategoryPrice />}
          />

          {/* admin */}
          <Route path="/admin/roles" element={<AllUserRoles />} />
          <Route
            path="/admin/roles/:userID/edit"
            element={<EditUserRole />}
          />

          {/* catch all */}
          <Route path="*" element={<MissingPage />} />
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;