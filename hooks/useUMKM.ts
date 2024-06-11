import axios from '@/lib/axios';

export const useUmkm = () => {
    const getMetaUmkm = async (page: number) => {
        try {
            const response = await axios.get('/umkm', { params: { page } });
            return response.data.data;
        } catch (error) {
            console.error('Failed to fetch data', error);
            return [];
        }
    };

    const getUmkm = async (id: number) => {
        try {
            const response = await axios.get(`/umkm/${id}`);
            return response.data;
        } catch (error) {
            console.error('Failed to fetch data', error);
            return null;
        }
    };

    const postReview = async (data: any) => {
        try {
            const response = await axios.post('/reviewers', data);
            return response.data;
        } catch (error) {
            console.error('Failed to post data', error);
            return null;
        }
    };

    return {
        getMetaUmkm,
        getUmkm,
        postReview,
    };
};
