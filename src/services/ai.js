const aiConfig = {
    apiKey: "AIzaSyDmhvbzlHx1ZVnzzsd746zxJQneKBnyDUo", // Replace with your actual Gemini API key
    model: "gemini-1.5-flash",
    baseUrl: "https://generativelanguage.googleapis.com/v1beta",
    maxTokens: 1000,
    temperature: 0.7,
};

export const ai = {
    // Gemini AI Configuration
    gemini: {
        ...aiConfig,
        endpoints: {
            generateContent: () => `${aiConfig.baseUrl}/models/${aiConfig.model}:generateContent`,
        },
    },
}