import styled from '@emotion/styled';
import { memo } from 'react';
import { useChatStore } from '../../store/chatStore.ts';

const ChatPanel = memo(() => {
  const selectedRoomId = useChatStore((state) => state.selectedRoomId);

  return <ChatPanelWrapper>{selectedRoomId}</ChatPanelWrapper>;
});

ChatPanel.displayName = 'ChatPanel';
export default ChatPanel;

const ChatPanelWrapper = styled.div`
  flex: 1 1 0;
  height: 100%;
  background-color: yellow;
`;
