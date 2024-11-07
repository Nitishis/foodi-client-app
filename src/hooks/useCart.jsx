import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../contexts/AuthProvider";

const useCart = () => {
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem('access-token')

  const { refetch, data: cart = [] } = useQuery({
    queryKey: ["carts", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `https://foodi-client-server-t0a2.onrender.com/carts?email=${user.email} `,{
          headers:{
            authorization:`Bearer ${token}`
          }
        }
      );
      return res.json();
    },
  });

  return [cart, refetch];
};

export default useCart;
