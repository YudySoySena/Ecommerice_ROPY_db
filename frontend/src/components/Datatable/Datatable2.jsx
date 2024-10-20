import { DataGrid } from "@mui/x-data-grid";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";

const Datatable = () => {
  const [data, setData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleOpenDialog = (order) => {
    setSelectedOrder(order);
    setOpenDialog(true);
  };

  const orderColumns = [
    { field: "orderId", headerName: "Order ID", width: 150, editable: false },
    { field: "userId", headerName: "User ID", width: 150, editable: false },
    { field: "total", headerName: "Total", width: 120, editable: false },
    { field: "status", headerName: "Status", width: 150, editable: true },
    { field: "orderDate", headerName: "Order Date", width: 180, editable: false },
    { field: "deliveryDate", headerName: "Delivery Date", width: 180, editable: true },
    { field: "shippingAddress", headerName: "Shipping Address", width: 200, editable: true },
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
      }
    }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/Orders");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, []);

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedOrder(null);
  };

  const handleOtherAction = (order) => {
    console.log("Acción adicional para la orden:", order);
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="cellAction" style={{ display: "flex", gap: "8px" }}>
            <Button variant="outlined" color="error" onClick={() => handleOpenDialog(params.row)}>
              Error
            </Button>
            <Button variant="outlined" color="primary" onClick={() => handleOtherAction(params.row)}>
              Acción
            </Button>
          </div>
        );
      },
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

      {/* Dialog para mostrar detalles de la orden */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>Order Details</DialogTitle>
        <DialogContent>
          {selectedOrder && (
            <div>
              <p><strong>Order ID:</strong> {selectedOrder.orderId}</p>
              <p><strong>User ID:</strong> {selectedOrder.userId}</p>
              <p><strong>Total:</strong> ${selectedOrder.total}</p>
              <p><strong>Status:</strong> {selectedOrder.status}</p>
              <p><strong>Order Date:</strong> {selectedOrder.orderDate}</p>
              <p><strong>Delivery Date:</strong> {selectedOrder.deliveryDate || 'N/A'}</p>
              <p><strong>Shipping Address:</strong> {selectedOrder.shippingAddress}</p>
              
              {/* Tabla para mostrar los productos en el pedido */}
              <TableContainer component={Paper}>
                <Table aria-label="order items">
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
          <Button onClick={handleCloseDialog} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Datatable;