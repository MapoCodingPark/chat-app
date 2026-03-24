// src/mock/chatMock.ts
import type { ChatRoom, MessagesByRoomId, UsersById } from '../types/chat.ts';

export const CURRENT_USER_ID = 'me';

export const usersById: UsersById = {
  me: {
    id: 'me',
    name: 'Me',
  },
  user1: {
    id: 'user1',
    name: 'Alice',
  },
  user2: {
    id: 'user2',
    name: 'Bob',
  },
  user3: {
    id: 'user3',
    name: 'Dream',
  },
};

export const messagesByRoomId: MessagesByRoomId = {
  room1: [
    {
      id: 'message1',
      roomId: 'room1',
      senderId: 'user1',
      text: '안녕하세요!',
      createdAt: '2026-03-20T09:00:00',
    },
    {
      id: 'message2',
      roomId: 'room1',
      senderId: 'me',
      text: '안녕하세요. 반가워요.',
      createdAt: '2026-03-20T09:01:00',
    },
  ],
  room2: [
    {
      id: 'message3',
      roomId: 'room2',
      senderId: 'user2',
      text: '오늘 저녁에 시간 괜찮으세요?',
      createdAt: '2026-03-22T08:30:00',
    },
    {
      id: 'message4',
      roomId: 'room2',
      senderId: 'user2',
      text: '확인 부탁드려요!',
      createdAt: '2026-03-22T08:31:00',
    },
  ],
  room3: [
    {
      id: 'message5',
      roomId: 'room3',
      senderId: 'user3',
      text: '오늘 저녁은 피자 어때 ?',
      createdAt: '2026-03-23T15:30:00',
    },
    {
      id: 'message5',
      roomId: 'room3',
      senderId: 'user3',
      text: '아니면 다른 것도 좋아',
      createdAt: '2026-03-23T15:31:00',
    },
    {
      id: 'message5',
      roomId: 'room3',
      senderId: 'user3',
      text: '피맥 ㄱ? 피맥 ㄱ? 피맥 ㄱ? 피맥 ㄱ? 피맥 ㄱ? 피맥 ㄱ? 피맥 ㄱ? 피맥 ㄱ? 피맥 ㄱ? 피맥 ㄱ? 피맥 ㄱ? 피맥 ㄱ? 피맥 ㄱ? 피맥 ㄱ? 피맥 ㄱ? 피맥 ㄱ? 피맥 ㄱ? 피맥 ㄱ? 피맥 ㄱ? ',
      createdAt: '2026-03-23T15:31:30',
    },
  ],
};

export const chatRooms: ChatRoom[] = [
  {
    id: 'room1',
    name: 'Alice',
    participantIds: ['me', 'user1'],
    unreadCount: 0,
    lastMessage: {
      text: '안녕하세요. 반가워요.',
      createdAt: '2026-03-20T09:01:00',
    },
  },
  {
    id: 'room2',
    name: 'Bobeeeeee',
    participantIds: ['me', 'user2'],
    unreadCount: 2,
    lastMessage: {
      text: '확인 부탁드려요!',
      createdAt: '2026-03-22T08:31:00',
    },
  },
  {
    id: 'room3',
    name: 'Dream Home',
    participantIds: ['me', 'user3'],
    unreadCount: 3,
    lastMessage: {
      text: '피맥 ㄱ? 피맥 ㄱ? 피맥 ㄱ? 피맥 ㄱ? 피맥 ㄱ? 피맥 ㄱ? 피맥 ㄱ? 피맥 ㄱ? 피맥 ㄱ? 피맥 ㄱ? 피맥 ㄱ? 피맥 ㄱ? 피맥 ㄱ? 피맥 ㄱ? 피맥 ㄱ? 피맥 ㄱ? 피맥 ㄱ? 피맥 ㄱ? 피맥 ㄱ? ',
      createdAt: '2026-03-23T15:31:30',
    },
  },
];
