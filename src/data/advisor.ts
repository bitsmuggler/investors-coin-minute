import {OpenAI} from "openai";
import {prompts} from "@/data/prompts";

export async function advise(coin: string): Promise<{markdown: string}> {
    const promptObj = prompts.find(p => p.id === coin);
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) throw new Error("No API key");

    if (!promptObj || !promptObj.prompt) {
        throw new Error("Coin not found");
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
    return {markdown: data}
}
