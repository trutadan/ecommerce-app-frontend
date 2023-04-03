import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Card,
  CardContent,
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { BACKEND_API_URL } from "../../constants";
import { Item } from "../../models/Item";

export const EditItem = () => {
  const { itemID } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState<Item>({
    id: 0,
    orders_count: "",
    refunds_requested_count: "",
    title: "",
    price: 0,
    discount_price: undefined,
    available_number: 0,
    total_number: 0,
    description: "",
    picture: undefined,
    category: { id: 0, name: "", subcategory: undefined },
  });

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`${BACKEND_API_URL}/items/${itemID}`);
        setItem(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchItem();
  }, [itemID]);

  const updateItem = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    try {
      await axios.put(`${BACKEND_API_URL}/items/${itemID}`, item);
      navigate("/items");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Card>
        <CardContent>
          <IconButton component={Link} to={`/items/${itemID}`}>
            <ArrowBackIcon />
          </IconButton>{" "}
          <form onSubmit={updateItem}>
            <TextField
              id="title"
              label="Title"
              variant="outlined"
              fullWidth
              value={item.title}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setItem({ ...item, title: event.target.value })
              }
            />
            <TextField
              id="price"
              label="Price"
              variant="outlined"
              fullWidth
              type="number"
              value={item.price}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setItem({ ...item, price: parseFloat(event.target.value) })
              }
            />
            <TextField
              id="discount_price"
              label="Discount Price (optional)"
              variant="outlined"
              fullWidth
              type="number"
              value={item.discount_price || ""}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setItem({
                  ...item,
                  discount_price: parseFloat(event.target.value) || undefined,
                })
              }
            />
            <TextField
              id="description"
              label="Description"
              variant="outlined"
              fullWidth
              multiline
              value={item.description}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setItem({ ...item, description: event.target.value })
              }
            />
            <TextField
              id="category_name"
              label="Category Name"
              variant="outlined"
              fullWidth
              value={item.category.name}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setItem({
                  ...item,
                  category: {
                    ...item.category,
                    name: event.target.value,
                  },
                })
              }
            />
            <TextField
              id="category_subcategory"
              label="Category Subcategory (optional)"
              variant="outlined"
              fullWidth
              value={item.category.subcategory || ""}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setItem({
                  ...item,
                  category: {
                    ...item.category,
                    subcategory: event.target.value || undefined,
                  },
                })
              }
            />
            <Button type="submit">Update Item</Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};
