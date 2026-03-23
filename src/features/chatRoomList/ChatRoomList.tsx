import styled from '@emotion/styled';
import Header from './Header.tsx';
import { memo } from 'react';

type ChatRoomListProps = {
  isRoomSelected: boolean;
};

const CHAT_ROOM_TITLE = '채팅방';

const ChatRoomList = memo(({ isRoomSelected }: ChatRoomListProps) => {
  return (
    <ListWrapper isRoomSelected={isRoomSelected}>
      <Header title={CHAT_ROOM_TITLE} />
    </ListWrapper>
  );
});

ChatRoomList.displayName = 'ChatRoomList';
export default ChatRoomList;

const ListWrapper = styled('div', {
  shouldForwardProp: (props) => props !== 'roomSelected',
})<ChatRoomListProps>`
  width: ${({ isRoomSelected }) => (isRoomSelected ? '10%' : '90%')};
  height: 100%;
  background-color: white;
`;
