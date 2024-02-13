import axios from "axios";
import React, { useState } from "react";
import { Loader } from "rsuite";
import CloseIcon from '@rsuite/icons/Close'
import image from '../assets/undraw_chat_bot_re_e2gj.svg'

import "rsuite/dist/rsuite.min.css";

const Home = () => {
    const [openChatBox, setOpenChatBox] = useState(false);
    const [message, setMessage] = useState("");
    const [chats, setChats] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleOpenChatBox = () => {
        setOpenChatBox(true);
    };

    const handleCloseChatBox = () => {
        setOpenChatBox(false);
    };

    const handleReload = () => {
        window.location.reload()
    }

    const handleClear = () => {
        setChats([])
    }

    const chat = async (e, message) => {
        e.preventDefault();

        if (!message) {
            setIsTyping(true);
        }

        let msgs = chats;
        msgs.push({ role: "user", content: message });
        setChats(msgs);

        setMessage("");
        try {
            setIsLoading(true);
            const response = await axios.post(
                `http://localhost:3001/chat`,
                { chats },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                },
            );
            if (response.status === 201) {
                setIsLoading(false);
                msgs.push(response.data.output);
                setChats(msgs);
                setIsTyping(false);
            }
        } catch (error) {
            setIsLoading(false);
            setOpenChatBox(false);
            setError("An error occured");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div style={{ position: "relative" }}>
                <div>
                    <h5>CHAT BOT</h5>
                </div>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <div>
                    <h4>This is a simple Chat bot application</h4>
                    <button
                        onClick={handleOpenChatBox}
                        style={{ backgroundColor: "#92C4FF" }}
                    >
                        Click here to open chat
                    </button>
                </div>
                <div>
                    <img src={image} alt="Chat bot" />
                </div>
                {openChatBox && (
                    <>
                        <div className={`chat-box ${openChatBox ? "open" : ""}`}>
                            <div>
                                <div className="title">
                                        <button className="chat-button" onClick={handleCloseChatBox}>
                                        <CloseIcon />
                                    </button>
                                    <h5>Chat</h5>
                                    <div style={{ marginLeft: '210px'}}>
                                        <button onClick={handleClear} className="chat-button">
                                            Clear
                                    </button>
                                    </div>
                                </div>
                                <section>
                                    {chats && chats.length
                                        ? chats.map((chat, i) => (
                                            <>
                                                <p
                                                    key={i}
                                                    className={
                                                        chat.role === "user" ? "user_message" : ""
                                                    }
                                                >
                                                    
                                                    <span>
                                                        <b>{chat.role.toUpperCase()}</b>
                                                    </span>
                                                    <br/>
                                                    <span>{chat.content}</span>
                                                </p>
                                            </>
                                        ))
                                        : ""}
                                </section>
                                <div className={isTyping ? "" : "hide"}>
                                    <p>
                                        <i>{isTyping ? "Typing" : ""}</i>
                                    </p>
                                </div>
                                <form onSubmit={(e) => chat(e, message)}>
                                    <input
                                        type="text"
                                        name="message"
                                        value={message}
                                        placeholder="Type a message and hit enter"
                                        onChange={(e) => setMessage(e.target.value)}
                                    />
                                </form>
                                {isLoading && <Loader backdrop center />}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default Home;
