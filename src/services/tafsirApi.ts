import axios from 'axios';

const BASE_URL = 'https://equran.id/api/v2';

export const getTafsir = async (surahNumber: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/tafsir/${surahNumber}`);
    return response.data.data.tafsir;
  } catch (error) {
    console.error('Error fetching tafsir:', error);
    throw error;
  }
};
