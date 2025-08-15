import React, { useState } from "react";
import { Box, TextField, Select, MenuItem, Button } from "@mui/material";

const JoinForm = ({
  username,
  setUsername,
  rideId,
  setRideId,
  chatRooms,
  onJoin,
  onCreateRoom,
}) => {
  const [newRoomName, setNewRoomName] = useState("");
  const isJoinDisabled = !username.trim() || !rideId.trim();
  const isCreateDisabled = !newRoomName.trim();

  return (
    <Box
      sx={{
        p: 3,
        bgcolor: "#fff",
        borderRadius: 2,
        boxShadow: 2,
        width: 300,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <TextField
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        fullWidth
        size="small"
      />

      <Select
        value={rideId}
        onChange={(e) => setRideId(e.target.value)}
        displayEmpty
        fullWidth
        size="small"
        sx={{ fontStyle: rideId ? "normal" : "italic" }}
      >
        <MenuItem value="">
          <em>Select a chat</em>
        </MenuItem>
        {chatRooms.map((room) => (
          <MenuItem key={room} value={room}>
            {room}
          </MenuItem>
        ))}
      </Select>

      <Box sx={{ display: "flex", gap: 1 }}>
        <TextField
          label="Create new chat room"
          value={newRoomName}
          onChange={(e) => setNewRoomName(e.target.value)}
          size="small"
          fullWidth
        />
        <Button
          variant="outlined"
          onClick={() => {
            if (newRoomName.trim()) {
              onCreateRoom(newRoomName.trim());
              setNewRoomName("");
            }
          }}
          disabled={isCreateDisabled}
        >
          Create
        </Button>
      </Box>

      <Button
        variant="contained"
        color="primary"
        onClick={onJoin}
        disabled={isJoinDisabled}
      >
        Join Chat
      </Button>
    </Box>
  );
};

export default JoinForm;