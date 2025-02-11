import axios from 'axios';

interface AsmaulHusnaItem {
  index: string;
  latin: string;
  arab: string;
  terjemahan_id: string;
  terjemahan_en: string;
}

interface AsmaulHusnaResponse {
  status: string;
  data: AsmaulHusnaItem[];
}

const API_URL = 'https://apimuslimify.vercel.app/api/v1/asmaulhusna';

export const getAsmaulHusna = async (): Promise<AsmaulHusnaItem[]> => {
  try {
    const response = await axios.get<AsmaulHusnaResponse>(API_URL);
    return response.data.data;
  } catch (error: any) {
    console.error('Error fetching asmaul husna:', error);
    throw error;
  }
};
