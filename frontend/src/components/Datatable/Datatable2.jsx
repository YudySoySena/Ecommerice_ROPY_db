import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import axios from "axios";
import "./datatable.css";

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
      return (
        <div className="items-list">
          {params.row.items.map((item, index) => (
            <div key={index} className="item-details">
              <p>Product ID: {item.productId}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ${item.price}</p>
              <p>Discount: {item.discount}%</p>
            </div>
          ))}
        </div>
      );
    },
  },
];

const Datatable = () => {
  const [data, setData] = useState([]);

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

  const handleDelete = (orderId) => {
    setData(data.filter((order) => order.orderId !== orderId));
  };

  const processRowUpdate = async (newRow, oldRow) => {
    try {
      await axios.put(`http://localhost:4000/Orders/${newRow.orderId}`, newRow);
      setData((prev) =>
        prev.map((row) => (row.orderId === newRow.orderId ? newRow : row))
      );
      return newRow;
    } catch (error) {
      console.error("Error updating order: ", error);
      return oldRow; // Revertir en caso de error
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div className="deleteButton" onClick={() => handleDelete(params.row.orderId)}>
              Delete
            </div>
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
        processRowUpdate={processRowUpdate}
      />
    </div>
  );
};

export default Datatable;