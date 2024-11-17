export type TransaksiTypes = {
  transaksi_id: number;
  pengguna_id: number;
  tanggal_masuk: string;
  status_terkirim: boolean;
  tanggal_keluar: string;
  total_transaksi: number;
  item_sampah: TransaksiSampahTypes[];
};

export type TransaksiSampahTypes = {
  nama_sampah: string;
  jumlah_sampah: number;
  harga_sampah: number;
  nama_suk: string;
  subtotal: number;
};
