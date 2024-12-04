import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StyledRating from './StyledRating'; // Asegúrate de tener este componente definido
import { Button, TextField } from '@mui/material';

const CommentSection = ({ productId }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [rating, setRating] = useState(0);
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        fetchComments(productId);
    }, [productId]);

    const fetchComments = async (productId, offset = 0) => {
        try {
            const response = await axios.get(`http://localhost:8081/api/comments/${productId}?offset=${offset}`);
            setComments((prevComments) => [...prevComments, ...response.data]);
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    };

    const addComment = async () => {
        const commentData = {
            productId,
            userId: "currentUserId", // Reemplaza con el ID del usuario actual
            sessionId: "currentSessionId", // Reemplaza con el ID de sesión si es anónimo
            rating,
            comment: newComment,
            isAnonymous: false // Cambia esto según la lógica de tu aplicación
        };

        try {
            const response = await axios.post('http://localhost:8081/api/comments', commentData);
            alert(response.data.message);
            setNewComment('');
            setRating(0);
            fetchComments(productId); // Recargar comentarios después de agregar uno nuevo
        } catch (error) {
            console.error("Error adding comment:", error.response?.data?.error || error.message);
        }
    };

    return (
        <div>
            <h2>Comentarios</h2>
            {comments.map((c, index) => (
                <div key={index}>
                    <StyledRating name="customized-color" defaultValue={c.rating || 0} readOnly />
                    <p><strong>{c.userName}</strong> ({new Date(c.createdAt).toLocaleString()}):</p>
                    <p>{c.comment}</p>
                    <p>Rating: {c.rating} estrellas</p>
                    <hr />
                </div>
            ))}
            <TextField
                label="Deja tu comentario"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
            />
            <StyledRating
                name="customized-color"
                value={rating}
                onChange={(event, newValue) => {
                    setRating(newValue);
                }}
            />
            <Button variant="contained" color="primary" onClick={addComment}>Enviar Comentario</Button>
            <Button variant="outlined" onClick={() => fetchComments(productId, comments.length)}>Cargar más</Button>
        </div>
    );
};

export default CommentSection;