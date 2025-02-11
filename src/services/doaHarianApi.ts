import axios from 'axios';

interface DoaHarianItem {
  number: number;
  nama: string;
  arab: string;
  latin: string;
  terjemahan: string;
}

interface DoaHarianResponse {
  status: string;
  code: number;
  data: DoaHarianItem[];
}

const API_URL = 'https://apimuslimify.vercel.app/api/v1/doaharian';

export const getDoaHarian = async (): Promise<DoaHarianItem[]> => {
  try {
    const response = await axios.get<DoaHarianResponse>(API_URL);
    return response.data.data;
  } catch (error: any) {
    console.error('Error fetching doa harian:', error);
    throw error;
  }
};
