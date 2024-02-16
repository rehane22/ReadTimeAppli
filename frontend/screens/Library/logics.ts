// useLibrary.js

import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";



export const useLibrary = () => {
  const { user } = useAuth();
  const [library, setLibrary] = useState([]);
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const User = user?.user;

  useEffect(() => {
    if (User) {
      getPersonalLibrary();
    }
  }, [library]);

  const getPersonalLibrary = async () => {
    try {
      const response = await axios.get(`${apiUrl}/personalLibrary/${User._id}`);
      setLibrary(response.data);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération de la bibliothèque personnelle",
        error
      );
    }
  };



  return { library };
};


