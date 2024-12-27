const express = require('express');
const Chat = require('../models/Chat');
const User = require('../models/User');
const router = express.Router();

router.post('/send', async (req, res) => {
    const { senderId, receiverId, message } = req.body;

    try {
        const newMessage = new Chat({
            sender: senderId,
            receiver: receiverId,
            message,
        });

        await newMessage.save();
        res.status(201).json({ message: 'Message sent successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({error: 'Failed to send message'});
    }
});

//Get all messages between two users
router.get('/history/:senderId/:receiverId', async (req, res) => {
    const { senderId, receiverId } = req.params;

    try {
        const messages = await Chat.find({
            $or: [
                { sender: senderId, receiver: receiverId },
                { sender: receiverId, receiver: senderId },
            ],
        }).sort({ timestamp: 1 });

        res.json(messages);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Failed to get messages' });
    }
});

module.exports = router;
