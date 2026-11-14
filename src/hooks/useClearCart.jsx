import { useMutation, useQueryClient } from '@tanstack/react-query';
import authAxiosInstance from './../api/authAxiosInstance';
import Swal from 'sweetalert2';

export default function useClearCart() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (cartItemId) => authAxiosInstance.delete(`/Carts/clear`),
        onSuccess: () => {
            queryClient.invalidateQueries(
                { queryKey: ['carts'] },
                 Swal.fire({
                    title: 'Cart Cleared Succesfuly ',
                    text: "Cart Cleared Succesfuly",
                    icon: 'success',
                    showCancelButton: true,
                    confirmButtonText: 'OKAY'
                })
            )
        }
    })
}