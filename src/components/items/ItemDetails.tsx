import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import {
  Container,
  Card,
  CardContent,
  IconButton,
  CardActions,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Item } from "../../models/Item";
import { BACKEND_API_URL } from "../../constants";

const ItemDetails = () => {
  const { itemID } = useParams<{ itemID: string }>();
  const [item, setItem] = useState<Item | null>(null);
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
    <Container>
      <Card>
        <CardContent>
          <IconButton component={Link} sx={{ mr: 3 }} to={`/items`}>
            <ArrowBackIcon />
          </IconButton>{" "}
          <h1>Item's Details</h1>
          <p>Item's orders count: {item?.orders_count}</p>
          <p>Item's refunds requested count: {item?.refunds_requested_count}</p>
          <p>Item's title: {item?.title}</p>
          <p>Item's price: {item?.description}</p>
          <p>Item's discount price: {item?.discount_price}</p>
          <p>Item's available number: {item?.available_number}</p>
          <p>Item's total number: {item?.total_number}</p>
          <p>Item's description: {item?.description}</p>
          <p>Item's picture: {item?.picture}</p>
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
