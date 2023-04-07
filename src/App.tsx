import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppHome } from "./components/app/AppHome";
import { AppMenu } from "./components/app/AppMenu";
import { AllItems } from "./components/items/AllItems";
import { DeleteItem } from "./components/items/DeleteItem";
import ItemDetails from "./components/items/ItemDetails";
import { AddItem } from "./components/items/AddItem";
import { MostSoldItems } from "./components/items/MostSoldItems";
import { AverageAvailableItems } from "./components/items/AverageAvailableItems";
import { EditItem } from "./components/items/EditItem";

function App() {
  return (
    <React.Fragment>
      <Router>
        <Routes>
          <Route path="/" element={<AppHome />} />
          <Route path="/menu" element={<AppMenu />} />
          <Route path="/items" element={<AllItems />} />
          <Route path="/items/:itemID/details" element={<ItemDetails />} />
          <Route path="/items/:itemID/edit" element={<EditItem />} />
          <Route path="/items/:itemID/delete" element={<DeleteItem />} />
          <Route path="/items/add" element={<AddItem />} />
          <Route path="/items/most-sold" element={<MostSoldItems />} />
          <Route
            path="/items/average-available"
            element={<AverageAvailableItems />}
          />
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
