import styled from '@emotion/styled';
import { memo, useEffect, useRef } from 'react';
import { useChatStore } from '../../store/chatStore.ts';
import { tokens } from '../../styles/tokens.ts';
import MessageList from './MessageList.tsx';
import MessageInput from './MessageInput.tsx';

const ChatPanel = memo(() => {
  const selectedRoomId = useChatStore((state) => state.selectedRoomId);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (!selectedRoomId) {
      return;
    }

    textareaRef.current?.focus();
  }, [selectedRoomId]);

  return (
    <ChatPanelWrapper>
      {!!selectedRoomId && (
        <>
          <MessageList roomId={selectedRoomId} />
          <MessageInput roomId={selectedRoomId} textareaRef={textareaRef} />
        </>
      )}
    </ChatPanelWrapper>
  );
});

ChatPanel.displayName = 'ChatPanel';
export default ChatPanel;

const ChatPanelWrapper = styled.div`
  flex: 1 1 0;
  height: 100%;
  background-color: ${tokens.color.bg.primary};

  display: flex;
  flex-direction: column;
`;
