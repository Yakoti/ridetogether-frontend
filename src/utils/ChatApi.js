import { sendMessage } from "../utils/stompUtils";
// Fetch chat rooms
export async function fetchChatRooms() {
  const response = await fetch("/chat-history/rides");
  if (!response.ok) throw new Error("Failed to fetch chat rooms");
  return response.json();
}

// Create new chat room
export async function createChatRoom(roomName) {
  const response = await fetch("/chat-history/rides", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: roomName }),
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Failed to create chat room");
  }
  return true; // backend returns empty 200 OK on success
}

// Fetch chat logs
export async function fetchChatLogs(rideId) {
  const response = await fetch(`/chat-history/messages/${encodeURIComponent(rideId)}`);
  if (!response.ok) throw new Error("Failed to fetch chat logs");
  return response.json();
}


const sendFileHandler = (file, rideId, username, aesKey) => {
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
    // Encrypt the file, pass aesKey!
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



