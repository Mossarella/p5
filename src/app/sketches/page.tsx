import Link from "next/link";

const featuredSketches = [
  { slug: "1", title: "Sketch 1" },
  { slug: "24", title: "Sketch 24" },
];

export default function SketchesIndexPage() {
  return (
    <main className="p-6 space-y-4">
      <header>
        <h1 className="text-2xl font-semibold">p5 Sketches</h1>
        <p className="text-sm text-gray-500">
          A collection of your p5.js experiments. Visit any sketch by going to
          <code className="px-1 py-0.5 mx-1 rounded bg-gray-100 text-xs">
            /sketches/&lt;number&gt;
          </code>
          (for example, 1 or 24).
        </p>
      </header>

      <section className="space-y-2">
        <h2 className="text-sm font-semibold text-gray-600">
          Featured sketches
        </h2>
        <ul className="space-y-1 text-sm">
          {featuredSketches.map((sketch) => (
            <li key={sketch.slug}>
              <Link
                href={`/sketches/${sketch.slug}`}
                className="text-blue-500 underline"
              >
                {sketch.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

