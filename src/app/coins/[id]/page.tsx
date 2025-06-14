'use client';

import { useEffect, useState } from 'react';
import { prompts } from '@/data/prompts';
import MarkdownRenderer from '@/components/MarkdownRenderer';

async function fetchMarkdown(prompt: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
        cache: "no-store"
    });
    return res.json();
}

export default function PromptDetailPage({ params }: { params: { id: string } }) {
    const { id } = params;
    const promptObj = prompts.find(p => p.id === id);

    const [markdown, setMarkdown] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (!promptObj) return;
        setLoading(true);
        fetchMarkdown(promptObj.prompt)
            .then(res => {
                setMarkdown(res.markdown);
            })
            .finally(() => setLoading(false));
    }, [promptObj]);

    if (!promptObj) return (
        <div className="px-4 py-10 text-center text-base text-gray-500 dark:text-gray-400">
            Prompt nicht gefunden.
        </div>
    );

    return (
        <div className="w-full max-w-full md:max-w-2xl mx-auto px-4 py-6 md:py-8">
            {loading ? (
                <div className="flex items-center justify-center min-h-[200px]">
                    {/* Spinner */}
                    <svg className="animate-spin h-10 w-10 text-gray-400" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                </div>
            ) : (
                markdown && <MarkdownRenderer markdown={markdown} className="prose prose-sm sm:prose md:prose-lg dark:prose-invert mx-auto" />
            )}
        </div>
    );
}
