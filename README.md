# 🚀 Investor’s Coin Minute

Ultra-compact, actionable daily crypto investment reports - delivered in a decision-focused format.  
Perfect for newsletters, chatbots, dashboards, or personal use.

> **🧪 Prototype:** This app dynamically generates and renders full HTML pages based on OpenAI-generated content. It demonstrates how AI can drive real-time, data-informed page rendering.

---

## 🎯 Purpose

The core idea is to render content-rich pages dynamically using OpenAI responses as the data source. Instead of manually crafting each report or component, we send structured prompts to the OpenAI API and render the result as a styled, readable page.

This approach is ideal for:
- Financial dashboards
- Investor newsletters
- Automated reporting tools
- Personalized user portals

---

## ✨ Features

- 🧠 Dynamic Page Generation: Each coin report page is rendered on the fly using OpenAI-generated content.
- 📈 Real-Time Data: Integrates current crypto prices, news, and sentiment.
- 🧾 Styled HTML Rendering: Converts markdown or HTML from OpenAI into styled pages with TailwindCSS.
- ⚡ Minimal & Fast: Focuses on core insights, not bloated data dumps.
- 🔌 Extensible: Easily adapt prompts for other assets like stocks, ETFs, or forex.

---

## 🛠️ Tech Stack

- Next.js - Routing, server-side rendering, API routes
- React - Component-based UI
- Tailwind CSS - Clean, responsive UI styling
- OpenAI API - Content generation based on structured prompts
- TypeScript - Static typing for better developer experience

---

## 📦 Local Setup

1. Install dependencies:

```bash
npm i 
```

2. Create a `.env` file in the root directory and add your OpenAI API key:

```plaintext
OPENAI_API_KEY=your_openai_api_key_here
```

3. Start the development server
```bash
npm run dev
```

