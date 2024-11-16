import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="relative flex h-screen w-full items-center justify-center">
        <Image
          className="h-screen w-full object-cover brightness-50 filter"
          src="/hero-image.jpg"
          alt=""
          quality={100}
          fill
          sizes="100vw"
          style={{
            objectFit: "cover",
          }}
        />
        <div className="hero-title absolute z-10 flex flex-col items-center justify-center">
          <h1 className="text-6xl font-bold uppercase text-[#F5F5DC]">
            Selamatkan Bumi
          </h1>
          <h1 className="text-5xl font-bold uppercase text-[#CFB095]">
            Mulai dari Sampah di Rumah
          </h1>
        </div>
      </div>
    </>
  );
}
