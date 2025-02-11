import axios from 'axios';

interface QuoteItem {
  id: number;
  quote: string;
  author: string;
}

interface QuoteResponse {
  status: string;
  data: QuoteItem;
}

const API_URL = 'https://apimuslimify.vercel.app/api/v1/quote';

export const getQuote = async (): Promise<QuoteItem> => {
  try {
    const response = await axios.get<QuoteResponse>(API_URL);
    return response.data.data;
  } catch (error: any) {
    console.error('Error fetching quote:', error);
    throw error;
  }
};
