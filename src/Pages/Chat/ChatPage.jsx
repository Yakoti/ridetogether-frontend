import React from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import { decryptAES128, decryptAESBytes } from "../../utils/cryptoUtils"; // Make sure both are imported!

// Helper: nicely formatted date
function formatDate(dateStr) {
  // Handles both ISO strings and JS Date objects
  const date = typeof dateStr === "string" ? new Date(dateStr) : dateStr;
  if (isNaN(date)) return ""; // Fallback
  // Example: 19:43 or Aug 15, 19:43 for old messages
  const pad = n => n.toString().padStart(2, "0");
  const now = new Date();
  return (now.toDateString() === date.toDateString())
    ? `${pad(date.getHours())}:${pad(date.getMinutes())}`
    : `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

// Debug log for troubleshooting
function debugLogDecrypt(msg, aesKey) {
  // Print first 64 chars of encrypted content for easy comparison
  console.log("Encrypted content (start):", (msg.content || "").slice(0, 64));
  const keyBytes = [];
  for (let w of aesKey.words) {
    keyBytes.push((w >> 24) & 0xff, (w >> 16) & 0xff, (w >> 8) & 0xff, w & 0xff);
  }
  const keyBase64 = window.btoa(String.fromCharCode(...keyBytes)).replace(/=+$/,"");
  console.log("AES key base64:", keyBase64, "(length: " + keyBytes.length + " bytes)");
}

// Display content based on type
function getDisplayContent(msg, aesKey) {
  if (!msg.encrypted) {
    return msg.content || "[empty message]";
  }
  debugLogDecrypt(msg, aesKey);

  // Handle files
  if (msg.fileType && msg.fileType.startsWith("image/")) {
    try {
      const bytes = decryptAESBytes(msg.content, aesKey);
      const blob = new Blob([bytes], { type: msg.fileType });
      const url = URL.createObjectURL(blob);
      return (
        <img
          src={url}
          alt={msg.fileName || "image"}
          style={{ maxWidth: 240, maxHeight: 360, borderRadius: 8 }}
        />
      );
    } catch {
      return "[decrypt error]";
    }
  }
  // Handle text messages
  try {
    const decrypted = decryptAES128(msg.content, aesKey);
    if (typeof decrypted !== "string" || !decrypted.trim())
      return "[decrypt error or empty]";
    return decrypted;
  } catch {
    return "[decrypt error]";
  }
}

const ChatApp = ({
  username,
  setUsername,
  rideId,
  setRideId,
  chatRooms,
  message,
  setMessage,
  sendMsg,
  sendFile,
  logs,
  aesKey
}) => (
  <Box
    sx={{
      p: 3, bgcolor: "#fff", borderRadius: 2,
      boxShadow: 2, width: 360, display: "flex",
      flexDirection: "column", gap: 2,
    }}
  >
    <Typography variant="h6" gutterBottom>
      Chat Room: {rideId}
    </Typography>
    <Box
      sx={{
        p: 1, border: "1px solid #ccc",
        height: 500, width: 360, overflowY: "auto",
        bgcolor: "#f5f5f5", borderRadius: 1,
        display: "flex", flexDirection: "column",
      }}
      id="chat-log"
    >
      {logs.map((msg) => (
        <Box
          key={msg.id}
          sx={{
            alignSelf: msg.isMine ? "flex-start" : "flex-end",
            background: msg.isMine
              ? "#007bff"
              : "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
            color: "#fff",
            borderRadius: 2,
            padding: "8px 12px",
            minWidth: "80px",
            maxWidth: "85%",
            wordBreak: "break-word",
            whiteSpace: "pre-line",
            boxShadow: "0 1px 1px rgba(0,0,0,0.1)",
            marginBottom: 1,
            userSelect: "text",
            textAlign: "left",
          }}
        >
          {/* Username (left) and time (right), faded and small */}
          <Box sx={{ fontSize: '0.83em', opacity: 0.75, mb: '2px', display: "flex", justifyContent: "space-between" }}>
            <span>{msg.senderName || msg.sender || "Unknown"}</span>
            <span>{formatDate(msg.sentDate)}</span>
          </Box>
          {/* Actual content */}
          {getDisplayContent(msg, aesKey)}
        </Box>
      ))}
    </Box>
    <TextField
      label="Message"
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      size="medium"
      fullWidth
      multiline
      maxRows={5}
      onKeyDown={(e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          sendMsg();
        }
      }}
    />
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Button variant="contained" onClick={sendMsg}>SEND</Button>
      <Button variant="outlined" component="label">
        UPLOAD
        <input
          type="file"
          accept="image/*,video/*"
          hidden
          onChange={e => {
            if (e.target.files.length > 0) sendFile(e.target.files[0]);
            e.target.value = null;
          }}
        />
      </Button>
    </Box>
  </Box>
);

export default ChatApp;
