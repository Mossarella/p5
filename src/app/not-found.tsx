export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-10">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-2xl">Sketch not found.</p>
      <a
        href="/"
        className="mt-6 text-blue-500 underline"
      >
        Go back home
      </a>
    </div>
  );
}
