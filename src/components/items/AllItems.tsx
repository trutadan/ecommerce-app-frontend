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
} from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import { Item } from "../../models/Item";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";

export const AllItems = () => {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    setLoading(true);
    fetch(`${BACKEND_API_URL}/item`)
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <Container>
      <h1>All Items</h1>

      {loading && <CircularProgress />}
      {!loading && items.length === 0 && <p>No Items found!</p>}
      {!loading && (
        <IconButton component={Link} sx={{ mr: 3 }} to={`/items/add`}>
          <Tooltip title="Add a new Item" arrow>
            <AddIcon color="primary" />
          </Tooltip>
        </IconButton>
      )}
      {!loading && items.length > 0 && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell align="right">Title</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Discount Price</TableCell>
                <TableCell align="right">Available number</TableCell>
                <TableCell align="right">Total number</TableCell>
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
                  <TableCell align="right">{item.price}</TableCell>
                  <TableCell align="right">{item.discount_price}</TableCell>
                  <TableCell align="right">{item.available_number}</TableCell>
                  <TableCell align="right">{item.total_number}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      component={Link}
                      sx={{ mr: 3 }}
                      to={`/items/${item.id}/details`}
                    >
                      <Tooltip title="View item's details" arrow>
                        <ReadMoreIcon color="primary" />
                      </Tooltip>
                    </IconButton>

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
