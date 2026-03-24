import { memo } from 'react';
import styled from '@emotion/styled';
import { tokens } from '../../styles/tokens.ts';
import { formatMessageTime } from '../../utils/formatMessageTime.ts';
import { ellipsis } from '../../utils/styleUtils.ts';

type MessageListItemProps = {
  senderName: string;
  text: string;
  createdAt: string;
  isMine: boolean;
};

const MessageListItem = memo(({ senderName, text, createdAt, isMine }: MessageListItemProps) => {
  return (
    <ItemWrapper isMine={isMine}>
      <ItemContent>
        <SenderText isMine={isMine}>{senderName}</SenderText>
        <MessageBox>
          <MessageText>{text}</MessageText>
        </MessageBox>
        <TimeText>{formatMessageTime(createdAt)}</TimeText>
      </ItemContent>
    </ItemWrapper>
  );
});

MessageListItem.displayName = 'MessageListItem';
export default MessageListItem;

const ItemWrapper = styled('li', { shouldForwardProp: (props) => props !== 'isMine' })<{
  isMine: boolean;
}>`
  display: flex;
  justify-content: ${({ isMine }) => (isMine ? 'flex-end' : 'flex-start')};
`;

const ItemContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const SenderText = styled('div', { shouldForwardProp: (props) => props !== 'isMine' })<{
  isMine: boolean;
}>`
  font-size: ${tokens.fontSize.sm};
  padding: 0 ${tokens.spacing.sm};
  text-align: ${({ isMine }) => (isMine ? 'end' : 'start')};
`;

const MessageBox = styled.div`
  background-color: ${tokens.color.bg.secondary};
  border-radius: ${tokens.radius.lg};
  padding: ${tokens.spacing.md};
`;

const MessageText = styled.div`
  font-size: ${tokens.fontSize.sm};
  margin: 0;
  white-space: pre-wrap;
  word-break: break-word;
  ${ellipsis(3)};
`;

const TimeText = styled.div`
  font-size: ${tokens.fontSize.xs};
  color: ${tokens.color.text.dim};
  padding-left: ${tokens.spacing.sm};
`;
