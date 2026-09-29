import { useQuery } from '@tanstack/react-query';
import axoisInstance from "../api/axiosInstance";
import i18n from '../i18next';

export default function useProByCategory(id) {
    const getProduct = async () => {
        const response = await axoisInstance.get(`/Products/category/${id}`);
        console.log(response.data);
        return response.data;
    }

    const query = useQuery({
        queryKey: ['categoryProduct', i18n.language, id],
        queryFn: getProduct,
        staleTime: 1000 * 60 * 5,
    })
    return query;
}