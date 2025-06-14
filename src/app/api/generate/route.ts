import {NextRequest, NextResponse} from "next/server";
import {OpenAI} from "openai";

export async function POST(req: NextRequest) {
    const {prompt} = await req.json();
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) return NextResponse.json({error: "No API key"}, {status: 401});

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
                content: "You are an AI report generator. ALWAYS return a finished Markdown page that can be displayed directly on a modern financial website. Do **not** use code blocks. Markdown only."
            },
            {role: "user", content: prompt}
        ],
    });

    const data = response.output_text;
    console.log('data', data);
    return NextResponse.json({markdown: data}, {status: 200});
}
