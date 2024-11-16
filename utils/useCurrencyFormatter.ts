export const useCurrencyFormatter = () => {
  const formatRupiah = (value: number): string => {
    // Gunakan `Intl.NumberFormat` untuk memformat angka
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  return { formatRupiah };
};
