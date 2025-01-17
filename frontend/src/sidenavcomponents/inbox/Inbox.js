import React, { useState } from "react";
import DirectMessage from "./directmessage/DirectMessage";
import GroupChat from "./groupchat/GroupChat";
import Notification from "./notifications/Notifications";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage, faComments, faBell, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import "./Inbox.css";

const Inbox = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [activeView, setActiveView] = useState("DirectMessage");
  const [selectedUser, setSelectedUser] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/api/users/search?query=${searchQuery}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error searching users", error);
    }
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setActiveView("DirectMessage");
  };

  const renderContent = () => {
    switch (activeView) {
      case "DirectMessage":
        return selectedUser ? (
          <DirectMessage
            currentUser={{ _id: "currentUserId" }}
            recipientId={selectedUser._id}
          />
        ) : (
          <p>Please select a user to start a conversation.</p>
        );
      case "GroupChat":
        return <GroupChat />;
      case "Notification":
        return <Notification />;
      default:
        return <DirectMessage />;
    }
  };

  return (

    <div className="inbox-page">

     <div className="workspace">
            <h1>Workspace</h1>
            <p>Welcome to your Inbox!</p>
        </div>

    <div className="inbox-container">
      
      <div className="chat-section">
        <div className="chat-header">
          <ul className="chat-list">
            <li
              className={`chat-items ${
                activeView === "DirectMessage" ? "active" : ""
              }`}
              onClick={() => setActiveView("DirectMessage")}
            >
              <FontAwesomeIcon icon={faMessage} style={{marginRight: "8", fontSize: "18px"}} />
              Direct Message
            </li>
            <li
              className={`chat-items ${
                activeView === "GroupChat" ? "active" : ""
              }`}
              onClick={() => setActiveView("GroupChat")}

            >
              <FontAwesomeIcon icon={faComments} style={{marginRight: "8", fontSize: "18px"}} />
              Group Chat
            </li>
            <li
              className={`chat-items ${
                activeView === "Notification" ? "active" : ""
              }`}
              onClick={() => setActiveView("Notification")}
            >
              <FontAwesomeIcon icon={faBell} style={{marginRight: "8", fontSize: "18px"}} />
              Notifications
            </li>
          </ul>
          <div className="search-section">
            <input
              type="text"
              value={searchQuery}
              placeholder="Search by Email"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button onClick={handleSearch}>
            <FontAwesomeIcon icon={faMagnifyingGlass} style={{marginRight: "8", fontSize: "18px"}} />
              Search
              </button>
          </div>
        </div>
        <div className="chat-content">{renderContent()}</div>
      </div>
    </div>
    </div>
  );
};

export default Inbox;
