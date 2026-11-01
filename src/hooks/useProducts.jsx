import { useQuery } from '@tanstack/react-query';
import axoisInstance from "./../api/axiosInstance";
import i18n from '../i18next';

export default function useProducts(limit = 3) {
    const getProduct = async () => {
        const response = await axoisInstance.get(`/Products?limit=${limit}`);
        console.log(response.data);
        return response.data;
    }

    const query = useQuery({
        queryKey: ['product', i18n.language, limit],
        queryFn: getProduct,
        staleTime: 1000 * 60 * 5,
    })
    return query;
}