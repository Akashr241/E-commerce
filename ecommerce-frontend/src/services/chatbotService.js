import api from "./api";


/**
 * Send a message to the AI chatbot
 */
export const sendChatMessage = async (message) => {
    try {
        const response = await api.post("/api/ai/chat", {
            message: message
        });

        return response.data;

    } catch (error) {
        console.error("Chatbot API Error:", error);
        throw error;
    }
};