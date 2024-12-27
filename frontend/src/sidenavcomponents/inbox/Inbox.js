import React, { useState } from "react";
import DirectMessage from './directmessage/DirectMessage';
import GroupChat from './groupchat/GroupChat';
import Notification from './notifications/Notifications';
import "./Inbox.css";

const Inbox = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [activeView, setActiveView] = React.useState('inbox');

  const mockUsers = [
    "user1@example.com",
    "user2@example.com",
    "user3@example.com",
  ];

  const handleSearch = () => {
    const results = mockUsers.filter((user) => user.includes(searchQuery));
    setSearchResults(results);
  };

  

    const renderContent = () => {
        switch (activeView){
            case 'DirectMessage':
                return <DirectMessage />;
            case 'GroupChat':
                return <GroupChat />;
            case 'Notification':
                return <Notification />;
            default:
                return <Notification />;
        }
    }

  return (
    <div className="inbox-container">
      <div className="chat-section">
        <div className="search-section">
          <input
            type="text"
            value={searchQuery}
            placeholder="Search by Email"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
           <button onClick={handleSearch}>Search</button>
          
          <div className="search-results">
            {searchResults.length > 0
              ? searchResults.map((result, index) => (
                  <div key={index} className="search-result">
                    {result}
                  </div>
                ))
              : searchQuery && <p>No users found.</p>}
          </div>
        </div>

        <div className="chat-header">
            <ul className="chat-list">
                <li className="chat-items" onClick={() => setActiveView('DirectMessage')}>Direct Message</li>
                <li className="chat-items" onClick={() => setActiveView('Group Chat')}>Group Chat</li>
                <li className="chat-items" onClick={() => setActiveView('Notification')}>Notification</li>
            </ul>
            <div className="chat-content">
                {renderContent()}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Inbox;
