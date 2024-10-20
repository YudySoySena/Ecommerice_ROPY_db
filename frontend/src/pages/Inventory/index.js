import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useEffect, useState } from 'react';
import CustomizedRating from '../../components/Rating/Rating';

const columns = (handleDelete) => [
  { field: 'id', headerName: 'ID', width: 70, editable: false },
  { field: 'name', headerName: 'Name', width: 200, editable: true },
  { field: 'material', headerName: 'Material', width: 130, editable: true },
  { field: 'material2', headerName: 'Material Secundario', width: 130, editable: true },
  { field: 'price', headerName: 'Price ($)', width: 100, type: 'number', editable: true },
  { field: 'discount', headerName: 'Discount (%)', width: 100, type: 'number', editable: true },
  { field: 'description', headerName: 'Description', width: 300, editable: true },
  {
    field: 'cover',
    headerName: 'Image',
    width: 120,
    renderCell: (params) => (
      <img
        src={params.value}
        alt={params.row.name}
        style={{ width: 50, height: 50, objectFit: 'cover', border: '2px solid #000' }}
      />
    ),
  },
  {
    field: 'rating',
    headerName: 'Rating',
    width: 150,
    renderCell: (params) => <CustomizedRating value={params.value || 0} />,
  },
  {
    field: 'action',
    headerName: 'Action',
    width: 150,
    renderCell: (params) => (
      <Button variant="contained" color="error" onClick={() => handleDelete(params.row.id)}>
        Delete
      </Button>
    ),
  },
];

function Inventory() {
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    material: '',
    material2: '',
    price: '',
    discount: '',
    description: '',
    cover: '',
    rating: 0,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/ProductItems');
        setRows(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/ProductItems/${id}`);
      setRows(rows.filter((row) => row.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleCreate = async () => {
    if (!imageFile) {
      alert("La imagen es obligatoria");
      return;
    }

    const formData = new FormData();
    formData.append('file', imageFile);

    try {
      const response = await axios.post('http://localhost:4000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const imageUrl = response.data.imageUrl;
      // Ahora puedes usar imageUrl para crear el nuevo producto
      const newProductData = {
        ...newProduct,
        price: parseFloat(newProduct.price),
        discount: parseFloat(newProduct.discount),
        cover: imageUrl,
      };
      

      const productResponse = await axios.post('http://localhost:4000/ProductItems', newProductData);
      setRows([...rows, productResponse.data]);
      setOpen(false);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.onerror = () => {
        console.error("Error al leer el archivo");
      };
      reader.readAsDataURL(file);
    }
  };

  const processRowUpdate = async (newRow, oldRow) => {
    try {
      await axios.put(`http://localhost:4000/ProductItems/${newRow.id}`, newRow);
      setRows(rows.map((row) => (row.id === newRow.id ? newRow : row)));
      return newRow;
    } catch (error) {
      console.error('Error actualizando fila:', error);
      return oldRow;
    }
  };

  return (
    <Paper sx={{ height: 500, width: '100%' }}>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Add New Product
      </Button>

      {/* Formulario para agregar un nuevo producto */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add New Product</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            fullWidth
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Material"
            fullWidth
            value={newProduct.material}
            onChange={(e) => setNewProduct({ ...newProduct, material: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Secondary Material"
            fullWidth
            value={newProduct.material2}
            onChange={(e) => setNewProduct({ ...newProduct, material2: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Price"
            type="number"
            fullWidth
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Discount"
            type="number"
            fullWidth
            value={newProduct.discount}
            onChange={(e) => setNewProduct({ ...newProduct, discount: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            value={newProduct.description}
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
          />

          {/* Input para subir imagen */}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ marginTop: 20, marginBottom: 20 }}
          />
          {imagePreview && (
            <div style={{ marginBottom: 20 }}>
              <img
                src={imagePreview}
                alt="Preview"
                style={{
                  width: 150,
                  height: 150,
                  border: '4px solid #000',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleCreate} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>

      <DataGrid
        rows={rows}
        columns={columns(handleDelete)}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
        processRowUpdate={processRowUpdate}
      />
    </Paper>
  );
}

export default Inventory;