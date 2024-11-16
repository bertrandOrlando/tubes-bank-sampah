export type TransaksiTypes = {
  transaksi_id: number;
  pengguna_id: number;
  tanggal_masuk: string;
  status_terkirim: boolean;
  tanggal_keluar: string;
};

export type Transaksi_Sampah = {
  transaksi_id: number;
  sampah_id: number;
  jumlah_sampah: number;
  harga_sampah: number;
} & TransaksiTypes;
