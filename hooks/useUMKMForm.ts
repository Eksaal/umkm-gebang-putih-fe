import axios from '@/lib/axios';

export const useUmkmForm = () => {
    const storeData = async (data : any) => {
        try {
            const response = await axios.post('/umkm', data);
            return response.data;
        } catch (error) {
            console.error('Failed to store data', error);
            return null;
        }
    };

    const storePicture = async (data : any) => {
        try {
            const response = await axios.post('/pictures', data);
            return response.data;
        } catch (error) {
            console.error('Failed to store data', error);
            return null;
        }
    };

    return {
        storeData,
        storePicture
    };
};
