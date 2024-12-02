import { SampahTypes } from "@/types/Sampah";
import { useCurrencyFormatter } from "@/utils/useCurrencyFormatter";
import {
  Card,
  CardBody,
  CardFooter,
  Image,
  // Link as LinkNextUI,
} from "@nextui-org/react";

function CardComponent(props: SampahTypes) {
  const { formatRupiah } = useCurrencyFormatter();

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
          className="h-[140px] w-[210px] object-cover"
          src={`http://localhost:5000/${props.slug_image}`}
        />
      </CardBody>
      <CardFooter className="py-1">
        <p className="text-lg font-bold text-white">{props.nama_sampah}</p>
      </CardFooter>
      <CardFooter className="py-1">
        <p className="text-md text-white">
          {formatRupiah(props.harga_sekarang)} / {props.nama_suk}
        </p>
      </CardFooter>
    </Card>
  );
}

export default CardComponent;
