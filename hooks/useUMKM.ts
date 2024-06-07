import axios from '@/lib/axios';

export const useUmkm = () => {
    const getMetaUmkm = async () => {
        try {
            const response = await axios.get('/umkm');
            return response.data.data;
        } catch (error) {
            console.error('Failed to store data', error);
            return null;
        }
    };

    return {
        getMetaUmkm,
    };
};