import { create } from 'zustand';

import { chatRooms, CURRENT_USER_ID, messagesByRoomId, usersById } from '../mock/chatMock';
import type { ChatRoom, Message, MessagesByRoomId, UsersById } from '../types/chat';

type ChatStore = {
    currentUserId: string;
    selectedRoomId: string | null;
    chatRooms: ChatRoom[];
    messagesByRoomId: MessagesByRoomId;
    usersById: UsersById;
    selectRoom: (roomId: string) => void;
    sendMessage: (roomId: string, text: string) => void;
    receiveMessage: (roomId: string, message: Message) => void;
};

export const useChatStore = create<ChatStore>((set) => ({
    currentUserId: CURRENT_USER_ID,
    selectedRoomId: chatRooms[0]?.id ?? null,
    chatRooms: sortChatRoomsByLatestMessage(chatRooms, messagesByRoomId),
    messagesByRoomId,
    usersById,

    selectRoom: (roomId) =>
        set((state) => ({
            selectedRoomId: roomId,
            chatRooms: state.chatRooms.map((room) =>
                room.id === roomId ? { ...room, unreadCount: 0 } : room,
            ),
        })),

    sendMessage: (roomId, text) =>
        set((state) => {
            const trimmedText = text.trim();

            if (!trimmedText) {
                return state;
            }

            const newMessage: Message = {
                id: crypto.randomUUID(),
                roomId,
                senderId: state.currentUserId,
                text: trimmedText,
                createdAt: new Date().toISOString(),
            };

            const nextMessagesByRoomId = {
                ...state.messagesByRoomId,
                [roomId]: [...(state.messagesByRoomId[roomId] ?? []), newMessage],
            };

            return {
                messagesByRoomId: nextMessagesByRoomId,
                chatRooms: sortChatRoomsByLatestMessage(state.chatRooms, nextMessagesByRoomId),
            };
        }),

    receiveMessage: (roomId, message) =>
        set((state) => {
            const nextMessagesByRoomId = {
                ...state.messagesByRoomId,
                [roomId]: [...(state.messagesByRoomId[roomId] ?? []), message],
            };

            const nextChatRooms = state.chatRooms.map((room) => {
                if (room.id !== roomId) {
                    return room;
                }

                const isSelectedRoom = state.selectedRoomId === roomId;

                return {
                    ...room,
                    unreadCount: isSelectedRoom ? 0 : room.unreadCount + 1,
                };
            });

            return {
                messagesByRoomId: nextMessagesByRoomId,
                chatRooms: sortChatRoomsByLatestMessage(nextChatRooms, nextMessagesByRoomId),
            };
        }),
}));

const sortChatRoomsByLatestMessage = (chatRooms: ChatRoom[], messagesByRoomId: MessagesByRoomId) => {
    return [...chatRooms].sort((a, b) => {
        const latestMessageOfA = messagesByRoomId[a.id]?.at(-1);
        const latestMessageOfB = messagesByRoomId[b.id]?.at(-1);

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
}