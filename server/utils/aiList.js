const config = useRuntimeConfig();
export const aiEngines = [
  {
    name: "gemeni",
    model: "google/gemini-2.0-flash-001",
    baseURL: config.geminiBaseUrl,
    apiKey: config.geminiApiKey,
  },
  {
    name: "gpt",
    model: "openai/gpt-5-nano",
    baseURL: config.geminiBaseUrl,
    apiKey: config.gptApiKey,
  },
  {
    name: "gpt-4o-mini",
    model: "openai/gpt-4o-mini",
    baseURL: config.geminiBaseUrl,
    apiKey: config.gptOMiniKey,
  },
  {
    name: "deepseek-3.1",
    model: "deepseek/deepseek-chat-v3.1",
    baseURL: config.geminiBaseUrl,
    apiKey: config.deepseekKey,
  },
];
