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
    "   - [Short-term, price target based on latest news and technical analysis]" +
    "   - [Mid-term, price target based on latest news and technical analysis]" +
    "   - [Long-term, price target based on macro trends]" +
    "## Caution " +
    "   - [Key risk or warning, e.g., 'If [COIN/ASSET] falls below $X, more weakness likely.']" +
    "Disclaimer: This is not financial advice!" +
    "" +
    "Format the report so it is clear, easy to read, and suitable for both beginners and busy professionals."

export const coins = [
    { id: "btc", title: "Bitcoin (BTC)", asset: "BTC" },         // $2.09 T
    { id: "eth", title: "Ethereum (ETH)", asset: "ETH" },       // $304 B
    { id: "xrp", title: "XRP (XRP)", asset: "XRP" },             // $127 B
    { id: "bnb", title: "BNB (BNB)", asset: "BNB" },             // $91.5 B
    { id: "sol", title: "Solana (SOL)", asset: "SOL" },         // $77.1 B
    { id: "doge", title: "Dogecoin (DOGE)", asset: "DOGE" },    // $26.1 B
    { id: "trx", title: "TRON (TRX)", asset: "TRX" },           // $25.9 B
    { id: "ada", title: "Cardano (ADA)", asset: "ADA" },        // $22.1 B
    { id: "sui", title: "SUI (SUI)", asset: "SUI" },            // $10.1 B
    { id: "bch", title: "Bitcoin Cash (BCH)", asset: "BCH" },   // $8.8 B
    // Continue adding more ranked assets if needed...
];

const today = new Date().toLocaleDateString('de-CH');

export const prompts = coins.map(({ id, title, asset }) => ({
    id,
    title,
    prompt: promptTemplate
        .replace('[COIN/ASSET]', asset)
        .replace('[DATE]', today),
}));

