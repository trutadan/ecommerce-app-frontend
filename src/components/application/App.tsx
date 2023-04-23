import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./Home";
import { AdminMenu } from "../admin/AdminMenu";
import { AllItems } from "../admin/items/AllItems";
import { DeleteItem } from "../admin/items/DeleteItem";
import ItemDetails from "../admin/items/ItemDetails";
import { AddItem } from "../admin/items/AddItem";
import { MostSoldItems } from "../admin/items/MostSoldItems";
import { AverageCategoryPrice } from "../admin/items/AverageCategoryPrice";
import { EditItem } from "../admin/items/EditItem";
import { UserAllItems } from "../user/items/AllItems";
import { UserItemDetails } from "../user/items/ItemDetails";

function App() {
  return (
    <React.Fragment>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/roles" element={<AdminMenu />} />
          <Route path="/menu" element={<AdminMenu />} />
          <Route path="/admin/items" element={<AllItems />} />
          <Route
            path="/admin/items/:itemID/details"
            element={<ItemDetails />}
          />
          <Route path="/admin/items/:itemID/edit" element={<EditItem />} />
          <Route path="/admin/items/:itemID/delete" element={<DeleteItem />} />
          <Route path="/admin/items/add" element={<AddItem />} />
          <Route path="/admin/items/most-sold" element={<MostSoldItems />} />
          <Route
            path="/admin/item-categories/average-price"
            element={<AverageCategoryPrice />}
          />
          <Route path="/items" element={<UserAllItems />} />
          <Route path="/items/:itemID/details" element={<UserItemDetails />} />
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
