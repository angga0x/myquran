export interface Surah {
  nomor: number;
  nama: string;
  namaLatin: string;
  jumlahAyat: number;
  tempatTurun: string;
  arti: string;
  deskripsi: string;
  audioFull: {
    [key: string]: string;
  };
}

export interface Ayah {
  nomorAyat: number;
  teksArab: string;
  teksLatin: string;
  teksIndonesia: string;
  audio: {
    [key: string]: string;
  };
}

export interface QuranResponse {
  code: number;
  message: string;
  data: Surah[];
}

export interface AyahResponse {
  code: number;
  message: string;
  data: {
    nomor: number;
    nama: string;
    namaLatin: string;
    jumlahAyat: number;
    tempatTurun: string;
    arti: string;
    deskripsi: string;
    audioFull: {
      [key: string]: string;
    };
    ayat: Ayah[];
    suratSelanjutnya: {
      nomor: number;
      nama: string;
      namaLatin: string;
    } | false;
    suratSebelumnya: {
      nomor: number;
      nama: string;
      namaLatin: string;
    } | false;
  };
}

export interface LastRead {
  surahNumber: number;
  ayahNumber: number;
  timestamp: number;
  surahName: string;
  surahNameLatin: string;
}
