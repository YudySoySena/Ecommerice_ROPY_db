import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { useEffect, useState } from 'react';
import CustomizedRating from '../../components/Rating/Rating'; // Importar el componente de rating

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'material', headerName: 'Material', width: 130 },
  { field: 'material2', headerName: 'Material Secundario', width: 130 },
  { field: 'price', headerName: 'Price ($)', width: 100, type: 'number' },
  { field: 'discount', headerName: 'Discount (%)', width: 100, type: 'number' },
  { field: 'description', headerName: 'Description', width: 300 },
  {
    field: 'cover',
    headerName: 'Image',
    width: 120,
    renderCell: (params) => (
      <img
        src={params.value}
        alt={params.row.name}
        style={{ width: 50, height: 50, objectFit: 'cover' }}
      />
    ),
  },
  {
    field: 'rating',
    headerName: 'Rating',
    width: 150,
    renderCell: (params) => <CustomizedRating value={params.value || 0} />,
  },
];

function Inventory() {
    const [rows, setRows] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:4000/ProductItems'); // Ajusta la ruta si es necesario
          setRows(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []);
  
    return (
      <Paper sx={{ height: 500, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          sx={{ border: 0 }}
        />
      </Paper>
    );
  }
  
  export default Inventory;  