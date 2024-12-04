import { DataGrid } from "@mui/x-data-grid";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";

const commentColumns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "id_usuario", headerName: "Usuario ID", width: 150 },
    { field: "id_producto", headerName: "Producto ID", width: 150 },
    { field: "rating", headerName: "Calificación", width: 120 },
    { field: "contenido", headerName: "Comentario", width: 300 },
    { field: "fecha", headerName: "Fecha", width: 180 },
];

const CommentDatatable = () => {
    const [data, setData] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedComment, setSelectedComment] = useState(null);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get("http://localhost:8081/api/comentarios");
                setData(response.data);
            } catch (error) {
                console.error("Error fetching comments: ", error);
            }
        };
        fetchComments();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8081/api/comentarios/${id}`);
            setData(data.filter((item) => item.id !== id));
        } catch (error) {
            console.error("Error deleting comment: ", error);
        }
    };

    const handleOpenDialog = (comment) => {
        setSelectedComment(comment);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedComment(null);
    };

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={data}
                columns={commentColumns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                onRowClick={(params) => handleOpenDialog(params.row)}
            />
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Detalles del Comentario</DialogTitle>
                <DialogContent>
                    {selectedComment && (
                        <div>
                            <p><strong>ID:</strong> {selectedComment.id}</p>
                            <p><strong>Usuario ID:</strong> {selectedComment.id_usuario}</p>
                            <p><strong>Producto ID:</strong> {selectedComment.id_producto}</p>
                            <p><strong>Calificación:</strong> {selectedComment.rating}</p>
                            <p><strong>Comentario:</strong> {selectedComment.contenido}</p>
                            <p><strong>Fecha:</strong> {new Date(selectedComment.fecha).toLocaleString()}</p>
                        </div>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">Cerrar</Button>
                    <Button onClick={() => handleDelete(selectedComment.id)} color="secondary">Eliminar</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default CommentDatatable;