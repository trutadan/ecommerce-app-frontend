import React, { useEffect, useState } from "react";
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
import { BACKEND_API_URL } from "../../../constants";
import axios from "axios";
import { Order } from "../../../models/Order";
import Pagination from "@mui/material/Pagination";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";

interface ExtendedOrder extends Order {
  predictedDeliveryDate?: string;
}

export const AllOrders = () => {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<ExtendedOrder[]>([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const pageSize = 10;

  useEffect(() => {
    setLoading(true);
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${BACKEND_API_URL}/order/`, {
          params: {
            limit: pageSize,
            offset: (page - 1) * pageSize,
          },
          withCredentials: true,
        });
        setOrders(response.data.results);
        setTotalCount(response.data.count);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [page]);

  const handlePredictDate = (orderId: number, index: number) => {
    // Send a request to the backend API to predict the arrival date
    axios
      .get(`${BACKEND_API_URL}/predict-delivery-date/${orderId}/`, {
        withCredentials: true,
      })
      .then((response) => {
        // Process the response from the prediction endpoint
        const estimatedDeliveryDate = response.data;
        const updatedOrders = [...orders];
        updatedOrders[index].predictedDeliveryDate = estimatedDeliveryDate;
        setOrders(updatedOrders);
      })
      .catch((error) => {
        console.error("Error predicting delivery date:", error);
      });
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  return (
    <Container>
      <IconButton component={Link} sx={{ mr: 3 }} to={`/menu`}>
        <ArrowBackIcon />
      </IconButton>
      <h1>All Orders</h1>

      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Ordered Date</TableCell>
                  <TableCell>Predict Arrival Date</TableCell>
                  <TableCell>Predicted Arrival Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order, index) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.ordered_date}</TableCell>
                    <TableCell>
                      <button
                        onClick={() => handlePredictDate(order.id, index)}
                        disabled={order.being_delivered || order.received}
                      >
                        Predict Arrival Date
                      </button>
                    </TableCell>
                    <TableCell>
                      {order.predictedDeliveryDate
                        ? order.predictedDeliveryDate
                        : "-"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Pagination
            count={Math.ceil(totalCount / pageSize)}
            page={page}
            onChange={handlePageChange}
          />
        </>
      )}
    </Container>
  );
};
