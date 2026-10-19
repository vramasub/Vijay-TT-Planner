import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-50">
      <h2 className="text-2xl font-bold text-zinc-900">Page Not Found</h2>
      <p className="mt-2 text-zinc-600">Could not find requested resource</p>
      <Link
        href="/"
        className="mt-6 px-4 py-2 bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 transition-colors"
      >
        Return Home
      </Link>
    </div>
  );
}
