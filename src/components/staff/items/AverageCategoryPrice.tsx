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
import { BACKEND_API_URL } from "../../../constants";
import { AverageCategoryPriceDTO } from "../../../models/AverageCategoryPrice";

export const AverageCategoryPrice = () => {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<AverageCategoryPriceDTO[]>([]);

  useEffect(() => {
    setLoading(true);
    fetch(`${BACKEND_API_URL}/item-category/average-price`)
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
      <h1>Average Category Price</h1>
      {loading && <CircularProgress />}
      {!loading && items.length === 0 && <p>No Items found!</p>}
      {!loading && items.length > 0 && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Average Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell align="center" component="th" scope="row">
                    {item.name}
                  </TableCell>
                  <TableCell align="center">{item.average_price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};
