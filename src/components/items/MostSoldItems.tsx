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
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { MostSoldItemsDTO } from "../../models/MostSoldItems";
import { BACKEND_API_URL } from "../../constants";

export const MostSoldItems = () => {
  const [loading, setLoading] = useState(false);
  const [mostSoldItems, setMostSoldItems] = useState<MostSoldItemsDTO[]>([]);

  useEffect(() => {
    setLoading(true);
    fetch(`${BACKEND_API_URL}/item/most-sold`)
      .then((response) => response.json())
      .then((data) => {
        setMostSoldItems(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <Container>
      <h1>Most Sold Items</h1>

      {loading && <CircularProgress />}
      {!loading && mostSoldItems.length === 0 && <p>No items found!</p>}
      {!loading && mostSoldItems.length > 0 && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell align="right">Title</TableCell>
                <TableCell align="right">Total Pieces Sold</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mostSoldItems.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell align="right">{item.title}</TableCell>
                  <TableCell align="right">{item.total_pieces_sold}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};
