import { DataGrid } from "@mui/x-data-grid";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";

const Datatable = () => {
  const [data, setData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Maneja abrir el diálogo con detalles
  const handleOpenDialog = (order) => {
    setSelectedOrder(order);
    setOpenDialog(true);
  };

  // Columnas para la tabla de DataGrid
  const orderColumns = [
    { field: "orderId", headerName: "Order ID", width: 150 },
    { field: "userId", headerName: "User ID", width: 150 },
    { field: "total", headerName: "Total", width: 120 },
    { field: "status", headerName: "Status", width: 150 },
    { field: "orderDate", headerName: "Order Date", width: 180 },
    { field: "deliveryDate", headerName: "Delivery Date", width: 180 },
    { field: "shippingAddress", headerName: "Shipping Address", width: 200 },
    {
      field: "items",
      headerName: "Items",
      width: 400,
      renderCell: (params) => {
        const { items } = params.row;
        const maxItems = 2;
        return (
          <div className="items-list">
            {items.slice(0, maxItems).map((item, index) => (
              <div key={index} className="item-details">
                <p>Product ID: {item.productId}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
            ))}
            {items.length > maxItems && (
              <Button onClick={() => handleOpenDialog(params.row)}>Ver más</Button>
            )}
          </div>
        );
      },
    },
  ];

  // Llamada al backend para obtener los datos
  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:8081/api/orders/allorders");

            // Convierte items a un arreglo para cada orden
            const processedData = response.data.map(order => ({
                ...order,
                items: JSON.parse(order.items || '[]') // Asegúrate de que items no sea null
            }));

            setData(processedData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    fetchData();
}, []);

  // Maneja cerrar el diálogo
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedOrder(null);
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
        <div style={{ display: "flex", gap: "8px" }}>
          <Button
            variant="outlined"
            color="error"
            onClick={() => handleOpenDialog(params.row)}
          >
            Detalles
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">Orders</div>
      <DataGrid
        className="datagrid"
        rows={data}
        getRowId={(row) => row.orderId}
        columns={orderColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        experimentalFeatures={{ newEditingApi: true }}
      />

      {/* Diálogo para mostrar detalles de la orden */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>Order Details</DialogTitle>
        <DialogContent>
          {selectedOrder && (
            <div>
              <p>
                <strong>Order ID:</strong> {selectedOrder.orderId}
              </p>
              <p>
                <strong>User ID:</strong> {selectedOrder.userId}
              </p>
              <p>
                <strong>Total:</strong> ${selectedOrder.total}
              </p>
              <p>
                <strong>Status:</strong> {selectedOrder.status}
              </p>
              <p>
                <strong>Order Date:</strong> {selectedOrder.orderDate}
              </p>
              <p>
                <strong>Delivery Date:</strong> {selectedOrder.deliveryDate || "N/A"}
              </p>
              <p>
                <strong>Shipping Address:</strong> {selectedOrder.shippingAddress}
              </p>

              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Product ID</TableCell>
                      <TableCell align="right">Quantity</TableCell>
                      <TableCell align="right">Price</TableCell>
                      <TableCell align="right">Discount</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedOrder.items.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.productId}</TableCell>
                        <TableCell align="right">{item.quantity}</TableCell>
                        <TableCell align="right">${item.price}</TableCell>
                        <TableCell align="right">{item.discount}%</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Datatable;