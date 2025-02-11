import axios from 'axios';

interface NiatShalatItem {
  id: number;
  name: string;
  arabic: string;
  latin: string;
  translation: string;
}

interface NiatShalatResponse {
  code: number;
  status: string;
  data: NiatShalatItem[];
}

const API_URL = 'https://apimuslimify.vercel.app/api/v2/niatshalat';

export const getNiatShalat = async (): Promise<NiatShalatItem[]> => {
  try {
    const response = await axios.get<NiatShalatResponse>(API_URL);
    return response.data.data;
  } catch (error: any) {
    console.error('Error fetching niat shalat:', error);
    throw error;
  }
};
