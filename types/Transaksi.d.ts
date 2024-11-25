export type TransaksiTypes = {
  transaksi_id: number;
  pengguna_id: number;
  email_pengguna: string;
  tanggal_masuk: string;
  tipe_transaksi: string;
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

export type CreateTransaksiTypes = {
  email: string;
  totalHarga: number;
  item_sampah: Array<{
    sampah_id: number;
    nama_sampah: string;
    jumlah: number;
    harga: number;
  }>;
};
