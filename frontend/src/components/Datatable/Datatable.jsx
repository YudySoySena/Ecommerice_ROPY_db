import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "../newUser/New";
import "./datatable.css";

const userColumns = [
  { field: "id", headerName: "ID", width: 90, editable: false },
  { field: "Nombre", headerName: "Nombre", width: 150, editable: true },
  { field: "Email", headerName: "Email", width: 200, editable: true },
  { field: "Status", headerName: "Status", width: 120, editable: true },
  { field: "Rol", headerName: "Rol", width: 150, editable: true },
];

const Datatable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/Users");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const processRowUpdate = async (newRow, oldRow) => {
    try {
      await axios.put(`http://localhost:4000/Users/${newRow.id}`, newRow);
      setData((prev) =>
        prev.map((row) => (row.id === newRow.id ? newRow : row))
      );
      return newRow;
    } catch (error) {
      console.error("Error updating user: ", error);
      return oldRow; // Revertir en caso de error
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={`/users/${params.row.id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">View</div>
            </Link>
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
        experimentalFeatures={{ newEditingApi: true}}
      />
    </div>
  );
};

export default Datatable;
