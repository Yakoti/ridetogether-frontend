import React, { useState, useEffect } from "react";
import CryptoJS from "crypto-js";
import { Box, Paper, Typography } from "@mui/material";
import ChatApp from "./ChatPage";
import JoinForm from "./JoinForm";
import {
  fetchChatRooms,
  createChatRoom,
  fetchChatLogs,
} from "../../utils/ChatApi";
import { sendMessage, connectWebSocket, isConnected, disconnectWebSocket } from "../../utils/stompUtils";
import { prepareFileEncrypt } from "../../utils/cryptoUtils"; // Ensure this takes a key param

const ChatContainer = () => {
  const [username, setUsername] = useState("");
  const [rideId, setRideId] = useState("");
  const [chatRooms, setChatRooms] = useState([]);
  const [message, setMessage] = useState("");
  const [logs, setLogs] = useState([]);
  const [joined, setJoined] = useState(false);
  const [connected, setConnected] = useState(false);
  const [aesKey, setAesKey] = useState(null);

  
  // Fetch chat rooms on load
  useEffect(() => {
    fetchChatRooms().then(setChatRooms).catch(console.error);
  }, []);

  // Fetch chat logs when joined and rideId changes
  useEffect(() => {
    if (joined && rideId) {
      fetchChatLogs(rideId)
        .then(setLogs)
        .catch(console.error);
    }
  }, [joined, rideId]);

  // WebSocket connection management
  useEffect(() => {
    if (joined && rideId) {
      connectWebSocket(
        rideId,
        (msg) => setLogs((prev) => [...prev, msg]),
        () => setConnected(true),
        () => setConnected(false)
      );
    }
    return () => {
      disconnectWebSocket();
      setConnected(false);
    };
  }, [joined, rideId]);

  // Prompt for AES key on join, parse as Base64
  const onJoin = () => {
    if (username.trim() && rideId.trim()) {
      const keyStr = window.prompt("Enter AES chat key:");
      if (!keyStr) {
        alert("You must enter the chat key!");
        return;
      }
      setAesKey(CryptoJS.enc.Base64.parse(keyStr)); // Base64, not UTF-8
      setJoined(true);
    }
  };

  const onCreateRoom = (name) => {
    createChatRoom(name)
      .then(() => fetchChatRooms())
      .then(setChatRooms)
      .catch(console.error);
  };

  // Send text message via WebSocket, encrypt if desired
  const sendMsg = () => {
    if (!connected) {
      alert("Please connect first!");
      return;
    }
    if (!message.trim()) return;
    sendMessage(rideId, {
      sender: username,
      senderName: username,
      content: aesKey ? CryptoJS.AES.encrypt(message, aesKey, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
      }).toString() : message,
      rideId,
      encrypted: Boolean(aesKey),
    });
    setMessage("");
  };

  // Send file using WS and AES encryption
  const sendFileHandler = (file) => {
    const MAX_FILE_SIZE = 50 * 1024 * 1024;
    if (!file) return;
    const allowedTypes = ["image/", "video/"];
    const fileTypeOk = allowedTypes.some((t) => file.type.startsWith(t));
    const extOk = /\.(png|jpeg|gif|bmp|webp|mp4|webm|mov|avi)$/i.test(file.name);

    if (!fileTypeOk && !extOk) {
      alert("Only image/video files allowed.");
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      alert("File too large, max 50MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      // Encrypt file using the current AES key
      const base64EncryptedStr = prepareFileEncrypt(reader.result, aesKey);
      sendMessage(rideId, {
        sender: username,
        senderName: username,
        content: base64EncryptedStr,
        rideId,
        encrypted: true,
        fileName: file.name,
        fileType: file.type,
      });
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <Box sx={{
      height: "100vh", bgcolor: "#f0f2f5", display: "flex",
      justifyContent: "center", alignItems: "center", padding: 2,
    }}>
      <Paper elevation={4} sx={{
        width: 400, maxHeight: "90vh", overflow: "auto", p: 2, borderRadius: 3,
      }}>
        <Typography variant="h4" gutterBottom textAlign="center">
          RideTogether Chat
        </Typography>
        {!joined ? (
          <JoinForm
            username={username}
            setUsername={setUsername}
            rideId={rideId}
            setRideId={setRideId}
            chatRooms={chatRooms}
            onJoin={onJoin}
            onCreateRoom={onCreateRoom}
          />
        ) : (
          <ChatApp
            username={username}
            rideId={rideId}
            message={message}
            setMessage={setMessage}
            logs={logs}
            sendMsg={sendMsg}
            sendFile={sendFileHandler}
            aesKey={aesKey}
          />
        )}
      </Paper>
    </Box>
  );
};

export default ChatContainer;
