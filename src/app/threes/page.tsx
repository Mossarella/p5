import Link from "next/link";

const works = [
  { slug: "1", title: "Three Text Scene" },
  // Add more works here as you create them, e.g. { slug: "2", title: "Another Three.js Experiment" }
];

export default function ThreesIndexPage() {
  return (
    <main className="p-6 space-y-4">
      <header>
        <h1 className="text-2xl font-semibold">Three.js Works</h1>
        <p className="text-sm text-gray-500">
          A small gallery of your three.js experiments.
        </p>
      </header>

      <ul className="space-y-2">
        {works.map((work) => (
          <li key={work.slug}>
            <Link
              href={`/threes/${work.slug}`}
              className="text-blue-500 underline"
            >
              {work.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
