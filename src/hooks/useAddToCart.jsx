import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import authAxiosInstance from './../api/authAxiosInstance'
import Swal from 'sweetalert2';

export default function useAddToCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values) => {
      return await authAxiosInstance.post('/Carts', {
        ProductId: values.productId,
        Count: values.count
      });
    }, onSuccess: () => {
      Swal.fire({
        icon: 'success',
        title: 'The Products Added To Cart Successfully',
        text: 'Added Successfully',
        confirmButtonText: 'Okay'
      })

      queryClient.invalidateQueries(
        { queryKey: ['carts'] }
      )
    }
  });
}