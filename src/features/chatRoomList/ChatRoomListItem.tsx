import { memo } from 'react';
import { formatMessageTime } from '../../utils/formatMessageTime.ts';
import styled from '@emotion/styled';
import type { ChatRoom } from '../../types/chat.ts';

type ChatRoomListItemProps = {
  room: ChatRoom;
  isSelected: boolean;
  isRoomSelected: boolean;
  onClick: () => void;
};

const ChatRoomListItem = memo(
  ({ room, isSelected, isRoomSelected, onClick }: ChatRoomListItemProps) => {
    const lastMessageText = room.lastMessage?.text ?? '아직 메시지가 없습니다.';
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
            <div>{room.unreadCount}</div>
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
  background-color: white;
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
  display: flex;
  align-items: center;
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
`;
