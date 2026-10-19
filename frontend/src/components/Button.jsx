import Link from "next/link";
import clsx from "clsx";

const variants = {
  primary: "bg-accent text-accent-ink hover:bg-accent/90",
  dark: "bg-ink text-bg hover:bg-ink/90",
  ghost: "bg-ink/[0.05] text-ink ring-1 ring-line/10 hover:bg-ink/[0.08]",
};

const iconWrap = {
  primary: "bg-accent-ink/15",
  dark: "bg-bg/15",
  ghost: "bg-ink/[0.07]",
};

// Pill button with the icon nested in its own circle (button-in-button).
// fill: below sm the button fills its grid cell with a centred label and no icon circle, so two sit side by side on a phone.
export default function ButtonLink({ href, children, icon: Icon, variant = "primary", external, fill, className, ...rest }) {
  const cls = clsx(
    "group inline-flex items-center gap-3 whitespace-nowrap rounded-full text-[15px] font-medium",
    !Icon ? "px-6 py-3" : fill ? "w-full justify-center px-4 py-3 sm:w-auto sm:justify-start sm:py-2 sm:pl-6 sm:pr-2" : "py-2 pl-6 pr-2",
    "transition-[transform,background-color] duration-200 ease-snap active:scale-[0.98]",
    variants[variant],
    className
  );
  const inner = (
    <>
      <span>{children}</span>
      {Icon && (
        <span
          className={clsx(
            "h-9 w-9 items-center justify-center rounded-full transition-transform duration-200 ease-snap",
            fill ? "hidden sm:flex" : "flex",
            "group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105",
            iconWrap[variant]
          )}
          aria-hidden="true"
        >
          <Icon size={18} weight="regular" />
        </span>
      )}
    </>
  );
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls} {...rest}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {inner}
    </Link>
  );
}
