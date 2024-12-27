import React, {useState} from 'react';
import './DirectMessage.css';

const DirectMessage = () => {
     const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
      const [inviteEmail, setInviteEmail] = useState("");

    const sendMessage = () => {
        if (message.trim()) {
          setMessages([...messages, { sender: "You", text: message }]);
          setMessage("");
        }
      };
    
      const handleInvite = () => {
        alert(`Invite sent to ${inviteEmail}`);
        setInviteEmail("");
      };
    
    return (
        <div className="direct-message">
            <h2>Direct Messages</h2>
            <div className="chat-history">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`chat-message ${
                msg.sender === "You" ? "sent" : "received"
              }`}
            >
              <strong>{msg.sender}: </strong>
              {msg.text}
            </div>
          ))}
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

        <div className="invite-section">
        <h3>Invite a User</h3>
        <input
          type="email"
          value={inviteEmail}
          placeholder="Enter email to invite"
          onChange={(e) => setInviteEmail(e.target.value)}
        />
        <button onClick={handleInvite}>Send Invite</button>
      </div>
        </div>
    );
};

export default DirectMessage;