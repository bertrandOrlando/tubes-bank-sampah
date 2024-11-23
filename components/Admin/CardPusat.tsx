import { SampahTypes } from "@/types/Sampah";
import { CreateTransaksiTypes } from "@/types/Transaksi";
import { useCurrencyFormatter } from "@/utils/useCurrencyFormatter";
import { Button, Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { Dispatch, SetStateAction } from "react";

function CardComponent(
  props: SampahTypes & {
    transaksi: CreateTransaksiTypes;
    setTransaksi: Dispatch<SetStateAction<CreateTransaksiTypes>>;
  } & { maxQuantity: number },
) {
  const { transaksi, setTransaksi, maxQuantity } = props;
  const { formatRupiah } = useCurrencyFormatter();

  const addItemHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    setTransaksi((prevVal) => {
      const existingItem = prevVal.item_sampah.find(
        (item) => item.sampah_id === props.sampah_id,
      );

      if (existingItem) {
        // Update jumlah item jika sudah ada
        const updatedItems = prevVal.item_sampah.map((item) =>
          item.sampah_id === props.sampah_id
            ? { ...item, jumlah: item.jumlah + 1 }
            : item,
        );
        return {
          ...prevVal,
          item_sampah: updatedItems,
          totalHarga: prevVal.totalHarga + props.harga_sekarang,
        };
      } else {
        const updatedTransaksi = { ...prevVal };
        updatedTransaksi.totalHarga += props.harga_sekarang;

        const newItem = {
          sampah_id: props.sampah_id,
          nama_sampah: props.nama_sampah,
          jumlah: 1,
          harga: props.harga_sekarang,
        };
        updatedTransaksi.item_sampah.push(newItem);
        return updatedTransaksi;
      }
    });
  };
  // Handler untuk mengurangi item
  const removeItemHandler = () => {
    setTransaksi((prevVal) => {
      const existingItem = prevVal.item_sampah.find(
        (item) => item.sampah_id === props.sampah_id,
      );

      if (existingItem && existingItem.jumlah > 1) {
        // Kurangi jumlah item jika lebih dari 1
        const updatedItems = prevVal.item_sampah.map((item) =>
          item.sampah_id === props.sampah_id
            ? { ...item, jumlah: item.jumlah - 1 }
            : item,
        );
        return {
          ...prevVal,
          item_sampah: updatedItems,
          totalHarga: prevVal.totalHarga - props.harga_sekarang,
        };
      } else if (existingItem && existingItem.jumlah === 1) {
        // Hapus item jika jumlahnya 1
        const updatedItems = prevVal.item_sampah.filter(
          (item) => item.sampah_id !== props.sampah_id,
        );
        return {
          ...prevVal,
          item_sampah: updatedItems,
          totalHarga: prevVal.totalHarga - props.harga_sekarang,
        };
      }
      return prevVal;
    });
  };

  // Mendapatkan jumlah item dari transaksi
  const quantity =
    transaksi.item_sampah.find((item) => item.sampah_id === props.sampah_id)
      ?.jumlah || 0;

  return (
    <Card
      shadow="lg"
      // as={LinkNextUI}
      // href={`${props.id}`}
      // isPressable
      className="rounded-lg bg-[#01683B] py-2"
    >
      <CardBody className="overflow-visible">
        <Image
          shadow="sm"
          radius="md"
          width="100%"
          alt={props.nama_sampah}
          className="h-[140px] w-full object-cover"
          src={"https://placehold.co/600x400/EEE/31343C"}
        />
      </CardBody>
      <CardFooter className="py-1">
        <p className="text-lg font-bold text-white">{props.nama_sampah}</p>
      </CardFooter>
      <CardFooter className="py-1">
        <div className="flex w-full justify-between">
          <p className="text-md text-white">
            {formatRupiah(props.harga_sekarang)} / {props.nama_suk}
          </p>

          <p className="text-md text-white">(max: {maxQuantity})</p>
        </div>
      </CardFooter>
      <CardFooter className="flex items-center justify-center gap-5 py-1">
        <Button
          // onClick={() => setQuantity((prev) => (prev > 0 ? prev - 1 : 0))}
          onClick={removeItemHandler}
          className="px-0 text-xl font-bold"
          size="sm"
          color="primary"
          variant="faded"
          isDisabled={quantity <= 0}
        >
          -
        </Button>
        <p className="text-white">{quantity}</p>
        <Button
          onClick={addItemHandler}
          className="px-0 text-xl font-bold"
          size="sm"
          color="primary"
          variant="faded"
          isDisabled={quantity == maxQuantity}
        >
          +
        </Button>
      </CardFooter>
    </Card>
  );
}

export default CardComponent;