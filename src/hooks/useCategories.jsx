import { useQuery } from '@tanstack/react-query';
import axoisInstance from "./../api/axiosInstance";
import i18n from '../i18next';

export default function useCategories(limit=4) {
    const getCategories = async () => {
        const response = await axoisInstance.get(`/Categories?limit=${limit}`);
        return response.data;
    }

    const query = useQuery({
        queryKey: ['categories', i18n.language ,limit],
        queryFn: getCategories,
        staleTime: 1000 * 60 * 5,
    })
    return query;
}