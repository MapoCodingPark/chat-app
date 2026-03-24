import type { KeyboardEvent, RefObject } from 'react';
import { memo, useCallback, useState } from 'react';
import { useChatStore } from '../../store/chatStore.ts';
import styled from '@emotion/styled';
import { tokens } from '../../styles/tokens.ts';

type MessageInputProps = {
  roomId: string;
  textareaRef: RefObject<HTMLTextAreaElement | null>;
};

const MessageInput = memo(({ roomId, textareaRef }: MessageInputProps) => {
  const [text, setText] = useState('');
  const sendMessage = useChatStore((state) => state.sendMessage);

  const handleSend = useCallback(() => {
    const trimmedText = text.trim();
    if (!trimmedText) {
      return;
    }

    sendMessage(roomId, text);
    setText('');
  }, [roomId, sendMessage, text]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLTextAreaElement>) => {
      /** 한글 입력 조합 중 처리  */
      if (event.nativeEvent.isComposing) {
        return;
      }

      if (event.key !== 'Enter') {
        return;
      }

      if (event.shiftKey) {
        return;
      }

      event.preventDefault();
      handleSend();
    },
    [handleSend],
  );

  return (
    <InputWrapper>
      <Input
        ref={textareaRef}
        value={text}
        placeholder="메시지를 입력하세요"
        onChange={(event) => setText(event.target.value)}
        onKeyDown={handleKeyDown}
        rows={1}
      />
      <SendButton type="button" onClick={handleSend}>
        전송
      </SendButton>
    </InputWrapper>
  );
});

MessageInput.displayName = 'MessageInput';
export default MessageInput;

const InputWrapper = styled.div`
  display: flex;
  gap: ${tokens.spacing.sm};
  padding: ${tokens.spacing.xs};
  border-top: 1px solid #e5e7eb;
  background-color: ${tokens.color.bg.secondary};
`;

const Input = styled.textarea`
  flex: 1 1 0;
  min-width: 0;
  min-height: 44px;
  max-height: 160px;
  resize: none;
  padding: ${tokens.spacing.sm};
  border: 1px solid ${tokens.color.border.primary};
  border-radius: ${tokens.radius.md};
  font: inherit;
  line-height: 1.4;

  &:focus {
    outline: none;
    border-color: #93c5fd;
  }
`;

const SendButton = styled.button`
  flex-shrink: 0;
  padding: 0 1rem;
  border: none;
  border-radius: 12px;
  background-color: ${tokens.color.fg.primary};
  color: white;
  font-weight: 700;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;
