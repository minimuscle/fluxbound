const rooms = new Set<string>();

export const getRoomId = (roomId: string) => {
  if (rooms.has(roomId)) {
    return roomId;
  }
  rooms.add(roomId);
  return roomId;
};
