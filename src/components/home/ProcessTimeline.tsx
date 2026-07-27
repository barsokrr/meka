import { DESIGN_PROCESS } from "@/lib/services-content";

export function ProcessTimeline() {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
      {DESIGN_PROCESS.map((item) => (
        <div key={item.step} className="border border-border p-6 md:p-8">
          <p className="font-serif text-4xl font-light text-charcoal/20">{item.step}</p>
          <h3 className="mt-4 font-serif text-xl">{item.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted">{item.desc}</p>
        </div>
      ))}
    </div>
  );
}
