import { useState } from "react";
import { Download, ArrowLeft } from "lucide-react";
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
  const [selected, setSelected] = useState(null);

  const handleOpenChange = (nextOpen) => {
    if (!nextOpen) setSelected(null);
    onOpenChange(nextOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className={selected ? "max-w-5xl h-[85vh] flex flex-col" : "max-w-2xl"}
        data-testid="catalogue-dialog"
      >
        {!selected ? (
          <>
            <DialogHeader>
              <DialogTitle className="font-playfair text-2xl">
                Brochures
              </DialogTitle>
              <DialogDescription>
                Choose a brochure to preview and download.
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              {catalogues.map((cat) => (
                <button
                  key={cat.file}
                  onClick={() => setSelected(cat)}
                  className="group flex flex-col items-center gap-2 text-center"
                  data-testid={`catalogue-preview-${cat.name}`}
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
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col h-full min-h-0">
            <DialogHeader>
              <DialogTitle className="font-playfair text-xl truncate pr-8">
                {selected.name}
              </DialogTitle>
            </DialogHeader>
            <div className="flex flex-1 min-h-0 gap-4 pt-2">
              <iframe
                src={selected.file}
                title={selected.name}
                className="flex-1 min-w-0 h-full rounded-md border border-gray-200"
              />
              <div className="w-40 flex-shrink-0 flex flex-col gap-3">
                <button
                  onClick={() => setSelected(null)}
                  className="flex items-center justify-center gap-2 bg-white border-2 border-gold text-gold hover:bg-gold hover:text-white px-4 py-3 rounded-md font-medium transition-all duration-300"
                  data-testid="catalogue-back-btn"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
                <a
                  href={selected.file}
                  download
                  className="flex items-center justify-center gap-2 bg-gold hover:bg-gold-dark text-white px-4 py-3 rounded-md font-medium transition-all duration-300 shadow-md"
                  data-testid="catalogue-download-btn-preview"
                >
                  <Download className="w-4 h-4" />
                  Download
                </a>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
