import { prompts } from '@/data/prompts';
import Link from 'next/link';

export default function PromptsPage() {
    return (
        <div className="max-w-xl mx-auto py-8">
            <h1 className="text-2xl font-bold mb-4">Coins</h1>
            <ul className="space-y-2">
                {prompts.map(p => (
                    <li key={p.id}>
                        <Link href={`/coins/${p.id}`} className="underline text-blue-600">{p.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
