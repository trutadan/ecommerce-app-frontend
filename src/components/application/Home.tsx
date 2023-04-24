import React, { useEffect, useState } from "react";
import "./Home.css";
import { NavigationBar } from "../user/NavigationBar";
import { BACKEND_API_URL } from "../../constants";
import { MostSoldItemsDTO } from "../../models/MostSoldItems";
import {
  Box,
  CircularProgress,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { DetailedItem } from "../../models/Item";
import { handleAddItemToCart } from "../user/items/AddItemToCart";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import image_missing from "../../assets/images/image_missing.png";

export const Home = () => {
  const [loading, setLoading] = useState(false);
  const [mostSoldItems, setMostSoldItems] = useState<MostSoldItemsDTO[]>([]);
  const [items, setItems] = useState<DetailedItem[]>([]);

  useEffect(() => {
    setLoading(true);
    fetch(
      `${BACKEND_API_URL}/item/most-sold/?ordering=-total_pieces_sold&limit=6&offset=6`
    )
      .then((response) => response.json())
      .then((data) => {
        setMostSoldItems(data.results);
        setLoading(false);
        const itemDetailsPromises = data.results.map((item: MostSoldItemsDTO) =>
          fetch(`${BACKEND_API_URL}/item/${item.id}/`).then((response) =>
            response.json()
          )
        );
        Promise.all(itemDetailsPromises).then((itemDetails) => {
          const updatedMostSoldItems = data.results.map(
            (item: DetailedItem, index: number) => {
              const itemDetail = itemDetails[index];
              return itemDetail;
            }
          );
          setItems(updatedMostSoldItems);
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <>
      <NavigationBar />
      <div className="container">
        <h1>Welcome to GymDiction!</h1>
        <p>
          Whether you're looking to bulk up, slim down, or just maintain a
          healthy lifestyle, we have everything you need to reach your fitness
          goals.
        </p>
        <p>The most popular items</p>
        {loading && <CircularProgress />}
        {!loading && mostSoldItems.length === 0 && <p>No items found!</p>}
        {!loading && mostSoldItems.length > 0 && (
          <Grid container spacing={3}>
            {items.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <Box
                  sx={{
                    height: "300px",
                    width: "450px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    border: "1px solid #ccc",
                    borderRadius: "10px",
                    padding: "10px",
                  }}
                >
                  <Link to={`/items/${item.id}/details`}>
                    <img
                      src={item.picture ? item.picture : image_missing}
                      alt={"No image"}
                    />
                    <Typography variant="h6">{item.title}</Typography>
                  </Link>
                  <Typography variant="subtitle1">
                    {item.category.name}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="h6">
                      ${item.discount_price ? item.discount_price : item.price}
                    </Typography>
                    <IconButton
                      aria-label="Add to cart"
                      sx={{ ml: 10 }}
                      onClick={() => handleAddItemToCart(item)}
                    >
                      <AddShoppingCartIcon style={{ fontSize: 35 }} />
                    </IconButton>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        )}
      </div>
    </>
  );
};
