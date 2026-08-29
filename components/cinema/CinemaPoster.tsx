import Image from "next/image";

type CinemaPosterProps = {
  image: string;
  title: string;
};

export default function CinemaPoster({
  image,
  title,
}: CinemaPosterProps) {
  return (
    <div
      className="
        
        
      "
    >
      <Image
        src={image}
        alt={title}
        width={900}
        height={1300}
        priority
        className="
          w-full
          h-auto
          object-cover
          transition-transform
          duration-700
          hover:scale-[1.02]
        "
      />
    </div>
  );
}