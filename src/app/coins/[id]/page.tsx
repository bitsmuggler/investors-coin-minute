'use client';

import { useEffect, useState } from 'react';
import { prompts } from '@/data/prompts';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import { useParams } from 'next/navigation';

async function fetchMarkdown(prompt: string) {
    const res = await fetch(`/api/generate`, {
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

    const promptObj = prompts.find(p => p.id === id);

    useEffect(() => {
        if (!promptObj) return;
        setLoading(true);
        setError(null);
        fetchMarkdown(promptObj.prompt)
            .then(res => setMarkdown(res.markdown))
            .catch(() => setError('Failed to generate report.'))
            .finally(() => setLoading(false));
    }, [id, promptObj]);

    if (!promptObj) {
        return (
            <div className="px-4 py-10 text-center text-base text-gray-500 dark:text-gray-400">
                Prompt nicht gefunden.
            </div>
        );
    }

    return (
        <div className="w-full max-w-full md:max-w-2xl mx-auto px-4 py-6 md:py-8">
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
