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
  kec_id: number;
  nama_kec: string;
  kel_id: number;
  nama_kel: string;
};
