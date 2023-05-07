import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import {
  Container,
  Card,
  CardContent,
  IconButton,
  CardActions,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { DetailedItem } from "../../../models/Item";
import { BACKEND_API_URL } from "../../../constants";

const ItemDetails = () => {
  const { itemID } = useParams<{ itemID: string }>();
  const [item, setItem] = useState<DetailedItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`${BACKEND_API_URL}/item/${itemID}`);
        const item = response.data;
        setItem(item);
        setLoading(false);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "An unknown error occurred";
        setError(errorMessage);
        setLoading(false);
      }
    };
    fetchItem();
  }, [itemID]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Container maxWidth="sm">
      <Card>
        <CardContent>
          <IconButton component={Link} sx={{ mr: 3 }} to={`/items`}>
            <ArrowBackIcon />
          </IconButton>{" "}
          <Typography variant="h4" gutterBottom>
            {item?.title}
          </Typography>
          <Typography
            variant="subtitle1"
            gutterBottom
            sx={{ color: "grey.500" }}
          >
            Description
          </Typography>
          <Typography variant="body1" gutterBottom>
            {item?.description}
          </Typography>
          <Typography variant="body1" gutterBottom sx={{ color: "grey.500" }}>
            Price
          </Typography>
          <Typography variant="body1" gutterBottom>
            {item?.price}
          </Typography>
          <Typography variant="body1" gutterBottom sx={{ color: "grey.500" }}>
            Discount Price
          </Typography>
          <Typography variant="body1" gutterBottom>
            {item?.discount_price ? item.discount_price : "-"}
          </Typography>
          <Typography variant="body1" gutterBottom sx={{ color: "grey.500" }}>
            Available Number
          </Typography>
          <Typography variant="body1" gutterBottom>
            {item?.available_number}
          </Typography>
          <Typography variant="body1" gutterBottom sx={{ color: "grey.500" }}>
            Total Number
          </Typography>
          <Typography variant="body1" gutterBottom>
            {item?.total_number}
          </Typography>
          <Typography
            variant="subtitle1"
            gutterBottom
            sx={{ color: "grey.500" }}
          >
            Item Carts
          </Typography>
          {item?.item_carts?.length ? (
            item.item_carts.map((cart) => (
              <div key={cart.user}>
                <Typography variant="body1">
                  {cart.user} for {cart.quantity} piece(s)
                </Typography>
              </div>
            ))
          ) : (
            <Typography variant="body1">-</Typography>
          )}
          <Typography
            variant="subtitle1"
            gutterBottom
            sx={{ color: "grey.500" }}
          >
            Item Orders
          </Typography>
          {item?.item_orders?.length ? (
            item.item_orders.map((order) => (
              <div key={order.user}>
                <Typography variant="body1">
                  {order.user} for {order.quantity} piece(s)
                </Typography>
              </div>
            ))
          ) : (
            <Typography variant="body1">-</Typography>
          )}
          <Typography variant="body1" gutterBottom sx={{ color: "grey.500" }}>
            Picture
          </Typography>
          <Typography variant="body1" gutterBottom>
            {item?.picture ? item.picture : "-"}
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton
            component={Link}
            sx={{ mr: 3 }}
            to={`/items/${itemID}/edit`}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            component={Link}
            sx={{ mr: 3 }}
            to={`/items/${itemID}/delete`}
          >
            <DeleteForeverIcon sx={{ color: "red" }} />
          </IconButton>
        </CardActions>
      </Card>
    </Container>
  );
};

export default ItemDetails;
