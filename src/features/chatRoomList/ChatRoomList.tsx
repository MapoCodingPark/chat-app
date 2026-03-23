import styled from '@emotion/styled';
import Header from './Header.tsx';
import { memo } from 'react';
import { useChatStore } from '../../store/chatStore.ts';
import ChatRoomListItem from './ChatRoomListItem.tsx';

const CHAT_ROOM_TITLE = '채팅방';

const ChatRoomList = memo(() => {
  const selectedRoomId = useChatStore((state) => state.selectedRoomId);
  const chatRooms = useChatStore((state) => state.chatRooms);
  const selectRoom = useChatStore((state) => state.selectRoom);

  return (
    <ListWrapper isRoomSelected={!!selectedRoomId}>
      <Header title={CHAT_ROOM_TITLE} />
      <RoomList>
        {chatRooms.map((room) => (
          <ChatRoomListItem
            key={room.id}
            room={room}
            isSelected={room.id === selectedRoomId}
            isRoomSelected={!!selectedRoomId}
            onClick={() => selectRoom(room.id)}
          />
        ))}
      </RoomList>
    </ListWrapper>
  );
});

ChatRoomList.displayName = 'ChatRoomList';
export default ChatRoomList;

const ListWrapper = styled('div', {
  shouldForwardProp: (props) => props !== 'roomSelected',
})<{ isRoomSelected: boolean }>`
  width: ${({ isRoomSelected }) => (isRoomSelected ? '20%' : '90%')};
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const RoomList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
