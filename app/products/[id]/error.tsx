"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  console.error("Chyba zachytená v Error boundary:", error);

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-red-100 rounded shadow text-center font-sans text-red-700">
      <h1 className="text-2xl font-semibold mb-4">Niečo sa pokazilo 😞</h1>
      <p className="mb-6">{error.message}</p>
      <button
        onClick={() => reset()}
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors"
      >
        Skús znova
      </button>
    </div>
  );
}
