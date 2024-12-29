import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPlus } from "@fortawesome/free-solid-svg-icons";
import "./GroupChat.css";

const GroupChat = () => {
  const [groups, setGroups] = useState([]);
  const [currentGroup, setCurrentGroup] = useState(null);
  const [groupName, setGroupName] = useState("");
  const [groupMates, setGroupMates] = useState([]);
  const [newMate, setNewMate] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState("");

  // Create a new group
  const handleCreateGroup = () => {
    if (groupName.trim()) {
      const newGroup = {
        id: groups.length + 1,
        name: groupName,
        users: groupMates,
        messages: [],
      };
      setGroups([...groups, newGroup]);
      setGroupName("");
      setGroupMates([]);
      setIsModalOpen(false); // Close modal
    } else {
      setError("Group name cannot be empty.");
    }
  };

  // Add a new group mate to the list
  const handleAddMate = () => {
    if (newMate.trim() && !groupMates.includes(newMate)) {
      setGroupMates([...groupMates, newMate]);
      setNewMate("");
    }
  };

  // Remove a mate from the list
  const handleRemoveMate = (mateToRemove) => {
    setGroupMates(groupMates.filter((mate) => mate !== mateToRemove));
  };

  // Send a message in the group
  const handleSendMessage = (message) => {
    if (message.trim() && currentGroup) {
      const newMessage = {
        id: currentGroup.messages.length + 1,
        text: message,
        sender: "You",
        timestamp: new Date().toLocaleTimeString(),
      };
      const updatedGroup = {
        ...currentGroup,
        messages: [...currentGroup.messages, newMessage],
      };
      setGroups(groups.map((g) => (g.id === currentGroup.id ? updatedGroup : g)));
      setCurrentGroup(updatedGroup);
    }
  };

  return (
    <div className="group-chat-container">
      <div className="groupchat-sidebar">
        <h3>Groups</h3>
        {groups.length === 0 ? (
          <p>No groups yet.</p>
        ) : (
          groups.map((group) => (
            <div
              key={group.id}
              className={`group ${currentGroup?.id === group.id ? "active" : ""}`}
              onClick={() => setCurrentGroup(group)}
            >
              {group.name}
            </div>
          ))
        )}
        <button onClick={() => setIsModalOpen(true)}>Create Group</button>
      </div>

      <div className="chat-section">
        {currentGroup ? (
          <>
            <h3>Group: {currentGroup.name}</h3>
            <div className="users">
              <h4>Users</h4>
              {currentGroup.users.length === 0 ? (
                <p>No users in this group.</p>
              ) : (
                currentGroup.users.map((user) => (
                  <div key={user} className="user">
                    {user}
                  </div>
                ))
              )}
            </div>
            <div className="messages">
              <h4>Messages</h4>
              {currentGroup.messages.length === 0 ? (
                <p>No messages yet.</p>
              ) : (
                currentGroup.messages.map((msg) => (
                  <div key={msg.id} className="message">
                    <span>
                      {msg.timestamp} - {msg.sender}:
                    </span>
                    <p>{msg.text}</p>
                  </div>
                ))
              )}
            </div>
          </>
        ) : (
          <p>Select or create a group to start chatting.</p>
        )}
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Create Group</h3>
            <input
              type="text"
              value={groupName}
              placeholder="Enter group name..."
              onChange={(e) => setGroupName(e.target.value)}
            />
            <div className="add-mates">
              <input
                type="text"
                value={newMate}
                placeholder="Add group mate (optional)..."
                onChange={(e) => setNewMate(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAddMate()}
              />
              <button 
              className="add-button"
               onClick={handleAddMate}
               >
                <FontAwesomeIcon icon={faCheck} />
        
                </button>
            </div>
            <div className="mates-list">
              {groupMates.map((mate) => (
                <div key={mate} className="mate">
                  {mate}
                  <button onClick={() => handleRemoveMate(mate)}>Remove</button>
                </div>
              ))}
            </div>
            <button className="done-button" onClick={handleCreateGroup}>
              Done
            </button>
            <button
              className="cancel-button"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupChat;
