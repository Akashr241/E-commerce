import api from "./api";

export const sendChatMessage = async (prompt) => {

    console.log("Service received prompt:", prompt);
    console.log("Service prompt length:", prompt?.length);

    if (!prompt || !prompt.trim()) {
        throw new Error("Prompt is empty before sending to backend");
    }

    try {

        const response = await api.post(
            "/api/ai/chat",
            {
                prompt: prompt.trim()
            }
        );

        console.log("Chatbot backend response:", response.data);

        return response.data;

    } catch (error) {

        console.error("Chatbot API Error:", error);

        console.error(
            "Status:",
            error.response?.status
        );

        console.error(
            "Backend response:",
            error.response?.data
        );

        throw error;
    }
};