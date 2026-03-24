import { memo } from 'react';
import styled from '@emotion/styled';
import { useChatStore } from '../../store/chatStore.ts';
import MessageListItem from './MessageListItem.tsx';
import { tokens } from '../../styles/tokens.ts';

type MessageListProps = {
  roomId: string;
};

const MessageList = memo(({ roomId }: MessageListProps) => {
  const messages = useChatStore((state) => state.messagesByRoomId[roomId] ?? []);
  const currentUserId = useChatStore((state) => state.currentUserId);
  const usersById = useChatStore((state) => state.usersById);

  return (
    <ListWrapper>
      <List>
        {messages.map((message) => {
          const sender = usersById[message.senderId];
          const isMine = message.senderId === currentUserId;

          return (
            <MessageListItem
              key={message.id}
              senderName={sender?.name ?? 'Unknown'}
              text={message.text}
              createdAt={message.createdAt}
              isMine={isMine}
            />
          );
        })}
      </List>
    </ListWrapper>
  );
});

MessageList.displayName = 'MessageList';
export default MessageList;

const ListWrapper = styled.main`
  flex: 1 0 0;
  min-height: 0;
  padding: ${tokens.spacing.xs};
  overflow-y: auto;
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${tokens.spacing.xs};
`;
