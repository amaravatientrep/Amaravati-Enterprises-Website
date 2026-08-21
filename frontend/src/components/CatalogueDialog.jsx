import { Download } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const catalogues = [
  {
    file: "/catalogues/ae-brochure-2026.pdf",
    thumb: "/catalogues/thumbs/ae-brochure-2026-cover.png",
    name: "AE Brochure 2026.pdf",
  },
  {
    file: "/catalogues/ae-hk-2026.pdf",
    thumb: "/catalogues/thumbs/ae-hk-2026-cover.png",
    name: "AE HK 2026.pdf",
  },
  {
    file: "/catalogues/ae-biotique-2026.pdf",
    thumb: "/catalogues/thumbs/ae-biotique-2026-cover.png",
    name: "AE BIOTIQUE 2026.pdf",
  },
  {
    file: "/catalogues/ae-dispenser-system.pdf",
    thumb: "/catalogues/thumbs/ae-dispenser-system-cover.png",
    name: "AE Dispenser System.pdf",
  },
];

export default function CatalogueDialog({ open, onOpenChange }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl" data-testid="catalogue-dialog">
        <DialogHeader>
          <DialogTitle className="font-playfair text-2xl">
            Download a Catalogue
          </DialogTitle>
          <DialogDescription>
            Choose a catalogue to download.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
          {catalogues.map((cat) => (
            <a
              key={cat.file}
              href={cat.file}
              download
              className="group flex flex-col items-center gap-2 text-center"
              data-testid={`catalogue-download-${cat.name}`}
            >
              <div className="relative w-full aspect-[3/4] overflow-hidden rounded-md border border-gray-200 shadow-sm group-hover:shadow-lg transition-all duration-300">
                <img
                  src={cat.thumb}
                  alt={`${cat.name} cover`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                  <Download className="w-7 h-7 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
              <span className="text-xs font-medium text-charcoal-light group-hover:text-gold break-all">
                {cat.name}
              </span>
            </a>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
