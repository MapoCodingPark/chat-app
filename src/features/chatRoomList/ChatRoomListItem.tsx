import { memo } from 'react';
import { formatMessageTime } from '../../utils/formatMessageTime.ts';
import styled from '@emotion/styled';
import type { ChatRoom } from '../../types/chat.ts';
import CountBadge from './CountBadge.tsx';
import { ellipsis } from '../../utils/styleUtils.ts';

type ChatRoomListItemProps = {
  room: ChatRoom;
  isSelected: boolean;
  isRoomSelected: boolean;
  onClick: () => void;
};

const ChatRoomListItem = memo(
  ({ room, isSelected, isRoomSelected, onClick }: ChatRoomListItemProps) => {
    const lastMessageText = room.lastMessage?.text ?? '';
    const lastMessageTime = room.lastMessage?.createdAt
      ? formatMessageTime(room.lastMessage.createdAt)
      : '';

    return (
      <ChatRoomItem isSelected={isSelected}>
        <ChatRoomItemButton onClick={onClick}>
          <ContentWrapper>
            <ItemTitle>{room.name}</ItemTitle>
            {!isRoomSelected && <ItemLastMessageTime>{lastMessageTime}</ItemLastMessageTime>}
          </ContentWrapper>
          <ContentWrapper>
            {!isRoomSelected && <ItemLastMessage>{lastMessageText}</ItemLastMessage>}
            <CountBadge count={room.unreadCount} />
          </ContentWrapper>
        </ChatRoomItemButton>
      </ChatRoomItem>
    );
  },
);

ChatRoomListItem.displayName = 'ChatRoomListItem';
export default ChatRoomListItem;

const ChatRoomItem = styled('li', { shouldForwardProp: (props) => props !== 'isSelected' })<{
  isSelected: boolean;
}>`
  background-color: ${({ isSelected }) => (isSelected ? 'yellow' : '#fff')};
`;

const ChatRoomItemButton = styled.button`
  width: 100%;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
`;

const ItemTitle = styled.h4`
  flex: 1 0 0;
  margin: 0;
  ${ellipsis()};
`;

const ItemLastMessageTime = styled.p`
  font-size: 0.7rem;
  color: dimgray;
  margin: 0;
`;

const ItemLastMessage = styled.p`
  flex: 1 0 0;
  font-size: 0.7rem;
  color: dimgray;
  margin: 0;
  ${ellipsis(2)};
`;
