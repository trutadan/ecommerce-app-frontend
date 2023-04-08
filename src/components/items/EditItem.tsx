import {
  Container,
  TextField,
  Button,
  MenuItem,
  IconButton,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { BACKEND_API_URL } from "../../constants";
import { DetailedItem } from "../../models/Item";
import { DetailedItemCategory } from "../../models/ItemCategory";


export const EditItem = () => {
  const navigate = useNavigate();
  const { itemID: itemId } = useParams<{ itemID: string }>();
  const [item, setItem] = useState<DetailedItem>({
    id: 0,
    title: "",
    price: 0,
    discount_price: undefined,
    available_number: 0,
    total_number: 0,
    description: "",
    picture: undefined,
    category: 0,
  });

  const [categories, setCategories] = useState<DetailedItemCategory[]>([]);
  useEffect(() => {
    axios
      .get<DetailedItemCategory[]>(`${BACKEND_API_URL}/item-category/`)
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get<DetailedItem>(`${BACKEND_API_URL}/item/${itemId}`)
      .then((response) => {
        setItem(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [itemId]);

  const editItem = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(item);
    try {
      await axios.put(`${BACKEND_API_URL}/item/${itemId}/`, item);
      navigate("/items");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <IconButton component={Link} sx={{ mr: 3 }} to={`/items`}>
        <ArrowBackIcon />
      </IconButton>{" "}
      <h1>Edit Item</h1>
      <form onSubmit={editItem}>
        <TextField
          label="Title"
          value={item.title}
          onChange={(e) => setItem({ ...item, title: e.target.value })}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Price"
          type="number"
          value={item.price}
          onChange={(e) =>
            setItem({ ...item, price: parseFloat(e.target.value) })
          }
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Discount price"
          type="number"
          value={item.discount_price}
          onChange={(e) =>
            setItem({ ...item, discount_price: parseFloat(e.target.value) })
          }
          fullWidth
          margin="normal"
        />
        <TextField
          label="Available Number"
          type="number"
          value={item.available_number}
          onChange={(e) =>
            setItem({ ...item, available_number: parseFloat(e.target.value) })
          }
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Total Number"
          type="number"
          value={item.total_number}
          onChange={(e) =>
            setItem({ ...item, total_number: parseFloat(e.target.value) })
          }
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          multiline
          value={item.description}
          onChange={(e) => setItem({ ...item, description: e.target.value })}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Picture"
          multiline
          value={item.picture}
          onChange={(e) => setItem({ ...item, picture: e.target.value })}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Category"
          select
          value={item.category}
          onChange={(e) =>
            setItem({
              ...item,
              category: parseInt(e.target.value),
            })
          }
          required
          fullWidth
          margin="normal"
        >
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </TextField>
        <Button sx={{ mb: 3 }} type="submit" variant="contained" color="primary">
          Update Item
        </Button>
      </form>
    </Container>
  );
  
};
