import styled from '@emotion/styled';
import { memo } from 'react';

type ChatPanelProps = {
  roomId: string | null;
};

const ChatPanel = memo(({ roomId }: ChatPanelProps) => {
  return <ChatPanelWrapper>{roomId}</ChatPanelWrapper>;
});

ChatPanel.displayName = 'ChatPanel';
export default ChatPanel;

const ChatPanelWrapper = styled.div`
  flex: 1 1 0;
  height: 100%;
  background-color: yellow;
`;
