import React, { useState, useEffect } from 'react';
import './GroupChat.css';

const GroupChat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    useEffect(() => {
        // Fetch initial messages from an API or database
        // Example: fetchMessages();
    }, []);

    const handleSendMessage = () => {
        if (input.trim()) {
            const newMessage = {
                id: messages.length + 1,
                text: input,
                timestamp: new Date().toLocaleTimeString(),
            };
            setMessages([...messages, newMessage]);
            setInput('');
        }
    };

    return (
        <div className="group-chat">
            <div className="messages">
                {messages.map((message) => (
                    <div key={message.id} className="message">
                        <span>{message.timestamp}</span>
                        <p>{message.text}</p>
                    </div>
                ))}
            </div>
            <div className="input-container">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..."
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
};

export default GroupChat;