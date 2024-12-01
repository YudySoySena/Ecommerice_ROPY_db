import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import "../new/New";
import "./datatable.css";

const userColumns = [
    { field: "id", headerName: "ID", width: 90, editable: false },
    { field: "Nombre", headerName: "Nombre", width: 150, editable: true },
    { field: "Email", headerName: "Email", width: 200, editable: true },
    { field: "Status", headerName: "Status", width: 120, editable: true },
    { field: "Rol", headerName: "Rol", width: 150, editable: true },
    { field: "Direccion", headerName: "Direccion", width: 200, editable: true },
    { field: "Telefono", headerName: "Telefono", width: 150, editable: true },  
];

const Datatable = () => {
  const [data, setData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8081/api/users/allUsers");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/api/users/users/${id}`);
      setData(data.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting user: ", error);
    }
  };  
  

  const processRowUpdate = async (newRow, oldRow) => {
    try {
      console.log('Intentando actualizar usuario:', newRow);
      const response = await axios.put(
        `http://localhost:8081/api/users/users/${newRow.id}`,
        newRow
      );
      setData((prev) =>
        prev.map((row) => (row.id === newRow.id ? newRow : row))
      );
      return newRow;
    } catch (error) {
      console.error("Error al actualizar el usuario: ", error);
      return oldRow; // Revertir en caso de error
    }
  };  

  const handleOpenDialog = (user) => {
    setSelectedUser(user);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedUser(null);
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Button
              variant="outlined"
              color="error"
              onClick={() => handleOpenDialog(params.row)}
            >
              Details
            </Button>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New User
        <Link to="/newUser" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        experimentalFeatures={{ newEditingApi: true }}
        processRowUpdate={processRowUpdate}
      />
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>User Details</DialogTitle>
        <DialogContent>
          {selectedUser && (
            <div>
              <p>
                <strong>ID: </strong> {selectedUser.id}
              </p>
              <p>
                <strong>Nombre: </strong> {selectedUser.Nombre}
              </p>
              <p>
                <strong>Email: </strong> {selectedUser.Email}
              </p>
              <p>
                <strong>Status: </strong> {selectedUser.Status}
              </p>
              <p>
                <strong>Rol: </strong> {selectedUser.Rol}
              </p>
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