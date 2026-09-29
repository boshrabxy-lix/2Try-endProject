import React from 'react';
import { useQuery } from '@tanstack/react-query';
import i18n from '../i18next';
import axoisInstance from '../api/axiosInstance';

export default function useProdDetails(id) {
    const getProduct = async () => {
        const response = await axoisInstance.get(`/Products/${id}`);
        return response.data;
    }
    const query = useQuery({
        queryKey: ['product',  i18n.language, id],
        queryFn: getProduct,
        staleTime: 1000 * 60 * 5,
    })
    return query;
}