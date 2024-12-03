import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
} from "@mui/material";
import axios from "axios";

const PromotionDatatable = () => {
    const [data, setData] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedPromotion, setSelectedPromotion] = useState(null);
    const [newPromotion, setNewPromotion] = useState({
        product_id: "",
        promotion_type: "",
        discount_percentage: "",
        start_date: "",
        end_date: "",
        description: "",
        is_active: true,
    });
    const promotionColumns = [
      { field: "id", headerName: "ID", width: 90, editable: false },
      { field: "product_id", headerName: "Product ID", width: 150, editable: true },
      { field: "promotion_type", headerName: "Promotion Type", width: 150, editable: true },
      { field: "discount_percentage", headerName: "Discount (%)", width: 150, editable: true },
      { field: "start_date", headerName: "Start Date", width: 150, editable: true },
      { field: "end_date", headerName: "End Date", width: 150, editable: true },
      { field: "description", headerName: "Description", width: 200, editable: true },
      { field: "is_active", headerName: "Active", width: 100, type: 'boolean', editable: true },
  ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8081/api/promotions/allPromotions");
                setData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8081/api/promotions/${id}`);
            setData(data.filter((item) => item.id !== id));
        } catch (error) {
            console.error("Error eliminando promoción:", error);
        }
    };

    const processRowUpdate = async (newRow, oldRow) => {
        try {
            await axios.put(`http://localhost:8081/api/promotions/promotions/${newRow.id}`, newRow);
            setData((prev) =>
                prev.map((row) => (row.id === newRow.id ? newRow : row))
            );
            return newRow;
        } catch (error) {
            console.error("Error updating promotion:", error);
            return oldRow; // Revertir en caso de error
        }
    };

    const handleOpenDialog = () => {
        setNewPromotion({
            product_id: "",
            promotion_type: "",
            discount_percentage: "",
            start_date: "",
            end_date: "",
            description: "",
            is_active: true,
        });
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedPromotion(null);
    };

    const handleCreate = async () => {
        try {
            const response = await axios.post("http://localhost:8081/api/promotions/newPromotion", newPromotion);
            setData([...data, response.data]);
            handleCloseDialog();
        } catch (error) {
            console.error("Error creating promotion:", error);
        }
    };

    const actionColumn = [
        {
            field: "action",
            headerName: "Action",
            width: 200,
            renderCell: (params) => (
                <div>
                    <Button variant="outlined" color="error" onClick={() => handleDelete(params.row.id)}>
                        Delete
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div className="datatable">
            <div className="datatableTitle">
                Add New Promotion
                <Button variant="contained" color="primary" onClick={handleOpenDialog}>
                    Add New
                </Button>
            </div>
            <DataGrid
                className="datagrid"
                rows={data}
                columns={promotionColumns.concat(actionColumn)}
                pageSize={9}
                rowsPerPageOptions={[9]}
                checkboxSelection
                processRowUpdate={processRowUpdate}
            />
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Add New Promotion</DialogTitle>
                <DialogContent>
                    <TextField label="Product ID" value={newPromotion.product_id} onChange={(e) => setNewPromotion({ ...newPromotion, product_id: e.target.value })} fullWidth margin="normal" />
                    <TextField label="Promotion Type" value={newPromotion.promotion_type} onChange={(e) => setNewPromotion({ ...newPromotion, promotion_type: e.target.value })} fullWidth margin="normal" />
                    <TextField label="Discount Percentage" type="number" value={newPromotion.discount_percentage} onChange={(e) => setNewPromotion({ ...newPromotion, discount_percentage: e.target.value })} fullWidth margin="normal" />
                    <TextField label="Start Date" type="date" value={newPromotion.start_date} onChange={(e) => setNewPromotion({ ...newPromotion, start_date: e.target.value })} fullWidth margin="normal" InputLabelProps={{ shrink: true }} />
                    <TextField label="End Date" type="date" value={newPromotion.end_date} onChange={(e) => setNewPromotion({ ...newPromotion, end_date: e.target.value })} fullWidth margin="normal" InputLabelProps={{ shrink: true }} />
                    <TextField label="Description" value={newPromotion.description} onChange={(e) => setNewPromotion({ ...newPromotion, description: e.target.value })} fullWidth margin="normal" />
                    <TextField label="Is Active" type="checkbox" checked={newPromotion.is_active} onChange={(e) => setNewPromotion({ ...newPromotion, is_active: e.target.checked })} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">Cancel</Button>
                    <Button onClick={handleCreate} color="primary">Create</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default PromotionDatatable;