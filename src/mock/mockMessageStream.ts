import { useChatStore } from '../store/chatStore.ts';

const mockTexts = [
  '지금 확인 부탁해요',
  '오케이 좋습니다',
  '이건 어떻게 생각해?',
  '조금 있다가 다시 이야기하자',
  '방금 내용 반영했어요',
  '회의 전에 한 번만 봐줘',
  '좋아요!',
];

const getRandomItem = <T>(items: T[]): T => items[Math.floor(Math.random() * items.length)];

export const startMockMessageStream = () => {
  const intervalId = window.setInterval(() => {
    const state = useChatStore.getState();

    const candidateRooms = state.chatRooms.filter((room) =>
      room.participantIds.includes(state.currentUserId),
    );

    if (candidateRooms.length === 0) {
      return;
    }

    const room = getRandomItem(candidateRooms);

    const otherParticipantIds = room.participantIds.filter((id) => id !== state.currentUserId);

    if (otherParticipantIds.length === 0) {
      return;
    }

    const senderId = getRandomItem(otherParticipantIds);
    const text = getRandomItem(mockTexts);

    state.receiveMessage(room.id, text, senderId);
  }, 5000);

  return () => {
    window.clearInterval(intervalId);
  };
};
