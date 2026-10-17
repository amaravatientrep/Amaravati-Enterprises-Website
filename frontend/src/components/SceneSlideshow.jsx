import PhotoMarquee from "./PhotoMarquee";

// A full-width band of styled scenes (kits or tray sets) drifting sideways.
export default function SceneSlideshow({ items, label, className = "mt-4" }) {
  return (
    <section className={className} aria-label={label}>
      <PhotoMarquee items={items} label={label} />
    </section>
  );
}
