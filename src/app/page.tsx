'use client'

import { useState } from 'react';
import { prompts } from '@/data/prompts';
import Link from 'next/link';

export default function PromptsPage() {
  const [search, setSearch] = useState('');
  const filteredPrompts = prompts.filter(p =>
      p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
      <div className="px-4 py-6 max-w-full sm:max-w-md md:max-w-xl mx-auto">
        <h1 className="text-xl sm:text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
          Coins
        </h1>
        <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search coin or symbol…"
            className="
                    w-full mb-5 px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700
                    bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                    placeholder-gray-400 dark:placeholder-gray-500
                    focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600
                    shadow-sm
                "
        />
        <ul className="flex flex-col gap-3">
          {filteredPrompts.length === 0 ? (
              <li className="text-gray-500 dark:text-gray-400 px-2">No coins found.</li>
          ) : (
              filteredPrompts.map((p) => (
                  <li key={p.id}>
                    <Link
                        href={`/coins/${p.id}`}
                        className="
                                    block
                                    rounded-2xl
                                    bg-white dark:bg-gray-900
                                    shadow
                                    px-4 py-4
                                    text-base sm:text-lg
                                    font-medium
                                    text-blue-600 dark:text-blue-400
                                    transition
                                    hover:bg-blue-50 dark:hover:bg-blue-900
                                    active:bg-blue-100 dark:active:bg-blue-800
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-blue-400 dark:focus:ring-blue-600
                                "
                    >
                      {p.title}
                    </Link>
                  </li>
              ))
          )}
        </ul>
      </div>
  );
}
