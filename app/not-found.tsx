import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="container-x grid min-h-[70svh] place-items-center py-40 text-center">
      <div>
        <p className="display text-7xl font-bold text-gradient sm:text-9xl">404</p>
        <h1 className="display mt-6 text-3xl font-bold">This page went off-script.</h1>
        <p className="mx-auto mt-4 max-w-md text-muted">
          The page you&rsquo;re looking for doesn&rsquo;t exist or has moved. Let&rsquo;s
          get you back on track.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button href="/" arrow>
            Back home
          </Button>
          <Button href="/contact" variant="outline">
            Contact us
          </Button>
        </div>
      </div>
    </section>
  );
}
