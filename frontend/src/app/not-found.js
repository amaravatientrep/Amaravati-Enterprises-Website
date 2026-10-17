import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import ButtonLink from "@/components/Button";

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[70dvh] flex-col items-start justify-center pt-28">
      <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">This page isn&rsquo;t here.</h1>
      <p className="mt-5 max-w-md text-lg text-muted">It may have moved when we rebuilt the site. Our product range is a good place to start.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href="/products" icon={ArrowRight}>
          See products
        </ButtonLink>
        <ButtonLink href="/contact" variant="ghost">
          Contact us
        </ButtonLink>
      </div>
    </section>
  );
}
