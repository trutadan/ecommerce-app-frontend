import "../styles.css";
import {
  Container,
  TextField,
  Button,
  IconButton,
  Autocomplete,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { BACKEND_API_URL } from "../../../constants";
import { DetailedItem } from "../../../models/Item";
import { DetailedItemCategory } from "../../../models/ItemCategory";
import { debounce } from "lodash";
import { ToastContainer, toast } from "react-toastify";

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
    category: null,
  });

  const [originalCategory, setOriginalCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<DetailedItemCategory[]>([]);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get<DetailedItem>(
          `${BACKEND_API_URL}/item/${itemId}`
        );
        setItem(response.data);
        setOriginalCategory(response.data.category);
      } catch (error) {
        console.log(error);
      }
    };
    fetchItem();
  }, [itemId]);

  const editItem = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (item.price <= 0) {
        throw new Error("Price must be greater than 0!");
      }
      if (item.discount_price && item.discount_price < 0) {
        throw new Error("Discount price must be greater than 0!");
      }
      if (item.discount_price && item.discount_price > item.price) {
        throw new Error(
          "Discount price can't be greater than the regular price!"
        );
      }
      if (item.available_number < 0) {
        throw new Error("Available Number must be greater than 0!");
      }
      if (item.total_number < 0) {
        throw new Error("Total Number must be greater than 0!");
      }
      if (item.available_number > item.total_number) {
        throw new Error(
          "Available number of items can't be greater than total number!"
        );
      }

      const response = await axios.put(
        `${BACKEND_API_URL}/item/${itemId}/`,
        item
      );
      if (response.status < 200 || response.status >= 300) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      navigate("/items");
    } catch (error) {
      toast.error((error as { message: string }).message);
      console.log(error);
    }
  };

  const fetchSuggestions = async (query: string) => {
    try {
      const response = await axios.get<DetailedItemCategory[]>(
        `${BACKEND_API_URL}/item-category/autocomplete?query=${query}`
      );
      const data = await response.data;
      setCategories(data);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const debouncedFetchSuggestions = useCallback(
    debounce(fetchSuggestions, 500),
    []
  );

  useEffect(() => {
    return () => {
      debouncedFetchSuggestions.cancel();
    };
  }, [debouncedFetchSuggestions]);
  const handleInputChange = (event: any, value: any, reason: any) => {
    console.log("input", value, reason);
    if (reason === "input") {
      debouncedFetchSuggestions(value);
    }
  };

  const handleCategoryChange = (event: any, value: any) => {
    if (value) {
      console.log(value);
      setItem({ ...item, category: value.id });
    } else {
      console.log(value);
      setItem({ ...item, category: originalCategory });
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
        <Autocomplete
          id="category"
          options={categories}
          getOptionLabel={(option) => `${option.name} - ${option.subcategory}`}
          renderInput={(params) => (
            <TextField {...params} label="Category" variant="outlined" />
          )}
          filterOptions={(x) => x}
          onInputChange={handleInputChange}
          onChange={handleCategoryChange}
          value={categories.find((c) => c.id === item.category)}
          classes={{ listbox: "options-container" }}
        />

        <ToastContainer />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 3, mb: 3 }}
        >
          Edit Item
        </Button>
      </form>
    </Container>
  );
};
