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
} from "@mui/material";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React, { useEffect, useState } from "react";
import { BACKEND_API_URL } from "../../constants";
import { AverageAvailableItemsDTO } from "../../models/AverageAvailableItemsDTO";

export const AverageAvailableItems = () => {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<AverageAvailableItemsDTO[]>([]);

  useEffect(() => {
    setLoading(true);
    fetch(`${BACKEND_API_URL}/item/average-available-number`)
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
      <IconButton component={Link} sx={{ mr: 3 }} to={`/menu`}>
        <ArrowBackIcon />
      </IconButton>{" "}
      <h1>Average Available Items</h1>
      {loading && <CircularProgress />}
      {!loading && items.length === 0 && <p>No Items found!</p>}
      {!loading && items.length > 0 && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell align="right">Title</TableCell>
                <TableCell align="right">Average Quantity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {item.title}
                  </TableCell>
                  <TableCell align="right">{item.average_quantity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};
