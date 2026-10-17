import Image from "next/image";

// Brand logo (gold mark, unchanged artwork). Header: the leaf mark on the left with the name beside it, larger.
// Footer ("lg"): the full stacked logo.
export default function Logo({ size = "md" }) {
  if (size === "lg") {
    return (
      <span className="relative block h-24 w-[132px]">
        <Image src="/amaravati-logo.svg" alt="Amaravati Enterprises" fill sizes="132px" className="object-contain" />
      </span>
    );
  }
  return (
    <span className="flex items-center gap-2.5">
      <span className="relative block h-11 w-11 shrink-0">
        <Image src="/amaravati-mark.svg" alt="" fill sizes="44px" className="object-contain" priority />
      </span>
      <span className="relative block h-9 w-[114px] sm:h-10 sm:w-[127px]">
        <Image src="/amaravati-wordmark.svg" alt="Amaravati Enterprises" fill sizes="127px" className="object-contain" priority />
      </span>
    </span>
  );
}
