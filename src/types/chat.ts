export type User = {
  id: string;
  name: string;
  avatar?: string;
};

export type Message = {
  id: string;
  roomId: string;
  senderId: string;
  text: string;
  createdAt: string;
};

export type ChatRoom = {
  id: string;
  name: string;
  participantIds: string[];
  unreadCount: number;
  lastMessage?: {
    text: string;
    createdAt: string;
  } | null;
};

export type MessagesByRoomId = Record<string, Message[]>;

export type UsersById = Record<string, User>;
