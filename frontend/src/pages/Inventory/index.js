import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useEffect, useState } from "react";
import CustomizedRating from "../../components/Rating/Rating";

const columns = (handleDelete) => [
  { field: "id", headerName: "ID", width: 70, editable: false },
  { field: "name", headerName: "Name", width: 200, editable: true },
  { field: "material", headerName: "Material", width: 130, editable: true },
  {
    field: "material2",
    headerName: "Material Secundario",
    width: 130,
    editable: true,
  },
  {
    field: "price",
    headerName: "Price ($)",
    width: 100,
    type: "number",
    editable: true,
  },
  {
    field: "description",
    headerName: "Description",
    width: 300,
    editable: true,
  },
  {
    field: "stock",
    headerName: "Stock",
    width: 100,
    type: "number",
    editable: true,
  },
  {
    field: "cover",
    headerName: "Image",
    width: 120,
    renderCell: (params) => (
      <img
        src={params.value}
        alt={params.row.name}
        style={{
          width: 50,
          height: 50,
          objectFit: "cover",
          border: "2px solid #000",
        }}
      />
    ),
  },
  {
    field: "rating",
    headerName: "Rating",
    width: 150,
    renderCell: (params) => <CustomizedRating value={params.value || 0} />,
  },
  {
    field: "action",
    headerName: "Action",
    width: 150,
    renderCell: (params) => (
      <Button
        variant="contained"
        color="error"
        onClick={() => handleDelete(params.row.id)}
      >
        Delete
      </Button>
    ),
  },
];

function Inventory() {
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    material: "",
    material2: "",
    price: "",
    description: "",
    stock: "",
    rating: 0,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8081/api/products/allproduct"
        );
        setRows(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8081/api/products/productos${id}`
      );
      console.log("Respuesta de eliminación:", response.data);
      setRows(rows.filter((row) => row.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const processRowUpdate = async (newRow, oldRow) => {
    try {
      const response = await axios.put(
        `http://localhost:8081/api/products/productos${newRow.id}`,
        newRow
      );
      setRows((prev) =>
        prev.map((row) => (row.id === newRow.id ? newRow : row))
      );
      return newRow;
    } catch (error) {
      console.error("Error updating product:", error);
      return oldRow; // Revertir en caso de error
    }
  };

  const handleCreate = async () => {
    if (!imageFile) {
      alert("La imagen es obligatoria");
      return;
    }

    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("name", newProduct.name);
    formData.append("material", newProduct.material);
    formData.append("material2", newProduct.material2);
    formData.append("price", parseFloat(newProduct.price));
    formData.append("description", newProduct.description);
    formData.append("stock", parseInt(newProduct.stock));
    formData.append("rating", newProduct.rating);

    try {
      const response = await axios.post(
        "http://localhost:8081/api/products/newProduct",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setRows([...rows, response.data]);
      setOpen(false);
    } catch (error) {
      console.error("Error creando producto:", error);
    }
  };

  /*
  const createProduct = async (productData) => { try { const response = await axios.post('http://localhost:8081/api/products', productData); console.log('Product created successfully:', response.data); } catch (error) { console.error('Error creating product:', error); } }; // Ejemplo de datos de producto const productData = { name: 'Nuevo Producto', price: 100, description: 'Descripción del producto', // Asegúrate de incluir todos los campos necesarios */
  return (
    <Paper sx={{ height: 400, width: "100%" }}>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Add New Product
      </Button>
      <DataGrid
        rows={rows}
        columns={columns(handleDelete)}
        pageSize={5}
        rowsPerPageOptions={[5]}
        processRowUpdate={processRowUpdate}
      />

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add New Product</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Material"
            value={newProduct.material}
            onChange={(e) =>
              setNewProduct({ ...newProduct, material: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Material 2"
            value={newProduct.material2}
            onChange={(e) =>
              setNewProduct({ ...newProduct, material2: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Price"
            type="number"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Stock"
            type="number"
            value={newProduct.stock}
            onChange={(e) =>
              setNewProduct({ ...newProduct, stock: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <input
            type="file"
            onChange={(e) => {
              const file = e.target.files[0];
              setImageFile(file);
              setImagePreview(URL.createObjectURL(file));
            }}
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              style={{ width: 100, height: 100, objectFit: "cover" }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCreate} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}

export default Inventory;
