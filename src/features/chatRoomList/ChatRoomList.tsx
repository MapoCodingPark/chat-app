import styled from '@emotion/styled';
import Header from './Header.tsx';
import { memo, useCallback } from 'react';
import { useChatStore } from '../../store/chatStore.ts';
import ChatRoomListItem from './ChatRoomListItem.tsx';
import { Z_INDEX } from '../constants.ts';

const CHAT_ROOM_TITLE = 'Chat';

const ChatRoomList = memo(() => {
  const selectedRoomId = useChatStore((state) => state.selectedRoomId);
  const chatRooms = useChatStore((state) => state.chatRooms);
  const selectRoom = useChatStore((state) => state.selectRoom);
  const unselectRoom = useChatStore((state) => state.unselectRoom);

  const handleItemClick = useCallback(
    (id: string) => {
      if (selectedRoomId === id) {
        unselectRoom();
      } else {
        selectRoom(id);
      }
    },
    [selectRoom, selectedRoomId, unselectRoom],
  );

  return (
    <ListWrapper isRoomSelected={!!selectedRoomId}>
      <Header title={CHAT_ROOM_TITLE} onClick={unselectRoom} />
      <RoomList>
        {chatRooms.map((room) => (
          <ChatRoomListItem
            key={room.id}
            room={room}
            isSelected={room.id === selectedRoomId}
            isRoomSelected={!!selectedRoomId}
            onClick={() => handleItemClick(room.id)}
          />
        ))}
      </RoomList>
    </ListWrapper>
  );
});

ChatRoomList.displayName = 'ChatRoomList';
export default ChatRoomList;

const ListWrapper = styled('div', {
  shouldForwardProp: (props) => props !== 'isRoomSelected',
})<{ isRoomSelected: boolean }>`
  width: ${({ isRoomSelected }) => (isRoomSelected ? '15%' : '95%')};
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  box-shadow: 4px 0 8px rgba(0, 0, 0, 0.08);
  z-index: ${Z_INDEX.FLOW + 1};
`;

const RoomList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
