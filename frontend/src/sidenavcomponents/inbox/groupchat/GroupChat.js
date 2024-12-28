import React, { useState } from 'react';
import './GroupChat.css';

const GroupChat = () => {
    const [groups, setGroups] = useState([]);
    const [currentGroup, setCurrentGroup] = useState(null);
    const [groupName, setGroupName] = useState('');
    const [newUser, setNewUser] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    // Create a new group
    const handleCreateGroup = () => {
        if (groupName.trim()) {
            const newGroup = {
                id: groups.length + 1,
                name: groupName,
                users: [],
                messages: [],
            };
            setGroups([...groups, newGroup]);
            setGroupName('');
        } else {
            setError('Group name cannot be empty.');
        }
    };

    // Add a user to the group
    const handleAddUser = () => {
        if (newUser.trim() && currentGroup) {
            if (!currentGroup.users.includes(newUser)) {
                const updatedGroup = {
                    ...currentGroup,
                    users: [...currentGroup.users, newUser],
                };
                setGroups(groups.map((g) => (g.id === currentGroup.id ? updatedGroup : g)));
                setCurrentGroup(updatedGroup);
                setNewUser('');
                setError('');
            } else {
                setError('User already exists in the group.');
            }
        } else {
            setError('Select a group and provide a valid user name.');
        }
    };

    // Remove a user from the group
    const handleRemoveUser = (userToRemove) => {
        if (currentGroup) {
            const updatedGroup = {
                ...currentGroup,
                users: currentGroup.users.filter((user) => user !== userToRemove),
            };
            setGroups(groups.map((g) => (g.id === currentGroup.id ? updatedGroup : g)));
            setCurrentGroup(updatedGroup);
        }
    };

    // Send a message in the group
    const handleSendMessage = () => {
        if (message.trim() && currentGroup) {
            const newMessage = {
                id: currentGroup.messages.length + 1,
                text: message,
                sender: 'You',
                timestamp: new Date().toLocaleTimeString(),
            };
            const updatedGroup = {
                ...currentGroup,
                messages: [...currentGroup.messages, newMessage],
            };
            setGroups(groups.map((g) => (g.id === currentGroup.id ? updatedGroup : g)));
            setCurrentGroup(updatedGroup);
            setMessage('');
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
                            className={`group ${currentGroup?.id === group.id ? 'active' : ''}`}
                            onClick={() => setCurrentGroup(group)}
                        >
                            {group.name}
                        </div>
                    ))
                )}
                <div className="create-group">
                    <input
                        type="text"
                        value={groupName}
                        placeholder="Enter group name..."
                        onChange={(e) => setGroupName(e.target.value)}
                    />
                    <button onClick={handleCreateGroup}>Create Group</button>
                </div>
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
                                        <button onClick={() => handleRemoveUser(user)}>Remove</button>
                                    </div>
                                ))
                            )}
                            <div className="add-user">
                                <input
                                    type="text"
                                    value={newUser}
                                    placeholder="Add user..."
                                    onChange={(e) => setNewUser(e.target.value)}
                                />
                                <button onClick={handleAddUser}>Add User</button>
                            </div>
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
                        <div className="message-input">
                            <input
                                type="text"
                                value={message}
                                placeholder="Type a message..."
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                            />
                            <button onClick={handleSendMessage}>Send</button>
                        </div>
                    </>
                ) : (
                    <p>Select or create a group to start chatting.</p>
                )}
                {error && <p className="error">{error}</p>}
            </div>
        </div>
    );
};

export default GroupChat;
