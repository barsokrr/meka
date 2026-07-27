import { ReactNode } from "react";

export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="container-site py-12 md:py-16">
      <h1 className="section-title">{title}</h1>
      <div className="prose prose-sm mt-10 max-w-3xl space-y-4 text-charcoal/80 [&_h2]:mt-8 [&_h2]:font-serif [&_h2]:text-xl [&_ul]:list-disc [&_ul]:pl-5">
        {children}
      </div>
    </div>
  );
}
