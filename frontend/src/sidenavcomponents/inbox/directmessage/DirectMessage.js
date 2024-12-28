import React, { useState, useEffect } from "react";
import axios from "axios";
import "./DirectMessage.css";

const DirectMessage = ({ currentUser, recipientId }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]); // Stores list of chat users
  const [currentChat, setCurrentChat] = useState(null); // Current active chat user
  const [newUserName, setNewUserName] = useState("");

  // Fetch chat history for the current chat
  useEffect(() => {
    const fetchMessages = async () => {
      if (currentUser && recipientId) {
        try {
          const response = await axios.get(
            `/api/chat/history/${currentUser._id}/${recipientId}`
          );
          setMessages(
            response.data.map((msg) => ({
              sender: msg.sender === currentUser._id ? "You" : "Other",
              text: msg.message,
            }))
          );
        } catch (error) {
          console.error("Error fetching messages", error);
        }
      }
    };
    fetchMessages();
  }, [currentUser, recipientId]);

  // Handle sending a message
  const sendMessage = async () => {
    if (message.trim() && currentChat) {
      try {
        const newMessage = {
          senderId: currentUser._id,
          receiverId: currentChat.id,
          message,
        };
        await axios.post("/api/chat/send", newMessage);

        // Update UI
        setMessages([...messages, { sender: "You", text: message }]);
        setMessage("");
      } catch (error) {
        console.error("Error sending message", error);
      }
    }
  };

  // Handle starting a new chat
  const handleNewChat = async () => {
    if (newUserName.trim()) {
      try {
        // Example: Assuming an API to create a new chat or fetch user details
        const response = await axios.post("/api/chat/start", { name: newUserName });
        const newUser = response.data;

        setUsers([...users, newUser]);
        setCurrentChat(newUser);
        setNewUserName("");
      } catch (error) {
        console.error("Error starting a new chat", error);
      }
    }
  };

  return (
    <div className="direct-message">
      <div className="chat-sidebar">
        <h3>Conversation</h3>
        {users.length === 0 ? (
          <p>You have not contacted anyone yet.</p>
        ) : (
          users.map((user) => (
            <div
              key={user.id}
              className={`user ${
                currentChat && user.id === currentChat.id ? "active" : ""
              }`}
              onClick={() => setCurrentChat(user)}
            >
              {user.name}
            </div>
          ))
        )}
        <div className="new-chat">
          <input
            type="text"
            value={newUserName}
            placeholder="Start new chat..."
            onChange={(e) => setNewUserName(e.target.value)}
          />
          <button onClick={handleNewChat}>Start</button>
        </div>
      </div>
      <div className="chat-section">
        {currentChat ? (
          <>
            <h2>Chat with {currentChat.name}</h2>
            <div className="chat-history">
              {messages.length === 0 ? (
                <p>No messages yet.</p>
              ) : (
                messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`chat-message ${
                      msg.sender === "You" ? "sent" : "received"
                    }`}
                  >
                    <strong>{msg.sender}: </strong>
                    {msg.text}
                  </div>
                ))
              )}
            </div>
            <div className="chat-input">
              <input
                type="text"
                value={message}
                placeholder="Type your message..."
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              />
              <button onClick={sendMessage}>Send</button>
            </div>
          </>
        ) : (
          <p>Select a user to start chatting.</p>
        )}
      </div>
    </div>
  );
};

export default DirectMessage;
