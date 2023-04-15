import { Container, TextField, Button, MenuItem, IconButton, Autocomplete} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { BACKEND_API_URL } from "../../constants";
import { Item } from "../../models/Item";
import { DetailedItemCategory } from "../../models/ItemCategory";
import { debounce } from "lodash";


export const AddItem = () => {
  const navigate = useNavigate();
  const [item, setItem] = useState<Item>({
    title: "",
    price: 0,
    discount_price: undefined,
    available_number: 0,
    total_number: 0,
    description: "",
    picture: undefined,
    category: 0,
  });

  const addItem = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await axios.post(`${BACKEND_API_URL}/item/`, item);
      navigate("/items");
    } catch (error) {
      console.log(error);
    }
  };

  const [categories, setCategories] = useState<DetailedItemCategory[]>([]);
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

	const debouncedFetchSuggestions = useCallback(debounce(fetchSuggestions, 500), []);

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

  return (
    <Container>
      <IconButton component={Link} sx={{ mr: 3 }} to={`/items`}>
        <ArrowBackIcon />
      </IconButton>{" "}
      <h1>Add Item</h1>
      <form onSubmit={addItem}>
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
							renderInput={(params) => <TextField {...params} label="Category" variant="outlined" />}
							filterOptions={(x) => x}
							onInputChange={handleInputChange}
							onChange={(event, value) => {
								if (value) {
									console.log(value);
									setItem({ ...item, category: value.id });
								}
							}}
						/>

        <Button type="submit" variant="contained" color="primary">
          Add Item
        </Button>
      </form>
    </Container>
  );
};
