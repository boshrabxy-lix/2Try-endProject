import { useMutation, useQueryClient } from '@tanstack/react-query'
import authAxiosInstance from './../api/authAxiosInstance'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'

export default function useChckout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async ({ paymentMethod }) => {
      console.log("mutation function");
      console.log(paymentMethod);
      return await authAxiosInstance.post('/Checkouts', { paymentMethod })
    },
    onSuccess: (response) => {
      console.log(response);
      Swal.fire({
        icon: 'success',
        title: 'The Products Paid Successfully',
        text: 'The Products Paid Successfully',
        confirmButtonText: 'Okay'
      })

      if (response.data.url) {
        location.href = response.data.url;
      } else {
        navigate('/');
      }
      queryClient.invalidateQueries({ queryKey: ['carts'] })
  },
    onError: (err) => {
      Swal.fire({
        icon: 'error',
        title: 'The Order failed',
        text: 'The Order failed, Please Try Again...',
        confirmButtonText:' Please Try Again'
      })
    }
  })
}