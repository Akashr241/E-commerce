import React, { useState } from "react";
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

            console.log(
                "Sending to chatbot service:",
                userMessage
            );

            const response =
                await sendChatMessage(userMessage);

            console.log(
                "AI response received:",
                response
            );

            setMessages((previousMessages) => [
                ...previousMessages,
                {
                    sender: "ai",
                    text: response.answer
                }
            ]);

        } catch (error) {

            console.error(
                "Chatbot error:",
                error
            );

            setMessages((previousMessages) => [
                ...previousMessages,
                {
                    sender: "ai",
                    text:
                        "Sorry, I couldn't connect to MediAI right now."
                }
            ]);

        } finally {

            setLoading(false);

        }
    };


    const handleKeyDown = (event) => {

        if (
            event.key === "Enter" &&
            !event.shiftKey
        ) {

            event.preventDefault();

            sendMessage();
        }
    };


    return (
        <>

            {/* CHAT WINDOW */}

            {open && (

                <div
                    className="
                        position-fixed
                        bottom-0
                        end-0
                        mb-5
                        me-3
                        bg-white
                        rounded-4
                        shadow-lg
                        border
                        overflow-hidden
                    "
                    style={{
                        width: "370px",
                        maxWidth: "calc(100vw - 30px)",
                        height: "520px",
                        zIndex: 1050
                    }}
                >

                    {/* HEADER */}

                    <div className="bg-success text-white p-3">

                        <div className="d-flex align-items-center justify-content-between">

                            <div className="d-flex align-items-center gap-2">

                                <div
                                    className="
                                        bg-white
                                        text-success
                                        rounded-circle
                                        d-flex
                                        align-items-center
                                        justify-content-center
                                    "
                                    style={{
                                        width: "42px",
                                        height: "42px"
                                    }}
                                >
                                    🤖
                                </div>

                                <div>

                                    <div className="fw-bold">
                                        MediAI Assistant
                                    </div>

                                    <small className="opacity-75">
                                        AI Pharmacy Assistant
                                    </small>

                                </div>

                            </div>

                            <button
                                type="button"
                                className="btn text-white fs-4 p-0"
                                onClick={() => setOpen(false)}
                            >
                                ×
                            </button>

                        </div>

                    </div>


                    {/* MESSAGES */}

                    <div
                        className="p-3 bg-light overflow-auto"
                        style={{
                            height: "390px"
                        }}
                    >

                        {messages.map((msg, index) => (

                            <div
                                key={index}
                                className={`
                                    d-flex
                                    mb-3
                                    ${
                                        msg.sender === "user"
                                            ? "justify-content-end"
                                            : "justify-content-start"
                                    }
                                `}
                            >

                                <div
                                    className={
                                        msg.sender === "user"
                                            ? "bg-success text-white rounded-4 px-3 py-2"
                                            : "bg-white border rounded-4 px-3 py-2 shadow-sm"
                                    }
                                    style={{
                                        maxWidth: "80%",
                                        wordBreak: "break-word"
                                    }}
                                >
                                    {msg.text}
                                </div>

                            </div>

                        ))}


                        {loading && (

                            <div className="d-flex justify-content-start mb-3">

                                <div className="bg-white border rounded-4 px-3 py-2 shadow-sm">

                                    <span className="spinner-grow spinner-grow-sm text-success me-1"></span>

                                    <span className="spinner-grow spinner-grow-sm text-success me-1"></span>

                                    <span className="spinner-grow spinner-grow-sm text-success"></span>

                                </div>

                            </div>

                        )}

                    </div>


                    {/* INPUT */}

                    <div className="bg-white border-top p-2">

                        <div className="input-group">

                            <input
                                type="text"
                                className="form-control"
                                placeholder="Ask MediAI..."
                                value={message}
                                onChange={(event) => {
                                    console.log(
                                        "Input changed:",
                                        event.target.value
                                    );

                                    setMessage(
                                        event.target.value
                                    );
                                }}
                                onKeyDown={handleKeyDown}
                                disabled={loading}
                            />

                            <button
                                type="button"
                                className="btn btn-success"
                                onClick={sendMessage}
                                disabled={
                                    loading ||
                                    !message.trim()
                                }
                            >
                                ➤
                            </button>

                        </div>

                    </div>

                </div>

            )}


            {/* FLOATING BUTTON */}

            <button
                type="button"
                className="
                    position-fixed
                    bottom-0
                    end-0
                    mb-3
                    me-3
                    btn
                    btn-success
                    rounded-circle
                    shadow-lg
                    d-flex
                    align-items-center
                    justify-content-center
                "
                style={{
                    width: "60px",
                    height: "60px",
                    zIndex: 1040,
                    fontSize: "25px"
                }}
                onClick={() => setOpen(!open)}
            >
                {open ? "×" : "🤖"}
            </button>

        </>
    );
};

export default Chatbot;