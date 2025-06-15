import {NextRequest, NextResponse} from "next/server";
import {OpenAI} from "openai";
import {prompts} from "@/data/prompts";

export async function POST(req: NextRequest) {
    const coin = await req.nextUrl.searchParams.get('coin');
    if (!coin) return NextResponse.json({error: "No coin provided"}, {status: 400});
    const promptObj = prompts.find(p => p.id === coin);
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) return NextResponse.json({error: "No API key"}, {status: 401});

    if (!promptObj || !promptObj.prompt) {
        return NextResponse.json({error: "Coin not found"}, {status: 404});
    }

    const client = new OpenAI({apiKey});

    const response = await client.responses.create({
        model: "gpt-4.1",
        tools: [
            {
                type: "web_search_preview",
                search_context_size: "high"
            }
        ],
        input: [
            {
                role: "system",
                content: "You are a financial crypto advisor and you create short actionable coin reports. ALWAYS return a finished Markdown page that can be displayed directly on a modern financial website. Do **not** use code blocks. Markdown only."
            },
            {role: "user", content: promptObj?.prompt}
        ],
    });

    const data = response.output_text;
    return NextResponse.json({markdown: data}, {status: 200});
}
