import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  Container,
  IconButton,
  Tooltip,
  TextField, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { BACKEND_API_URL } from "../../constants";
import { DetailedItem } from "../../models/Item";


export const AllItems = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<DetailedItem[]>([]);

  useEffect(() => {
    setLoading(true);
    let url = `${BACKEND_API_URL}/item/?`;
    
    if (searchTerm) 
      url += `search=${searchTerm}`;
    
    if (sortOrder) 
      url += `&ordering=${sortOrder.replace("_", "")}`;

    fetch(url)
      .then((response) => response.json())
      .then((items) => {
        const categoryRequests = items.map((item: { category: any }) => {
          return fetch(`${BACKEND_API_URL}/item-category/${item.category}`)
            .then((response) => response.json())
            .then((category) => {
              return { ...item, category };
            })
            .catch((error) => {
              console.error("Error fetching category:", error);
              return { ...item, category: null };
            });
        });
        Promise.all(categoryRequests)
          .then((itemsWithCategory) => {
            setItems(itemsWithCategory);
            setLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching category:", error);
          });
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
      });
  }, [searchTerm, sortOrder]);
  

  return (
    <Container>
      <IconButton component={Link} sx={{ mr: 3 }} to={`/menu`}>
        <ArrowBackIcon />
      </IconButton>
      <h1>All Items</h1>
      <TextField
        label="Search items"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mr: 3 }}
      />
      <FormControl sx={{ minWidth: '100px' }}>
        <InputLabel id="sort-order-label">Sort by</InputLabel>
        <Select
          labelId="sort-order-label"
          id="sort-order"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <MenuItem value="">None</MenuItem>
          <MenuItem value="price">Price: Low to High</MenuItem>
          <MenuItem value="-price">Price: High to Low</MenuItem>
          <MenuItem value="discount_price">Discount Price: Low to High</MenuItem>
          <MenuItem value="-discount_price">Discount Price: High to Low</MenuItem>
        </Select>
      </FormControl>

      {loading && <CircularProgress />}
      {!loading && items.length === 0 && <p>No Items found!</p>}
      {!loading && (
              <div style={{ display: "flex" }}>
                <IconButton
                  component={Link}
                  sx={{ mr: 3, flexGrow: 1 }}
                  to={`/items/add`}
                >
                  <Tooltip title="Add a new Item" arrow>
                    <AddIcon color="primary" />
                  </Tooltip>
                </IconButton>
              </div>
      )}
      {!loading && items.length > 0 && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell align="center">Title</TableCell>
                <TableCell align="center">Category</TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell align="center">Available number</TableCell>
                <TableCell align="center">Operations</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Link
                      to={`/items/${item.id}/details`}
                      title="View item's details"
                    >
                      {item.title}
                    </Link>
                  </TableCell>
                  <TableCell align="center">
                  {item.category ? (item.category as { name: string }).name : "-"}
                    </TableCell>
                  <TableCell align="center">{item.price}</TableCell>
                  <TableCell align="center">{item.available_number}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      component={Link}
                      sx={{ mr: 3 }}
                      to={`/items/${item.id}/edit`}
                    >
                      <EditIcon />
                    </IconButton>

                    <IconButton
                      component={Link}
                      sx={{ mr: 3 }}
                      to={`/items/${item.id}/delete`}
                    >
                      <DeleteForeverIcon sx={{ color: "red" }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};
