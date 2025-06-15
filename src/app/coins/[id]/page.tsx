'use client';

import { useEffect, useState } from 'react';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import { useParams } from 'next/navigation';
import Link from 'next/link';

// Reusable BackToOverviewLink component
function BackToOverviewLink({
                                href = "/",
                                children = "← Back to Overview",
                                className = ""
                            }) {
    return (
        <Link
            href={href}
            className={`inline-block px-4 py-2 rounded-lg bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-300 font-medium hover:bg-blue-100 dark:hover:bg-blue-800 transition ${className}`}
        >
            {children}
        </Link>
    );
}

async function fetchMarkdown(coin: string | null) {
    const res = await fetch(`/api/generate?coin=${coin}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
        cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch');
    return res.json();
}

export default function PromptDetailPage() {
    const params = useParams();
    const id = typeof params.id === 'string' ? params.id : params.id?.[0];

    const [markdown, setMarkdown] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;
        setLoading(true);
        setError(null);
        fetchMarkdown(id)
            .then(res => setMarkdown(res.markdown))
            .catch(() => setError('Failed to generate report.'))
            .finally(() => setLoading(false));
    }, [id]);

    if (!id) {
        return (
            <div className="px-4 py-10 text-center text-base text-gray-500 dark:text-gray-400">
                Prompt not found.
                <div className="mt-4">
                    <BackToOverviewLink />
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-full md:max-w-2xl mx-auto px-4 py-6 md:py-8">
            <div className="mb-6">
                <BackToOverviewLink />
            </div>
            {loading ? (
                <div className="flex flex-col items-center justify-center min-h-[200px]">
                    <svg className="animate-spin h-10 w-10 text-gray-400" viewBox="0 0 24 24" role="status" aria-label="Loading">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    <p>Generating report...</p>
                </div>
            ) : error ? (
                <div className="text-red-500 text-center py-4">{error}</div>
            ) : (
                markdown && (
                    <MarkdownRenderer
                        markdown={markdown}
                    />
                )
            )}
        </div>
    );
}
