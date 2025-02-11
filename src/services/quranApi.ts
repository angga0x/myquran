import axios from 'axios';
import { QuranResponse, AyahResponse } from '../types/quran';

const BASE_URL = 'https://equran.id/api/v2';

export const getSurahs = async () => {
  const response = await axios.get<QuranResponse>(`${BASE_URL}/surat`);
  return response.data.data;
};

export const getSurahAyahs = async (surahNumber: number) => {
  const response = await axios.get<AyahResponse>(`${BASE_URL}/surat/${surahNumber}`);
  return response.data.data;
};
