import Image from "next/image";

export function Logo({
  variant = "black",
  className = "",
}: {
  variant?: "black" | "white";
  className?: string;
}) {
  const src =
    variant === "white"
      ? "/images/logo/Lettermark White.png"
      : "/images/logo/CREED logo trns.png";

  return (
    <Image
      src={src}
      alt="CREED Watches"
      width={150}
      height={60}
      className={"h-9 w-auto object-contain sm:h-11 " + className}
      priority
    />
  );
}