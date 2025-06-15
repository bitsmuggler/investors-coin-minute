export const promptTemplate =  "Create a concise daily investment report for [COIN/ASSET] in the following structure and tone:" +
    "# 🚀 [COIN/ASSET] Daily Report" +
    "Date: [DATE] " +
    "Price: $[CURRENT_PRICE] ([PERCENT_CHANGE] in 24h) | Daily Range: $[LOW]–$[HIGH]" +
    "## Summary " +
    "   - [1-sentence summary of market situation, e.g., 'After ETF news, heavy sell-off, market looking for direction.']" +
    "## Top News" +
    "   - [First relevant headline]" +
    "   - [Second relevant headline, if any]" +
    "   - [Third relevant headline, if any]" +
    "## Opinion " +
    "   - [Brief, actionable outlook, e.g., 'Short-term volatility – buy-the-dip possible if $X holds.']" +
    "## Expected price" +
    "   - [Short-term price target based news and technical analysis, e.g., 'If $X holds, expect $Y in next 7 days.']" +
    "## Caution " +
    "   - [Key risk or warning, e.g., 'If [COIN/ASSET] falls below $X, more weakness likely.']" +
    "Disclaimer: This is not financial advice!" +
    "" +
    "Format the report so it is clear, easy to read, and suitable for both beginners and busy professionals."

const coins = [
    { id: "sui", title: "SUI", asset: "SUI" },
    { id: "btc", title: "Bitcoin (BTC)", asset: "BTC" },
    { id: "eth", title: "Ethereum (ETH)", asset: "ETH" },
    { id: "sol", title: "Solana (SOL)", asset: "SOL" },
    { id: "ada", title: "Cardano (ADA)", asset: "ADA" },
    { id: "xrp", title: "XRP (XRP)", asset: "XRP" },
    { id: "doge", title: "Dogecoin (DOGE)", asset: "DOGE" },
    { id: "dot", title: "Polkadot (DOT)", asset: "DOT" },
    { id: "avax", title: "Avalanche (AVAX)", asset: "AVAX" },
    { id: "matic", title: "Polygon (MATIC)", asset: "MATIC" }
];

const today = new Date().toLocaleDateString('de-CH');

export const prompts = coins.map(({ id, title, asset }) => ({
    id,
    title,
    prompt: promptTemplate
        .replace('[COIN/ASSET]', asset)
        .replace('[DATE]', today),
}));

