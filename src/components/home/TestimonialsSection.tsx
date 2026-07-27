import { TESTIMONIALS } from "@/lib/services-content";

export function TestimonialsSection() {
  return (
    <div className="grid gap-8 md:grid-cols-3">
      {TESTIMONIALS.map((item) => (
        <blockquote
          key={item.author}
          className="flex flex-col border border-border bg-white p-8"
        >
          <p className="flex-1 font-serif text-lg font-light leading-relaxed text-charcoal">
            &ldquo;{item.quote}&rdquo;
          </p>
          <footer className="mt-6 border-t border-border pt-6">
            <p className="text-sm font-medium text-charcoal">{item.author}</p>
            <p className="mt-1 text-xs uppercase tracking-luxury text-muted">{item.project}</p>
          </footer>
        </blockquote>
      ))}
    </div>
  );
}
