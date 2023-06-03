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
    const fetchOrders = async () => {
      try {
        setLoading(true);
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
        const estimatedDeliveryDate = response.data.delivery_date;
        const updatedOrders = [...orders];
        updatedOrders[index].predictedDeliveryDate = estimatedDeliveryDate;
        setOrders(updatedOrders);
      })
      .catch((error) => {
        console.error("Error predicting delivery date:", error);
        // Handle the error and display an error message
        // For example, you can update the corresponding order's predictedDeliveryDate to show the error
        const updatedOrders = [...orders];
        updatedOrders[index].predictedDeliveryDate = "Error predicting date";
        setOrders(updatedOrders);
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
                  <TableCell sx={{ textAlign: "center" }}>ID</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>Order Placed Date</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>Arrival Date</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>Predicted Arrival Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order, index) => (
                  <TableRow key={order.id}>
                    <TableCell sx={{ textAlign: "center" }}>{order.id}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>{new Date(order.order_placed_date).toLocaleDateString()}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {order.received ? (
                        new Date(order.received_date).toLocaleDateString()
                      ) : (
                        <button
                          onClick={() => handlePredictDate(order.id, index)}
                          disabled={order.received}
                        >
                          Predict Arrival Date
                        </button>
                      )}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {order.predictedDeliveryDate ? new Date(order.predictedDeliveryDate).toLocaleDateString() : "-"}
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
