// useBooks.tsx

import { useState } from "react";
import axios from "axios";

import { useAuth } from "../../../context/AuthContext";
import { Book } from "../../../types/book";
const apiUrl = process.env.EXPO_PUBLIC_API_URL;
export const useAboutTabContent = () => {
    const { user } = useAuth();
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [averageRating, setAverageRating] = useState(0);
    const [comments, setComments] = useState([]);
    const userData = user?.user;

    const getCommentsAndRatings = (bookId: string) => {
        try {
            axios
                .get(`${apiUrl}/book/ratings/${userData._id}/${bookId}`)
                .then((response) => {
                    if (response.data.rating) {
                        setRating(response.data.rating);
                    }
                })
                .catch((error) => {
                    console.error(
                        "Erreur lors de la récupération de la note de l'utilisateur :",
                        error
                    );
                });
            axios
                .get(`${apiUrl}/book/ratings/average/${bookId}`)
                .then((response) => {
                    setAverageRating(response.data.averageRating);
                })
                .catch((error) => {
                    console.error(
                        "Erreur lors de la récupération de la moyenne des notes :",
                        error
                    );
                });

            axios
                .get(`${apiUrl}/book/comments/${bookId}`)
                .then((response) => {
                    setComments(response.data);
                })
                .catch((error) => {
                    console.error(
                        "Erreur lors de la récupération des commentaires :",
                        error
                    );
                });
        } catch (error) {
            console.error(error);
        }
    };

    return {
        apiUrl,
        rating,
        setRating,
        comment,
        setComment,
        averageRating,
        comments,
        userData,
        getCommentsAndRatings
    };
};


