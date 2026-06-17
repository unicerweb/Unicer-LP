import { STATS } from "@/lib/constants";

export function Stats() {
  return (
    <section className="relative border-y border-unicer-blue/10 bg-muted">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px bg-unicer-blue/10 lg:grid-cols-4">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center justify-center bg-white px-6 py-10 text-center"
          >
            <span className="text-3xl font-bold tracking-tight text-unicer-red sm:text-4xl">
              {stat.value}
            </span>
            <span className="mt-2 text-sm text-unicer-blue/70">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
