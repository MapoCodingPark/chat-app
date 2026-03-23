import styled from '@emotion/styled';
import ChatRoomList from '../features/chatRoomList/ChatRoomList.tsx';
import ChatPanel from '../features/chatPanel/ChatPanel.tsx';
import { useChatStore } from '../store/chatStore.ts';

const ChatPage = () => {
  const selectedRoomId = useChatStore((state) => state.selectedRoomId);
  return (
    <>
      <PageLayout>
        <ChatRoomList isRoomSelected={!!selectedRoomId} />
        <ChatPanel roomId={selectedRoomId} />
      </PageLayout>
    </>
  );
};

export default ChatPage;

const PageLayout = styled.main`
  width: 100%;
  height: 100%;
  display: flex;
`;
