import { create } from 'zustand';

import { chatRooms, CURRENT_USER_ID, messagesByRoomId, usersById } from '../mock/chatMock.ts';
import type { ChatRoom, Message, MessagesByRoomId, UsersById } from '../types/chat.ts';

type ChatStore = {
  currentUserId: string;
  selectedRoomId: string | null;
  chatRooms: ChatRoom[];
  messagesByRoomId: MessagesByRoomId;
  usersById: UsersById;
  selectRoom: (roomId: string) => void;
  unselectRoom: () => void;
  sendMessage: (roomId: string, text: string) => void;
  receiveMessage: (roomId: string, message: string, senderId: string) => void;
};

const sortChatRoomsByLatestMessage = (chatRooms: ChatRoom[]) => {
  return [...chatRooms].sort((a, b) => {
    const latestMessageOfA = a.lastMessage;
    const latestMessageOfB = b.lastMessage;

    if (!latestMessageOfA && !latestMessageOfB) {
      return 0;
    }

    if (!latestMessageOfA) {
      return 1;
    }

    if (!latestMessageOfB) {
      return -1;
    }

    return (
      new Date(latestMessageOfB.createdAt).getTime() -
      new Date(latestMessageOfA.createdAt).getTime()
    );
  });
};

const createMessage = ({
  roomId,
  senderId,
  text,
}: {
  roomId: string;
  senderId: string;
  text: string;
}): Message => ({
  id: crypto.randomUUID(),
  roomId,
  senderId,
  text,
  createdAt: new Date().toISOString(),
});

const appendMessageToRoom = ({
  chatRooms,
  messagesByRoomId,
  roomId,
  message,
  increaseUnread,
}: {
  chatRooms: ChatRoom[];
  messagesByRoomId: MessagesByRoomId;
  roomId: string;
  message: Message;
  increaseUnread: boolean;
}): { nextMessagesByRoomId: MessagesByRoomId; nextChatRooms: ChatRoom[] } => {
  const nextMessages = [...(messagesByRoomId[roomId] ?? []), message];

  const nextChatRooms = sortChatRoomsByLatestMessage(
    chatRooms.map((room) =>
      room.id === roomId
        ? {
            ...room,
            lastMessage: {
              text: message.text,
              createdAt: message.createdAt,
            },
            unreadCount: increaseUnread ? room.unreadCount + 1 : room.unreadCount,
          }
        : room,
    ),
  );

  return {
    nextMessagesByRoomId: {
      ...messagesByRoomId,
      [roomId]: nextMessages,
    },
    nextChatRooms: nextChatRooms,
  };
};

export const useChatStore = create<ChatStore>((set) => ({
  currentUserId: CURRENT_USER_ID,
  selectedRoomId: null,
  chatRooms: sortChatRoomsByLatestMessage(chatRooms),
  messagesByRoomId,
  usersById,

  selectRoom: (roomId) =>
    set((state) => ({
      selectedRoomId: roomId,
      chatRooms: state.chatRooms.map((room) =>
        room.id === roomId ? { ...room, unreadCount: 0 } : room,
      ),
    })),

  unselectRoom: () =>
    set(() => ({
      selectedRoomId: null,
    })),

  sendMessage: (roomId, text) =>
    set((state) => {
      const trimmedText = text.trim();

      if (!trimmedText) {
        return state;
      }

      const message = createMessage({
        roomId,
        senderId: state.currentUserId,
        text: trimmedText,
      });

      const { nextMessagesByRoomId, nextChatRooms } = appendMessageToRoom({
        chatRooms: state.chatRooms,
        messagesByRoomId: state.messagesByRoomId,
        roomId,
        message,
        increaseUnread: false,
      });

      return {
        messagesByRoomId: nextMessagesByRoomId,
        chatRooms: nextChatRooms,
      };
    }),

  receiveMessage: (roomId, text, senderId) =>
    set((state) => {
      const trimmedText = text.trim();

      if (!trimmedText) {
        return state;
      }

      const message = createMessage({
        roomId,
        senderId,
        text: trimmedText,
      });

      const { nextMessagesByRoomId, nextChatRooms } = appendMessageToRoom({
        chatRooms: state.chatRooms,
        messagesByRoomId: state.messagesByRoomId,
        roomId,
        message,
        increaseUnread: state.selectedRoomId !== roomId,
      });

      return {
        messagesByRoomId: nextMessagesByRoomId,
        chatRooms: nextChatRooms,
      };
    }),
}));
