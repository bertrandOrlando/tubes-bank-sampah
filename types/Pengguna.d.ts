export enum tipe_pengguna {
  ADMIN,
  PENGGUNA,
}

export type PenggunaTypes = {
  pengguna_id: number;
  nama: string;
  no_telp: string;
  alamat: string;
  email: string;
  role: tipe_pengguna;
  kelurahan: string;
  kecamatan: string;
};
