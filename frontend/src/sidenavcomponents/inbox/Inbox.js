import React, { useState } from "react";
import DirectMessage from "./directmessage/DirectMessage";
import GroupChat from "./groupchat/GroupChat";
import Notification from "./notifications/Notifications";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage, faComments, faBell, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import "./Inbox.css";

const Inbox = () => {
  



  return (

    <div className="inbox-page">

     <div className="workspace">
            <h1>Workspace</h1>
            <p>Welcome to your Inbox!</p>
        </div>

    
      
    </div>
    
  );
};

export default Inbox;
