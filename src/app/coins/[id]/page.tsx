import MarkdownRenderer from '@/components/MarkdownRenderer';
import Link from 'next/link';
import {advise} from "@/data/advisor";

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


export default async function CoinDetailPage({params,}: { params: Promise<{ id: string }> }) {
    const paramsData = await params;
    const id = paramsData.id;

    const data = await advise(id);

    if (!id) {
        return (
            <div className="px-4 py-10 text-center text-base text-gray-500 dark:text-gray-400">
                Prompt not found.
                <div className="mt-4">
                    <BackToOverviewLink/>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-full md:max-w-2xl mx-auto px-4 py-6 md:py-8">
            <div className="mb-6">
                <BackToOverviewLink/>
            </div>

            <MarkdownRenderer
                markdown={data.markdown}
            />
        </div>
    );
}
