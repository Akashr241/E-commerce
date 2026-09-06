import React, { useState, useEffect, useRef } from "react";
import { sendChatMessage } from "../services/chatbotService";

const Chatbot = () => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([
        {
            sender: "ai",
            text: "Hello! 👋 I'm MediAI. How can I help you today?"
        }
    ]);
    const [loading, setLoading] = useState(false);

    // Auto-scroll to latest message
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (open) {
            scrollToBottom();
        }
    }, [messages, loading, open]);

    const sendMessage = async () => {
        console.log("Current input:", message);
        const userMessage = message.trim();
        console.log("User message:", userMessage);

        if (!userMessage) {
            console.log("Message is empty. Not sending.");
            return;
        }

        // Show user message
        setMessages((previousMessages) => [
            ...previousMessages,
            {
                sender: "user",
                text: userMessage
            }
        ]);

        // Clear input AFTER saving the value
        setMessage("");
        setLoading(true);

        try {
            console.log("Sending to chatbot service:", userMessage);
            const response = await sendChatMessage(userMessage);
            console.log("AI response received:", response);

            setMessages((previousMessages) => [
                ...previousMessages,
                {
                    sender: "ai",
                    text: response.answer
                }
            ]);
        } catch (error) {
            console.error("Chatbot error:", error);
            setMessages((previousMessages) => [
                ...previousMessages,
                {
                    sender: "ai",
                    text: "Sorry, I couldn't connect to MediAI right now."
                }
            ]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            sendMessage();
        }
    };

    return (
        <>
            {/* CHAT WINDOW */}
            {open && (
                <div
                    className="position-fixed bottom-0 end-0 mb-5 me-3 bg-white border-0 shadow-lg d-flex flex-column"
                    style={{
                        width: "385px",
                        maxWidth: "calc(100vw - 32px)",
                        height: "560px",
                        zIndex: 1050,
                        borderRadius: "24px",
                        overflow: "hidden",
                        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.12)",
                        transition: "all 0.3s ease"
                    }}
                >
                    {/* HEADER */}
                    <div
                        className="px-4 py-3 text-white d-flex align-items-center justify-content-between"
                        style={{
                            background: "linear-gradient(135deg, #10b981 0%, #059669 100%)"
                        }}
                    >
                        <div className="d-flex align-items-center gap-3">
                            <div
                                className="bg-white rounded-circle d-flex align-items-center justify-content-center shadow-sm"
                                style={{
                                    width: "44px",
                                    height: "44px",
                                    fontSize: "20px"
                                }}
                            >
                                🩺
                            </div>
                            <div>
                                <div className="fw-semibold text-white lh-1 mb-1" style={{ fontSize: "16px" }}>
                                    MediAI Assistant
                                </div>
                                <div className="d-flex align-items-center gap-1">
                                    <span
                                        className="rounded-circle bg-light d-inline-block"
                                        style={{ width: "7px", height: "7px" }}
                                    ></span>
                                    <span style={{ fontSize: "12px", opacity: 0.9 }}>
                                        Online Pharmacy Guide
                                    </span>
                                </div>
                            </div>
                        </div>

                        <button
                            type="button"
                            className="btn btn-link text-white text-decoration-none p-1 rounded-circle"
                            onClick={() => setOpen(false)}
                            aria-label="Close Chat"
                            style={{ opacity: 0.85 }}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>

                    {/* MESSAGES AREA */}
                    <div
                        className="flex-grow-1 p-3 overflow-auto d-flex flex-column gap-2"
                        style={{
                            backgroundColor: "#f8fafc"
                        }}
                    >
                        {messages.map((msg, index) => {
                            const isUser = msg.sender === "user";
                            return (
                                <div
                                    key={index}
                                    className={`d-flex align-items-end gap-2 ${
                                        isUser ? "justify-content-end" : "justify-content-start"
                                    }`}
                                >
                                    {!isUser && (
                                        <div
                                            className="rounded-circle bg-emerald-subtle d-flex align-items-center justify-content-center flex-shrink-0"
                                            style={{
                                                width: "28px",
                                                height: "28px",
                                                backgroundColor: "#d1fae5",
                                                fontSize: "14px"
                                            }}
                                        >
                                            🤖
                                        </div>
                                    )}

                                    <div
                                        className="px-3 py-2"
                                        style={{
                                            maxWidth: "78%",
                                            wordBreak: "break-word",
                                            fontSize: "14px",
                                            lineHeight: "1.45",
                                            borderRadius: isUser
                                                ? "18px 18px 4px 18px"
                                                : "18px 18px 18px 4px",
                                            backgroundColor: isUser ? "#059669" : "#ffffff",
                                            color: isUser ? "#ffffff" : "#1e293b",
                                            boxShadow: isUser
                                                ? "0 2px 6px rgba(5, 150, 105, 0.25)"
                                                : "0 2px 8px rgba(0, 0, 0, 0.04)",
                                            border: isUser ? "none" : "1px solid #e2e8f0"
                                        }}
                                    >
                                        {msg.text}
                                    </div>
                                </div>
                            );
                        })}

                        {loading && (
                            <div className="d-flex align-items-center gap-2 justify-content-start">
                                <div
                                    className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                                    style={{
                                        width: "28px",
                                        height: "28px",
                                        backgroundColor: "#d1fae5",
                                        fontSize: "14px"
                                    }}
                                >
                                    🤖
                                </div>
                                <div
                                    className="bg-white border px-3 py-2 rounded-4 shadow-sm d-flex align-items-center gap-1"
                                    style={{ borderColor: "#e2e8f0" }}
                                >
                                    <div className="spinner-grow spinner-grow-sm text-success" style={{ animationDuration: "1s" }} />
                                    <div className="spinner-grow spinner-grow-sm text-success" style={{ animationDuration: "1.2s" }} />
                                    <div className="spinner-grow spinner-grow-sm text-success" style={{ animationDuration: "1.4s" }} />
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* INPUT AREA */}
                    <div className="p-3 bg-white border-top border-light-subtle">
                        <div
                            className="d-flex align-items-center bg-light rounded-pill px-3 py-1 border"
                            style={{ borderColor: "#e2e8f0" }}
                        >
                            <input
                                type="text"
                                className="form-control border-0 bg-transparent shadow-none"
                                placeholder="Ask about medications, symptoms..."
                                value={message}
                                onChange={(event) => {
                                    console.log("Input changed:", event.target.value);
                                    setMessage(event.target.value);
                                }}
                                onKeyDown={handleKeyDown}
                                disabled={loading}
                                style={{ fontSize: "14px", padding: "6px 4px" }}
                            />

                            <button
                                type="button"
                                className="btn rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                                onClick={sendMessage}
                                disabled={loading || !message.trim()}
                                style={{
                                    width: "36px",
                                    height: "36px",
                                    backgroundColor: message.trim() && !loading ? "#059669" : "#cbd5e1",
                                    color: "#ffffff",
                                    border: "none",
                                    transition: "background-color 0.2s"
                                }}
                            >
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="22" y1="2" x2="11" y2="13"></line>
                                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* FLOATING ACTION BUTTON */}
            <button
                type="button"
                className="position-fixed bottom-0 end-0 mb-3 me-3 btn rounded-circle shadow-lg d-flex align-items-center justify-content-center text-white border-0"
                style={{
                    width: "60px",
                    height: "60px",
                    zIndex: 1040,
                    background: open
                        ? "#334155"
                        : "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    transform: "scale(1)"
                }}
                onClick={() => setOpen(!open)}
                aria-label="Toggle chat"
            >
                {open ? (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                ) : (
                    <span style={{ fontSize: "26px" }}>💬</span>
                )}
            </button>
        </>
    );
};

export default Chatbot;