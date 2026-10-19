import Image from "next/image";
import { DownloadSimple } from "@phosphor-icons/react/dist/ssr";
import { brochures } from "@/lib/site";
import { fileSize } from "@/lib/fileSize";

export default function BrochureGrid() {
  return (
    <ul className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
      {brochures.map((b) => (
        <li key={b.file}>
          <a href={b.file} target="_blank" rel="noopener" className="group block">
            <div className="shell">
              <div className="core relative aspect-[3/4] overflow-hidden">
                <Image src={b.thumb} alt="" fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover transition-transform duration-700 ease-snap group-hover:scale-[1.03]" />
              </div>
            </div>
            <p className="mt-4 flex items-start justify-between gap-2 px-1 text-[15px] font-medium">
              <span>
                {b.name}
                {fileSize(b.file) && <span className="mt-0.5 block text-[13px] font-normal text-muted">PDF, {fileSize(b.file)}</span>}
              </span>
              <DownloadSimple size={18} className="shrink-0 text-muted transition-colors group-hover:text-accent" aria-label="PDF" />
            </p>
          </a>
        </li>
      ))}
    </ul>
  );
}
