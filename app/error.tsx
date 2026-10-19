'use client';

import React, { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-50 p-4 text-center">
      <h2 className="text-2xl font-bold text-zinc-900">Something went wrong!</h2>
      <p className="mt-2 text-zinc-600 max-w-md">
        We encountered an error while rendering this page.
      </p>
      <div className="mt-8 flex gap-4">
        <button
          onClick={() => reset()}
          className="px-4 py-2 bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 transition-colors"
        >
          Try again
        </button>
        <button
          onClick={() => window.location.href = '/'}
          className="px-4 py-2 bg-zinc-200 text-zinc-900 rounded-lg hover:bg-zinc-300 transition-colors"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}
